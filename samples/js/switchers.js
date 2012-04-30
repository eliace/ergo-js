sample('Переключатели', {
	
	defaultItem: {
		style: {'margin-bottom': 20}
	},
	
	
	items: [{
		etype: 'check-box',
		tabIndex: 0,
		text: 'чекбокс',
//		onClick: function() {
//			this.content.states.toggle('checked');
//		}
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
		etype: 'switch-box',
		text: ['Нет', 'Да']
//		left: 'Да',
//		right: 'Нет'
	}, {
		etype: 'box',
		cls: 'e-group',
		mixins: ['selectable'],
		defaultItem: {
			etype: 'button-box',
			text: false,
			onClick: function() {
				this.parent.selection.set(this);
			}
		},
		items: [{icon: 'e-icon-man-sign'}, {icon: 'e-icon-woman-sign'}],
		onAfterBuild: function() {
			this.selection.set(this.item(0));
		}
	}]
});
