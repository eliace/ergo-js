

test('core/widget', function(){
	
	var w;
	
	w = new Dino.core.Widget({
		html: '<div/>',
		innerText: 'Text'
	});
	
	equals(w.el.text(), 'Text', 'Установка параметра innerText');
	
	
	w = new Dino.core.Widget({
		html: '<div/>',
		components: {
			c1: {
				dtype: 'widget',
				html: '<span/>'
			},
			c2: {
				dtype: 'widget',
				html: '<p/>'
			}
		}
	});
	
	ok(w.c1 && w.c2, 'Компоненты доступны');
	ok(w.el.children().length == 2, 'Элементы комопонентов добавлены в комопоновку родителя');


	w = new Dino.core.Widget({
		html: '<div/>',
		content: {
			dtype: 'widget',
			html: '<span/>'			
		}
	});
	
	ok(w.el.children().length == 1 && w.content, 'Компонент content доступен и добавлен в компоновку');
	
		
	
});