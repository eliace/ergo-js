

Ergo.declare('Sample.widgets.TreeNode', 'Ergo.widgets.Box', {
	
	defaults: {
		
		html: '<li/>',
		
		states: {
			'expanded': function(on) {
				if(on) this.subtree.show();
				else this.subtree.hide();
			}
		},
		
		components: {
			icon: {
				etype: 'icon',
//				cls: 'e-icon-house',
				weight: -10,
				onClick: function() {
					this.parent.states.toggle('expanded');
				}
			},
			content: {
				etype: 'text'
			},
			subtree: {
				etype: 'x-tree-node-list'
			}
		},
		
		subtreeItems: [],
		
		
		set: {
			'text': function(v) { this.content.opt('text', v); }
		}
		
//		node: {}
		
	},
	
	
	$init: function(o) {
		this.$super(o);
		
		Ergo.smart_override(o.components.subtree, {items: o.subtreeItems});
		
	}
	
	
}, 'x-tree-node');





Ergo.declare('Sample.widgets.TreeNodeList', 'Ergo.widgets.Box', {
	
	defaults: {
		html: '<ul/>',
		defaultItem: {
			etype: 'x-tree-node'
		},
		defaultNode: {}
	},
	
	$init: function(o) {
		this.$super(o);
		
		Ergo.smart_override(o.defaultItem, o.defaultNode, {components: {subtree: {defaultNode: o.defaultNode}}});
	}
	
	
}, 'x-tree-node-list');	




sample('Дерево (иерархический список)', {

	etype: 'x-tree-node-list',
	cls: 'e-tree',
	defaultNode: {
		content: {
			etype: 'text-item',
			icon: 'e-icon-house'
		},
		components: {
			icon: {
				cls: 'tree-icon'
			},
			subtree: {
				style: {'display': 'none'},
				extensions: ['effects'],
				effects: {
					show: 'slideDown',
					hide: 'slideUp',
					delay: 300
				}
			}
		}
	},
	
	items: [{
		text: 'Этаж 1',
		subtreeItems: [{
			text: '101 каб',
			subtreeItems: [{
				text: 'Волков А.Н.',
				state: 'leaf'
			}, {
				text: 'Зайцев С.М.',
				state: 'leaf'
			}]
		}, {
			text: '102 каб',
			subtreeItems: [{
				text: 'Медведев Ф.М.',
				state: 'leaf'
			}]
		}]
	}, {
		text: 'Этаж 2'
	}]
	
});
