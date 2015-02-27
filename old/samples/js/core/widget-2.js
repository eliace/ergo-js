var smpl = sample('Параметры (опции) виджета');


var w = $.ergo({
	renderTo: smpl.el,					// куда добавляем созданный виджет (элемент или селектор jQuery)
	etype: 'widget',						// псевдоним класса виджета
	html: '<div/>',							// html-тэг виджета, который будет использован для рендеринга
	width: 600,									// ширина
	height: 200,								// высота
	id: 'my-widget-id',					// атрибут DOM-элемента id
	cls: 'my-widget',						// css-класс (или список классов, разделенные пробелами)
	style: {'color': 'red'},		// стили DOM-элемента
	tooltip: 'Я виджет',				// атрибут DOM-элемента title
	tag: 'ярлык',								// произвольные данные (чаще всего текст), доступные позже через свойство tag
	innerText: 'Текст',
	innerHtml: '<span/>',
	text: 'Тестовый текст',
	hidden: false,
	value: 'Мужчина',
	format: function(v) { return {'male': 'Муж.', 'female': 'Жен.'}[v]; },
	store: function(v) { return {'Муж': 'male', 'Жен': 'female'}[v.substring(0, 3)]; }
});

// устанавливаем ширину
w.opt('width', 500);
// устанавливаем высоту
w.opt('height', 100);

// когда виджет не связан с данными, его значение сохраняется в Widget._value
smpl.alert(w._value);
// выводим отформатированное значение
smpl.alert(w.getValue());

