
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
		model: null,
		idKey: 'id'
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
	find: function(id) {
		var a = this.get();
		for(var i in a)
			if(a[i][this.options.idKey] == id) return a[i];
		return null;
	},
	
	
	initialize: function(v) {
		if(arguments.length == 0)
			this.$super([]);
		else if(arguments.length == 1) {
			$.isArray(v) ? this.$super(v) : this.$super([], v);
		}
		else
			this.$super.apply(this, arguments);
	},
	
	/**
	 * Загрузка данных из хранилища => заполнение коллекции данными
	 *  
	 */
	fetch: function() {
		
		if(this.options.provider) {
			var self = this;
			return this.options.provider.get.apply(this, arguments).then(function(data) { 
				self.set(data); self._fetched = true; 
			});
		}
		else {
			this._fetched = true;			
		}
		
	},
	
	/**
	 * Очистка данных => удаление данных из коллекция
	 *  
	 */
	purge: function() {
		this._fetched = false;
	},
	
	/**
	 * Сброс данных в хранилище (принудительная синхронизация)
	 *  
	 */
	flush: function() {
		
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
