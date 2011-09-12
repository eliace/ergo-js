
//= require "table-grid"
//= require <widgets/trees/tree>
//= require <layouts/stateful>

/**
 * @class
 * @extends Ergo.layouts.StatefulLayout
 */
Ergo.layouts.TreeGridLayout = Ergo.declare('Ergo.layouts.TreeGridLayout', 'Ergo.layouts.StatefulLayout', /** @lends Ergo.layouts.TreeGridLayout.prototype */{
	
//	initialize: function(){
//		Ergo.layouts.TreeGridLayout.superclass.initialize.apply(this, arguments);
//		
//		this.items = [];
//	},
	
	
	insert: function(item) {
		Ergo.layouts.TreeGridLayout.superclass.insert.apply(this, arguments);
		
		// если эта компоновка является дочерней/зависимой, то передаем элемент родителю
		if(this.container instanceof Ergo.core.Layout)
			this.container.insert(item);
		else {
//			Ergo.layouts.TreeGridLayout.superclass.insert.apply(this, arguments);
			if(this.container.el.parents().is('body')) item.$afterRender();
		}
		
//		else
//		console.log(this.container);
//		this.items.push(item);
	},
	
	remove: function(item) {		
		Ergo.layouts.TreeGridLayout.superclass.remove.apply(this, arguments);			

		// если эта компоновка является дочерней/зависимой, то удаляем элемент из родителя
		if(this.container instanceof Ergo.core.Layout) {
			this.container.remove(item);
		}
//		else {
//			Ergo.layouts.TreeGridLayout.superclass.remove.apply(this, arguments);
//		}
		
//		Ergo.remove_from_array(this.items, item)
		
//		item.el.detach();
		
//		console.log('item removed from layout');
	},
	
	clear: function() {
//		var self = this;
		if(this.container instanceof Ergo.core.Layout) {
			while(this.items.length > 0) this.remove(this.items[0]);
		}
		Ergo.layouts.TreeGridLayout.superclass.clear.apply(this, arguments);		
	},
	
	
	rebuild: function() {

		// если эта компоновка является дочерней/зависимой, то обновление выполнять не нужно
		if(this.container instanceof Ergo.core.Layout) return;
		
		var self = this;
		var n = 0;
		
		this.container.walk(function() {
			if(Ergo.include(self.items, this))
				this.order = n++;
		});
		
		this.items.sort(function(w1, w2){
			var a = w1.order;
			var b = w2.order;
			if(a < b) return -1;
			else if(a > b) return 1;
			return 0;
		});
				
		Ergo.each(this.items, function(item, i){
			self.container.el.append(item.el);
		});
		
//		console.log('rebuild tree-grid')
//		console.log(this.container.data.get());
	}
	
//	clear: function() {
//		
//	}
	
}, 'tree-grid-layout');



/*
Ergo.declare('Ergo.layouts.IndentLayout', Ergo.core.Layout, {

	
	
	
	
	insert: function(item) {
		
		// если эта компоновка является дочерней/зависимой, то передаем элемент родителю
		if(this.container instanceof Ergo.core.Layout)
			this.container.insert(item);
		
		this.items.push(item);
	},
	
	
	
}, 'indent-layout');
*/



/*
Ergo.widgets.TreeGrid = Ergo.declare('Ergo.widgets.TreeGrid', 'Ergo.widgets.TableGrid', {
	
	defaults: {
//		wrapEl: '<div></div>',
//		baseCls: 'ergo-tree-grid',
		components: {
//			header: {
//				etype: 'box',
//				content: {
//					etype: 'table',
//					width: '100%',
//					binding: false,
//					headerModel: {
//						cell: {
//							cls: 'ergo-grid-h-cell',
//							layout: {
//								etype: 'plain-layout',
//								html: '<div class="nowrap"></div>'
//							}
//						}						
//					}
//				}
//			},
			body: {
				// скроллируемый контейнер
//				etype: 'box',
//				style: {'overflow-y': 'auto', 'overflow-x': 'hidden'},
//				content: {
					etype: 'tree-table',
					tableModel: {
						row: {
							cls: 'ergo-tree-grid-row'
						},
						cell: {
							cls: 'ergo-tree-grid-cell',
							layout: {
								etype: 'plain-layout',
								html: '<div class="nowrap"></div>'
							}
						}
					}
//					width: '100%'
//				}
			}
		}
	}
	
	
	
	
	
}, 'tree-grid');
*/



