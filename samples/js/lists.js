

$.ergo({
	renderTo: '#sample',
	// список
	etype: 'sample-panel',
	title: 'Списки',
	stackItems: [{
		items: [{
			etype: 'box',
			cls: 'e-list alpha',
			content: {
				etype: 'list',
				items: ['Печора', 'Ухта', 'Сосногорск', 'Усинск', 'Сыктывкар']
			}
		}, {
			etype: 'box',
			cls: 'e-list alpha',
			content: {
				etype: 'list',
				items: ['Печора', 'Ухта', 'Сосногорск', 'Усинск', 'Сыктывкар']
			}
		}, {
			etype: 'box',
			cls: 'e-list decimal',
			content: {
				etype: 'list',
				items: ['Печора', 'Ухта', 'Сосногорск', 'Усинск', 'Сыктывкар']
			}
		}]
	}]
});
