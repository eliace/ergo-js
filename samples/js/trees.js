





sample('Дерево (иерархический список)', {

	etype: 'tree-list',
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
