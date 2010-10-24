

Dino.declare('Dino.layouts.TreeGridLayout', Dino.Layout, {
	
	initialize: function(){
		Dino.layouts.TreeGridLayout.superclass.initialize.apply(this, arguments);
		
		this.items = [];
	},
	
	
	insert: function(item) {
		this.items.push(item);
	},
	
	remove: function(item) {
//		this.container.parent.layout.remove(item);
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
				
		Dino.each(this.items, function(item){
			self.container.el.append(item.el);
		});
		
		
	}
	
}, 'tree-grid-layout');




Dino.declare('Dino.widgets.TreeGrid', 'Dino.widgets.Table', {
	
	defaultOptions: {
		components: {
			body: {
				dtype: 'container',
				dynamic: true,
				wrapEl: '<tbody></tbody>',
//				layout: 'tree-grid-layout',
				defaultItem: {
					dtype: 'tree-grid-row'
				}
			}
		}
	},
	
	
	_init: function() {
		Dino.widgets.TreeGrid.superclass._init.apply(this, arguments);

		var bodyLayout = new Dino.layouts.TreeGridLayout({updateMode: 'manual'});
		this.options.components.body.layout = bodyLayout;
		
		Dino.utils.overrideOpts(this.options.components.body.defaultItem, {
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
		});

		
		Dino.utils.overrideOpts(
				this.options.components.body.defaultItem.defaultSubItem, 
				this.options.tableModel.row, 
				{defaultItem: this.options.tableModel.cell},
				{items: this.options.tableModel.columns}
		);
		
		
	},
	
	_afterRender: function() {
		Dino.widgets.TreeGrid.superclass._afterRender.apply(this, arguments);
		
		this.body.layout.update();
	}
	
	
	
	
}, 'tree-grid');




Dino.declare('Dino.widgets.TreeGridRow', 'Dino.Container', {
	
	_html: function() { return '<tr></tr>'; },
	
	defaultOptions: {
		indent: 0,
		defaultItem: {
			dtype: 'table-cell'
		},
		components: {
			subtree: {
				dataId: 'children',
				dtype: 'container',
				dynamic: true,
				defaultItem: {
					dtype: 'tree-grid-row'
				}
			}
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
	
	
	eachAncestor: function(callback) {
		
		callback.call(this, this);
		
		this.subtree.eachItem(function(item){
			item.eachAncestor(callback);
		});
	},
	
	eachSubItem: function(callback) {
		this.subtree.eachItem(callback);
	}
	
	
	
}, 'tree-grid-row');



Dino.declare('Dino.widgets.TreeGridCell', 'Dino.Widget', {
	
	_html: function() { return '<td></td>'; },
	
	_init: function() {
		Dino.widgets.TreeGridCell.superclass._init.apply(this, arguments);
		
		var o = this.options;
		
		for(var i = 0; i < o.indent; i++){
			this.layout.container.el.append('<span class="indent"></span>');
		}
		
	}
	
	
	
}, 'tree-grid-cell');




