
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
		etype: 'list-box',
		defaultItem: {
			etype: 'radio-box'
		},
		items: towns
	}, {
		etype: 'group-panel',
		title: 'Список с элементами типа "check-box"',
		content: {
			etype: 'list-box',
			defaultItem: {
				etype: 'check-box'
			},
			items: towns			
		}
	}]
});
