
//= require <widgets/natives/list>


Ergo.declare('Ergo.widgets.TreeNode', 'Ergo.core.Widget', {
	
	defaults: {
		components: {
			content: {
				etype: 'label'
			},
			subtree: {
				etype: 'tree-list'
			}
		},
		// defaultSubtree: {
		// },
		// defaultNode: {
		// },
		set: {
			'text': function(v) { this.content.opt('text', v); }
		}
	},
	
	$init: function(o) {
		this.$super(o);
		
		Ergo.smart_override(o.components.subtree, o.defaultSubtree, {defaultSubtree: o.defaultSubtree, defaultNode: o.defaultNode});
		
	}
	
	
}, 'tree-node');	





Ergo.declare('Ergo.widgets.TreeList', 'Ergo.widgets.List', {
	
	defaults: {
		
		defaultItem: {
			etype: 'tree-node'
		}
		// defaultNode: {
		// },
		// defaultSubtree: {
		// }
		
	},
	
	
	$init: function(o) {
		this.$super(o);
		
		Ergo.smart_override(o.defaultItem, o.defaultNode, {defaultSubtree: o.defaultSubtree, defaultNode: o.defaultNode});
		
	}
		
}, 'tree-list');
