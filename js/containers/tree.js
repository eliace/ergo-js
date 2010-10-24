


Dino.declare('Dino.widgets.AbstractTreeItem', 'Dino.Widget', {
	
	defaultOptions: {
		components: {
			subtree: {
				dtype: 'container',
				defaultItem: {
					dtype: 'abstract-tree-item'
				}
			}
		}
	},
	
	
	_init: function() {
		Dino.widgets.AbstractTreeItem.superclass._init.apply(this, arguments);
		
		var o = this.options;

		if('subtree' in o){
			o.components.subtree.items = o.subtree;
		}

//		if(o.components.subtree) {
			if('defaultSubItem' in o){
				Dino.utils.overrideOpts(o.components.subtree.defaultItem, o.defaultSubItem, {'defaultSubItem': o.defaultSubItem});
			}		
//		}
		
	}
	
	
}, 'abstract-tree-item');