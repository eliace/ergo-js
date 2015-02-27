

test('core/widget', function(){
	
	var w, a;
	
	w = new Ergo.core.Widget({
		html: '<div/>',
		innerText: 'Text'
	});
	
	equal(w.el.text(), 'Text', 'Установка параметра innerText');
	
	
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
	
	
	console.log(w.defaults);
	
	w.c2.mark = 5;

	equal('c1', w.c1._key, 'Поле _key компонента c1 равно "c1"')
	ok(w == w.c1.parent, 'Поле parent компонента c1 задано верно')
	
	ok(w.c1 && w.c2, 'Компоненты доступны');
	ok(w.el.children().length == 2, 'Элементы комопонентов добавлены в комопоновку родителя');
	equal(w.c1.el.attr('class'), 'test', 'Класс определяется через defaultComponent')
	ok(w.component('c1') == w.c1, 'Поиск по ключу в списке компонентов')
	ok(w.component({mark: 5}) == w.c2, 'Поиск по произвольному атрибуту в списке компонентов')
	
	ok(w.components.get('c2') == w.c2, 'Доступ через коллекцию компонентов');
	equal(2, w.components.size(), 'Количество элементов в коллекции компонентов');
	w.components.remove_at('c1');
	equal(1, w.components.size(), 'Размер коллекции компонентов послк удаления компонента равен 1');
	equal(1, w.children.size(), 'Размер списка дочерних виджетов после удаления компонента равен 1');
	


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
	
	equal(w.c1.el.text(), 'Alice', 'Связывание с полем "name"')
	equal(w.c2.el.text(), '21', 'Связывание с полем "age"')
	
	
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
	
	equal(w.el.text(), 'Text', 'Установка опции text');
	equal(w.tag, 'Tag', 'Установка опции tag');
	equal(w.el.attr('title'), 'Tooltip', 'Установка опции tooltip');
	equal(w.el.attr('id'), 'id', 'Установка опции id');
	equal(w.el.attr('tabindex'), 4, 'Установка опции tabIndex');
	
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
	
	equal(w.foo, 2, 'Проверка перегрузки сеттера опций');
	
	
	
	
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
	
	
	equal(w.c1._weight, 1, 'Вес компонента c1');
	equal(w.c2._weight, -1, 'Вес компонента c2');
	equal(w.item({tag: 'item_1'})._weight, 0, 'Вес элемента item_1');
	var children = w.layout.el.children();
	equal(children.length, 3, 'Элементов добавлено в компоновку');
	equal(children.eq(0).ergo().tag, 'component_2', '')
	equal(children.eq(1).ergo().tag, 'item_1', '')
	equal(children.eq(2).ergo().tag, 'component_1', '')
	ok(w.item(0).tag == 'item_1', 'Элемент с индексом 0 имеет тег item_1')
	ok(2, w.components.size(), 'Количество компоннетов равно 2');
	ok(1, w.items.size(), 'Количество элементов равно 1');
	
	w.items.add({
		etype: 'widget',
		html: '<div/>',
		tag: 'item_2' 
	});
	
	ok(2, w.items.size(), 'После добавления элемента количество элементов равно 2');
	
	
	
	/*
	 * Биндинг
	 */

	a = [];
	
	w = new Ergo.core.Widget({
		html: '<div/>',
		data: '',
//		updateOnDataChanged: true,
		format: function(v) {
			a.push('format');
		},
		binding: function(v) {
			a.push('binding');
		},
		store: function(v) {
			a.push('store');
//			this.data.set(v);
			return v;
		},
		onAction: function(e) {
			this.setValue(e.value);
		}
	});
	
	deepEqual(a, ['format', 'binding'], 'При первичном подключении данных вызывается format -> binding');

//	ok(!w.lock_data_change, 'Блокировака dataChange отключена')

	a = [];
	w.data.set('hello');
	deepEqual(a, ['format', 'binding'], 'При внешнем изменении данных вызывается format -> binding');
	
	a = [];
	w.events.fire('action', {'value': 'goodbye'});
	deepEqual(a, ['store', 'format', 'binding'], 'При внутреннем изменении значения виджета вызывается только store -> format -> binding');
	
	
	
	a = [];
	
	w = new Ergo.core.Widget({
		html: '<div/>',
		data: 'hello',
		binding: function(v) {
			a.push(v);
		}
	});
	
	w.bind(null);
	deepEqual(a, ['hello', null], 'Связывание с виджетом значения null');
	
	
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
	
	deepEqual(a, ['message'], 'Сообщение всплывает вверх по дереву виджетов');
	
	
	
	
	w = new Ergo.core.Widget();
	
	w.children.add({etype: 'widget'});
	w.children.add({etype: 'widget'});
	w.children.add({etype: 'widget'});
	
	equal(3, w.children.size());
	
	w.children.last().destroy();
	
	equal(2, w.children.size());
	
	
});