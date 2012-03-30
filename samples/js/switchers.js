sample('Переключатели', {
	
	defaultItem: {
		style: {'margin-bottom': 20}
	},
	
	
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
	}/*, {
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
	}*/, {
		etype: 'switcher',
		left: 'Да',
		right: 'Нет'
	}, {
		etype: 'box',
		cls: 'e-group',
		extensions: ['selectable'],
		defaultItem: {
			etype: 'button-item',
			text: false,
			onClick: function() {
				this.parent.selection.set(this);
			}
		},
		items: [{icon: 'e-icon-men'}, {icon: 'e-icon-women'}],
		onAfterBuild: function() {
			this.selection.set(this.item(0));
		}
	}]
});
