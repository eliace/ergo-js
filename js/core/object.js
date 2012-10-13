
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
				
		this.options = Ergo.smart_override(o, opts);		
		
		if('mixins' in o) {
			for(var i = 0; i < o.mixins.length; i++) {
				var mixin = o.mixins[i];
				if($.isString(mixin)) mixin = o.mixins[i] = Ergo.alias('mixins:'+mixin);
				if($.isFunction(mixin)) mixin.call(this, o);
				else if($.isPlainObject(mixin)) Ergo.deep_override(this, mixin);
			}
		}		
		
//		if(this.$init)
//			this.$init(o);

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