/**
 * @class
 * @extends Ergo.widgets.Table
 */
Ergo.widgets.TreeGrid = Ergo.declare('Ergo.widgets.TreeGrid', 'Ergo.widgets.TableGrid', /** @lends Ergo.widgets.TreeTable.prototype */{
	
	defaults: {
		cls: 'ergo-tree-table',
		components: {
			body: {
				content: {
					defaultItem: {
						etype: 'tree-table-row'						
					},
					gridModel: {
						row: {
							onStateChange: function(e) {
								if(e.state == 'expanded' || e.state == 'collapsed') {
									var grid = this.getParent(Ergo.widgets.TreeGrid);
									if(grid) grid.$layoutChanged();
								}
							}							
						}
					}
//					defaultItem: {
//						etype: 'tree-table-row',
//					}
				}
			}
		}
	},
	
	
	$init: function(o) {
		Ergo.widgets.TreeGrid.superclass.$init.apply(this, arguments);

		var bodyLayout = new Ergo.layouts.TreeGridLayout(/*{updateMode: 'manual'}*/);
//		bodyLayout.immediateRebuild = false;
		
		var o_grid = o.components.body.content;
		
		o_grid.layout = bodyLayout;

		// определяем, 
		var defaultNode = {
			components: {
				subtree: {
					layout: {
						etype: 'tree-grid-layout',
						container: bodyLayout
					}
				}
			}			
		};

		Ergo.smart_override(o_grid.defaultItem, defaultNode, {defaultSubItem: defaultNode});
		
		
		
		Ergo.smart_override(
				o_grid.defaultItem.defaultSubItem,
				o_grid.gridModel.row, 
				{defaultItem: o_grid.gridModel.cell},
				{items: o_grid.gridModel.columns}
		);
		
		
	}

	
//	$layoutChanged: function() {
//		Ergo.widgets.TreeTable.superclass.$layoutChanged.apply(this, arguments);
//		
//		this.body.layout.update();
//	}

	
	
	
}, 'tree-grid');



/**
 * @class
 * @extends Ergo.widgets.TableRow
 */
Ergo.widgets.TreeTableRow = Ergo.declare('Ergo.widgets.TreeTableRow', 'Ergo.widgets.TableRow', /** @lends Ergo.widgets.TreeTableRow.prototype */{
	
//	$html: function() { return '<tr></tr>'; },
	
	defaults: {
		cls: 'ergo-tree-grid-row',
		indent: 0,
		defaultItem: {
			etype: 'table-cell'
		},
		components: {
			subtree: {
				dataId: 'children',
				etype: 'container',
				dynamic: true,
				defaultItem: {
					etype: 'tree-table-row'
				}
			}
		},
		states: {
//			'collapsed_trigger': ['collapsed', 'expanded'],
			'expand_trigger': Ergo.on('expanded').off('collapsed')//['expanded', 'collapsed']
		}
	},
	
	$init: function() {
		this.constructor.superclass.$init.apply(this, arguments);
		
		var o = this.options;

		if('subtree' in o){
			o.components.subtree.items = o.subtree;
		}
		
		this.indent = o.indent;

		if('defaultSubItem' in o){
			Ergo.smart_override(o.components.subtree.defaultItem, o.defaultSubItem, {'defaultSubItem': o.defaultSubItem});
		}
		
		o.defaultItem.indent = this.indent;
		o.components.subtree.defaultItem.indent = this.indent+1;
	},
	
//	$opt: function(o) {
//		Ergo.widgets.TreeGridRow.superclass.$opt.apply(this, arguments);
//		
//		this.isLeaf = o.isLeaf;
//				
//	},
	
		
	
	eachDescendantRow: function(callback) {
		if(arguments.length == 2){
			callback.call(this, this);
		}
				
		this.subtree.items.each(function(item){
			item.eachDescendantRow(callback, 0);
		});
	},
	
//	eachSubItem: function(callback) {
//		this.subtree.eachItem(callback);
//	},
	
	collapse: function() {
		this.eachDescendantRow(function(item){
			item.states.set('hidden');
		});
		this.states.clear('expand_trigger');		
	},
	
	expand: function(x0) {
		if(arguments.length == 0){

			this.states.clear('hidden');
	
			var x = true;
			
			this.subtree.items.each(function(item){
				item.expand(x);
			});
						
			this.states.set('expand_trigger');
		}
		else {

			if(!x0) return;
	
			this.states.clear('hidden');
	
			var x = this.states.is('expanded');
			
			this.subtree.items.each(function(item){
				item.expand(x);
			});			
			
		}

	},
	
	getParentRow: function() {
		var w = this.parent.parent;
		return (w instanceof Ergo.widgets.TreeTableRow) ? w : undefined;
	}
	
	
	
	
}, 'tree-table-row');



