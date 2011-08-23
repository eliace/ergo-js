

test('core/model', function(){
	
	var positiveIntegerModel = Ergo.data.Model.extend({
		
		validate: function(v) {
			return (v >= 0);
		}
		
	});
	
	
	
	var testModel = Ergo.data.Model.extend({
		fields: {
			'name': 'string',
			'age': positiveIntegerModel
		},
		print: function() {
			return this._val()['name'];
		}
	});
	
	var c = new Ergo.data.Collection([], {itemModel: testModel});
	
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
	
	
	
	var msg;
	
	var w = $.ergo({
		etype: 'list',
		data: c,
		dynamic: true,
		defaultItem: {
			content: {
				dataId: 'age',					
				onValueInvalid: function(e) {
					msg = e.message;
				}
			}
		},
	});
	
	w.item(0).content.setValue(-2);
	
	equals(msg, 'Invalid value: [-2]', 'При задании некорректного значения должно создаваться событие onValueInvalid');
	
});	
