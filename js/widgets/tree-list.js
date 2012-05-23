
//= require <widgets/tree>

Ergo.declare('Ergo.widgets.TreeListNode', 'Ergo.widgets.TreeNode', {
	
	defaults: {
		components: {
			indent: {
				weight: -30,
				defaultItem: {
					cls: 'indent'
				}
			},
			subtree: {
				etype: 'tree-list'
			}
		}
	},
	
	
	$init: function(o) {
		this.$super(o);
		
		var indent = o.indent || 0;
		var indent_items = [];
		for(var i = 0; i < indent; i++)
			indent_items.push({});
			
		Ergo.smart_override(o.components.indent, {items: indent_items});
		Ergo.smart_override(o.components.subtree, {defaultItem: {indent: indent+1}});
	}
	
	
}, 'tree-list-node');





Ergo.declare('Ergo.widgets.TreeList', 'Ergo.widgets.Tree', {
	
	defaults: {
		defaultItem: {
			etype: 'tree-list-node'
		}
	}
	
}, 'tree-list');
