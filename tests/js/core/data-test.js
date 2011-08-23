


test('core/data', function(){
	
	var obj = {
		id: 1,
		name: 'Alice',
		books: ['Jabberwocky', 'The Hunting of the Snark']
	};
	
	var data = new Ergo.core.DataSource(obj);
	
	
	equals(data.get('name'), 'Alice', 'Метод get(key)');
	equals(data.get(), obj, 'Объект, получаемый через get() является оригинальным');
	
	data.set('age', 21);
	equals(data.get('age'), 21, 'Добавляем новый атрибут через set()');
	
	equals(data.get('books.0'), 'Jabberwocky', 'Доступ через составной ключ');
	
	equals(data.entry('books').entries.last().get(), 'Jabberwocky', 'В свойстве entries элементы создаются по требованию')
	


	var data = new Ergo.core.DataSource(['Alice', 'Bob', 'Charlie'], {lazy: false});
	
	equals(data.entries.last().get(), 'Charlie', 'При параметре lazy = false все элементы создаются сразу')
	
	var s = '';
	data.iterate(function(entry, val){
		s += entry.get();
	});

	equals(s, 'AliceBobCharlie', 'Итеративный обход всех элементов источника данных')
	
	
	data.add('Elle');
	same(data.get(), ['Alice', 'Bob', 'Charlie', 'Elle'], 'Добавляем к массиву новый элемент');
	equals(data.entry(3).id, 3, 'Индекс элемента "Elle" равен 3');

	data.add('Dan', 3);
	same(data.get(), ['Alice', 'Bob', 'Charlie', 'Dan', 'Elle'], 'Добавляем к массиву новый элемент по указанному индексу');
	equals(data.entry(3).id, 3, 'Индекс элемента "Dan" равен 3');
	equals(data.entry(4).id, 4, 'Новый индекс элемента "Elle" равен 4');
	
	
	
//	data = new Ergo.core.DataSource(['Alice', 'Charlie', 'Dan']);
//	data.add('Bob', 1);
//	same(data.get(), ['Alice', 'Bob', 'Charlie', 'Dan', 'Elle'], 'Добавляем к массиву новый элемент по указанному индексу');
	
	
});	
