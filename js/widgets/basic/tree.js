



Ergo.defineClass('Ergo.widgets.NodeList', 'Ergo.widgets.Box', {
	
	defaults: {
		html: '<ul/>',
//		cls: 'tree',
		defaultItem: {
			etype: 'node'
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
	
	
}, 'widgets:node-list');	



Ergo.defineClass('Ergo.widgets.Node', 'Ergo.widgets.Box', {
	
	defaults: {
		
		html: '<li/>',
		
		transitions: {
			'* > expanded': function() { this.subtree.show(); },
			'expanded > *': function() { this.subtree.hide(); }
		},
		
		components: {
			// caret: {
				// etype: 'icon',
				// cls: 'caret',
				// weight: -10,
				// onClick: function() {
					// this.parent.states.toggle('expanded');
				// }
			// },
			content: {
				etype: 'text'
			},
			subtree: {
				etype: 'node-list',
				weight: 100
			}
		}
		
	},
	
	
	setText: function(v) {
		this.content.opt('text', v);
	}
	
	
	// getLeaf: function() {
		// return this.states.is('leaf');
	// },
// 	
	// setLeaf: function(v) {
		// this.states.toggle('leaf', v);
	// }
	
	
}, 'widgets:node');




Ergo.defineClass('Ergo.widgets.Tree', 'Ergo.widgets.NodeList', {
	
	defaults: {
		cls: 'tree'
		// node: {
			// etype: 'link'
		// }
	}


}, 'widgets:tree');


