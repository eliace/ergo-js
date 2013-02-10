var w = sample('Создаем виджет и вложенные виджеты', {
	etype: 'widget',			
	html: '<div/>',				
	cls: 'my-widget',			
});


w.children.add({
	etype: 'widget',
	html: '<div/>',	
	// текстовое содержимое виджета
	text: 'Вложенный виджет 1'
});


w.children.add({
	etype: 'widget',
	html: '<div/>',
	// текстовое содержимое виджета
	text: 'Вложенный виджет 2',
});

