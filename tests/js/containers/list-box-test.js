

test('containers/list-box', function(){
	
	var w;
	
	
	w = $.dino({
		dtype: 'list-box',
		items: [{}]
	});
	
	equals(w.el[0].tagName, 'DIV', 'Создан элемент с тегом DIV');
	equals(w.items.first().className, 'Dino.widgets.Box', 'Содержимым листбокса по умолчанию является бокс');

	
	
});
