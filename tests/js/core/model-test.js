

test('core/model', function(){
	
	var Types = {};
	
	Types.PositiveInteger = Ergo.data.Model.extend({
		
		validate: function(v) {
			return (v >= 0);
		}
		
	});
	
	Types.String = Ergo.data.Model.extend({
		
		validate: function(v) {
			return $.isString(v);
		}
		
	});
	
	
	
	var testModel = Ergo.data.Model.extend({
		fields: {
			'name': Types.String,
			'age': Types.PositiveInteger
		},
		print: function() {
			return this.get('name');
		}
	});
	
	var c = new Ergo.data.Collection([], {model: testModel});
	
	c.add({id: 1, name: 'Alice', age: 21});
	c.add({id: 2, name: 'Bob'});
	
	equals(c.entry(0).print(), 'Alice', 'Метод print модели testModel выводит значение поля name');
	
	var result = false;
	try{
		c.set('0.age', -1);
	}
	catch(err) {
		result = true;
	}
	ok(result, 'При попытке присвоить некорректное значение генерируется исключение')
	equals(c.get('0.age'), 21, 'Значение поля age должно оставаться 21')

	c.set('0.age', 22);
	equals(c.get('0.age'), 22, 'Значение поля age должно измениться на 22')
	
	
	
	
});	
