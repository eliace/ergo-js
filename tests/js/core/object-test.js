

test('core/object', function(){
	
	var objExt = {
		f: 5
	};
	
	var funcExt = function() {
		
		this.g = 6;
		
	}
	
	
	var obj = new Ergo.core.Object({
		id: 'test-id',
		mixins: [function(){
			this.ext_prop = 'Mixed property'
		}, {
			ext_func: function() {
				return 'From mixed function';
			}
		},
		objExt,
		funcExt]
	});
	
	equals(obj.options.id, 'test-id', 'Перегрузка параметра');
	equals(obj.ext_prop, 'Mixed property', 'Расширение с помощью функции');
	equals(obj.ext_func(), 'From mixed function', 'Расширение с помощью объекта');
	equals(obj.f, 5, 'Проверка расширения объектом');
//	ok(obj.is(funcExt), 'Проверка расширения функцией');
//	equals(obj.g, 6, 'Проверка расширения функцией');
	
	
	var Class1 = Ergo.core.Object.extend({
		
		etype: 'class1',
		
		defaults: {
			width: 100
		}
		
	});

	var Class2 = Class1.extend({
		
		etype: 'class2',
		
		defaults: {
			height: 10
		}
		
	});


	obj = new Class1();
	
	equals(obj.options.width, 100, 'Параметр "width" для Class1 равен 100');
	equals(obj.etype, 'class1', 'etype для Class1 равен "class1"');

	obj = new Class2();
	
	equals(obj.options.width, 100, 'Параметр "width" для Class2 равен 100');
	equals(obj.options.height, 10, 'Параметр "height" для Class2 равен 10');
	equals(obj.etype, 'class2', 'etype для Class2 равен "class2"');


	
//	var 
	

	function current_function_name() {
   	var re = /^function\s+([^(]+)/;
    return re.exec(arguments.callee.caller.toString())[1];                             
//		alert(arguments.callee.caller.toString());
	}
	
	
	var a = [];

	Ergo.declare('my.Class1', 'Ergo.core.Object', {
		
		fn1: function(){
			a.push(1);
		},
		
		fn2: function() {
			return '1';
		}
		
		
	});

	Ergo.declare('my.Class2', 'my.Class1', {
		
		fn2: function() {
			return this.$super() + '2';
		},
		
		fn1: function(){
			this.$super();
			a.push(2);
		}
		
	});


	Ergo.declare('my.Class3', 'my.Class2', {
		
		fn2: function() {
			return this.$super() + '3';
		},
		
		fn1: function(){
			this.$super();
			a.push(3);
		}
		
	});

	
	var obj = new my.Class3();
	obj.fn1();
	
	same(a, [1,2,3], 'Последовательный вызов функций через метод $super');
	equals(obj.fn2(), '123', 'Последовательный вызов функций через метод $super (с возвращаемым значением)');
	
	
	

});