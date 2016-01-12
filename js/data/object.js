

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
		idKey: 'id',
		oidKey: 'id'
	},

	/**
	 * Определение полей объекта
	 */
	fields: {
	},



	_oid: function() {
		return this.get(this.options.idKey);
	},

	get oid() {
		return this.get(this.options.oidKey);
	},

	// oid: function() {
	// 	return this.get(this.options.idKey);
	// },

	// /**
	//  * Метод валидации
	//  * @function
	//  */
	// validate: null,



	_initialize: function(o, v) {
		if(arguments.length == 0)
			this._super({});
		else if(arguments.length == 1) {
			this._super({}, o);
		}
		else
			this._super.apply(this, arguments);
	},




	set: function(v) {

		// если значение устанавливается именно для нас
		if(arguments.length == 1) {

			if(this.options.readonly) return;

			var validator = this.options.validator || this._validate;

			if(validator) {
				if( validator.call(this, v) === false ) {
					this.events.fire('invalid', {value: v, entry: this});
					return;
				}
				else {
					this.events.fire('valid', {value: v, entry: this});
				}
//					throw new Error('Invalid value: ['+v+']');
			}
		}

//		return this._super.apply(this, arguments);
		return Ergo.data.Object.superclass.set.apply(this, arguments);
	},


	/**
	 * Подгрузка данных
	 *
	 *
	 */
	fetch: function(id) {

		if(arguments.length == 0)
			id = this.oid;

//		this._fetched = true;
		var parser = this.options.parser || this._parse;
		var provider = this.options.provider;

		if( $.isString(provider) )
			provider = Ergo.alias('providers:'+provider);

		this.events.fire('fetch');

		if(provider) {
//			var self = this;
			return provider.find(this, id, this.options.query).then(function(data) {
				this.set( parser.call(this, data) );
				this._fetched = true;
				this.events.fire('fetched');
				return data;
			}.bind(this));
		}
		else {
			this._fetched = true;
			this.events.fire('fetched');
		}

	},


	/**
	 * Обработка "сырых" данных
	 *
	 */
	_parse: function(v) {
		return v;
	},





	flush: function() {

		var oid = this.oid;

		var composer = this.options.composer || this._compose;
		var parser = this.options.parser || this._parse;
		var provider = this.options.provider;

		this.events.fire('flush');

		if( $.isString(provider) )
			provider = Ergo.alias('providers:'+provider);

		if(provider) {

			// create
			if(oid == null) {

				var data = composer.call(this, this.get(), 'create');

				return provider.create(this, data, this.options.query)
					.done(function(data) {
						this.events.fire('flushed');
						return parser.call(this, data, 'create');
					}.bind(this));
			}
			// update
			else {

				var data = composer.call(this, this.get(), 'update');

				return provider.update(this, oid, data, this.options.query)
					.then(function(data) {
						this.events.fire('flushed');
						return parser.call(this, data, 'update');
					}.bind(this));
			}
		}
		else {
			this.events.fire('flushed');
		}

		return $.when(null);
	},


	_compose: function(v) {
		return v;
	},



	drop: function() {

		var oid = this.oid;

		this.events.fire('drop');

		if( $.isString(provider) )
			provider = Ergo.alias('providers:'+provider);

		if(provider) {

			return provider.delete(this, oid)
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





	// invoke: function(action) {
	//
	// 	var oid = this._oid();
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
	// 		return provider[action](this, oid, data, this.options.query).then(function(data) {
	// 			// ?
	// 			return data;
	// 		});
	// 	}
	//
	// },




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
		 *  - задано поле, которое содержит псевдоним класса
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
			obj = Ergo.alias(obj);// || obj); //TODO здесь лучше загружать класс по зарегистрированному имени
		obj = obj || Ergo.core.DataSource;

		o.provider = this.options.provider;

		return new obj(this, i, o);
	}

}, 'data:object');
