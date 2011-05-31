

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
	ok(w.children.get('content'), 'Компонент content доступен через коллекцию компонентов')
	
	
	
	
	var dataSource = new Dino.data.ObjectDataSource({
		name: 'Alice',
		age: 21
	});
	
	w = new Dino.core.Widget({
		html: '<div/>',
		data: dataSource,
		components: {
			c1: {
				dtype: 'widget',
				html: '<span/>',
				dataId: 'name',
				binding: function(val) { this.el.text(val); }
			},
			c2: {
				dtype: 'widget',
				html: '<p/>',
				dataId: 'age',
				binding: function(val) { this.el.text(val); }
			}
		}
	});
	
	equals(w.c1.el.text(), 'Alice', 'Связывание с полем "name"')
	equals(w.c2.el.text(), '21', 'Связывание с полем "age"')
	
});