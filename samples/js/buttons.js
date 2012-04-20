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
		
		onClick: function() {
			this.dropdown.open();
		},
		
		onSelect: function(e) {
			this.dropdown.close();
			growl.info('Выбран: ' + e.target.opt('text'));
		},
		
		components: {
			content: {
				width: 60,				
			},
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
	}, {
		etype: 'box',
		cls: 'e-group',
		defaultItem: {
			etype: 'button-item'
		},
//		items: ['◄', '►']
		items: [{icon: 'button-arrow-left'}, {icon: 'button-arrow-right'}]
	}, {
		etype: 'box',
		cls: 'e-group-vert',
		layout: 'vbox',
		defaultItem: {
			etype: 'button-item'
		},
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
		etype: 'button-item',
		text: 'Кнопка (VBox)',
		components: {
			before: {
				etype: 'img',
				src: 'samples/img/worker_photo.png',
				style: {'margin': '0 auto'}
			}
		},
		icon: true,
		layout: 'vbox'		
	}, {
		style: {'display': 'block'},
		etype: 'button-item',
		text: 'Кнопка (Item)',// с очень длинным текстом. Очень-очень длинным',
		icon: 'e-icon-edit before',
		xicon: 'e-icon-flag after',
		layout: 'item',
		width: 300
	}]
});
