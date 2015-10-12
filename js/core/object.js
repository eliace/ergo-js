



/**
 * Объект
 *
 * Опции:
 * 	`set` хэш сеттеров
 * 	`get` хэш геттеров
 * 	`include` список примесей
 *
 *
 * @class
 *
 */
Ergo.core.Object = function() {
	// possible optimization
	var a = new Array(arguments.length);
	for(var i = 0; i < arguments.length; i++)
		a[i] = arguments[i];
	this._initialize.apply(this, a);
};

Ergo.core.Object.extend = function(o) {
	return Ergo.extend(this, o);
};




Ergo.override(Ergo.core.Object.prototype, /** @lends Ergo.core.Object.prototype */{

	defaults: {
//		set: {},
//		get: {}
	},

	/**
	 * Инициализация объекта.
	 *
	 * Процесс инициализации разбивается на три фазы:
	 * 	1. преконструирование
	 * 	2. конструирование
	 * 	3. постконструирование
	 *
	 *
	 * Для каждой фазы вызывается свой обработчик
	 *
	 * @private
	 *
	 */
	_initialize: function(opts, scope) {

		var o = {
//			smart_override: Ergo.self_smart_override
		};

		//
		if(!this.constructor.NO_REBUILD_SKELETON) {
			var prevDefaults = null;
			Ergo.walk_hierarchy(this.constructor, function(clazz){
				if(clazz.defaults == prevDefaults) return;
				if('defaults' in clazz) Ergo.smart_override(o, clazz.defaults);
				prevDefaults = clazz.defaults;
			});
			this.constructor.NO_REBUILD_SKELETON = true;
			this.constructor.prototype.defaults = Ergo.deep_copy(o);
//			Ergo.smart_build(this.constructor.prototype.defaults);

		}
		else {
			Ergo.deep_override(o, this.defaults);
		}

//			console.log(this.constructor.prototype._class_name);


//		this.options = o;
//		opts = opts || {};
//		this.options = o = Ergo.smart_override(o, opts);

/*
		if('mixins' in o) {
			for(var i = 0; i < o.mixins.length; i++) {
				var mixin = o.mixins[i];
				if($.isString(mixin)) mixin = o.mixins[i] = Ergo.alias('mixins:'+mixin);
				if($.isFunction(mixin)) mixin.call(this, o);
				else if($.isPlainObject(mixin)) Ergo.deep_override(this, mixin);
			}
		}

		opts = opts || {};

		if('mixins' in opts) {//} || '+mixins' in opts) {
//			mixins = opts.mixins; ? opts.mixins : opts['+mixins'];
			for(var i = 0; i < opts.mixins.length; i++) {
				var mixin = mixins[i];
				if($.isString(mixin)) mixin = mixins[i] = Ergo.alias('mixins:'+mixin);
				if($.isFunction(mixin)) mixin.call(this, opts);
				else if($.isPlainObject(mixin)) Ergo.deep_override(this, mixin);
			}
		}
*/

		// //TODO возможно, здесь нужно реализовывать примешивание
//
		// var mixins = [].concat(o.mixins, opts ? opts.mixins : null);
//
//
// //		if('mixins' in o) {
		// for(var i = 0; i < mixins.length; i++) {
			// var mixin = mixins[i];
			// if($.isString(mixin)) mixin /*= o.mixins[i]*/ = Ergo.alias('mixins:'+mixin);
			// if($.isFunction(mixin)) mixin.call(this, o);
			// else if($.isPlainObject(mixin)) Ergo.smart_override(this, mixin);
		// }
// //		}

		this._scope = scope;


		this.options = Array.isArray(opts) ? Ergo.smart_override.apply(this, [o].concat(opts)) : Ergo.smart_override(o, opts);

		// сборка опций
		Ergo.smart_build(this.options);


		if('include' in this.options) {
			this._includes = Ergo.uniq( o.include.join(' ').split(' ') );

			var rebuild = false;

			for(var i = 0; i < this._includes.length; i++) {
				var inc = Ergo._aliases['includes:'+this._includes[i]];
				if(!inc)
					throw new Error('Include [includes:'+this._includes[i]+'] not found');
				if(inc.defaults) {
					this.options = Ergo.smart_override({}, inc.defaults, this.options);
					rebuild = true;
				}
				if(inc.overrides) {
					Ergo.override(this, inc.overrides);
				}
			}

			if(rebuild)
				Ergo.smart_build(this.options);
		}


//		this._constructing = true;

		// определен набор базовых опций - можно выполнить донастройку опций
		this._pre_construct(this.options);

		//FIXME повторная сборка опций (после PRE_CONSTRUCT могут появиться модификаторы опций)
		if(o.mixins && o.mixins.length)
			Ergo.smart_build(this.options);

//		this.options = Ergo.smart_override(this.options, opts);

		// определен весь набор опций - можно выполнять сборку объекта
		this._construct(this.options);

		// объект готов - можно выполнить донастройку объекта
		this._post_construct(this.options);

//		if(this.$init)
//			this.$init(o);

//		delete this._constructing;

	},



	/**
	 * Обработчик фазы "преконструирование" объекта
	 *
	 * Как правило на этом этапе происходит донастройка и модификация опций
	 *
	 * По умолчанию здесь происходит подкючение примесей
	 *
	 * @protected
	 * @param {Object} o опции
	 */
	_pre_construct: function(o) {

		// if('plugins' in o) {
			// for(var i = 0; i < o.plugins.length; i++) {
				// var plugin = o.plugins[i];
				// if($.isString(plugin)) plugin = o.plugins[i] = Ergo.alias('plugins:'+plugin);
				// if(plugin.pre_construct)
					// plugin.pre_construct.call(this, o);
			// }
		// }


		// if('mixins' in o) {
		// 	for(var i = 0; i < o.mixins.length; i++) {
		// 		var mixin = o.mixins[i];
		// 		if($.isString(mixin)) mixin /*= o.mixins[i]*/ = Ergo.alias('mixins:'+mixin);
		// 		if($.isFunction(mixin)) mixin.call(this, o);
		// 		else if($.isPlainObject(mixin)) Ergo.smart_override(this, mixin);
		// 	}
		// }


		if('include' in o) {
//			this._includes = o.include.join(' ').split(' ').uniq();

			for(var i = 0; i < this._includes.length; i++) {
				var inc = Ergo._aliases['includes:'+this._includes[i]];
				if(inc._pre_construct)
					inc._pre_construct.call(this, o);
			}
		}


	},


	/**
	 * Обработчик фазы "конструирование" объекта
	 *
	 * Как правило, здесь происходит создание компонентов
	 *
	 * По умолчанию происходит подключение плагинов
	 *
	 * @protected
	 * @param {Object} o опции
	 *
	 */
	_construct: function(o) {

// 		if('plugins' in o) {
// 			for(var i = 0; i < o.plugins.length; i++) {
// 				var plugin = o.plugins[i];
// //				if($.isString(plugin)) plugin = o.plugins[i] = Ergo.alias('plugins:'+plugin);
// 				if(plugin.construct)
// 					plugin.construct.call(this, o);
// 			}
// 		}


		if(this._includes) {
//			var mods = o.mods.join(' ').split(' ').uniq();
			for(var i = 0; i < this._includes.length; i++) {
				var inc = Ergo._aliases['includes:'+this._includes[i]];
				if(inc._construct)
					inc._construct.call(this, o);
			}
		}


	},


	/**
	 * Обработчик фазы "постконструирование" объекта
	 *
	 * Эта фаза предназначена для конфигурирования сконструированного объекта
	 *
	 * По умолчанию происходит применение опций (вызов метода _opt)
	 *
	 * @protected
	 * @param {Object} o опции
	 */
	_post_construct: function(o) {

// 		if('plugins' in o) {
// 			for(var i = 0; i < o.plugins.length; i++) {
// 				var plugin = o.plugins[i];
// //				if($.isString(plugin)) plugin = o.plugins[i] = Ergo.alias('plugins:'+plugin);
// 				if(plugin.post_construct)
// 					plugin.post_construct.call(this, o);
// 			}
// 		}



		if(this._includes) {
//			var mods = o.mods.join(' ').split(' ').uniq();
			for(var i = 0; i < this._includes.length; i++) {
				var inc = Ergo._aliases['includes:'+this._includes[i]];
				if(inc._post_construct)
					inc._post_construct.call(this, o);
			}
		}


		this._opt(o);

	},


	/**
	 * Обработчик удаления объекта
	 *
	 * @protected
	 */
	_destroy: function() {
		//
	},




	/**
	 * Установка опций (options) объекта.
	 *
	 * Передаваемые параметры применяются и сохраняются в this.options
	 *
	 * Опции применяются/получаются с учетом приоритета:
	 * 	Для сеттеров:
	 * 		1. Сеттер-опция из this.options.set
	 * 		2. Сеттер-метод вида set_<имя сеттера>
	 *
	 * 	Для геттеров:
	 * 		1. Геттер-опция из this.options.get
	 * 		2. Геттер-метод вида get_<имя сеттера>
	 *
	 * opt(i) - получение опции i
	 * opt(i, v) - установка опции i
	 * opt(o) - установка нескольких опций, передаваемых в виде Hash
	 *
	 * @param {Object} o параметры
	 */
	opt: function(o) {
		var opts = o;
		if(arguments.length == 2){
			opts = {};
			opts[arguments[0]] = arguments[1];
		}
		else if($.isString(o)){
			// // нужно ли искать значение опции в другой области видимости
			// if(o.charAt(0) == '@') {
				// var k = o.substring(1);
				// var v = this.opt(k);
				// if(!k) {
					// var parent = this.parent || this.source;
					// v = parent.opt(o);
				// }
				// return v;
			// }
			// else {

			var getter = (this.options.get && this.options.get[o]) || this['get_'+o];//o.capitalize()];

			if( !getter && (o in this) && Ergo.getter(this, o) ) {
				return this[o];
			}


			return (getter) ? getter.call(this) : this.options[o];
//			}
		}

//		Ergo.smart_override(this.options, opts);
		Ergo.override(this.options, opts);

		this._opt(opts);

		return this;//.options;
	},





	/**
	 * Обработчик, вызываемый для установки опций.
	 *
	 * @private
	 * @param {Object} o опции
	 */
	_opt: function(o) {

//		var self = this;



//		var el = this.el;

		for(var i in o) {
			// проверяем наличие сеттеров опций
			if(this.options.set && this.options.set[i])
				this.options.set[i].call(this, o[i], this.options);
			// если сеттер опций не найден, проверяем наличие java-like сеттера
			else {
				// проверяем наличие сеттеров методов
				var java_setter = 'set_'+i;//.capitalize();
				if( this[java_setter] )
					this[java_setter](o[i]);
				else if( (i in this) && Ergo.setter(this, i) ) {
					this[i] = o[i];
				}
				// else {
					// $unknown_opt(i, o[i]);
			}
		}

//		profiler.tick('opt', 'other');
//
//		profiler.stop('opt');

	},


	// $unknown_opt: function(i) {
//
	// },


	/**
	 * Проверка установленного расширения
	 *
	 * @function
	 * @name Object.is
	 * @param {Any} ex расширение
	 */
	is: function(ex) {
		return (this._includes) ? Ergo.includes(this._includes, ex) : false;
//		var o = this.options;
//		if($.isString(ex)) ex = Ergo.alias('mixins:'+ex);
//		return ('mixins' in o) ? Ergo.includes(o.mixins, ex) : false;
	},


	/**
	 * Вызов метода родительского класса из перегруженного метода
	 *
	 * По сути является "синтаксическим сахаром"
	 *
	 * @private
	 */
	_super: function(){
		var caller = arguments.callee.caller;
		return caller.__class__.superclass[caller.__name__].apply(this, arguments);
	}






});





/**
 * Добавляем метод для регистрации примесей в ErgoJS
 *
 * @deprecated
 */
Ergo.declare_mixin = function(mixin_name, obj, alias) {

	// создаем пространство имен для класса
	var cp_a = mixin_name.split('.');
	var cp = window;
	for(var i = 0; i < cp_a.length-1; i++){
		var c = cp_a[i];
		if(!cp[c]) cp[c] = {};
		cp = cp[c];
	}

	cp[cp_a[cp_a.length-1]] = obj;


	// создаем пространство имен для расширения
	// var cp_a = mixin_name.split('.');
	// var cp = 'window';
	// for(var i = 0; i < cp_a.length; i++){
		// cp += '.'+cp_a[i];
		// eval( 'if(!'+cp+') '+cp+' = {};' );
	// }
	// eval(cp + ' = obj;');

	if(alias)
		Ergo.alias(alias, obj);

	return obj;
}
;

Ergo.defineMixin = Ergo.declare_mixin;
