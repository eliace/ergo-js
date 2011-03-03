

/**
 * @class
 * @extends Dino.layouts.StatefulLayout
 */
Dino.layouts.TreeGridLayout = Dino.declare('Dino.layouts.TreeGridLayout', 'Dino.layouts.StatefulLayout', /** @lends Dino.layouts.TreeGridLayout.prototype */{
	
//	initialize: function(){
//		Dino.layouts.TreeGridLayout.superclass.initialize.apply(this, arguments);
//		
//		this.items = [];
//	},
	
	
	insert: function(item) {
		Dino.layouts.TreeGridLayout.superclass.insert.apply(this, arguments);
		
		// если эта компоновка является дочерней/зависимой, то передаем элемент родителю
		if(this.container instanceof Dino.Layout)
			this.container.insert(item);
		else {
			if(this.container.el.parents().is('body')) item.$afterRender();
		}
		
//		else
//		console.log(this.container);
//		this.items.push(item);
	},
	
	remove: function(item) {
		Dino.layouts.TreeGridLayout.superclass.remove.apply(this, arguments);

		// если эта компоновка является дочерней/зависимой, то удаляем элемент из родителя
		if(this.container instanceof Dino.Layout)
			this.container.remove(item);
		
//		Dino.remove_from_array(this.items, item)
		
//		item.el.detach();
		
//		console.log('item removed from layout');
	},
	
//	clear: function() {
//		//TODO здесь интересный вопрос - в принципе нужно запоминать свои элементы и удалять только их
//		this.container.el.empty();
//		Dino.each(this.items, function(item){
//			item.el.detach();
//		})
//		this.items = [];
//	},
	
	
	rebuild: function() {

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
		
//		console.log('rebuild tree-grid')
//		console.log(this.container.data.get());
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




/**
 * @class
 * @extends Dino.Widget
 */
Dino.widgets.TreeGrid = Dino.declare('Dino.widgets.TreeGrid', 'Dino.widgets.Grid', /** @lends Dino.widgets.TreeGrid.prototype */{
	
	defaultOptions: {
//		wrapEl: '<div></div>',
		baseCls: 'dino-tree-grid',
		components: {
//			header: {
//				dtype: 'box',
//				content: {
//					dtype: 'table',
//					width: '100%',
//					binding: false,
//					headerModel: {
//						cell: {
//							cls: 'dino-grid-h-cell',
//							layout: {
//								dtype: 'plain-layout',
//								html: '<div class="dino-nowrap"></div>'
//							}
//						}						
//					}
//				}
//			},
			content: {
				// скроллируемый контейнер
//				dtype: 'box',
//				style: {'overflow-y': 'auto', 'overflow-x': 'hidden'},
				content: {
					dtype: 'tree-table',
					tableModel: {
						row: {
							cls: 'dino-tree-grid-row'
						},
						cell: {
							cls: 'dino-tree-grid-cell',
							layout: {
								dtype: 'plain-layout',
								html: '<div class="dino-nowrap"></div>'
							}
						}
					}
//					width: '100%'
				}
			}
		}
	}
	
	
/*	
	$init: function() {
		Dino.widgets.TreeGrid.superclass.$init.apply(this, arguments);
		
		var o = this.options;
		
		// переносим параметр width из колонок в заголовки
		var h_columns = [];
		Dino.each(o.tableModel.columns, function(column, i){
			h_col = {};
			if('width' in column) h_col.width = column.width;
			h_columns[i] = h_col;
		})
		
		Dino.utils.overrideOpts(o.components.content.content, {'tableModel': o.tableModel});
		Dino.utils.overrideOpts(o.components.header.content, {'headerModel': o.headerModel || {}}, {headerModel: {columns: h_columns}});
		
	},
	
	
	$layoutChanged: function() {
		Dino.widgets.TreeGrid.superclass.$layoutChanged.apply(this, arguments);
		
		var tableWidth = this.content.content.el.width();
		this.header.content.el.width(tableWidth);
		
	}
*/	
	
	
	
}, 'tree-grid');




/**
 * @class
 * @extends Dino.widgets.Table
 */
Dino.widgets.TreeTable = Dino.declare('Dino.widgets.TreeTable', 'Dino.widgets.Table', /** @lends Dino.widgets.TreeTable.prototype */{
	
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
	
	
	$init: function(o) {
		Dino.widgets.TreeTable.superclass.$init.apply(this, arguments);

		var bodyLayout = new Dino.layouts.TreeGridLayout(/*{updateMode: 'manual'}*/);
//		bodyLayout.immediateRebuild = false;
		
		o.components.body.layout = bodyLayout;

		// определяем, 
		var defaultNode = {
			components: {
				subtree: {
					layout: {
						dtype: 'tree-grid-layout',
						container: bodyLayout
					}
				}
			}			
		};

		Dino.utils.overrideOpts(o.components.body.defaultItem, defaultNode, {defaultSubItem: defaultNode});
		
		
		Dino.utils.overrideOpts(
				o.components.body.defaultItem.defaultSubItem,
				o.tableModel.row, 
				{defaultItem: o.tableModel.cell},
				{items: o.tableModel.columns}
		);
		
		
	}

	
//	$layoutChanged: function() {
//		Dino.widgets.TreeTable.superclass.$layoutChanged.apply(this, arguments);
//		
//		this.body.layout.update();
//	}

	
	
	
}, 'tree-table');



/**
 * @class
 * @extends Dino.widgets.TableRow
 */
Dino.widgets.TreeTableRow = Dino.declare('Dino.widgets.TreeTableRow', 'Dino.widgets.TableRow', /** @lends Dino.widgets.TreeTableRow.prototype */{
	
//	$html: function() { return '<tr></tr>'; },
	
	defaultOptions: {
//		cls: 'dino-tree-grid-row',
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
					dtype: 'tree-table-row'
				}
			}
		},
		states: {
//			'collapsed_trigger': ['collapsed', 'expanded'],
			'expand_trigger': ['expanded', 'collapsed']
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
			Dino.utils.overrideOpts(o.components.subtree.defaultItem, o.defaultSubItem, {'defaultSubItem': o.defaultSubItem});
		}
		
		o.defaultItem.indent = this.indent;
		o.components.subtree.defaultItem.indent = this.indent+1;
	},
	
//	$opt: function(o) {
//		Dino.widgets.TreeGridRow.superclass.$opt.apply(this, arguments);
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
		this.states.clear('expand_trigger');
		this.eachDescendantRow(function(item){
			item.states.set('hidden');
		});
	},
	
	expand: function(x0) {
		if(arguments.length == 0){
			this.states.set('expand_trigger');
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
		var w = this.parent.parent;
		return (w instanceof Dino.widgets.TreeTableRow) ? w : undefined;
	}
	
	
	
	
}, 'tree-table-row');