/**
 * @class
 * @extends Ergo.widgets.TableCell
 */
Ergo.widgets.TreeTableCell = Ergo.declare('Ergo.widgets.TreeTableCell', 'Ergo.widgets.TableCell', /** @lends Ergo.widgets.TreeTableCell.prototype */{
	
	defaults: {
		cls: 'ergo-tree-grid-cell',
		layout: {
//			etype: 'plain-layout',
//			html: '<div style="position: relative;"></div>'
			etype: 'plain-layout',
			html: '<div class="nowrap"></div>'
		},
//		components: {
//			content: {
//				// этот контейнер нужен, чтобы работал стиль position: absolute
//				etype: 'box',
				components: {
					content: {
						// контейнер для вставки отступов
						etype: 'box',
						style: {'display': 'inline', 'position': 'relative'},
						cls: 'ergo-tree-node',
						components: {
							button: {
								etype: 'icon',
								weight: 1,
								cls: 'ergo-tree-node-button',
								onClick: function(e) {
									var row = this.parent.parent.getRow();
									if(row.states.is('collapsed')){
										this.parent.states.set('expand_trigger');
										row.expand();
									}
									else{
										this.parent.states.clear('expand_trigger');
										row.collapse();
									}																			
								},
								states: {
									'leaf': 'hidden'
								}
							},
							content: {
								etype: 'text-item',
								cls: 'ergo-tree-node-content'
							}
						},
						states: {
							'expand_trigger': Ergo.on('expanded').off('collapsed'),//['expanded', 'collapsed'],
							'expanded': function(on) {
								this.button.states.toggle('expanded', on);
							},
							'collapsed': function(on) {
								this.button.states.toggle('collapsed', on);
							}
							
						}
					}
				},
//			}
//		},
		expandOnShow: false
	},
	
	
	$opt: function(o) {
		Ergo.widgets.TreeTableCell.superclass.$opt.apply(this, arguments);
		
		if('indent' in o){
			for(var i = 0; i < o.indent; i++){
				this.layout.el.prepend('<span class="indent"></span>');
			}
		}
		
		if('isLeaf' in o) {
			this.content.button.states.toggle('leaf', o.isLeaf);
		}
	},
	
	
	$afterRender: function() {
		Ergo.widgets.TreeTableCell.superclass.$afterRender.apply(this, arguments);

//		var expand = this.options.expandOnShow;
		
		// если родительская строка скрыта или свернута, то этот узел является свернутым
		var parentRow = this.getRow().getParentRow();
		if(parentRow) {
			(parentRow.states.is('collapsed')) ? parentRow.collapse() : parentRow.expand();
		}
//		if(parentRow.states.is('hidden') || parentRow.states.is('collapsed')) expand = false;
		
		if(this.options.expandOnShow) {
			this.content.states.set('expand_trigger');
			this.getRow().expand();
		}
		else {
			this.content.states.clear('expand_trigger');
			this.getRow().collapse();
		}
		
	}
	
	
//	$afterBuild: function() {
//		var o = this.options;
//		this.children.each(function(child){ child.opt('indent', o.indent); });
//	}
	
}, 'tree-table-cell');





