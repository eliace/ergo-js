


test('widgets/box', function(){
	
	var w;
	
	
	w = $.dino({
		dtype: 'box',
		content: {
		}
	});
	
	equals(w.el[0].tagName, 'DIV', 'Создан элемент с тегом DIV');
	equals(w.content.className, 'Dino.widgets.Box', 'Содержимым бокса по умолчанию является бокс');

	
	
});