/**
 * @class
 * @extends Dino.widgets.TableCell
 */
Dino.widgets.TreeTableCell = Dino.declare('Dino.widgets.TreeTableCell', 'Dino.widgets.TableCell', /** @lends Dino.widgets.TreeTableCell.prototype */{
	
	defaultOptions: {
//		cls: 'dino-tree-grid-cell',
		layout: {
//			dtype: 'plain-layout',
//			html: '<div style="position: relative;"></div>'
			dtype: 'plain-layout',
			html: '<div class="dino-nowrap"></div>'
		},
//		components: {
//			content: {
//				// этот контейнер нужен, чтобы работал стиль position: absolute
//				dtype: 'box',
				components: {
					content: {
						// контейнер для вставки отступов
						dtype: 'box',
						style: {'display': 'inline', 'position': 'relative'},
						cls: 'dino-tree-node',
						components: {
							button: {
								dtype: 'icon',
								weight: 1,
								cls: 'dino-tree-node-button',
								state: 'clickable',
								onClick: function() {
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
									'leaf': 'dino-hidden'
								}
							},
							content: {
								dtype: 'text-item',
								cls: 'dino-tree-node-content'
							}
						},
						states: {
							'expand_trigger': ['expanded', 'collapsed']
//							'collapsed': ['collapsed', 'expanded']
						}
					}
				},
//			}
//		},
		expandOnShow: false
	},
	
	
	$opt: function(o) {
		Dino.widgets.TreeTableCell.superclass.$opt.apply(this, arguments);
		
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
		Dino.widgets.TreeTableCell.superclass.$afterRender.apply(this, arguments);

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





