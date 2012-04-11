

var selectItems = [{
	layout: 'form',
	defaultItem: {
		width: 300
	},
	items: [{
		etype: 'text-field',
		label: 'Имя'
	}, {
		etype: 'text-field',
		label: 'Фамилия'
	}, {
		etype: 'text-field',
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
		
		extensions: ['selectable'],
		
		onSelect: function(e) {
			this.selection.set(e.target);
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
				etype: 'box',
				defaultItem: {
					etype: 'radio-item',
					onClick: function() { this.events.bubble('select', {target: this}); }
				},
				items: ['Вариант 1', 'Вариант 2', 'Вариант 3'],
			}
		}
	}, {
		title: 'Кнопки',
		components: {
			select: {
				etype: 'box',
				defaultItem: {
					etype: 'button-item',
					onClick: function() { this.events.bubble('select', {target: this}); }
				},
				items: ['Вариант 1', 'Вариант 2', 'Вариант 3'],
			},
		}
		
	}, {
		title: 'Кнопки',
		components: {
			select: {
				etype: 'select-field',
				extensions: ['selectable'],
				
				onClick: function() {
					this.dropdown.open();
				},
				
				onSelect: function(e) {
					this.dropdown.close();
					this.opt('text', e.target.opt('text'));
				},
				
				components: {
					dropdown: {
						etype: 'dropdown',
						adjusWidth: true,
						content: {
							items: ['Вариант 1', 'Вариант 2', 'Вариант 3']
						}
					}
				}				
			}
		}
		
	}]
	
	
	
	
});
