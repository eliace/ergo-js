

test('core/widget', function(){
	
	var w, a;
	
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

	equals('c1', w.c1._key, 'Поле _key компонента c1 равно "c1"')
	ok(w == w.c1.parent, 'Поле parent компонента c1 задано верно')
	
	ok(w.c1 && w.c2, 'Компоненты доступны');
	ok(w.el.children().length == 2, 'Элементы комопонентов добавлены в комопоновку родителя');
	equals(w.c1.el.attr('class'), 'test', 'Класс определяется через defaultComponent')
	ok(w.component('c1') == w.c1, 'Поиск по ключу в списке компонентов')
	ok(w.component({mark: 5}) == w.c2, 'Поиск по произвольному атрибуту в списке компонентов')


	w = new Ergo.core.Widget({
		html: '<div/>',
		defaultItem: {
			etype: 'widget',
			html: '<span/>',
		},
		items: [{
			text: 'item1',
			tag: 'a'
		}, {
			text: 'item2',
			tag: 'b'
		}, {
			text: 'item3',
			tag: 'c'
		}]
	});

	ok(w.item(1).tag == 'b', 'Поиск элемента по индексу')
	ok(w.item({tag: 'a'})._index == 0, 'Поиск элемента по полю "tag"')
//	ok(w.item({mark: 5}) == w.c2, 'Поиск по произвольному атрибуту в списке компонентов')




	w = new Ergo.core.Widget({
		html: '<div/>',
		content: {
			etype: 'widget',
			html: '<span/>'			
		}
	});
	
	ok(w.el.children().length == 1 && w.content, 'Компонент content доступен и добавлен в компоновку');
	ok(w.component('content'), 'Компонент content доступен через коллекцию компонентов')
	
	
	
	
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
	
	
	var Div = Ergo.core.Widget.extend({
		defaults: {
			html: '<div/>'
		}
	});
	
	
	w = new Ergo.core.Widget({
		html: '<div/>',
		text: 'Text',
		tag: 'Tag',
		tooltip: 'Tooltip',
		id: 'id',
		tabIndex: 4
	});
	
	equals(w.el.text(), 'Text', 'Установка опции text');
	equals(w.tag, 'Tag', 'Установка опции tag');
	equals(w.el.attr('title'), 'Tooltip', 'Установка опции tooltip');
	equals(w.el.attr('id'), 'id', 'Установка опции id');
	equals(w.el.attr('tabindex'), 4, 'Установка опции tabIndex');
	
	var Class = Ergo.core.Widget.extend({
		defaults: {
			set: {
				'foo': function(v) { this.foo = 1; }
			}				
		}
	});
	
	w = new Class({
		set: {
			'foo': function(v) { this.foo = 2; }
		},			
		foo: 'a'
	});
	
	equals(w.foo, 2, 'Проверка перегрузки сеттера опций');
	
	
	
	
	w = new Ergo.core.Widget({
		html: '<div/>',
		components: {
			c1: {
				weight: 1,
				etype: 'widget',
				html: '<span/>',
				tag: 'component_1'
			},
			c2: {
				weight: -1,
				etype: 'widget',
				html: '<p/>',
				tag: 'component_2'
			}
		},
		items: [{
			etype: 'widget',
			html: '<span/>',
			tag: 'item_1'			
		}]
	});
	
	
	equals(w.c1._weight, 1, 'Вес компонента c1');
	equals(w.c2._weight, -1, 'Вес компонента c2');
	equals(w.item({tag: 'item_1'})._weight, 0, 'Вес элемента item_1');
	var children = w.layout.el.children();
	equals(children.length, 3, 'Элементов добавлено в компоновку');
	equals(children.eq(0).ergo().tag, 'component_2', '')
	equals(children.eq(1).ergo().tag, 'item_1', '')
	equals(children.eq(2).ergo().tag, 'component_1', '')
	ok(w.item(0).tag == 'item_1', 'Элемент с индексом 0 имеет тег item_1')
	
	
	/*
	 * Биндинг
	 */

	a = [];
	
	w = new Ergo.core.Widget({
		html: '<div/>',
		data: '',
		updateOnValueChanged: true,
		format: function(v) {
			a.push('format');
		},
		binding: function(v) {
			a.push('binding');			
		},
		store: function(v) {
			a.push('store');			
		},
		onAction: function(e) {
			this.setValue(e.value);
		}
	});
	
	same(a, ['format', 'binding'], 'При первичном подключении данных вызывается format -> binding');

//	ok(!w.lock_data_change, 'Блокировака dataChange отключена')

	a = [];
	w.data.set('hello');
	same(a, ['format', 'binding'], 'При внешнем изменении данных вызывается format -> binding');
	
	a = [];
	w.events.fire('action', {'value': 'goodbye'});
	same(a, ['store', 'format', 'binding'], 'При внутреннем изменении значения виджета вызывается только store -> format -> binding');
	
	
	
	
	console.log('-----------------');
	
	
	a = [];
	
	w = new Ergo.core.Widget({
		
		content: {
			etype: 'widget',
			tag: 'content'
		},
		
		onAction: function(e) {
			a.push( e.text );
		}
		
	});
	
	
	
	w.content.events.fire('action', {text: 'message', after: Ergo.bubble});
	
	same(a, ['message'], 'Сообщение всплывает вверх по дереву виджетов');
	
	
	
	
	
});