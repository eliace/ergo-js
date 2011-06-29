
//= require <containers/list>


/**
 * @class
 * @extends Dino.core.Widget
 */
Dino.widgets.TreeNode = Dino.declare('Dino.widgets.TreeNode', 'Dino.widgets.Box', /** @lends Dino.widgets.TreeNode.prototype */{

	defaults: {
		html: '<li/>',
		cls: 'dino-tree-node',
		components: {
			content: {
				
			},
			subtree: {
				dtype: 'list',
				html: '<ul></ul>',
				defaultItem: {
					dtype: 'tree-node'
				}
			}
		},
		states: {
			'expand-collapse': ['expanded', 'collapsed']
		}
	},
	
	
//	$html: function() { return '<li></li>'; },
	
	$init: function() {
		Dino.widgets.TreeNode.superclass.$init.apply(this, arguments);
		
		var o = this.options;
		
		if('subtree' in o){
			o.components.subtree.items = o.subtree;
		}

		if('defaultSubItem' in o){
			Dino.smart_override(o.components.subtree.defaultItem, o.defaultSubItem, {'defaultSubItem': o.defaultSubItem});
		}
		
	},
	
	
//	$opt: function(o) {
//		Dino.widgets.TreeNode.superclass.$opt.apply(this, arguments);
//		
//	},
	
	collapse: function() {
		this.states.clear('expand-collapse');
	},
	
	expand: function() {
		this.states.set('expand-collapse');
	},
	
//	isSelected: function() {
//		return this.states.is('selected');
//	},
	
	walkSubtree: function(callback) {
		if( callback.call(this, this) === false ) return false;
		return this.subtree.items.each(function(node){
			return node.walkSubtree(callback);
		});		
	},
	
	getParentNode: function() {
		var w = this.parent.parent;
		return (w instanceof Dino.widgets.TreeNode) ? w : undefined;
	}
	
}, 'tree-node');

