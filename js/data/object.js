
//= require <core/data>


/**
 * Источник данных как объект.
 * 
 * @example
 * 
 * 
 * 
 * @class
 * @name Ergo.data.Object
 * @extends Ergo.core.DataSource
 */
Ergo.declare('Ergo.data.Object', 'Ergo.core.DataSource', /** @lends Ergo.data.Object.prototype */{
	
	defaults: {
		oidKey: 'id'
	},
	
	/**
	 * Определение полей объекта
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
		
		// если значение устанавливается именно для нас
		if(arguments.length == 1) {
			
			if(this.options.readonly) return;
			
			if(this.validate) {
				if( !this.validate.call(this, v) ) throw new Error('Invalid value: ['+v+']');
			}			
		}
		
		this.$super.apply(this, arguments);
//		Ergo.data.Model.superclass.set.apply(this, arguments);
	},
	
	
//	get: function() {
//		var v = this.$super.apply(this, arguments);
//		var v = Ergo.data.Model.superclass.get.apply(this, arguments);

//		return (this.format) ? this.format.call(this, v) : v;
//	},

	
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
		
		var obj = this.fields[i];
		var o = {};
//		if($.isFunction(model)) model = model.call(this, this.val()[i]);
		if($.isPlainObject(obj)) {
			o = obj;
			obj = obj.etype;
		}
		if($.isFunction(obj) && !$.isClass(obj)) 
			obj = obj.call(this, this.get()[i]);
		if($.isString(obj)) 
			obj = eval(Ergo.alias('models:'+obj) || obj); //TODO здесь лучше загружать класс по зарегистрированному имени
		obj = obj || Ergo.core.DataSource;
		
		return new obj(this, i, o);
	}
	
}, 'models:object');
