



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

		var c = ctor;

		if(typeof c == 'object') {
			overrides = c;
			c = function(){
				if(this.constructor === Object) {
					var a = [this];
					for(var i = 0; i < arguments.length; i++) {
						a.push(arguments[i]);
					}
//					console.log([this].concat(arguments));
					return new (c.bind.apply(c, a))()
				}
				else {
					p_ctor.apply(this, arguments);
				}
			};
		}


		// "магия" наследования
		// var F = function(){};
		// F.prototype = p_ctor.prototype;
		// ctor.prototype = new F();
		c.prototype = Object.create(p_ctor.prototype);
		c.prototype.constructor = c;
		c.superclass = p_ctor.prototype;
		c.super_ctor = p_ctor;

		// для всех функций определяем класс и имя функции (для _super)
		for(var i in overrides) {
			// ignore getters and setters
			var desc = Object.getOwnPropertyDescriptor(overrides, i);
			if( !(desc && (desc.get || desc.set)) ) {
				var p = overrides[i];
				if($.isFunction(p)) {
					p.__class__ = c;
					p.__name__ = i;
				}
			}
		}

		// переносим геттеры и сеттеры
		E.mergeProperties(c.prototype, c.superclass);


		// добавляем примеси
		if(overrides.mixins) {
			overrides.mixins.forEach(function(mixin) {
				if(typeof mixin == 'string') {
					mixin = $ergo.alias('mixins:'+mixin);
				}
				$ergo.deepMerge(c.prototype, mixin);
			});
		}

		// перегружаем параметрами класса
		E.merge(c.prototype, overrides);

		// регистрируем
		if(overrides.etype) {
			$ergo.alias(overrides.etype, c);
		}

		// добавляем классу метод extend
		c.extend = function(o) { return E.extend(this, o); };

		return c;
	};


	/**
	 * Рекурсивный обход всех базовых классов
	 *
	 * @name Ergo.walkPrototypes
	 * @function
	 * @param {Object} ctor класс, для которого нужно выполнить обход
	 * @param {Function} callback метод, вызывваемый для каждого базового класса
	 */
	E.walkPrototypes = function(ctor, callback) {
		if(!ctor) return;
		E.walkPrototypes(ctor.super_ctor, callback);
		callback.call(this, ctor.prototype);
	};


	E.hasGetter = function(obj, i) {

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

	E.hasSetter = function(obj, i) {

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
	E.defineClass = function(class_name, overrides, etype) {

		var base_class;

		// `extends` class property
		bclass = overrides.extends || Ergo.core.Object;


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

//		cp[cp_a[cp_a.length-1]] = new Function("base_class", 'return function c() { return base_class.apply(this, arguments); }')(base_class)

		// function() {
		// 	return base_class.apply(this, arguments);
		// };



		// если псевдоним класса не задан явно, то он может быть указан в новых свойствах
		if(!etype)
			etype = overrides.etype;

		// регистрируем etype класса (если он есть)
		if(etype){
			clazz.prototype.etype = etype;
			Ergo.alias(etype, clazz);
//			_etypes[etype] = clazz;
		}


		// if('mixins' in overrides) {
		// 	for(i in overrides.mixins) {
		// 		var mixin = overrides.mixins[i];
		// 		Ergo.deepMerge(clazz.prototype, mixin);
		// 	}
		// }

		clazz.prototype._class_name = class_name;

		return clazz;
	};


	/**
	 * Синоним для Ergo.defineClass
	 */
//	E.declare = E.defineClass;

//	E.define = E.defineClass;


	/**
	 * Создание экземпляра объекта по псевдониму класса
	 *
	 * @name Ergo.object
	 * @function
	 * @param {Object} options параметры (опции) экземпляра
	 * @param {String} etype псевдоним класса
	 * @return {Ergo.core.Object}
	 */
	E.object = function(ns, alias, options, context) {//defaultType) {

		if(options instanceof Ergo.core.Object) return options;

		var etype = ns+':'+alias;

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
	E.isClass = function(obj) {
		return (typeof obj == 'function') && (obj.superclass !== undefined);
	};




})();
