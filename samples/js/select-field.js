

sample('Поле выбора', {
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
		label: 'Число',
		etype: 'select-field',
		buttons: [{
			iconCls: 'arrow-right'
		}, {
			iconCls: 'arrow-left'
		}]
	}]
});





