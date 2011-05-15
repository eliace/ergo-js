

test('core/object', function(){
	
	var obj = new Dino.core.Object({
		id: 'test-id',
		extensions: [function(){
			this.ext_prop = 'Extended property';
		}, {
			ext_func: function() {
				return 'From extended function';
			}
		}]
	});
	
	equals(obj.options.id, 'test-id', 'Перегрузка параметра');
	equals(obj.ext_prop, 'Extended property', 'Расширение с помощью функции');
	equals(obj.ext_func(), 'From extended function', 'Расширение с помощью объекта');
	
	
	var Class1 = Dino.core.Object.extend({
		
		dtype: 'class1',
		
		defaults: {
			width: 100
		}
		
	});

	var Class2 = Class1.extend({
		
		dtype: 'class2',
		
		defaults: {
			height: 10
		}
		
	});


	obj = new Class1();
	
	equals(obj.options.width, 100, 'Параметр "width" для Class1 равен 100');
	equals(obj.dtype, 'class1', 'dtype для Class1 равен "class1"');

	obj = new Class2();
	
	equals(obj.options.width, 100, 'Параметр "width" для Class2 равен 100');
	equals(obj.options.height, 10, 'Параметр "height" для Class2 равен 10');
	equals(obj.dtype, 'class2', 'dtype для Class2 равен "class2"');


	
	
	

});