
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
				if($.isFunction(ext)) ext.call(this, o);
				else if($.isPlainObject(ext)) Ergo.deep_override(this, ext);
			}
		}		
		
		if(this.$init)
			this.$init(o);

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
		return ('extensions' in o) ? Ergo.include(o.extensions, ex) : false;
	}
	
	
});


