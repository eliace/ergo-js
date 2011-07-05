


test('core/model', function(){
	
	var testModel = Dino.data.Model.extend({
		fields: {
			'name': 'string',
			'age': {
				format: function(v) {
					
				},
				validate: function(v) {
					return (v > 0 && v < 200);
				}
			}
		},
		print: function() {
			return this._val()['name'];
		}
	});
	
	var c = new Dino.data.Collection([], {itemModel: testModel});
	
	c.add({id: 1, name: 'Alice', age: 21});
	c.add({id: 2, name: 'Bob'});
	
	equals(c.entry(0).print(), 'Alice', 'Метод print модели testModel выводит значение поля name');
	
	var result = c.set('0.age', -1);
	ok(result === false, 'При попытке присвоить некорректное значение возвращается false')
	equals(c.get('0.age'), 21, 'Значение поля age должно оставаться 21')

	c.set('0.age', 22);
	equals(c.get('0.age'), 22, 'Значение поля age должно измениться на 22')
	
});	
