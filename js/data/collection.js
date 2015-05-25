


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
		idKey: 'id',
		query: {}
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
	
	
	_initialize: function(v) {
		if(arguments.length == 0)
			this._super([]);
		else if(arguments.length == 1) {
			$.isArray(v) ? this._super(v) : this._super([], v);
		}
		else
			this._super.apply(this, arguments);
	},


	
	/**
	 * Загрузка данных из хранилища => заполнение коллекции данными
	 *  
	 */
	fetch: function(q) {
		
		this._fetched = undefined;
		
		var parse = this.options.parser || this.parse;
		var query = Ergo.override({}, this.options.query, q); 
		
		this.events.fire('fetch:before'); 
		
		if(this.options.provider) {
			var self = this;
			return this.options.provider.find_all(this, query).then(function(data) {
				
				var v = parse.call(self, data);
				
				if(self.options.swap && v.length == self.source.length) { 
					self.source = v;
					self._fetched = 'swap';
				}
				else {
					self.set( v );
					self._fetched = true;
				} 
				self.events.fire('fetch:after'); 
			});
		}
		else {
			this._fetched = true;			
			this.events.fire('fetch:after'); 
		}
		
	},
	
	
	parse: function(v) {
		return v;
	},
	
	
	
	/**
	 * Очистка данных => удаление данных из коллекции
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
	_factory: function(i) {
		
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
		if($.isString(model)) model = Ergo.alias(model);// eval(model); //TODO здесь лучше загружать класс по зарегистрированному имени
		model = model || Ergo.core.DataSource;

		var o = {provider: this.options.provider};
		return new model(this, i, o);
	}

	
	
});
