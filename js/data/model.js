
//= require <core/data-source>




Ergo.declare('Ergo.data.Model', 'Ergo.core.DataSource', {
	
	defaults: {
		oidKey: 'id'
	},
	
	fields: {
	},
	
	oid: function() {
		return this.val()[this.options.oidKey];
	},
	
	
	set: function(v) {
		
		if(this.validate) {
			if( !this.validate.call(this, v) ) throw new Error('Invalid value: ['+v+']');
		}
		
		Ergo.data.Model.superclass.set.apply(this, arguments);
	},
	
	get: function() {
		var v = Ergo.data.Model.superclass.get.apply(this, arguments);

		return (this.format) ? this.format.call(this, v) : v;
	},
	
	factory: function(i) {
		
		/**
		 * Фабрика должна создавать элементы с помощью функции-генератора класса.
		 * Причем, могут быть такие случаи:
		 *  - задана сама функция
		 *  - задано имя класса
		 *  - задано поле, которое содержит имя класса
		 */		
		
		var model = this.fields[i]
//		if($.isFunction(model)) model = model.call(this, this.val()[i]);
		if($.isFunction(model) && !$.isClass(model)) model = model.call(this, this.val()[i]);
		if($.isString(model)) model = eval(model); //TODO здесь лучше загружать класс по зарегистрированному имени
		model = model || Ergo.core.DataSource;
		return new model(this, i);
	}
	
});

