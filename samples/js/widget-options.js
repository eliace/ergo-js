var w = sample('Параметры (опции) виджета', {
	etype: 'widget',
	html: '<div/>',
	cls: 'my-widget',
	// пользовательские сеттеры опций
	set: {
		// создадим произвольную опцию
		'color': function(v) {
			// свойство виджета el содержит jQuery-объект
			this.el.css('background-color', v);
		}
	}
	
});

// устанавливаем ширину
w.opt('width', 500);
// устанавливаем высоту
w.opt('height', 100);

// задаем группу параметров
w.opt({
	opacity: 1,
	color: '#e3e3e3'
});

