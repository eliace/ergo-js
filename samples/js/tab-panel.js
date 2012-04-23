

var itemList = [{
	tab: 'Закладка 1',
	layout: 'form',
	defaultItem: {
		width: 300
	},
	items: [{
		etype: 'input-box',
		label: 'Имя'
	}, {
		etype: 'input-box',
		label: 'Фамилия'
	}, {
		etype: 'input-box',
		label: 'Отчество'
	}]
}, {
	tab: 'Закладка 2',
	layout: 'vbox',
	defaultItem: {
		etype: 'button-box'
	},
	items: ['Кнопка 1', 'Кнопка 2', 'Кнопка 3', 'Кнопка 4']
}, {
	tab: 'Закладка 3',
	etype: 'image',
	src: 'samples/img/worker_photo.png'
}];




sample('Панель с закладками', {
	
	etype: 'tab-panel',
	
	tabItems: itemList,
	
	onAfterBuild: function() {
		this.setActiveTab(0);
	},
	
	content: {
		height: 220		
	}
	
});
