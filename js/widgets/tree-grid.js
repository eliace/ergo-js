


Dino.declare('Dino.widgets.TreeGrid', 'Dino.Container', {
	
	defaultOptions: {
		
		
	
	
	
	}
	
	
	
	
}, 'tree-grid');




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
