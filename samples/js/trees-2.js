

sample('Аккордеон', {
	
	etype: 'accordion-list',	
	cls:'e-accordeon',
	items: [{
		text: 'Меню 1',
		components: {sublist: {items: ['субменю 1', 'субменю 2']}}
	}, {
		text: 'Меню 2',
		components: {sublist: {items: ['субменю 1', 'субменю 2', 'субменю 3']}}
	}, {
		text: 'Меню 3',
		components: {sublist: {items: ['субменю 1', 'субменю 2']}}
	}]
	
});
