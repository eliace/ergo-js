


/**
 * Источник данных как типизированная коллекция
 *
 *
 * @class
 * @name Ergo.data.Collection
 * @extends Ergo.core.DataSource
 */
Ergo.defineClass('Ergo.data.Collection', /** @lends Ergo.data.Collection.prototype */{

	extends: 'Ergo.core.DataSource',

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


	find_entry: function(id) {

		var valueUid = (this.options.valueUid || this._valueUid);

		var a = this.get();
		for(var i in a)
			if(valueUid.call(this, a[i], i) == id) return this.entry(i);
		return null;
	},




	_initialize: function(v) {
		if(arguments.length == 0)
			this._super([]);
		else if(arguments.length == 1) {
			Array.isArray(v) ? this._super(v) : this._super([], v);
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

		var parse = this.options.parser || this._parse;
		var query = Ergo.merge({}, this.options.query, q);

		this.events.fire('fetch');

		var provider = this.options.provider;

		if( $.isString(provider) )
			provider = Ergo.alias('providers:'+provider);


		if(provider) {
			var self = this;
			return provider.findAll(this, query).then(function(data) {

				var v = parse.call(self, data);

				if(self.options.sync) {
					self.sync( v );
					self._fetched = true;
					// self.source = v;
					// self._fetched = 'swap';
				}
				else {
					self.set( v );
					self._fetched = true;
				}
				self.events.fire('fetched');

				return data;
			});
		}
		else {
			this._fetched = true;
			this.events.fire('fetched');
		}

	},





	// _merge: function(oldData, newData) {
	//
	//
	// },


/*
	sync: function(q) {

		this._fetched = undefined;

		var parse = this.options.parser || this._parse;
		var query = Ergo.merge({}, this.options.query, q);

		var provider = this.options.provider;

		this.events.fire('fetch:before');

		if( $.isString(provider) )
			provider = Ergo.alias('providers:'+provider);


		if(provider) {
			var self = this;
			return provider.find_all(this, query).then(function(data) {

				var v = parse.call(self, data);

				if(v.length == self.source.length) {
					self.source = v;
					self.events.fire('value:sync');
				}
				else {
					self.set( v );
				}
				self._fetched = true;
				self.events.fire('fetch:after');
			});
		}
		else {
			this._fetched = true;
			this.events.fire('fetch:after');
		}

		return $.when(null);
	},
*/



	_parse: function(v) {
		return v;
	},

	_compose: function(v) {
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

//		var id = this._oid();

		var composer = this.options.composer || this._compose;
		var parser = this.options.parser || this._parse;
		var provider = this.options.provider;

		this.events.fire('flush');

		if( $.isString(provider) )
			provider = Ergo.alias('providers:'+provider);

		if(provider) {

			var data = composer.call(this, this.get(), 'update');

			return provider.update(this, data, this.options.query).then(function(data) {
				this.events.fire('flushed');
				return parser.call(this, data, 'update');
			}.bind(this));

		}
		else {
			this.events.fire('flushed');
		}

		return $.when(null);
	},




	drop: function(id) {

		this.events.fire('drop');

		if( $.isString(provider) )
			provider = Ergo.alias('providers:'+provider);

		if(provider) {

			return provider.delete(this, id)
				.done(function(data) {
					this.events.fire('dropped');
					return data;
				}.bind(this));

		}
		else {
			this.events.fire('dropped');
		}


		return $.when(null);
	},






	/**
	 * @deprecated
	 */
	// invoke: function(action) {
	//
	// 	var provider = this.options.provider;
	// 	var composer = this.options.composer || this._compose;
	//
	// 	if( $.isString(provider) )
	// 		provider = Ergo.alias('providers:'+provider);
	//
	// 	if(provider) {
	//
	// 		var data = composer.call(this, this.get(), action);
	//
	// 		return provider[action](this, this.options.query).then(function(data) {
	// 			// ?
	// 			return data;
	// 		});
	// 	}
	//
	// },







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
		if($.isFunction(model) && !$ergo.isClass(model)) model = model.call(this, this.get()[i]);
		if($.isString(model)) model = Ergo.alias(model);// eval(model); //TODO здесь лучше загружать класс по зарегистрированному имени
		model = model || Ergo.core.DataSource;

		var o = {provider: this.options.provider};
		return new model(this, i, o);
	}



});
