



test('Dino.data.DataSource', function(){
	
	var data = ['Alice', 'Bob', 'Charlie', ['apple', 'banana', 'cherry']];
	
	binding = new Dino.data.DataSource(data, 0);
	equals(binding.get(), 'Alice', 'get()');
	
	binding = new Dino.data.DataSource(data);
	equals(binding.get(2), 'Charlie', 'get(index)');
	
	binding2 = new Dino.data.DataSource(binding, 1);
	equals(binding2.get(), 'Bob', 'Child source get()');

	binding2 = new Dino.data.DataSource(binding, 3);
	equals(binding2.get(0), 'apple', 'Child source get(index)');
	
	binding3 = binding.item(3);
	ok((binding.items[3] !== undefined), 'Item exists');
	
	
	
	
	data = {
		person: {
			name: 'Alice',
			sex: 'female',
			age: 20
		}
	};
	
	ds = new Dino.data.DataSource(data);
	
	equals(ds.get('person.name'), 'Alice', 'Complex key get');
	
	ds.set('person.age', 21);
	equals(data['person']['age'], 21, 'Complex key set');

	ok(data == ds.source, 'Data source must be the same');
	
	
	data = ['Alice', 'Bob', 'Charlie'];
	
	ds = new Dino.data.ArrayDataSource(data);
	changedIndices = [];
	ds.events.reg('onIndexChanged', function(e){
		changedIndices.push(e.oldIndex);
	});
	ds.del(0);
	
	same(ds.val(), ['Bob', 'Charlie'], 'Содержимое массивов после удаления элемента');
	same(changedIndices, [1, 2], 'Измененые индексы')
	
});