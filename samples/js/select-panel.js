

var selectItems = [{
	layout: 'form',
	defaultItem: {
		width: 300
	},
	items: [{
		etype: 'input-box',
		label: 'Имя'
	}, {
		etype: 'input-box',
		label: 'Фамилия'
	}, {
		etype: 'input-box',
		label: 'Отчество'
	}]
}, {
	layout: 'vbox',
	defaultItem: {
		etype: 'button-item'
	},
	items: ['Кнопка 1', 'Кнопка 2', 'Кнопка 3', 'Кнопка 4']
}, {
	etype: 'image',
	src: 'samples/img/worker_photo.png'
}];



sample('Панели выбора', {

	etype: 'box',


	defaultItem: {
		etype: 'panel',
		
		mixins: ['selectable'],
		
		onSelect: function(e) {
//			growl.info('Изменился выбранный элемент');
//			this.selection.set(e.target);
			this.content.setActive(e.target._index);
		},
		
		components: {
			select: {
				style: {'margin': '10px 20px', 'padding': 0},
				weight: -5,
			}
		},
		
		content: {
			etype: 'box',
			layout: 'stack',
			height: 220,
			items: selectItems			
		}
		
	},



	items: [{
		title: 'Радио-кнопки',
		components: {
			select: {
				etype: 'list-select',
				content: {
					defaultItem: {
						etype: 'radio-item'
					},
					items: ['Вариант 1', 'Вариант 2', 'Вариант 3']
				}
			}
		}
	}, {
		title: 'Кнопки',
		components: {
			select: {
				etype: 'button-select',
				content: {
					items: ['Вариант 1', 'Вариант 2', 'Вариант 3']
				}
			}
		}
		
	}, {
		title: 'Поле с выпадающим списком',
		components: {
			select: {
				etype: 'dropdown-select',

				// onSelect: function(e) {
					// this.opt('text', e.target.opt('text'));
				// },
				
				components: {
					dropdown: {
						content: {
							items: ['Вариант 1', 'Вариант 2', 'Вариант 3']
						}
					}
				}				
			}
		}
		
	}]
	
	
	
	
});
