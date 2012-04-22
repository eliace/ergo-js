

var itemList = [{
	tab: 'Закладка 1',
	layout: 'form',
	defaultItem: {
		width: 300
	},
	items: [{
		etype: 'text-field',
		label: 'Имя'
	}, {
		etype: 'text-field',
		label: 'Фамилия'
	}, {
		etype: 'text-field',
		label: 'Отчество'
	}]
}, {
	tab: 'Закладка 2',
	layout: 'vbox',
	defaultItem: {
		etype: 'button-item'
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
