
//= require <widgets/natives/list>





Ergo.declare('Ergo.widgets.TreeNode', 'Ergo.widgets.Box', {
	
	defaults: {
		
		html: '<li/>',
		
		transitions: {
			'> expanded': function() { this.subtree.show(); },
			'expanded >': function() { this.subtree.hide(); }
		},
		
//		layout: 'hbox',
		
		components: {
			icon: {
				etype: 'icon',
				cls: 'tree-node-icon',
				weight: -10,
				onClick: function() {
					this.parent.states.toggle('expanded');
				}
			},
			content: {
				etype: 'text',
				cls: 'tree-node-content'
			},
			subtree: {
				etype: 'tree'
			}
		},
		
		subtreeItems: [],
		
		set: {
			'text': function(v) { this.content.opt('text', v); }
		}
		
	},
	
	
	$init: function(o) {
		this.$super(o);
		
		Ergo.smart_override(o.components.subtree, {items: o.subtreeItems});
		
	}
	
	
}, 'tree-node');





Ergo.declare('Ergo.widgets.Tree', 'Ergo.widgets.Box', {
	
	defaults: {
		html: '<ul/>',
		defaultItem: {
			etype: 'tree-node'
		},
		node: {}
	},
	
	$init: function(o) {
		this.$super(o);
		
		Ergo.smart_override(o.defaultItem, o.node, {components: {subtree: {node: o.node}}});
	}
	
	
}, 'tree');	






