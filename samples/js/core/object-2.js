var smpl = sample('Наследование');



Ergo.declare('Samples.foo.MyClass', 'Ergo.core.Widget', {
	
	defaults: {
		color: 'Синий',
		size: 0
	}
	
}, 'my-class');



var obj = new Samples.foo.MyClass();

smpl.alert( Ergo.format('Цвет: %s, Размер: %s', obj.opt('color'), obj.opt('size')) );


obj = new Samples.foo.MyClass({
	color: 'Зеленый',
	size: 12
});

smpl.alert( Ergo.format('Цвет: %s, Размер: %s', obj.options.color, obj.options.size) );


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
