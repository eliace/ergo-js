var smpl = sample('Наследование', {jsOnly: true});


// Новый класс создается с помощью метода Ergo.declare
// У него есть синоним Ergo.defineClass
Ergo.declare(
	'Samples.foo.MyClass', 			// полное имя нового класса
	'Ergo.core.Widget', 				// полное имя базового класса
	{
	
	// блок параметров по-умолчанию
	defaults: {
		color: 'Синий',
		size: 0
	}
	
	},
	'my-class'									// псевдоним класса
);


// Создаем экземпляр класса с паарметрами по-умолчанию
var obj = new Samples.foo.MyClass();

smpl.alert( Ergo.format('Цвет: %s, Размер: %s', obj.opt('color'), obj.opt('size')) );

// Создаем экземпляр класса и переопределяем color и size
obj = new Samples.foo.MyClass({
	color: 'Зеленый',
	size: 12
});

smpl.alert( Ergo.format('Цвет: %s, Размер: %s', obj.options.color, obj.options.size) );

// Создаем экземпляр класса , испольуя метод Ergo.object
obj = Ergo.object({
	etype: 'my-class',
	color: 'Белый',
	size: 1,
	weight: 5.4
});

smpl.alert( Ergo.format_obj('Цвет: #{color}, Размер: #{size}, Вес: #{weight}', obj.options) );




var AnotherClass = Samples.foo.MyClass.extend({
	
	defaults: {
		color: 'Серый'
	}
	
});

obj = new AnotherClass();

smpl.alert( Ergo.format('Цвет: %s, Размер: %s', obj.options.color, obj.options.size) );
