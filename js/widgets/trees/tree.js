
//= require <containers/list>
//= require <widgets/text-item>





/**
 * Простое дерево с отступами.
 * 
 * @class
 * @extends Dino.containers.List
 */
Dino.widgets.Tree = Dino.declare('Dino.widgets.Tree', 'Dino.containers.List', /** @lends Dino.widgets.Tree.prototype */{
	
	defaults: {
		cls: 'dino-tree',
		defaultItem: {
			dtype: 'basic-tree-node',
//			indent: 0,
			expandOnShow: true,
			defaultSubItem: {}
		},
		treeModel: {
			node: {}
		}		
	},
	
	
	$init: function(o){
		Dino.widgets.Tree.superclass.$init.apply(this, arguments);
		
		
		if('subtree' in o) 
			o.items = o.subtree;
		
		if('isDynamic' in o) {
			
			o.dynamic = true;
			
			var dynamicItem = {
				components: {
					subtree: {
						dynamic: true
					}
				}
			};
			
			Dino.smart_override(o.defaultItem, dynamicItem);
			Dino.smart_override(o.defaultItem.defaultSubItem, dynamicItem);
		}
		
		
		Dino.smart_override(o.defaultItem, o.treeModel.node);
		Dino.smart_override(o.defaultItem.defaultSubItem, o.treeModel.node);
		
	},
	
	
	
	walkTree: function(callback) {
		this.items.each(function(item){
			return item.walkSubtree(function(node){
				return callback.call(this, node);
			});
		});		
	}
	
	
	
}, 'tree');


