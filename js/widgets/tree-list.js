
//= require <widgets/tree>

Ergo.declare('Ergo.widgets.TreeListNode', 'Ergo.widgets.Box', {
	
	defaults: {
		
		html: '<li/>',
		
		transitions: {
			'> expanded': function() { this.subtree.show(); },
			'expanded >': function() { this.subtree.hide(); }
		},
		
		components: {
			content: {
				layout: 'hbox',
				cls: 'tree-node-content',
				components: {
					indent: {
						weight: 10,
						defaultItem: {
							cls: 'indent',
							text: '@indent'
						}
					},
					icon: {
						etype: 'icon',
						cls: 'tree-node-icon',
						weight: 20,
						onClick: function() {
							this.parent.parent.states.toggle('expanded');
						}
					},
					text: {
						weight: 30,
						etype: 'text'
					}
				}
			},
			subtree: {
				etype: 'tree-list'
			}
		},
		
		subitems: [],
		
		set: {
			'text': function(v) { this.content.text.opt('text', v); }
		}
		
	},
	
	
	$init: function(o) {
		this.$super(o);
		
		var indent = o.indent || 0;
		var indent_items = [];
		for(var i = 0; i < indent; i++)
			indent_items.push({});
			
		Ergo.smart_override(o.components.content.components.indent, {items: indent_items});
		Ergo.smart_override(o.components.subtree, {defaultItem: {indent: indent+1}});
		Ergo.smart_override(o.components.subtree, {items: o.subitems});
	}
	
	
}, 'tree-list-node');





Ergo.declare('Ergo.widgets.TreeList', 'Ergo.widgets.Tree', {
	
	defaults: {
		cls: 'e-tree-list',
		defaultItem: {
			etype: 'tree-list-node'
		}
	}
	
}, 'tree-list');
