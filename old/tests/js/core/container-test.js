

test('core/container', function(){
	
	var item_a = [];
	for(var i = 0; i < 10; i++) {
		item_a.push({
			text: 'Item '+i
		});
	}
	
	
	var t0 = Ergo.timestamp();
	
	var c = new Ergo.core.Container({
		html: '<div%a>%c</div>',
		items: item_a,
		defaultItem: {
			etype: 'widget',
			html: '<div%a>%c</div>',
			cls: 'test-item',
		}
	});
	
//	console.log(c);
	
	equals(c.items.size(), 10, 'Создано 10 элементов');
	equals(c.items.last().index, 9, 'Последний элемент имеет свойство index равное 9');
	
	c.items.add({tag: 'new'}, 5);
	
	equals(c.items.size(), 11, 'Добавлен еще один элемент и всего их стало 11');
	equals(c.items.last().index, 10, 'Последний элемент имеет свойство index равное 10');
	equals(c.items.get(5).tag, 'new', 'Добавленный элемент с индексом 5 имеет свойство tag равное "new"');
	
	
	
	c = new Ergo.core.Container({
		html: '<div/>'
	});
	
	c.items.add({
		etype: 'widget',
		html: '<div class="item"/>'
	});
	
	equals(c.items.size(), 1, 'Элемент добавлен в контейнер');
	equals($('.item', c.el).length, 1, 'Элемент добавлен в компоновку');
	
	c.items.remove( c.items.get(0) );
	
	equals(c.items.size(), 0, 'Элемент удален из контейнера');
	
	
	
	
	
	c = $.ergo({
		etype: 'container',
		html: '<div/>',
		defaultItem: {
			tag: 'item'
		},
		content: {
			etype: 'widget',
			html: '<span/>',
			tag: 'content'
		}
	});
	
	equals(c.items.size(), 0, 'Элементы контейнера как компоненты не создаются');
	equals(c.content.tag, 'content', 'Компонент создается с помощью componentFactory');
	
	
	
	c = new Ergo.core.Container({
		html: '<div/>',
		items: [{
			weight: 1,
			etype: 'widget',
			html: '<span/>',
			tag: 'item_1'
		}, {
			weight: 2,
			etype: 'widget',
			html: '<span/>'
		}]
	});
	
	c.items.get(1).mark = 5;
	
	ok(c.item(0) == c.items.get(0), 'Поиск по ключу в списке компонентов')
	ok(c.item({mark: 5}) == c.items.get(1), 'Поиск по произвольному атрибуту в списке компонентов')
	
});