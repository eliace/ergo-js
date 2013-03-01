
//= require <widgets/natives/list>





Ergo.declare('Ergo.widgets.TreeNode', 'Ergo.widgets.Box', {
	
	defaults: {
		
		html: '<li/>',
		cls: 'e-tree-node',
		
		transitions: {
			'* > expanded': function() { this.subtree.show(); },
			'expanded > *': function() { this.subtree.hide(); }
		},
		
		
		
//		layout: 'hbox',
		
		components: {
			icon: {
				etype: 'pic-icon',
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
	
	
	
	getLeaf: function() {
		return this.states.is('leaf');
	},
	
	setLeaf: function(v) {
		this.states.toggle('leaf', v);
	},
	
	
	$pre_construct: function(o) {
		this.$super(o);
		
		Ergo.smart_override(o.components.subtree, {items: o.subtreeItems});
		
	}
	
	
}, 'tree-node');





Ergo.declare('Ergo.widgets.Tree', 'Ergo.widgets.Box', {
	
	defaults: {
		html: '<ul/>',
		cls: 'e-tree',
		defaultItem: {
			etype: 'tree-node'
		},
		node: {}
	},
	
	$pre_construct: function(o) {
		this.$super(o);
		
		Ergo.smart_override(o.defaultItem, o.node, {components: {subtree: {node: o.node}}});
	}
	
	
}, 'tree');	






