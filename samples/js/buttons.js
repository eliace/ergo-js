sample('Кнопки', {		
		
	defaultItem: {
		style: {'margin': 5}
	},
	
	items: [{
		etype: 'button-box',
		text: 'Кнопка'
	}, {
		etype: 'button-box',
		text: 'Кнопка',
		icon: 'e-icon-tag'
	}, {
		etype: 'styled-button',
		text: 'Кнопка'
	}, {
		etype: 'dropdown-button',
		text: 'Город',
		
		layout: 'item',
		
		width: 120,

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
		etype: 'box',
		cls: 'e-group',
		defaultItem: {
			etype: 'button-box'
		},
		items: ['Лево', 'Центр', 'Право']
	}, {
		etype: 'box',
		cls: 'e-group',
		defaultItem: {
			etype: 'button-box'
		},
//		items: ['◄', '►']
		items: [{icon: 'button-arrow-left'}, {icon: 'button-arrow-right'}]
	}, {
		etype: 'box',
		cls: 'e-group-vert',
		layout: 'vbox',
		defaultItem: {
			etype: 'button-box'
		},
		style: {'font-size': 8},
		items: [{icon: 'spinner-arrow-up'}, {icon: 'spinner-arrow-down'}]
	}, {
		style: {'display': 'block'},
		etype: 'button-box',
		text: 'Кнопка (HBox)',
		icon: 'e-icon-edit',
		xicon: 'e-icon-flag',
		width: 300
	}, {
		// превращаем image-box в image-button
		etype: 'image-box',
		cls: 'e-button-item',
		html: '<button/>',
		text: 'Кнопка (VBox)',
		image: 'samples/img/worker_photo.png'
	}, {
		style: {'display': 'block'},
		etype: 'button-box',
		text: 'Кнопка (Item)',// с очень длинным текстом. Очень-очень длинным',
		icon: 'e-icon-edit',
		xicon: 'e-icon-flag',
		layout: 'item',
		width: 300
	}]
});
