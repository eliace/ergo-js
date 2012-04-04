

Ergo.declare('Sample.widgets.TreeNode', 'Ergo.widgets.Box', {
	
	defaults: {
		
		html: '<li/>',
		
		components: {
			icon: {
				etype: 'icon',
				cls: 'e-icon-house',
				weight: -10
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
		}
	},
	
	items: [{
		text: 'Этаж 1',
		subtreeItems: [{
			text: '101 каб',
			subtreeItems: [{
				text: 'Волков А.Н.'
			}, {
				text: 'Зайцев С.М.'
			}]
		}, {
			text: '102 каб',
			subtreeItems: [{
				text: 'Медведев Ф.М.'
			}]
		}]
	}, {
		text: 'Этаж 2'
	}]
	
});
