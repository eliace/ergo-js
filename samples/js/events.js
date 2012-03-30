
var w = sample('Обработчик события', {
	etype: 'box',
	
	// "сахарное" объявление обработчика события action
	onAction: function(e) {
		// при возникновении события action меняем текст виджета
		this.opt('text', Ergo.format('Событие action', e.value));
	}
	
});

// вызываем событие action и передаем параметры для перегрузки объекта события
w.events.fire('action', {value: 'значение'});
