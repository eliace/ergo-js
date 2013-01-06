


test('core/data', function(){
	
	var obj = {
		id: 1,
		name: 'Alice',
		books: ['Jabberwocky', 'The Hunting of the Snark']
	};
	
	var data = new Ergo.core.DataSource(obj);
	
	
	equal(data.get('name'), 'Alice', 'Метод get(key)');
	equal(data.get(), obj, 'Объект, получаемый через get() является оригинальным');
	
	data.set('age', 21);
	equal(data.get('age'), 21, 'Добавляем новый атрибут через set()');
	
	equal(data.get('books.0'), 'Jabberwocky', 'Доступ через составной ключ');
	
	equal(data.entry('books').entries.last().get(), 'Jabberwocky', 'В свойстве entries элементы создаются по требованию')
	


	var data = new Ergo.core.DataSource(['Alice', 'Bob', 'Charlie'], {lazy: false});
	
	equal(data.entries.last().get(), 'Charlie', 'При параметре lazy = false все элементы создаются сразу')
	
	var s = '';
	data.iterate(function(entry, val){
		s += entry.get();
	});

	equal(s, 'AliceBobCharlie', 'Итеративный обход всех элементов источника данных')
	
	
	data.add('Elle');
	deepEqual(data.get(), ['Alice', 'Bob', 'Charlie', 'Elle'], 'Добавляем к массиву новый элемент');
	equal(data.entry(3).id, 3, 'Индекс элемента "Elle" равен 3');

	data.add('Dan', 3);
	deepEqual(data.get(), ['Alice', 'Bob', 'Charlie', 'Dan', 'Elle'], 'Добавляем к массиву новый элемент по указанному индексу');
	equal(data.entry(3).id, 3, 'Индекс элемента "Dan" равен 3');
	equal(data.entry(4).id, 4, 'Новый индекс элемента "Elle" равен 4');
	
	
	
	data = new Ergo.core.DataSource([]);
	
	data.add('a');
	data.add('b');
	data.add('c');
	data.add('d');
	data.add('e');
	
	data.entry(0).del();
	deepEqual(data.source, ['b', 'c', 'd', 'e'], 'Удаляем первый элемент источника данных');
	equal(data.entry(1).id, 1, 'Идентификаторы элементов данных меняются, если источник данных - массив');
	
	
//	data = new Ergo.core.DataSource(['Alice', 'Charlie', 'Dan']);
//	data.add('Bob', 1);
//	same(data.get(), ['Alice', 'Bob', 'Charlie', 'Dan', 'Elle'], 'Добавляем к массиву новый элемент по указанному индексу');
	
	
	
	
	
	
	
	
	
});	
