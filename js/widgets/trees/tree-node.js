
//= require <containers/list>


/**
 * @class
 * @extends Ergo.core.Widget
 */
Ergo.widgets.TreeNode = Ergo.declare('Ergo.widgets.TreeNode', 'Ergo.widgets.Box', /** @lends Ergo.widgets.TreeNode.prototype */{

	defaults: {
		html: '<li/>',
		cls: 'ergo-tree-node',
		components: {
			content: {
				
			},
			subtree: {
				etype: 'list',
				html: '<ul></ul>',
				style: {'display': 'none'},
				defaultItem: {
					etype: 'tree-node'
				}
			}
		},
		states: {
			'expand-collapse': ['expanded', 'collapsed']
		}
	},
	
	
//	$html: function() { return '<li></li>'; },
	
	$init: function() {
		Ergo.widgets.TreeNode.superclass.$init.apply(this, arguments);
		
		var o = this.options;
		
		if('subtree' in o){
			o.components.subtree.items = o.subtree;
		}

		if('defaultSubItem' in o){
			Ergo.smart_override(o.components.subtree.defaultItem, o.defaultSubItem, {'defaultSubItem': o.defaultSubItem});
		}
		
	},
	
	
//	$opt: function(o) {
//		Ergo.widgets.TreeNode.superclass.$opt.apply(this, arguments);
//		
//	},
	
//	collapse: function() {
//		this.states.clear('expand-collapse');
//	},
//	
//	expand: function() {
//		this.states.set('expand-collapse');
//	},
	
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
		return (w instanceof Ergo.widgets.TreeNode) ? w : undefined;
	}
	
}, 'tree-node');

