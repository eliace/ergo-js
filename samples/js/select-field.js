


$.ergo({
	renderTo: '#sample',
	// Поле выбора
	etype: 'sample-panel',
	title: 'Поле выбора',
	stackItems: [{
		items: [{
			label: 'Город',
			etype: 'select-field',
			
			onClick: function() {
				
				this.dropdown.open();
				
			},
			
			onSelect: function(w) {
				this.dropdown.close();
			},
			
			components: {
				dropdown: {
					etype: 'box',
					mixins: ['effects', 'popup'],
					position: {
						global: true,
						at: 'left bottom'
					},
					effects: {
						show: 'slideDown',
						hide: 'slideUp',
						delay: 300
					},
					cls: 'e-dropbox roman',
					style: {'display': 'none'},
					content: {
						etype: 'list',
						defaultItem: {
							onClick: function(e) {
								this.events.fire('select', {target: this, after: Ergo.bubble});
							}
						},
						items: ['Печора', 'Ухта', 'Сосногорск', 'Усинск', 'Сыктывкар']
					}
				}
			}				
			
		}, {
			label: 'Число',
			etype: 'select-field',
			buttons: [{
				iconCls: 'arrow-right'
			}, {
				iconCls: 'arrow-left'
			}]
		}]
	}]
});




$.ergo({
	renderTo: '#sample',
	// радио группа
	etype: 'sample-panel',
	title: 'Элементы выбора',
	stackItems: [{
		etype: 'box',
		
		mixins: ['selectable'],
		
		onAction: function(e) {
			this.selection.set(e.target);
		},
		
		defaultItem: {
			etype: 'text-item',
			cls: 'e-radio-item',
			tabIndex: 0,
			components: {
				'icon!': {
					etype: 'radio-box'
				}
			},
			icon: true,
			
			onClick: function() {
				this.events.fire('action', {target: this, after: Ergo.bubble});
			}
		},
		
		items: ['Вариант 1', 'Вариант 2', 'Вариант 3']
	}]
});


