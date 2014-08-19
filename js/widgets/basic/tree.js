



Ergo.declare('Ergo.widgets.Tree', 'Ergo.widgets.Box', {
	
	defaults: {
		html: '<ul/>',
		cls: 'tree',
		defaultItem: {
			etype: 'tree-node'
		},
		
		dynamic: true,
		
		node: {			
			components: {
				subtree: {
					hidden: true,
					dataId: 'children',
					dynamic: true,
					mixins: ['effects'],
					effects: {
						show: 'slideDown',
						hide: 'slideUp',
						delay: 400
					}
				}
			}
		}
	},
	
	$pre_construct: function(o) {
		this.$super(o);
		
		Ergo.smart_override(o.defaultItem, o.node, {components: {subtree: {node: o.node}}});
	}
	
	
}, 'widgets:tree');	



Ergo.declare('Ergo.widgets.TreeNode', 'Ergo.widgets.Box', {
	
	defaults: {
		
		html: '<li/>',
		cls: 'tree-node',
		
		transitions: {
			'* > expanded': function() { this.subtree.show(); },
			'expanded > *': function() { this.subtree.hide(); }
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
				etype: 'tree'
			}
		}
		
	},
	
	
	setText: function(v) {
		this.content.opt('text', v);
	},
	
	
	getLeaf: function() {
		return this.states.is('leaf');
	},
	
	setLeaf: function(v) {
		this.states.toggle('leaf', v);
	}
	
	
}, 'widgets:tree-node');





