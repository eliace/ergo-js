
//= require <widgets/natives/list>

/*
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
*/





Ergo.declare('Ergo.widgets.TreeNode', 'Ergo.widgets.Box', {
	
	defaults: {
		
		html: '<li/>',
		
		// states: {
			// 'expanded': function(on) {
				// if(on) this.subtree.show();
				// else this.subtree.hide();
			// }
		// },
		transitions: {
			'> expanded': function() { this.subtree.show(); },
			'expanded >': function() { this.subtree.hide(); }
		},
		
		components: {
			icon: {
				etype: 'icon',
				weight: -10,
				onClick: function() {
					this.parent.states.toggle('expanded');
				}
			},
			content: {
				etype: 'text'
			},
			subtree: {
				etype: 'tree-list'
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





Ergo.declare('Ergo.widgets.TreeList', 'Ergo.widgets.Box', {
	
	defaults: {
		html: '<ul/>',
		defaultItem: {
			etype: 'tree-node'
		},
		defaultNode: {}
	},
	
	$init: function(o) {
		this.$super(o);
		
		Ergo.smart_override(o.defaultItem, o.defaultNode, {components: {subtree: {defaultNode: o.defaultNode}}});
	}
	
	
}, 'tree-list');	






