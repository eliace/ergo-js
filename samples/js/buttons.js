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
		etype: 'dropdown-button',
		text: 'Город',
		
		style: {'display': 'block'},
		
		width: 100,

		onSelect: function(e) {
			growl.info('Выбран: ' + e.target.opt('text'));
		},
		
		components: {
			dropdown: {
				width: 160,
				content: {
					items: ['Печора', 'Ухта', 'Сосногорск', 'Усинск', 'Сыктывкар']
				}
			}
		}
		
	}, {
		etype: 'split-button',
		width: 160,
		
		items: [{
			text: 'Создать'
		}],
		
		components: {
			dropdown: {
				content: {
					items: ['Создать', 'Обновить', 'Удалить']
				}
			}
		}			
		
	}, {
		etype: 'button-select',
		content: {
			items: ['Лево', 'Центр', 'Право']			
		}
	}, {
		etype: 'button-group',
		items: [{icon: 'button-arrow-left'}, {icon: 'button-arrow-right'}]
	}, {
		etype: 'button-group',
		cls: 'e-group-vert',
		layout: 'vbox',
		style: {'font-size': 8},
		items: [{icon: 'spinner-arrow-up'}, {icon: 'spinner-arrow-down'}]
	}, {
		style: {'display': 'block'},
		etype: 'button-item',
		text: 'Кнопка (HBox)',
		icon: 'e-icon-edit',
		xicon: 'e-icon-flag',
		width: 300
	}, {
		// превращаем image-box в image-button
		etype: 'image-item',
		cls: 'e-button-item',
		html: '<button/>',
		text: 'Кнопка (VBox)',
		image: 'samples/img/worker_photo.png'
	}, {
		style: {'display': 'block'},
		etype: 'button-item',
		text: 'Кнопка (Item)',// с очень длинным текстом. Очень-очень длинным',
		icon: 'e-icon-edit',
		xicon: 'e-icon-flag',
		layout: 'item',
		width: 300
	}]
});
