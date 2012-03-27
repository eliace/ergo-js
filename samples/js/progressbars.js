

$.ergo({
	renderTo: '#sample',
	etype: 'sample-panel',
	title: 'Прогрессбары',
	stackItems: [{
		items: [{
			etype: 'text-item',
			tabIndex: 0,
			components: {
				'icon!': {
					etype: 'check-box'
				}
			},
			text: 'чекбокс',
			icon: true,
			
			onClick: function() {
				this.icon.states.toggle('checked');
			}
		}, {
			etype: 'text-item',
			tabIndex: 0,
			components: {
				'icon!': {
					etype: 'radio-box'
				}
			},
			text: 'радиобокс',
			icon: true,
			
			onClick: function() {
				this.icon.states.set('checked');
			}					
			
		}, {
			etype: 'box',
			cls: 'e-choice',
			components: {
				left: {
					etype: 'label',
					text: 'Да'
				},
				content: {
					content: {
						text: '|||'
					}
				},
				right: {
					etype: 'label',
					text: 'Нет'
				}
			},
			onClick: function() {
				this.states.toggle('checked');
			}
		}]
	}]
});
