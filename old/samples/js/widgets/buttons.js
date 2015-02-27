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
		etype: 'dropdown-button',
		text: 'Город',
		
		style: {'display': 'block'},
		
		width: 100,

		onAction: function(e) {
			growl.info('Выбран: ' + e.target.opt('text'));
		},
		
		dropdownItems: ['Печора', 'Ухта', 'Сосногорск', 'Усинск', 'Сыктывкар']
		
	}, {
		etype: 'split-button',
		width: 160,
		
		dropdownItems: ['Создать', 'Обновить', 'Удалить'],
		
//		selected: ''
		
		// items: [{
			// text: 'Создать'
		// }],
// 		
		// components: {
			// dropdown: {
				// content: {
					// items: ['Создать', 'Обновить', 'Удалить']
				// }
			// }
		// }			
		
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
		etype: 'image-button',
		text: 'Кнопка',
		image: 'samples/img/worker_photo.png'
	}, {
		style: {'display': 'block'},
		etype: 'button-item',
		text: 'Кнопка (HBox)',
		icon: 'e-icon-edit',
		xicon: 'e-icon-flag',
		width: 300
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
