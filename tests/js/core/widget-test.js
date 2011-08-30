

test('core/widget', function(){
	
	var w;
	
	w = new Ergo.core.Widget({
		html: '<div/>',
		innerText: 'Text'
	});
	
	equals(w.el.text(), 'Text', 'Установка параметра innerText');
	
	
	w = new Ergo.core.Widget({
		html: '<div/>',
		defaultComponent: {
			cls: 'test'
		},
		components: {
			c1: {
				etype: 'widget',
				html: '<span/>',
				tag: 'component_1'
			},
			c2: {
				etype: 'widget',
				html: '<p/>',
				tag: 'component_2'
			}
		}
	});
	
	w.c2.mark = 5;
	
	ok(w.c1 && w.c2, 'Компоненты доступны');
	ok(w.el.children().length == 2, 'Элементы комопонентов добавлены в комопоновку родителя');
	equals(w.c1.el.attr('class'), 'test', 'Класс определяется через defaultComponent')
	ok(w.component('c1') == w.c1, 'Поиск по ключу в списке компонентов')
	ok(w.component({mark: 5}) == w.c2, 'Поиск по произвольному атрибуту в списке компонентов')


	w = new Ergo.core.Widget({
		html: '<div/>',
		content: {
			etype: 'widget',
			html: '<span/>'			
		}
	});
	
	ok(w.el.children().length == 1 && w.content, 'Компонент content доступен и добавлен в компоновку');
	ok(w.components.get('content'), 'Компонент content доступен через коллекцию компонентов')
	
	
	
	
	var dataSource = new Ergo.core.DataSource({
		name: 'Alice',
		age: 21
	});
	
	w = new Ergo.core.Widget({
		html: '<div/>',
		data: dataSource,
		components: {
			c1: {
				etype: 'widget',
				html: '<span/>',
				dataId: 'name',
				binding: function(val) { this.el.text(val); }
			},
			c2: {
				etype: 'widget',
				html: '<p/>',
				dataId: 'age',
				binding: function(val) { this.el.text(val); }
			}
		}
	});
	
	equals(w.c1.el.text(), 'Alice', 'Связывание с полем "name"')
	equals(w.c2.el.text(), '21', 'Связывание с полем "age"')
	
	
	
	
});