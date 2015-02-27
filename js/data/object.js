
//= require <core/data>


/**
 * Источник данных как объект.
 * 
 * 
 * @class
 * @name Ergo.data.Object
 * @extends Ergo.core.DataSource
 */
Ergo.declare('Ergo.data.Object', 'Ergo.core.DataSource', /** @lends Ergo.data.Object.prototype */{
	
	defaults: {
		idKey: 'id'
	},
	
	/**
	 * Определение полей объекта
	 */
	fields: {
	},
	
	oid: function() {
		return this.get(this.options.idKey);
	},
	
	/**
	 * Метод валидации
	 * @function
	 */
	validate: null,
	
	
	
	_initialize: function(v) {
		if(arguments.length == 0)
			this._super({});
		else if(arguments.length == 1) {
			this._super({}, v);
		}
		else
			this._super.apply(this, arguments);
	},
	
	
	
	
	set: function(v) {
		
		// если значение устанавливается именно для нас
		if(arguments.length == 1) {
			
			if(this.options.readonly) return;
			
			if(this.validate) {
				if( !this.validate.call(this, v) ) throw new Error('Invalid value: ['+v+']');
			}
		}
		
		this._super.apply(this, arguments);
//		Ergo.data.Model.superclass.set.apply(this, arguments);
	},
	
	
	/**
	 * Подгрузка данных
	 * 
	 * 
	 */
	fetch: function(id) {
//		this._fetched = true;
		var parse = this.options.parser || this.parse;
		
		this.events.fire('fetch:before'); 
		
		if(this.options.provider) {
//			var self = this;
			return this.options.provider.find(this, id, this.options.query).then(function(data) { 
				this.set( parse.call(this, data) ); 
				this._fetched = true;
				this.events.fire('fetch:after'); 
			}.bind(this));
		}
		else {
			this._fetched = true;			
			this.events.fire('fetch:after'); 
		}

	},
	
	
	/**
	 * Обработка "сырых" данных 
	 * 
	 */
	parse: function(v) {
		return v;
	},
	
	
//	get: function() {
//		var v = this._super.apply(this, arguments);
//		var v = Ergo.data.Model.superclass.get.apply(this, arguments);

//		return (this.format) ? this.format.call(this, v) : v;
//	},

	
	/**
	 * Фабрика элементов модели (полей).
	 */
	_factory: function(i) {
		
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
			obj = eval(Ergo.alias(obj) || obj); //TODO здесь лучше загружать класс по зарегистрированному имени
		obj = obj || Ergo.core.DataSource;
		
		o.provider = this.options.provider;
		
		return new obj(this, i, o);		
	}
	
}, 'data:object');

