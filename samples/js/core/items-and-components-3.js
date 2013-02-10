
var w = sample('Императивный стиль', {
	
});

// создаем виджет-бокс
var content = new Ergo.widgets.Box();
// добавляем его как компонент content в панель примера
w.components.set('content', content);
// создаем 4 кнопки
for(var i = 0; i < 4; i++) {
	var button = new Ergo.widgets.ButtonItem({
		text: 'Кнопка '+i
	});
	content.items.add(button);
}

