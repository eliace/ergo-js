

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
	
	
	
});
	
