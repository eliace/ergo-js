

Dino.declare('Dino.layouts.TreeGridLayout', Dino.Layout, {
	
	initialize: function(){
		Dino.layouts.TreeGridLayout.superclass.initialize.apply(this, arguments);
		
		this.items = [];
	},
	
	
	insert: function(item) {
		
		// если эта компоновка является дочерней/зависимой, то передаем элемент родителю
		if(this.container instanceof Dino.Layout)
			this.container.insert(item);
		
		this.items.push(item);
	},
	
	remove: function(item) {

		// если эта компоновка является дочерней/зависимой, то удаляем элемент из родителя
		if(this.container instanceof Dino.Layout)
			this.container.remove(item);
		
		Dino.remove_from_array(this.items, item)
//		var i = Dino.indexOf(this.items, item);
//		this.items.splice(i, 1);
		
		item.el.detach();
		
//		console.log('item removed from layout');
	},
	
	clear: function() {
		//TODO здесь интересный вопрос - в принципе нужно запоминать свои элементы и удалять только их
//		this.container.el.empty();
		Dino.each(this.items, function(item){
			item.el.detach();
		})
		this.items = [];
	},
	
	update: function() {

		// если эта компоновка является дочерней/зависимой, то обновление выполнять не нужно
		if(this.container instanceof Dino.Layout) return;
		
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
				
		Dino.each(this.items, function(item, i){
			self.container.el.append(item.el);
		});
		
//		console.log('tree-grid-layout updated');
	}
	
}, 'tree-grid-layout');



/*
Dino.declare('Dino.layouts.IndentLayout', Dino.Layout, {

	
	
	
	
	insert: function(item) {
		
		// если эта компоновка является дочерней/зависимой, то передаем элемент родителю
		if(this.container instanceof Dino.Layout)
			this.container.insert(item);
		
		this.items.push(item);
	},
	
	
	
}, 'indent-layout');
*/





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
	
	
	_layoutChanged: function() {
		Dino.widgets.TreeGrid.superclass._layoutChanged.apply(this, arguments);
		
		var tableWidth = this.content.content.el.width();
		this.header.content.el.width(tableWidth);
	}
	
	
	
	
}, 'tree-grid');





Dino.declare('Dino.widgets.TreeTable', 'Dino.widgets.Table', {
	
	defaultOptions: {
		cls: 'dino-tree-table',
		components: {
			body: {
				defaultItem: {
					dtype: 'tree-table-row'
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
						layout: {
							dtype: 'tree-grid-layout',
							container: bodyLayout
						}
					}
				},
				defaultSubItem: {
					components: {
						subtree: {
							layout: {
								dtype: 'tree-grid-layout',
								container: bodyLayout
							}
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

	
	_layoutChanged: function() {
		Dino.widgets.TreeTable.superclass._layoutChanged.apply(this, arguments);
		
		this.body.layout.update();
	}

	
	
	
}, 'tree-table');




Dino.declare('Dino.widgets.TreeTableRow', 'Dino.widgets.TableRow', {
	
//	_html: function() { return '<tr></tr>'; },
	
	defaultOptions: {
		cls: 'dino-tree-grid-row',
		indent: 0,
		defaultItem: {
			dtype: 'tree-table-cell'
		},
		components: {
			subtree: {
				dataId: 'children',
				dtype: 'container',
				dynamic: true,
				defaultItem: {
					dtype: 'tree-table-row'
				}
			}
		},
		states: {
			'collapsed': ['collapsed', 'expanded'],
			'expanded': ['expanded', 'collapsed']
		}
	},
	
	_init: function() {
		this.constructor.superclass._init.apply(this, arguments);
		
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
	},
	
	getParentRow: function() {
		return this.parent.parent;
	}
	
	
	
	
}, 'tree-table-row');



Dino.declare('Dino.widgets.TreeTableCell', 'Dino.widgets.TableCell', {
	
	_afterBuild: function() {
		var o = this.options;
		this.children.each(function(child){ child.opt('indent', o.indent); });
	}
	
}, 'tree-table-cell');




Dino.declare('Dino.widgets.TreeGridNode', 'Dino.containers.Box', {
	
//	_html: function() { return '<td></td>'; },
	
	defaultOptions: {
//		cls: 'dino-tree-grid-cell',
		style: {'position': 'relative'},
		content: {
			dtype: 'box',
			cls: 'dino-tree-grid-item',
			components: {
				button: {
					dtype: 'icon',
					cls: 'dino-tree-node-button ui-icon ui-icon-triangle-1-se dino-clickable',
					clickable: true,
					onClick: function() {
						var row = this.getParent({dtype: 'tree-table-row'});//this.parent.parent.getRow();
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
					}
				},
				content: {
					dtype: 'text-item',
					cls: 'dino-tree-node-content'
				}
			}
		}
	},
	
	
	
	_init: function() {
		this.constructor.superclass._init.apply(this, arguments);
		
		var o = this.options;
		
//		var indentComponents = {};
		
//		var wg = 0;
		
//		Dino.utils.overrideOpts(o, {components: indentComponents});
		
	},
	
	
	_opt: function(o) {
		this.constructor.superclass._opt.apply(this, arguments);
		
		if('indent' in o){
			for(var i = 0; i < o.indent; i++){
				this.layout.container.el.prepend('<span class="indent"></span>');
			}
		}
	}
	
	
//	getRow: function() {
//		return this.parent;
//	}
	
//	startEdit: function() {
//		
//	}
	
	
	
}, 'tree-grid-node');




//Dino.declare('Dino.widgets.TreeGridItem', 'Dino.Widget', {
//	
//}, 'tree-grid-item');





