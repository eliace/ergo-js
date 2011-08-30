
//= require <containers/list>
//= require <widgets/text-item>





/**
 * Простое дерево с отступами.
 * 
 * @class
 * @extends Ergo.containers.List
 */
Ergo.widgets.Tree = Ergo.declare('Ergo.widgets.Tree', 'Ergo.containers.List', /** @lends Ergo.widgets.Tree.prototype */{
	
	defaults: {
		cls: 'ergo-tree',
		defaultItem: {
			etype: 'basic-tree-node',
//			indent: 0,
			root: true,
			expandOnShow: true,
			defaultSubItem: {}
		},
		treeModel: {
			node: {}
		}		
	},
	
	
	$init: function(o){
		Ergo.widgets.Tree.superclass.$init.apply(this, arguments);
		
		
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
			
			Ergo.smart_override(o.defaultItem, dynamicItem);
			Ergo.smart_override(o.defaultItem.defaultSubItem, dynamicItem);
		}
		
		
		Ergo.smart_override(o.defaultItem, o.treeModel.node);
		Ergo.smart_override(o.defaultItem.defaultSubItem, o.treeModel.node);
		
	},
	
	
	
	walkTree: function(callback) {
		this.items.each(function(item){
			return item.walkSubtree(function(node){
				return callback.call(this, node);
			});
		});		
	}
	
	
	
}, 'tree');


