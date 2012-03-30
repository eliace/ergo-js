sample('Поле выбора', {
	items: [{
		label: 'Город',
		etype: 'select-field',
		
		onClick: function() {			
			this.dropdown.open();
		},
		
		onSelect: function(w) {
			this.dropdown.close();
			this.opt('text', w.target.opt('text'));
		},
		
		components: {
			dropdown: {
				etype: 'dropdown',
				adjusWidth: true,
				content: {
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





