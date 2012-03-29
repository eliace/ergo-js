
sample('Элементы', {
	etype: 'widget',
	html: '<div>',
	
	// этот параметр применяется фабрикой для всех элементов
	defaultItem: {
		etype: 'button-item'
	},
	
	// элементы создаются по порядку
	items: [{
		cls: 'red',
		text: 'Элемент 1'
	}, {
		cls: 'blue',
		text: 'Элемент 2'
	}, {
		cls: 'green',
		text: 'Элемент 3'
	}]
	
});
