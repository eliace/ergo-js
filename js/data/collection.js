
//= require <core/data>



/**
 * Источник данных как типизированная коллекция 
 * 
 * 
 * @class
 * @name Ergo.data.Collection
 * @extends Ergo.core.DataSource
 */
Ergo.declare('Ergo.data.Collection', 'Ergo.core.DataSource', /** @lends Ergo.data.Collection.prototype */{
	
	defaults: {
		model: null
	},
	
	/**
	 * Модель элемента коллекции
	 * 
	 * @field
	 * 
	 */
	model: null,
	
	
	/**
	 * Получение элемента коллекции по OID
	 */
	getByOID: function(oid) {
		var a = this.get();
		for(var i in a)
			if(a[i].id == oid) return a[i];
		return null;
	},
	
	
	initialize: function() {
		if(arguments.length == 0)
			this.$super([]);
		else
			this.$super.apply(this, arguments);
	},
	
	
	fetch: function() {
		this._fetched = true;
	},
	
	
	
	
	/**
	 * Фабрика элементов коллекции
	 */
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
		if($.isFunction(model) && !$.isClass(model)) model = model.call(this, this.get()[i]);
		if($.isString(model)) model = eval(model); //TODO здесь лучше загружать класс по зарегистрированному имени
		model = model || Ergo.core.DataSource;
		return new model(this, i); 
	}

	
	
});
