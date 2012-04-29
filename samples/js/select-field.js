sample('Поле выбора', {
	
	defaultItem: {
		style: {'margin-bottom': 30}
	},
	
	
	items: [{
		
		etype: 'list-select',
		content: {
			defaultItem: {
				get: {
					'value': function() { return this.opt('text'); }
				}
			},
			items: ['Печора', 'Ухта', 'Сосногорск', 'Усинск', 'Сыктывкар']			
		}
		
	}, {
		etype: 'list-select',
		content: {
			defaultItem: {
				etype: 'radio-box',
				tabIndex: 0,
				get: {
					'value': function() { return this.opt('text'); }
				}
			},
			items: ['Вариант 1', 'Вариант 2', 'Вариант 3']
		}
	}, {
		label: 'Город',
		etype: 'dropdown-select',
		
		components: {
			dropdown: {
				content: {
					defaultItem: {
						get: {
							'value': function() { return this.opt('text'); }
						}
					},
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
			etype: 'button-box',
			onClick: function() {
				this.events.bubble('select', {target: this});
			}
		},
		items: ['Лево', 'Центр', 'Право']
	}]
});




