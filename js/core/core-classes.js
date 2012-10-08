



(function(){
	
	
	var E = Ergo;
	
	
	
	/**
	 * Создание расширенного класса
	 * 
	 * @name Ergo.extend
	 * @function
	 * @param {Object} p_ctor
	 * @param {Object} ctor
	 * @param {Object} overrides
	 */
	E.extend = function(p_ctor, ctor, overrides) {
		
		if(typeof ctor == 'object') {
			overrides = ctor;
			ctor = function(){ p_ctor.apply(this, arguments); };
		}
		
		
		// "магия" наследования
		var F = function(){};
		F.prototype = p_ctor.prototype;
		ctor.prototype = new F();
		ctor.prototype.constructor = ctor;
		ctor.superclass = p_ctor.prototype;
		ctor.super_ctor = p_ctor;

		// для всех функций определяем класс и имя функции
		for(var i in overrides) {
			var p = overrides[i];
			if($.isFunction(p)) {
				p.__class__ = ctor;
				p.__name__ = i;
			}
		}
		
		E.override(ctor.prototype, overrides);
		
		
		if(overrides.etype)
			Ergo.alias(overrides.etype, ctor);
//			_etypes[overrides.etype] = ctor;
		
		// добавляем классу метод extend
		ctor.extend = function(o) { return E.extend(this, o); }
		
		return ctor;
	};
	
		
	/**
	 * Рекурсивный обход всех базовых классов 
	 * 
	 * @name Ergo.hierarchy
	 * @function
	 * @param {Object} ctor класс, для которого нужно выполнить обход
	 * @param {Function} callback метод, вызывваемый для каждого базового класса
	 */
	E.hierarchy = function(ctor, callback) {
		if(!ctor) return;
		E.hierarchy(ctor.super_ctor, callback);
		callback.call(this, ctor.prototype);
	};
	
	
	
	var _aliases = {};
	
	
	E.alias = function(alias, obj) {
		if(arguments.length == 2)
			_aliases[alias] = obj;
		else
			return _aliases[alias];
	};
	
	E.aliases = function() {
		return _aliases;
	};
	
	
//	var _etypes = {};
	
	/**
	 * Объявление класса
	 * 
	 * @param {String} class_name полное имя класса
	 * @param {String|Object} base_class базовый класс или имя базового класса
	 * @param {Object} overrides набор свойств и методов нового класса
	 * @param {String} [etype] e-тип (если не указан, то новый класс не регистрируется)
	 * 
	 * @name Ergo.declare
	 * @function
	 */
	E.declare = function(class_name, bclass, overrides, etype) {
		
		base_class = (typeof bclass == 'string') ? eval(bclass) : bclass;
		
		if(base_class === undefined)
			throw 'Unknown base class '+bclass+' for '+class_name;
		
		var clazz = E.extend(base_class, overrides);
		
		// создаем пространство имен для класса
		var cp_a = class_name.split('.');
		var cp = 'window';
		for(var i = 0; i < cp_a.length; i++){
			cp += '.'+cp_a[i];
			eval( 'if(!'+cp+') '+cp+' = {};' );
		}		
		eval(cp + ' = clazz;');
		
		// регистрируем etype класса (если он есть)
		if(etype){
			clazz.prototype.etype = etype;
			Ergo.alias(etype, clazz);
//			_etypes[etype] = clazz;
		}
		
		if('mixins' in overrides) {
			for(i in overrides.mixins) {
				var mixin = overrides.mixins[i];
//				if($.isString(mixin)) mixin = o.mixins[i] = Ergo.alias('mixins:'+mixin);
//				if($.isFunction(mixin)) mixin.call(clazz.prototype, clazz.prototype);
//				else if($.isPlainObject(mixin)) Ergo.deep_override(clazz.prototype, mixin);
				Ergo.deep_override(clazz.prototype, mixin);
			}			
		}

		clazz.prototype.className = class_name;
		
		return clazz;
	};
	
	
	
	
	
	/**
	 * Создание экземпляра объекта (должен присутствовать etype в options либо defaultType)
	 * 
	 * @name Ergo.object
	 * @function
	 * @param {Object} options
	 * @param {Object} defaultType
	 */
	E.object = function(options, defaultType) {
		
		if(options instanceof Ergo.core.Object) return options;
		
		var etype = options.etype || defaultType;
		
		var ctor = Ergo.alias(etype);
//		var ctor = _etypes[etype];
		
		if(!ctor ){
//			Ergo.logger.debug('Class for etype "'+etype+'" not found');
			throw new Error('Class for etype "'+etype+'" not found');
//			return null;
		}
				
		return new ctor(options);			
		
	};

	
	
	
	
	/**
	 * Является ли объект ergo-классом
	 * 
	 * @name $.isClass
	 * @function
	 * @param {Object} obj
	 * 
	 */
	$.isClass = function(obj) {
		return $.isFunction(obj) && (obj.superclass !== undefined);
	}
	
	
	
	
})();
