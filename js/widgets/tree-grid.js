


Dino.declare('Dino.widgets.TreeGrid', 'Dino.widgets.Table', {
	
	defaultOptions: {
		components: {
			body: {
				defaultItem: {
					dtype: 'abstract-tree-item',
					wrapEl: '<tr class="1"></tr>',
					components: {
						subtree: {
							dataId: 'children',
							dynamic: true,
							onItemAdded: function(e) {
								console.log(this.layout.container);
							}
						},
						content: {
							dtype: 'table-cell',
							dataId: 'name',
							binding: 'auto'
						}
					},
					defaultSubItem: {
						wrapEl: '<tr class="2"></tr>',
						components: {
							subtree: {
								dataId: 'children',
								dynamic: true
							},
							content: {
								dtype: 'table-cell',
								dataId: 'name',
								binding: 'auto'
							}
						}					
					}
				}
			}
		}
	},
	
	
	_init: function() {
		Dino.widgets.TreeGrid.superclass._init.apply(this, arguments);

		var bodyLayout = new Dino.layouts.PlainLayout();
		this.options.components.body.layout = bodyLayout;
		
		this.options.components.body.defaultItem.components.subtree.layout = bodyLayout;
		this.options.components.body.defaultItem.defaultSubItem.components.subtree.layout = bodyLayout;
		
	}
	
	
	
	
}, 'tree-grid');



/*
Dino.declare('Dino.widgets.TreeGridItem', 'Dino.Widget', {
	
	defaultOptions: {
		cls: 'tree-grid-item',
		components: {
//			content: {
//				dtype: 'text'
//			},
			subtree: {
				dtype: 'table',
				dataId: 'children',
				tableModel: {
					columns: [{
					}],
					cell: {
						content: {
							dtype: 'tree-grid-item'
						}
					}
				}
			}
		}
	},
	
	
	_init: function() {
		Dino.widgets.TreeGridItem.superclass._init.apply(this, arguments);
		
		var o = this.options;
		
		if('subtree' in o){
			o.components.subtree.items = o.subtree;
		}

		if('defaultSubItem' in o){
			Dino.utils.overrideOpts(o.components.subtree.tableModel.cell.content, o.defaultSubItem, {'defaultSubItem': o.defaultSubItem});
		}
	}
	
	
}, 'tree-grid-item');
*/