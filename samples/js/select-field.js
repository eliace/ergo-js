sample('Поле выбора', {
	
	defaultItem: {
		style: {'margin-bottom': 30}
	},
	
	
	items: [{
    etype: 'box',
    cls: 'e-list roman e-select-list',
		extensions: ['selectable'],
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
		etype: 'dropdown-select-field',
		
		onSelect: function(e) {
			this.opt('text', e.target.opt('text'));
		},
		
		components: {
			dropdown: {
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
		extensions: ['selectable'],
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
		extensions: ['selectable'],
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





