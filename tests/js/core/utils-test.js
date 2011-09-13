

test('core/utils', function(){
	
	my = {classes: {}};
	
	// определяем, что пространство имен 'my.classes.*' загружается из пути 'ajax/*'
	Ergo.loadpath['my.classes'] = 'ajax';
	

	Ergo.require('my.classes.Class2');
		
	var a = new my.classes.Class2();
	equals('class1_class2', a.foo(), 'Проверяем загрузку зависимых классов');

	
	
	// сбрасываем загруженные классы
	my.classes = {};
	
	// определяем класс Class1
	my.classes.Class1 = function(){
		this.foo = function(){
			return 'precreated_class1';
		};
	};

	Ergo.require('my.classes.Class2');
	
	var b = new my.classes.Class2();
	equals('precreated_class1_class2', b.foo(), 'Проверяем, что загруженные классы не загружаются заново');
	
	
	a = Ergo.smart_override({}, {events: {'mousedown': 'a'}}, {events: {'mousedown': 'b'}});
	same(a, {events: {mousedown: ['a', 'b']}}, 'Перегрузка свойства mousedown должно преобразовывать его к массиву');
	
	
	a = Ergo.smart_override(null, {'a': {name: 'Alice'}}, {'a!': {age: 21}});
	same(a, {'a!': {age: 21}}, 'Модификатор ! оставляет неизменным атрибут');
	b = Ergo.smart_override({'a': {name: 'Bob'}}, a);
	same(b, {'a': {age: 21}}, 'Модификатор ! оставляет неизменным атрибут');
	
	
	a = Ergo.smart_override({items: [1, 2, 3]}, {items: [8]});
	same(a, {items:[8,2,3]}, 'Перегрузка массива items')
	
});
	
