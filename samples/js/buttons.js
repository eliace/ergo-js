sample('Кнопки', {		
		
	defaultItem: {
		style: {'margin': 5}
	},
	
	items: [{
		etype: 'button-item',
		text: 'Кнопка'
	}, {
		etype: 'button-item',
		text: 'Кнопка',
		icon: 'e-icon-tag'
	}, {
		etype: 'styled-button',
		text: 'Кнопка'
	}, {
		etype: 'button-item',
		text: 'Город',
		xicon: 'button-arrow-down',
		width: 100,

		
		onClick: function() {
			this.dropdown.open();
		},
		
		onSelect: function(e) {
			this.dropdown.close();
			growl.info('Выбран: ' + e.target.opt('text'));
		},
		
		components: {
			dropdown: {
				etype: 'dropdown',
				width: 150,
				cls: 'roman',
				content: {
					items: ['Печора', 'Ухта', 'Сосногорск', 'Усинск', 'Сыктывкар']
				}
			}
		}
		
	}, {
		etype: 'box',
		cls: 'e-split-button',
		width: 160,
		
		defaultItem: {
			etype: 'button-item'
		},
		items: [{
			text: 'Создать',
			autoWidth: true
		}, {
			icon: 'button-arrow-down',
			onClick: function() {
				this.parent.dropdown.open();
			}
		}],
		
		onSelect: function(e) {
			this.dropdown.close();
			this.item(0).opt('text', e.target.opt('text'));
		},
		
		components: {
			dropdown: {
				etype: 'dropdown',
//				width: 160,
				cls: 'alpha',
				adjustWidth: true,
				content: {
					items: ['Создать', 'Обновить', 'Удалить']
				}
			}
		}			
		
	}, {
		etype: 'box',
		cls: 'e-group',
		defaultItem: {
			etype: 'button-item'
		},
		items: ['Лево', 'Центр', 'Право']
	}]
});
