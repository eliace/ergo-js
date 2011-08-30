
//= require <core/data-source>


Ergo.declare('Ergo.data.Collection', 'Ergo.core.DataSource', {
	
	defaults: {
		model: null
	},
	
	
	getByOID: function(oid) {
		var a = this.val();
		for(var i in a)
			if(a[i].id == oid) return a[i];
		return null;
	},
	
	
	factory: function(i) {
		
		/**
		 * Фабрика должна создавать элементы с помощью функции-генератора класса.
		 * Причем, могут быть такие случаи:
		 *  - задана сама функция
		 *  - задано имя класса
		 *  - задано поле, которое содержит имя класса
		 */
		
		var model = this.options.model || this.model; // модель можно определить либо в опциях, либо в классе, причем опции имеют больший приоритет
//		if($.isFunction(model)) model = model.call(this, this.val()[i]);
		if($.isFunction(model) && !$.isClass(model)) model = model.call(this, this.val()[i]);
		if($.isString(model)) model = eval(model); //TODO здесь лучше загружать класс по зарегистрированному имени
		model = model || Ergo.core.DataSource;
		return new model(this, i); 
	}

	
	
});
