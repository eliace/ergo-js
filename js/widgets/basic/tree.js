



Ergo.defineClass('Ergo.widgets.NestedList', 'Ergo.widgets.Box', {
	
	defaults: {
		html: '<ul/>',
//		cls: 'tree',
		defaultItem: {
			etype: 'nested-item'
		},
		
		dynamic: true,
		
		nestedItem: {
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
		
		Ergo.smart_override(o.defaultItem, o.nestedItem, {components: {subtree: {nestedItem: o.nestedItem}}});
	},
	
	
	find: function(key) {
		
		var path = key.split(':');
		var w = this;
		var found = null;
		for(var i = 0; i < path.length; i++) {
			w = w.item({_name: path[i]});
			found = w;
			w = w.subtree;
		}
		
		return found;
	}
	
	
}, 'widgets:nested-list');	



Ergo.defineClass('Ergo.widgets.NestedItem', 'Ergo.widgets.Box', {
	
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
				etype: 'nested-list',
				weight: 100
			}
		}
		
	},
	
	
	path: function() {
		
    var path = [];
    var w = this;//.parent;
    while(w._name) {
      path.push(w._name);
      w = w.parent.parent;
    }
    
    return path.reverse().join(':');
	},
	
	
	
	
	// setText: function(v) {
		// this.content.opt('text', v);
	// }
	
	
	// getLeaf: function() {
		// return this.states.is('leaf');
	// },
// 	
	// setLeaf: function(v) {
		// this.states.toggle('leaf', v);
	// }
	
	
}, 'widgets:nested-item');




Ergo.defineClass('Ergo.widgets.Tree', 'Ergo.widgets.NestedList', {
	
	defaults: {
		cls: 'tree'
		// node: {
			// etype: 'link'
		// }
	}


}, 'widgets:tree');


