sample('Опции', {
	// псевдоним класса виджета
	etype: 'widget',
	// html-тэг виджета, который будет использован для рендеринга
	html: '<div/>',
	// ширина
	width: 600,
	// высота
	height: 100,
	// атрибут DOM-элемента id
	id: 'my-widget-id',
	// css-класс (или список классов, разделенные пробелами)
	cls: 'my-widget',
	// css-стиль
	style: {'font-size': 20},
	// атрибут DOM-элемента title
	tooltip: 'Я виджет',
	// произвольные данные (чаще всего текст), доступные позже через свойство tag
	tag: 'ярлык',
	// текстовое содержимое виджета
	text: 'Lorem ipsum',
	
	// пользовательские сеттеры опций
	set: {
		// создадим произвольную опцию
		'custom': function(v) {
			// свойство виджета el содержит jQuery-объект
			this.el.addClass(v);
		},
		// заменим стандартную опцию text
		'text': function(v) {
			this.content.opt('text', v + ' (количество дочерних виджетов: ' + this.opt('childCount') + ' шт.)');
		}
	},
	
	// пользовательские геттеры
	get: {
		// возвращаем количество дочерних элементов
		'childCount': function() {
			return this.children.size();
		}
	},
	
	custom: 'custom-class',
	
	content: {
		etype: 'text'
	}
	
	
});
