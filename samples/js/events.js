var w = sample('Обработчик события', {
	etype: 'box',
	
	// упрощенное объявление обработчика события action
	onAction: function(e) {
		// при возникновении события action меняем текст виджета
		var t = w.opt('text');
		this.opt('text', Ergo.format(t + 'action: %s ', e.value));
	},
	
	text: 'События: '
	
}, 'Регистрация и вызов события');

// объявление обработчика события otherAction
w.events.reg('otherAction', function(e){
	var t = w.opt('text');
	this.opt('text', Ergo.format(t + 'otherAction: %s ', e.value));
});

// вызываем событие action и передаем параметры для перегрузки объекта события
w.events.fire('action', {value: 'значение'});
// вызываем событие otherAction
w.events.fire('otherAction', {value: 2});
