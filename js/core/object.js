
//= require "core"



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
		
		var o = {};
		
		// 
		if(!this.constructor.NO_REBUILD_SKELETON) {
			var prevDefaults = null;
			Ergo.hierarchy(this.constructor, function(clazz){
				if(clazz.defaults == prevDefaults) return;
				if('defaults' in clazz) Ergo.smart_override(o, clazz.defaults);
				prevDefaults = clazz.defaults; 
			});
			this.constructor.NO_REBUILD_SKELETON = true;
			this.constructor.prototype.defaults = Ergo.deep_copy(o);
		}
		else {
			o = Ergo.deep_copy(this.defaults);
		}
				
//		this.options = o;
//		opts = opts || {};
		this.options = Ergo.smart_override(o, opts);		


		this.$pre_construct(this.options);

//		this.options = Ergo.smart_override(this.options, opts);		
		
		this.$construct(this.options);

		this.$post_construct(this.options);
		
//		if(this.$init)
//			this.$init(o);

	},
	
	
	
	
	$pre_construct: function(o) {
		
		if('mixins' in o) {
			for(var i = 0; i < o.mixins.length; i++) {
				var mixin = o.mixins[i];
				if($.isString(mixin)) mixin = o.mixins[i] = Ergo.alias('mixins:'+mixin);
				if($.isFunction(mixin)) mixin.call(this, o);
				else if($.isPlainObject(mixin)) Ergo.deep_override(this, mixin);
			}
		}

	},
	
	
	
	$construct: function(o) {
		this.opt(o);
	},
	
	
	$post_construct: function(o) {
		
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
			opts = {}
			opts[arguments[0]] = arguments[1];
		}
		else if($.isString(o)){
			var getter = this.options.get[o] || this['get'+o.capitalize()];
			return (getter) ? getter.call(this) : this.options[o];
		}
		
		Ergo.smart_override(this.options, opts);

		this.$opt(opts);
		
		return this.options;
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
			// проверяем наличие Java-like сеттеров
			var java_setter = 'set'+i.capitalize();			
			// проверяем наличие сеттеров опций
			if(this.options.set[i])
				this.options.set[i].call(this, o[i], this.options);
			// если сеттер опций не найден, проверяем наличие java-like сеттера
			else if(this[java_setter])
				this[java_setter](o[i]);
		}


//		profiler.tick('opt', 'other');
//
//		profiler.stop('opt');
		
	},
	
	
	
	
	/**
	 * Проверка установленного расширения
	 * 
	 * @function
	 * @name Object.is
	 * @param {Any} ex расширение
	 */
	is: function(ex) {
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
		Ergo.alias('mixins:'+alias, obj);
	
	return obj;
}



