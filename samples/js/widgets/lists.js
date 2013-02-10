
var towns = ['Печора', 'Ухта', 'Сосногорск', 'Усинск', 'Сыктывкар'];


sample('Списки', {
	items: [{
		etype: 'box',
		cls: 'e-list alpha',
		content: {
			etype: 'list',
			items: towns
		}
	}, {
		etype: 'box',
		cls: 'e-list alpha',
		content: {
			etype: 'list',
			items: towns
		}
	}, {
		etype: 'box',
		cls: 'e-list decimal',
		content: {
			etype: 'list',
			items: towns
		}
	}, {
		etype: 'group-panel',
		title: 'Список с элементами типа "radio-item"',
		content: {
			etype: 'list-select',
			content: {
				defaultItem: {
					etype: 'radio-item'
				},
				items: towns				
			}
		}
	}, {
		etype: 'group-panel',
		title: 'Список с элементами типа "check-item"',
		content: {
			etype: 'list-box',
			defaultItem: {
				etype: 'check-item'
			},
			items: towns			
		}
	}]
});
