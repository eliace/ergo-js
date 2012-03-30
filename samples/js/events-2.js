sample('Всплывание события', {
	etype: 'box',
	
	items: [{
		etype: 'box',
		content: {
			etype: 'button-item',
			text: 'Нажми меня',
			// событие click одно из событий автоматически генерируемых виджетом
			onClick: function() {
				// вызываем всплывающее событие action и передаем параметры для перегрузки объекта события
				this.events.bubble('action', {value: 'click'});				
			}
		}		
	}, {
		etype: 'list'
	}],
	
	// за счет всплывания события вверх по иерархии виджетов, здесь можно задать
	// обработчик события action
	onAction: function(e) {
		// добавляем в список новый элемент
		this.item(1).items.add({
			text: e.value
		});
		
		// если мы не хотим, чтобы событие всплывало дальше, используем метод cancel
		e.cancel();
	}
	
});

