

Dino.declare('Dino.layouts.TreeGridLayout', Dino.Layout, {
	
	initialize: function(){
		Dino.layouts.TreeGridLayout.superclass.initialize.apply(this, arguments);
		
		this.items = [];
	},
	
	
	insert: function(item) {
		this.items.push(item);
	},
	
	remove: function(item) {
		
		var i = Dino.indexOf(this.items, item);
		this.items.splice(i, 1);
		
		item.el.remove();
	},
	
	clear: function() {
		//TODO здесь интересный вопрос - в принципе нужно запоминать свои элементы и удалять только их
//		this.container.el.empty();
	},
	
	update: function() {
		
		var self = this;
		var n = 0;
		
		this.container.walk(function() {
			if(Dino.in_array(self.items, this))
				this.order = n++;
		});
		
		this.items.sort(function(w1, w2){
			var a = w1.order;
			var b = w2.order;
			if(a < b) return -1;
			else if(a > b) return 1;
			return 0;
		});
		
//		console.log(this.items);
		
		Dino.each(this.items, function(item, i){
			self.container.el.append(item.el);
		});
		
		
	}
	
}, 'tree-grid-layout');





Dino.declare('Dino.widgets.TreeGrid', 'Dino.Widget', {
	
	defaultOptions: {
		wrapEl: '<div></div>',
		cls: 'dino-tree-grid',
		components: {
			header: {
				dtype: 'box',
				content: {
					dtype: 'table',
					width: '100%',
					binding: false
				}
			},
			content: {
				// скроллируемый контейнер
				dtype: 'box',
				style: {'overflow-y': 'scroll'},
				content: {
					dtype: 'tree-table',
					width: '100%'						
				}
			}
		}
	},
	
	
	
	_init: function() {
		Dino.widgets.TreeGrid.superclass._init.apply(this, arguments);
		
		var o = this.options;
		
		Dino.utils.overrideOpts(o.components.content.content, {'tableModel': o.tableModel});
		Dino.utils.overrideOpts(o.components.header.content, {'headerModel': o.headerModel || {}});
		
	},
	
	
	_afterRender: function() {
		Dino.widgets.TreeGrid.superclass._afterRender.apply(this, arguments);
		
		var tableWidth = this.content.content.el.width();
		this.header.content.el.width(tableWidth);
	}
	
	
	
	
}, 'tree-grid');





Dino.declare('Dino.widgets.TreeTable', 'Dino.widgets.Table', {
	
	defaultOptions: {
		components: {
			body: {
				defaultItem: {
					dtype: 'tree-grid-row'
				}
			}
		}
	},
	
	
	_init: function() {
		Dino.widgets.TreeTable.superclass._init.apply(this, arguments);

		var bodyLayout = new Dino.layouts.TreeGridLayout({updateMode: 'manual'});
		
		Dino.utils.overrideOpts(this.options.components.body, {
			layout: bodyLayout,
			defaultItem: {
				components: {
					subtree: {
						layout: bodyLayout
					}
				},
				defaultSubItem: {
					components: {
						subtree: {
							layout: bodyLayout
						}
					}						
				}
			}
		});

		
		Dino.utils.overrideOpts(
				this.options.components.body.defaultItem.defaultSubItem, 
				this.options.tableModel.row, 
				{defaultItem: this.options.tableModel.cell},
				{items: this.options.tableModel.columns}
		);
		
		
	},
	
	_afterRender: function() {
		Dino.widgets.TreeTable.superclass._afterRender.apply(this, arguments);
		
		this.body.layout.update();
	}
	
	
	
	
}, 'tree-table');




