sample('Поле выбора', {
	
	defaultItem: {
		style: {'margin-bottom': 30}
	},
	
	
	items: [{
    etype: 'box',
    cls: 'e-list roman e-select-list',
		mixins: ['selectable'],
		onSelect: function(e) {
			this.selection.set(e.target);
		},
    content: {
			etype: 'list',
			defaultItem: {
				onClick: function() {
					this.events.bubble('select', {target: this});				
				}
			},
			items: ['Печора', 'Ухта', 'Сосногорск', 'Усинск', 'Сыктывкар']    	
    }
	}, {
		label: 'Город',
		etype: 'select-field',
		mixins: ['selectable'],
		
		onClick: function() {			
			this.dropdown.open();
		},
		
		onSelect: function(e) {
			this.selection.set(e.target);
			this.dropdown.close();
			this.opt('text', e.target.opt('text'));
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
		
	}/*, {
		label: 'Число',
		etype: 'select-field',
		buttons: [{
			iconCls: 'arrow-right'
		}, {
			iconCls: 'arrow-left'
		}]
	}*/, {
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
	}, {
		etype: 'box',
		mixins: ['selectable'],
		onSelect: function(e) {
			this.selection.set(e.target);
		},
		defaultItem: {
			etype: 'radio-item',
			tabIndex: 0,
			onClick: function(e) {
				this.events.bubble('select', {target: this});
				e.cancel();
			}
		},
		items: ['Вариант 1', 'Вариант 2', 'Вариант 3']		
	}]
});




