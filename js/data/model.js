
//= require <core/data-source>




Dino.declare('Dino.data.Model', 'Dino.core.DataSource', {
	
	defaults: {
		oidKey: 'id'
	},
	
	fields: {
	},
	
	oid: function() {
		return this._val()[this.options.oidKey];
	},
	
	
	set: function(v) {
		
		if(this.validate) {
			if( !this.validate.call(this, v) ) throw new Error('Invalid value: ['+v+']');
		}
		
		Dino.data.Model.superclass.set.apply(this, arguments);
	},
	
	get: function() {
		var v = Dino.data.Model.superclass.get.apply(this, arguments);

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
//		if(Dino.isFunction(model)) model = model.call(this, this._val()[i]);
		if(Dino.isString(model)) model = eval(model); //TODO здесь лучше загружать класс по зарегистрированному имени
		model = model || Dino.core.DataSource;
		return new model(this, i);
	}
	
});

