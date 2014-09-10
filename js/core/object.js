



/**
 * Объект
 *
 * @class
 * 
 */
Ergo.core.Object = function() {
	this.initialize.apply(this, arguments);
};

Ergo.core.Object.extend = function(o) {
	return Ergo.extend(this, o);
};




Ergo.override(Ergo.core.Object.prototype, {
	
	defaults: {
		set: {},
		get: {}
	},
	
	/*
	 * Инициализация объекта.
	 * 
	 * При инициализации решаются две задачи:
	 *   1. Формирование набора параметров
	 *   2. Добавление расширений
	 * 
	 * 
	 */
	initialize: function(opts) {
		
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



		this.options = Ergo.smart_override(o, opts);

		// сборка опций
		Ergo.smart_build(this.options);

		// определен набор базовых опций - можно выполнить донастройку опций
		this.$pre_construct(this.options);

		// сборка опций
//		Ergo.smart_build(this.options);
		
//		this.options = Ergo.smart_override(this.options, opts);		
		
		// определен весь набор опций - можно выполнять сборку объекта
		this.$construct(this.options);

		// объект готов - можно выполнить донастройку объекта
		this.$post_construct(this.options);
		
//		if(this.$init)
//			this.$init(o);

	},
	
	
	
	
	$pre_construct: function(o) {
		
		if('mixins' in o) {
			for(var i = 0; i < o.mixins.length; i++) {
				var mixin = o.mixins[i];
				if($.isString(mixin)) mixin /*= o.mixins[i]*/ = Ergo.alias('mixins:'+mixin);
				if($.isFunction(mixin)) mixin.call(this, o);
				else if($.isPlainObject(mixin)) Ergo.smart_override(this, mixin);
			}
		}		

	},
	
	
	
	$construct: function(o) {
		
		if('plugins' in o) {
			for(var i = 0; i < o.plugins.length; i++) {
				var plugin = o.plugins[i];
				if($.isString(plugin)) plugin = o.plugins[i] = Ergo.alias('plugins:'+plugin);
				plugin.call(this, o);
			}
		}
		
	},
	
	
	$post_construct: function(o) {
				
		this.$opt(o);

	},
	
	
	/**
	 * Установка параметров (options) виджета.
	 * 
	 * Передаваемые параметры применяются и сохраняются в this.options
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
			var getter = this.options.get[o] || this['get'+o.capitalize()];
			return (getter) ? getter.call(this) : this.options[o];
//			}
		}
		
//		Ergo.smart_override(this.options, opts);
		Ergo.override(this.options, opts);

		this.$opt(opts);
		
		return this;//.options;
	},
	
	
	
	
	
	/**
	 * Хук, вызываемый для установки параметров.
	 * 
	 * Передаваемые параметры только применяются
	 * 
	 * @private
	 * @param {Object} o параметры
	 */
	$opt: function(o) {
		
//		var self = this;
		
		
		
//		var el = this.el;
		
		for(var i in o) {
			// проверяем наличие сеттеров опций
			if(this.options.set[i])
				this.options.set[i].call(this, o[i], this.options);
			// если сеттер опций не найден, проверяем наличие java-like сеттера
			else {
				// проверяем наличие Java-like сеттеров
				var java_setter = 'set'+i.capitalize();			
				if(this[java_setter])
					this[java_setter](o[i]);
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
	$is: function(ex) {
		var o = this.options;
		if($.isString(ex)) ex = Ergo.alias('mixins:'+ex);
		return ('mixins' in o) ? Ergo.includes(o.mixins, ex) : false;
	},
	
	
	$super: function(){
		var caller = arguments.callee.caller;
		return caller.__class__.superclass[caller.__name__].apply(this, arguments);
	}
	
	
	
	
	
	
});





/**
 * Добавляем метод для регистрации примесей в ErgoJS
 */
Ergo.declare_mixin = function(mixin_name, obj, alias) {
	
	// создаем пространство имен для расширения
	var cp_a = mixin_name.split('.');
	var cp = 'window';
	for(var i = 0; i < cp_a.length; i++){
		cp += '.'+cp_a[i];
		eval( 'if(!'+cp+') '+cp+' = {};' );
	}		
	eval(cp + ' = obj;');
	
	if(alias)
		Ergo.alias(alias, obj);
	
	return obj;
}
;

Ergo.defineMixin = Ergo.declare_mixin;
