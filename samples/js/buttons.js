


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
		width: 100,

		
		onClick: function() {
			this.dropdown.open();
		},
		
		onSelect: function(e) {
			this.dropdown.close();
//				this.opt('text', e.target.opt('text'));
		},
		
		components: {
			dropdown: {
				etype: 'box',
				width: 150,
				extensions: ['effects', 'popup'],
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
				etype: 'box',
				width: 160,
				extensions: ['effects', 'popup'],
				position: {
					global: true,
					at: 'left bottom'
				},
				effects: {
					show: 'slideDown',
					hide: 'slideUp',
					delay: 300
				},
				cls: 'e-dropbox alpha',
				style: {'display': 'none'},
				content: {
					etype: 'list',
					defaultItem: {
						onClick: function(e) {
							this.events.fire('select', {target: this, after: Ergo.bubble});
						}
					},
					items: ['Создать', 'Обновить', 'Удалить']
				}
			}
		}			
		
	}]
});
