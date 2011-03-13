



test('DataSource - Values', function(){
	
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


test('DataSource - Items', function(){
	
	var data = {
		n: 4
	};
	
	var ds = new Dino.data.DataSource(data);
	ok(!('n' in ds.items), 'There must be no item "n" in data source' );
	var item1 = ds.item('n');
	ok('n' in ds.items, 'Item for key "n" created')
	ds.set('n', 10);
	ok(ds.item('n') == item1, 'After value change (by key) item still exists');
	equals(item1.val(), 10, 'But value changed to 10');
	
	
	ds = new Dino.data.DataSource(data, 'n');
	ds.set(8);
	equals(data.n, 8, 'Value changed to 8');
	
});






/*
asyncTest('Dino.data.AsyncDataSource', 1, function() {

	var data = [{
		id: 1
	}, {
		id: 2
	}]
	
	var ds = new Dino.data.AjaxDataSource(data, {
		url: function(i, val) { return 'ajax/'+i+'-'+val.id+'.json'; }
	});
	
	ds.item(0).events.reg('onItemLoad', function(e){
		same(ds.get('0.person'), {name: 'Alice', age: 20}, 'Загрузка данных через AJAX');
	});
	ds.item(0).load('person', function(i, val){ return 'ajax/person-'+val.id+'.json' });
	
	
	
  setTimeout(function () {
    start();
  }, 2000);
	
});
*/
