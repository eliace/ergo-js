

sample('Элементы выбора', {
	etype: 'box',
	
	extensions: ['selectable'],
	
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
});

