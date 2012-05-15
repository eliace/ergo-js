var w = sample('Создаем виджет и вложенные виджеты', {
	// псевдоним класса виджета
	etype: 'widget',
	// html-тэг виджета, который будет использован для рендеринга
	html: '<div/>',
	// ширина
	width: 600,
	// атрибут DOM-элемента id
	id: 'my-widget-id',
	// css-класс (или список классов, разделенные пробелами)
	cls: 'my-widget',
	// css-стиль
	style: {'font-size': 20, 'border': '1px solid blue'},
	// атрибут DOM-элемента title
	tooltip: 'Я виджет',
	// произвольные данные (чаще всего текст), доступные позже через свойство tag
	tag: 'ярлык'
		
});


w.children.add({
	etype: 'widget',
	html: '<div/>',
	style: {'border': '1px solid red', 'margin': 10, 'padding': 10},
	// текстовое содержимое виджета
	text: 'Вложенный виджет 1'
});


w.children.add({
	etype: 'widget',
	html: '<div/>',
	style: {'border': '1px solid red', 'margin': 10, 'padding': 10},
	// текстовое содержимое виджета
	text: 'Вложенный виджет 2',
});

