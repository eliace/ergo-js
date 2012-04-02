
//= require <core/data-source>



/**
 * Источник данных как объект.
 * 
 * @example
 * 
 * 
 * 
 * @class
 * @name Ergo.data.Model
 * @extends Ergo.core.DataSource
 */
Ergo.declare('Ergo.data.Model', 'Ergo.core.DataSource', /** @lends Ergo.data.Model.prototype */{
	
	defaults: {
		oidKey: 'id'
	},
	
	/**
	 * Определение полей модели
	 */
	fields: {
	},
	
	oid: function() {
		return this.get(this.options.oidKey);
	},
	
	/**
	 * Метод валидации
	 * @function
	 */
	validate: null,
	
	set: function(v) {
		
		if(this.validate) {
			if( !this.validate.call(this, v) ) throw new Error('Invalid value: ['+v+']');
		}
		
		this.$super.apply(this, arguments);
//		Ergo.data.Model.superclass.set.apply(this, arguments);
	},
	
/*	
	get: function() {
		var v = this.$super.apply(this, arguments);
//		var v = Ergo.data.Model.superclass.get.apply(this, arguments);

		return (this.format) ? this.format.call(this, v) : v;
	},
*/
	
	/**
	 * Фабрика элементов модели (полей).
	 */
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
		if($.isFunction(model) && !$.isClass(model)) model = model.call(this, this.get()[i]);
		if($.isString(model)) model = eval(Ergo.alias('models:'+model) || model); //TODO здесь лучше загружать класс по зарегистрированному имени
		model = model || Ergo.core.DataSource;
		return new model(this, i);
	}
	
});