Dino.declare('Dino.widgets.TreeGridRow', 'Dino.widgets.TableRow', {
	
//	_html: function() { return '<tr></tr>'; },
	
	defaultOptions: {
		indent: 0,
//		defaultItem: {
//			dtype: 'table-cell'
//		},
		components: {
			subtree: {
				dataId: 'children',
				dtype: 'container',
				dynamic: true,
				defaultItem: {
					dtype: 'tree-grid-row'
				}
			}
		},
		states: {
			'collapsed': ['collapsed', 'expanded'],
			'expanded': ['expanded', 'collapsed']
		}
	},
	
	_init: function() {
		Dino.widgets.TreeGridRow.superclass._init.apply(this, arguments);
		
		var o = this.options;

		if('subtree' in o){
			o.components.subtree.items = o.subtree;
		}
		
		this.indent = o.indent;

		if('defaultSubItem' in o){
			Dino.utils.overrideOpts(o.components.subtree.defaultItem, o.defaultSubItem, {'defaultSubItem': o.defaultSubItem});
		}
		
		o.defaultItem.indent = this.indent;
		o.components.subtree.defaultItem.indent = this.indent+1;
	},
	
//	_opt: function(o) {
//		Dino.widgets.TreeGridRow.superclass._opt.apply(this, arguments);
//		
//		this.isLeaf = o.isLeaf;
//				
//	},
	
	eachDescendantRow: function(callback) {
		if(arguments.length == 2){
			callback.call(this, this);
		}
				
		this.subtree.eachItem(function(item){
			item.eachDescendantRow(callback, 0);
		});
	},
	
//	eachSubItem: function(callback) {
//		this.subtree.eachItem(callback);
//	},
	
	collapse: function() {
		this.states.set('collapsed');
		this.eachDescendantRow(function(item){
			item.states.set('hidden');
		});
	},
	
	expand: function(x0) {
		if(arguments.length == 0){
			this.states.set('expanded');
			x0 = true;
		}

		if(!x0) return;
		
		var x = this.states.is('expanded');
		
//		if( this.states.is('expanded') ){
		this.states.clear('hidden');
		this.subtree.eachItem(function(item){
			item.expand(x);
		});			
//		}
	}
	
	
	
	
}, 'tree-grid-row');



Dino.declare('Dino.widgets.TreeGridCell', 'Dino.Widget', {
	
	_html: function() { return '<td></td>'; },
	
	defaultOptions: {
//		cls: 'dino-tree-grid-cell',
		content: {
			dtype: 'box',
			cls: 'dino-tree-grid-item',
			components: {
				button: {
					dtype: 'icon',
					cls: 'dino-tree-grid-item-button ui-icon ui-icon-triangle-1-se dino-clickable',
					clickable: true,
					onClick: function() {
						var row = this.parent.parent.getRow();
						if(row.states.is('collapsed')){
							row.expand();
							this.states.set('expanded');
						}
						else{
							row.collapse();
							this.states.set('collapsed');
							
						}
//						this.getParent({dtype: 'tree-grid'})._updateEvenOdd();
					},
					states: {
						'hover': ['ui-icon-blue', 'ui-icon'],
						'collapsed': ['ui-icon-triangle-1-e', 'ui-icon-triangle-1-se'],
						'expanded': ['ui-icon-triangle-1-se', 'ui-icon-triangle-1-e'],
						'leaf': 'dino-hidden'
//						'collapsed': function() { if(!this.parent.options.isLeaf) return ['ui-icon ui-icon-triangle-1-e', 'ui-icon ui-icon-triangle-1-se'] },
//						'expanded': function() { if(!this.parent.options.isLeaf) return ['ui-icon ui-icon-triangle-1-se', 'ui-icon ui-icon-triangle-1-e'] }
					}
				}
			}
		}
	},
	
	
	
	_init: function() {
		Dino.widgets.TreeGridCell.superclass._init.apply(this, arguments);
		
		var o = this.options;
		
//		var indentComponents = {};
		
//		var wg = 0;
		for(var i = o.indent-1; i >= 0; i--){
/*			
			indentComponents['indent-'+i] = Dino.utils.overrideOpts({
				dtype: 'box',
				wrapEl: '<span></span>',
				cls: 'indent',// indent-'+i,
				weight: wg++
			},
			o.indentItem);
*/			
			this.layout.container.el.append('<span class="indent"></span>');
		}
		
//		Dino.utils.overrideOpts(o, {components: indentComponents});
		
	},
	
	
//	_opt: function(o) {
//		Dino.widgets.TreeItem.superclass._opt.apply(this, arguments);
//		
//		this.isLeaf = o.isLeaf;
//				
//	},
	
	
	getRow: function() {
		return this.parent;
	}
	
//	startEdit: function() {
//		
//	}
	
	
	
}, 'tree-grid-cell');




//Dino.declare('Dino.widgets.TreeGridItem', 'Dino.Widget', {
//	
//}, 'tree-grid-item');





