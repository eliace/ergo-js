
sample('Всплывание события', {
	etype: 'box',
	
	items: [{
		etype: 'box',
		content: {
			etype: 'button-item',
			text: 'Нажми меня',
			onClick: function() {
				// вызываем всплывающее событие action и передаем параметры для перегрузки объекта события
				w.events.bubble('action', {value: 'click'});				
			}
		}		
	}, {
		etype: 'list'
	}],
	
	onAction: function(e) {
		growl.info('Нажатие кнопки');
		// this.item(1).children.add({
			// text: e.value
		// });
	}
	
});

