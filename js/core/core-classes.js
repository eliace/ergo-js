



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
		// var F = function(){};
		// F.prototype = p_ctor.prototype;
		// ctor.prototype = new F();
		ctor.prototype = Object.create(p_ctor.prototype);
		ctor.prototype.constructor = ctor;
		ctor.superclass = p_ctor.prototype;
		ctor.super_ctor = p_ctor;

		// для всех функций определяем класс и имя функции
		for(var i in overrides) {
			// ignore getters and setters
			var desc = Object.getOwnPropertyDescriptor(overrides, i);
			if( !(desc && (desc.get || desc.set)) ) {
				var p = overrides[i];
				if($.isFunction(p)) {
					p.__class__ = ctor;
					p.__name__ = i;
				}
			}
		}

		E.override(ctor.prototype, overrides);


		if(overrides.etype)
			Ergo.alias(overrides.etype, ctor);
//			_etypes[overrides.etype] = ctor;

		// добавляем классу метод extend
		ctor.extend = function(o) { return E.extend(this, o); };

		return ctor;
	};


	/**
	 * Рекурсивный обход всех базовых классов
	 *
	 * @name Ergo.walk_hierarchy
	 * @function
	 * @param {Object} ctor класс, для которого нужно выполнить обход
	 * @param {Function} callback метод, вызывваемый для каждого базового класса
	 */
	E.walk_hierarchy = function(ctor, callback) {
		if(!ctor) return;
		E.walk_hierarchy(ctor.super_ctor, callback);
		callback.call(this, ctor.prototype);
	};


	E.getter = function(obj, i) {

		var desc = Object.getOwnPropertyDescriptor(obj, i);
		if(desc && desc.get)
			return desc;

		var ctor = obj.constructor;
		while(ctor) {
			var desc = Object.getOwnPropertyDescriptor(ctor.prototype, i);
			if(desc && desc.get)
				return desc;
			ctor = ctor.super_ctor;
		}
		return false;
	};

	E.setter = function(obj, i) {

		var desc = Object.getOwnPropertyDescriptor(obj, i);
		if(desc && desc.set)
			return desc;

		var ctor = obj.constructor;
		while(ctor) {
			var desc = Object.getOwnPropertyDescriptor(ctor.prototype, i);
			if(desc && desc.set)
				return desc;
			ctor = ctor.super_ctor;
		}
		return false;
	};





	var _aliases = {};

	E._aliases = _aliases;


	E.alias = function(alias, obj) {

		// var i = alias.indexOf(':');
		// var ns = 'ergo';
		// if(i > 0) {
			// ns = alias.substr(0, i);
			// alias = alias.substr(i+1);
		// }
//
		// if( !_aliases[ns] ) _aliases[ns] = {};
//
		// ns = _aliases[ns];


		if(arguments.length == 2) {
			_aliases[alias] = obj;
		}
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
	 * @name Ergo.defineClass
	 * @function
	 */
	E.defineClass = function(class_name, bclass, overrides, etype) {

		var base_class;

		if( typeof bclass == 'string' ) {
			var cp_a = bclass.split('.');
			var cp = window;
			for(var i = 0; i < cp_a.length; i++){
				base_class = cp[cp_a[i]];
				if(!base_class) break;
				cp = base_class;
			}

		}
		else {
			base_class = bclass;
		}

//		base_class = (typeof bclass == 'string') ? eval(bclass) : bclass;

		if(base_class === undefined)
			throw 'Unknown base class '+bclass+' for '+class_name;

		var clazz = E.extend(base_class, overrides);

		// создаем пространство имен для класса
		var cp_a = class_name.split('.');
		var cp = window;
		for(var i = 0; i < cp_a.length-1; i++){
			var c = cp_a[i];
			if(!cp[c]) cp[c] = {};
			cp = cp[c];
		}

		cp[cp_a[cp_a.length-1]] = clazz;

		// var cp_a = class_name.split('.');
		// var cp = 'window';
		// for(var i = 0; i < cp_a.length; i++){
			// cp += '.'+cp_a[i];
			// eval( 'if(!'+cp+') '+cp+' = {};' );
		// }
		// eval(cp + ' = clazz;');

		// если псевдоним класса не задан явно, то он может быть указан в новых свойствах
		if(!etype)
			etype = overrides.etype;

		// регистрируем etype класса (если он есть)
		if(etype){
			clazz.prototype.etype = etype;
			Ergo.alias(etype, clazz);
//			_etypes[etype] = clazz;
		}


		if('mixins' in overrides) {
			for(i in overrides.mixins) {
				var mixin = overrides.mixins[i];
				Ergo.deep_override(clazz.prototype, mixin);
			}
		}

		clazz.prototype._class_name = class_name;

		return clazz;
	};


	/**
	 * Синоним для Ergo.defineClass
	 */
	E.declare = E.defineClass;

	E.define = E.defineClass;


	/**
	 * Создание экземпляра объекта по псевдониму класса
	 *
	 * @name Ergo.object
	 * @function
	 * @param {Object} options параметры (опции) экземпляра
	 * @param {String} etype псевдоним класса
	 * @return {Ergo.core.Object}
	 */
	E.object = function(options, etype, context) {//defaultType) {

		if(options instanceof Ergo.core.Object) return options;

//		var etype = options.etype || defaultType;

		var ctor = Ergo._aliases[etype];// Ergo.alias(etype);
//		var ctor = _etypes[etype];

		if(!ctor ){
//			Ergo.logger.debug('Class for etype "'+etype+'" not found');
			throw new Error('Class for etype "'+etype+'" not found');
//			return null;
		}

		return new ctor(options, context);

	};





	/**
	 * Является ли объект классом
	 *
	 * @name $.isClass
	 * @function
	 * @param {Object} obj
	 *
	 */
	$.isClass = function(obj) {
		return $.isFunction(obj) && (obj.superclass !== undefined);
	};




})();
