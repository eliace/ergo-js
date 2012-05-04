sample('Поле выбора', {
	
	defaultItem: {
		style: {'margin-bottom': 30}
	},
	
	
	items: [{
		
		etype: 'list-select',
		items: ['Печора', 'Ухта', 'Сосногорск', 'Усинск', 'Сыктывкар']					
	}, {
		etype: 'list-select',
		defaultItem: {
			etype: 'radio-item',
			tabIndex: 0
		},
		items: ['Вариант 1', 'Вариант 2', 'Вариант 3']
	}, {
		label: 'Город',
		etype: 'dropdown-select',
		
		components: {
			dropdown: {
				content: {
					items: ['Печора', 'Ухта', 'Сосногорск', 'Усинск', 'Сыктывкар']
				}
			}
		}				
		
	}, {
		etype: 'box',
		cls: 'e-group',
		mixins: ['selectable'],
		onSelect: function(e) {
			this.selection.set(e.target);
			e.cancel();
		},
		defaultItem: {
			etype: 'button-item',
			onClick: function() {
				this.events.bubble('select', {target: this});
			}
		},
		items: ['Лево', 'Центр', 'Право']
	}]
});




