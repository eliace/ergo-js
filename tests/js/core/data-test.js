


test('core/data', function(){
	
	var obj = {
		id: 1,
		name: 'Alice',
		books: ['Jabberwocky', 'The Hunting of the Snark']
	};
	
	var data = new Dino.core.DataSourceX(obj);
	
	
	equals(data.get('name'), 'Alice', 'Метод get(key)');
	equals(data.get(), obj, 'Объект, получаемый через get() является оригинальным');
	
	data.set('age', 21);
	equals(data.get('age'), 21, 'Добавляем новый атрибут через set()');
	
	equals(data.get('books.0'), 'Jabberwocky', 'Доступ через составной ключ');
	
	equals(data.entry('books').entries.last().get(), 'Jabberwocky', 'В свойстве entries элементы создаются по требованию')
	


	var data = new Dino.core.DataSourceX(['Alice', 'Bob', 'Charlie'], {lazy: false});
	
	equals(data.entries.last().get(), 'Charlie', 'При параметре lazy = false все элементы создаются сразу')
	
	var s = '';
	data.iterate(function(entry, val){
		s += entry.get();
	});

	equals(s, 'AliceBobCharlie', 'Итеративный обход всех элементов источника данных')
	
	
});	
