





sample('Дерево (иерархический список)', {

	etype: 'tree',
	cls: 'e-tree',
	defaultNode: {
		components: {
			icon: {
//				cls: 'tree-icon',
				style: {'display': 'inline-block'}
			},
			content: {
				etype: 'text-item',
				icon: 'e-icon-house',
				style: {'display': 'inline-block'}
			},
			subtree: {
				style: {'display': 'none'},
				mixins: ['effects'],
				effects: {
					show: 'slideDown',
					hide: 'slideUp',
					delay: 400
				}
			}
		}
	},
	
	items: [{
		text: 'Этаж 1',
		subtreeItems: [{
			text: '101 каб',
			subtreeItems: [{
				content: {
					icon: 'e-icon-user'					
				},
				text: 'Волков А.Н.',
				state: 'leaf'
			}, {
				content: {
					icon: 'e-icon-user'					
				},
				text: 'Зайцев С.М.',
				state: 'leaf'
			}]
		}, {
			text: '102 каб',
			subtreeItems: [{
				content: {
					icon: 'e-icon-user'					
				},
				text: 'Медведев Ф.М.',
				state: 'leaf'
			}]
		}]
	}, {
		text: 'Этаж 2'
	}]
	
});
