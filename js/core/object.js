
//= require "core"


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
		
		if('extensions' in o) {
			for(i in o.extensions) {
				var ext = o.extensions[i];
				if($.isString(ext)) ext = o.extensions[i] = Ergo.alias('extensions:'+ext);
				if($.isFunction(ext)) ext.call(this, o);
				else if($.isPlainObject(ext)) Ergo.deep_override(this, ext);
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
		if($.isString(ex)) ex = Ergo.alias('extensions:'+ex);
		return ('extensions' in o) ? Ergo.include(o.extensions, ex) : false;
	},
	
	
	$super: function(){
		var caller = arguments.callee.caller;
		return caller.__class__.superclass[caller.__name__].apply(this, arguments);
	}
	
	
});





/**
 * Добавляем метод для регистрации расширений в ErgoJS
 */
Ergo.extension = function(ext_name, obj, etype) {
	
	// создаем пространство имен для расширения
	var cp_a = ext_name.split('.');
	var cp = 'window';
	for(var i = 0; i < cp_a.length; i++){
		cp += '.'+cp_a[i];
		eval( 'if(!'+cp+') '+cp+' = {};' );
	}		
	eval(cp + ' = obj;');
	
	if(etype)
		Ergo.alias('extensions:'+etype, obj);
	
	return obj;
}



