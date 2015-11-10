/**
 * @namespace
 *
 */
var Ergo = (function(){

	var E = {};



	/**
	 * Копирование свойств одного объекта в другой (создание примеси)
	 * @param {Object} obj целевой объект, которому будут добавлены новые свойства
	 * @name Ergo.override
	 * @function
	 */
	E.override = function(obj) {
		for(var j = 1; j < arguments.length; j++){
			var overrides = arguments[j] || {};
			for(var i in overrides){
				var desc = Object.getOwnPropertyDescriptor(overrides, i);
				if( desc && (desc.set || desc.get) ) {
					Object.defineProperty(obj, i , desc);
				}
				else
					obj[i] = overrides[i];
			}
		}
		return obj;
	};



	/**
	 * Полное копирование свойств одного объекта в другой (перегрузка)
	 * @param {Object} obj целевой объект, которому будут добавлены новые свойства
	 * @name @Ergo.deep_override
	 * @function
	 *
	 */
	E.deep_override = function(o) {

		for(var j = 1; j < arguments.length; j++){

			var srcObj = arguments[j];

//			E.each(srcObj, function(p, i){
			for(var i in srcObj) {

				var p = srcObj[i];

				if( p && p.constructor == Object ){//$.isPlainObject(p) ){
	//				if(!(i in o) || !$.isPlainObject(o[i])) o[i] = {};
					if(!(i in o) || (o[i] && o[i].constructor != Object)) o[i] = {};
					Ergo.deep_override(o[i], p);
				}
				else if( p && p.constructor == Array ) {//$.isArray(p) ){
	//				if(!(i in o) || !$.isArray(o[i])) o[i] = [];
					if(!(i in o) || (o[i] && o[i].constructor != Array)) o[i] = [];
					Ergo.deep_override(o[i], p);
				}
				else {
					o[i] = p;
				}
			}

		}

		return o;
	};







//	var _clear = false;



	var smart_override_prop = function(o, srcObj, i, context) {


		var p = srcObj[i];


		var prefix = i[0];
//		var j = i;

//		var keep_prefix = !_clear;


		if(prefix == '!' || prefix == '+' || prefix == '-') {
			i = i.substr(1);
		}
		else {

			prefix = false;

			if(i == 'data') prefix = '!'; 										//<-- поле data не перегружается
			if(i == 'mixins') prefix = '+'; 				//<-- поле mixins сливается
			if(i == 'cls') prefix = '+';
			if(i == 'as') prefix = '+';
			if(i == 'include') prefix = '+';
			if(i == 'state') prefix = '+';
			if( /^on\S/.test(i) ) prefix = '+';
			if(/\/events$/.test(context)) {
				prefix = '+';
			}

//			if(prefix)
//				keep_prefix = false;


			// Если в целевом объекте присутствует префиксная форма, то берется ее префикс
			if('!'+i in o) {
				prefix = '!';
//				i = '!'+i;
			}
			else if('+'+i in o) {
				prefix = '+';
//				i = '+'+i;
			}
			else if('-'+i in o) {
				prefix = '-';
//				i = '-'+i;
			}

		}






		if(prefix) {//prefix == '!' || prefix == '+' || prefix == '-') {

			var j = prefix + i;

//			var j = i.substr(1);

//			if(_clear) i = j;

			var m = null;


			if(prefix == '+') {

				m = [];

				if(i in o)
					m = o[i];
				if(j in o)
					m = o[j];

				if( !Array.isArray(m) ) m = [m];

				m = m.concat(p);

				o[j] = m;

				// if(keep_prefix) {
					// o[j] = m;
					// if(i in o) delete o[i];
				// }
				// else {
					// o[i] = m;
					// if(j in o) delete o[j];
				// }

				// if(!(i in o)) o[i] = [];
				// if( !$.isArray(o[i]) ) o[i] = [o[i]];
				// p = o[i].concat(p);
				// o[i] = p;

			}
			else if(prefix == '-') {

				m = [];

				if(i in o)
					m = o[i];
				if(j in o)
					m = o[j];

				if( !Array.isArray(m) ) m = [m];

				m = m.concat(p);

				o[j] = m;




				// TODO

				// m = [];
//
				// if(i in o)
					// m = o[i];
				// if(j in o)
					// m = o[j];
//
				// if( !$.isArray(m) ) m = [m];
//
				// if( !$.isArray(p) ) p = [p];
//
				// for(var k = 0; k < p.length; k++)
					// Ergo.remove_from_array(m, p[k]);
//
//
				// if(keep_prefix) {
					// o[j] = m;
					// if(i in o) delete o[i];
				// }
				// else {
					// o[i] = m;
					// if(j in o) delete o[j];
				// }

			}
			else {
				m = p;

				o[j] = m;

//				if(m === undefined) delete o[i];
//				o[i] = p;
			}


			// if(keep_prefix) {
				// o[j] = m;
				// if(i in o) delete o[i];
			// }
			// else {
				// o[i] = m;
				// if(j in o) delete o[j];
			// }

//			if(j in o && !_clear) delete o[j];
		}
		else{
			//TODO здесь создается полная копия (deep copy) объекта-контейнера
			if( p && p.constructor == Object ) {//$.isPlainObject(p) ){
	//			if(!(i in o) || !$.isPlainObject(o[i])) o[i] = {};
				if(!(i in o) || (o[i] && o[i].constructor != Object)) o[i] = {};
				smart_override_obj(o[i], p, context+'/'+i);
			}
			else if( p && p.constructor == Array ){//$.isArray(p) ){
	//			if(!(i in o) || !$.isArray(o[i])) o[i] = [];
				if(!(i in o) || (o[i] && o[i].constructor != Array)) o[i] = [];
				smart_override_obj(o[i], p, context+'/'+i);
			}
			else {
				//TODO этот участок кода нужно исправить

				// // если элемент в перегружаемом параметре существует, то он может быть обработан специфически
				// if(i in o){
					// // классы сливаются в одну строку, разделенную пробелом
// //					if(i == 'cls') p = o[i] + ' ' + p;
					// if( /^on\S/.test(i) ) {
						// if( !$.isArray(o[i]) ) o[i] = [o[i]];
						// p = o[i].concat(p);
					// }
					// // if(i == 'state') {
						// // p = o[i] + ' ' + p;
					// // }
				// }

				o[i] = p;
			}
		}

	};



	var smart_override_obj = function(dest, src, context) {

		if(!dest)
			dest = {};


		for(var i in src) {
			smart_override_prop(dest, src, i, context);
		}

	};




	/**
	 * "Умное" копирование свойств одного объекта в другой (условная перегрузка)
	 * @param {Object} obj целевой объект, которому будут добавлены новые свойства
	 * @name @Ergo.smart_override
	 * @function
	 *
	 */
	E.smart_override = function(o) {


		// если перегружаемый объект содержит метод smart_override, то используем именно его
		if(o && o.smart_override) {
			// args будет содержать только список перегрузок
			var args = Array.prototype.slice.call(arguments);
			args.shift();
			return o.smart_override.apply(o, args);
		}


//		var keep_keys = false;

		if(!o) {
//			_keep_keys = keep_keys = true;
			o = {};
		}

		// обходим все аргументы, начиная со второго
		for(var j = 1; j < arguments.length; j++){

			var srcObj = arguments[j];

			smart_override_obj(o, srcObj, '');

			// for(var i in srcObj)
				// smart_override_prop(o, srcObj, i);

	//		if( $.isArray(srcObj) ){
	//			for(var i = 0; i < srcObj.length; i++)
	//				Ergo.utils.overrideProp(o, srcObj, i);
	//		}
	//		else {


	//		}
		}

		// if(keep_keys)
			// _keep_keys = false;

		return o;
	};




	E.smart_build = function(o, key) {

		// применяем модификатор +
		for(var i in o) {

			var prefix = i[0];

			if(prefix == '+') {

				var j = i.substr(1);

				var m = (j in o) ? o[j] : [];
				if( !Array.isArray(m) ) m = [m];

				m = m.concat(o[i]);

				o[j] = m;

				delete o[i];
			}


			if(prefix == '-') {

				var j = i.substr(1);

				var m = (j in o) ? o[j] : [];
				if( !Array.isArray(m) ) m = [m];

				for(var n = 0; n < o[i].length; n++) {
					for(var k = 0; k < m.length; k++) {
						if(m[k] == o[i][n]) m.splice(k, 1);
					}
				}

				delete o[i];
			}



			if(prefix == '!') {

				var j = i.substr(1);

				if( o[i] === undefined )
					delete o[j];
				else
					o[j] = o[i];

				delete o[i];
			}

		}

/*
		// применяем модификатор -
		for(var i in o) {

			var prefix = i[0];

			if(prefix == '-') {

				var j = i.substr(1);

				var m = (j in o) ? o[j] : [];
				if( !$.isArray(m) ) m = [m];

				for(var n = 0; n < o[i].length; n++) {
					for(var k = 0; k < m.length; k++) {
						if(m[k] == o[i][n]) m.splice(k, 1);
					}
				}

				delete o[i];
			}
		}

		// применяем модификатор !
		for(var i in o) {

			var prefix = i[0];

			if(prefix == '!') {

				var j = i.substr(1);

				if( o[i] === undefined )
					delete o[j];
				else
					o[j] = o[i];

				delete o[i];
			}

		}

*/


		if( k == 'shortcuts' || k == 'components' || k == 'items')
			return;
//		if(i == 'items')
//			return;

		for(var i in o) {
			if(i == 'defaultItem' || i == 'defaultComponent' || i == 'layout' || i == 'nestedItem')
				continue;
			if(o[i] && o[i].constructor == Object)
				E.smart_build(o[i], i);
		}

	};



/*
	E.self_smart_override = function() {

		// console.log(this);
		// console.log(arguments);

		_clear = true;

		// обходим все аргументы, начиная со второго
		for(var j = 0; j < arguments.length; j++){

			var srcObj = arguments[j];

			smart_override_obj(this, srcObj, '');

			// for(var i in srcObj)
				// smart_override_prop(this, srcObj, i);

		}

		_clear = false;

		return this;
	};
*/






//	E.etypes = function() { return _etypes; }

//	E.defineClass = E.declare;




//	E.widget = E.object;




/*
	E.isFunction = function(obj) { return obj instanceof Function; };
	E.isArray = function(obj) {return obj instanceof Array;}
	E.isNumber = function(obj) {return typeof obj == 'number';};
	E.isBoolean = function(obj) {return typeof obj == 'boolean';};
	E.isString = function(obj) {return typeof obj == 'string';};
	E.isObject = function(obj) { return obj.constructor == Object; };
*/


	// в версии jquery 1.4 появились методы, которые раньше реализовывались в Ergo

	/**
	 * Является ли объект функцией
	 *
	 * @name $.isFunction
	 * @function
	 * @param {Object} obj
	 */
//	E.isFunction = $.isFunction;
	/**
	 * Является ли объект массивом
	 *
	 * @name $.isArray
	 * @function
	 * @param {Object} obj
	 */
//	E.isArray = $.isArray;
	/**
	 * Является ли объект простым объектом
	 *
	 * @name $.isPlainObject
	 * @function
	 * @param {Object} obj
	 */
//	E.isPlainObject = $.isPlainObject;
	/**
	 * Является ли объект строкой
	 *
	 * @name $.isString
	 * @function
	 * @param {Object} obj
	 */
	$.isString = function(obj) {
		return typeof obj == 'string';
	};
	/**
	 * Является ли объект логической переменной
	 *
	 * @name Ergo.isBoolean
	 * @function
	 * @param {Object} obj
	 */
	$.isBoolean = function(obj) {
		return typeof obj == 'boolean';
	};
	/**
	 * Является ли объект числом
	 *
	 * @name $.isNumber
	 * @function
	 * @param {Object} obj
	 */
	// $.isNumber = function(obj) {
		// return typeof obj == 'number';
	// };










	//---------------------------------------------------
	//
	// Фильтры
	//
	//---------------------------------------------------


	// E.sort_numbers = function(a, b) {
	// 	return a - b;
	// };





	E.KeyCode = {
		UP: 38,
		DOWN: 40,
		ENTER: 13,
		ESC: 27
	};













	return E;
})();

//var _dino = Ergo;


// alias for Ergo
var ergo = Ergo;


/**
 * @namespace
 */
Ergo.core = {};








/*
 * Расширяем базовый класс Array методом удаления элемента
 *
 * @name Array.prototype.remove
 * @function
 * @param {Any} val элемент массива
 */

/*
Array.prototype.remove = function(val) {
	var index = -1;
	for(var i = 0; i < this.length; i++) {
		if(this[i] == val) {
			index = i;
			break;
		}
	}
	if(index != -1) this.splice(index, 1);

	return (index != -1);
}
*/




Ergo.globals = {

};





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


//------------------------------------------------------
//
// Расширения базовых классов
//
//------------------------------------------------------


String.prototype.capitalize = function() {
//	var s = '';
//	for(i = 1; i < this.length; i++) s += this[i];
	return this.charAt(0).toUpperCase() + this.substr(1);
};

// String.prototype.trim = function(){
// 	return this.replace(/^\s+|\s+$/g, '');
// };

/**
 * Добавление карринга к классу Function
 */
Function.prototype.curry = function(arg) {
	var F = this;
	var pre_args = arguments;
//	for(var i = 0; i < arguments.length; i++) pre_args.push(arguments[i]);
	return function(){
		var args = [];
		for(var i = 0; i < pre_args.length; i++) args.push(pre_args[i]);
		for(var i = 0; i < arguments.length; i++) args.push(arguments[i]);
//			args.unshift(arg);
		return F.apply(this, args);
	};
};


Function.prototype.rcurry = function(arg) {
	var F = this;
	var post_args = arguments;
//		for(var i = 0; i < arguments.length; i++) post_args.push(arguments[i]);
	return function(){
		var args = [];
		for(var i = 0; i < arguments.length; i++) args.push(arguments[i]);
		for(var i = 0; i < post_args.length; i++) args.push(post_args[i]);
//			args.push(arg);
		return F.apply(this, args);
	};
};



Function.prototype.debounce = function(wait, immediate) {
	var func = this;
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};




//------------------------------------
//
// Методы для работы с коллекциями
//
//------------------------------------





(function(){

	var E = Ergo;




	/**
	 * Последовательный обход каждого элемента массива или хэша
	 *
	 * в jquery есть функция $.each, но меня не устраивает порядок аргументов в замыкании
	 *
	 * @name Ergo.each
	 * @function
	 * @param {Object|Array} src объект, элементы которого необходимо просмотреть
	 * @param {Function} callback функция, вызываемая для каждого элемента
	 */
	E.each = function(src, callback){
		if( Array.isArray(src) ){
			// for(var i = 0; i < src.length; i++)
			// 	callback.call(src, src[i], i)
			src.forEach(callback);
		}
		else {
			var obj = src;
			for(var i in obj){
				callback.call(obj, obj[i], i);
//				if( callback.call(obj, obj[i], i) === false ) return false;
			}
		}
	};

	/**
	 * Фильтрация (как правило приводит к уменьшению размерности)
	 *
	 * Элемент попадает в итоговый объект
	 *
	 * @name Ergo.filter
	 * @function
	 * @param {Object|Array} src объект, элементы которого необходимо фильтровать
	 * @param {Function} callback функция, вызываемая для каждого элемента
	 * @returns {Object|Array} отфильтрованный объект или массив, в зависимости типа src
	 */
	E.filter = function(obj, fn){
		var result;
		if( Array.isArray(obj) ) {
			result = obj.filter(fn);
		}
		else {
			result = {};
			for(var i in obj)
				if( fn.call(obj, obj[i], i) ) result[i] = obj[i];
		}
		return result;
	};



	/*
	 * Фильтрация ключей.
	 *
	 * В результат попадают только индексы
	 *
	 * @param {Object|Array} src объект, элементы которого необходимо фильтровать
	 * @param {Function} callback функция, вызываемая для каждого элемента
	 * @returns {Object|Array} отфильтрованный объект или массив, в зависимости типа src
	 */
	E.filter_keys = function(src, fn){
		var result = [];
		if(Array.isArray(src)) {
			for(var i = 0; i < src.length; i++)
				if(fn.call(src, src[i], i)) result.push(i);
		}
		else {
			for(var i in src)
				if(fn.call(src, src[i], i)) result.push(i);
		}
		return result;
	};




	/**
	 * Отображение (размерность сохраняется)
	 *
	 * @name Ergo.map
	 * @function
	 * @param {Object|Array} src коллекция
	 * @param {Function} callback функция, вызываемая для каждого элемента
	 */
	E.map = function(obj, fn) {
		var a;
		if(Array.isArray(obj)) {
			a = obj.map(fn);
		}
		else {
			a = {};
			for(var i in obj) a[i] = fn.call(obj, obj[i], i);
		}
		return a;
	};


	/**
	 * Свертка (размерность сохраняется)
	 *
	 * @name Ergo.reduce
	 * @function
	 * @param {Object|Array} src коллекция
	 * @param {Function} callback функция, вызываемая для каждого элемента
	 * @param {Any} initValue начальное значение (по умолчанию: [])
	 */
	E.reduce = function(obj, fn, init_value) {
		var a = init_value || [];
		if(Array.isArray(obj)) {
			obj.reduce(fn, a);
		}
		else {
			for(var i in obj)
				fn.call(obj, a, obj[i], i, obj);
		}
		return a;
	}


	/**
	 * Поиск первого элемента, удовлетворяющего критерию
	 *
	 * @name Ergo.find
	 * @function
	 * @param {Object|Array} obj коллекция
	 * @param {Function|Any} criteria критерий
	 */
	E.find = function(obj, criteria) {
		if(!$.isFunction(criteria)){
			var x = criteria;
			criteria = function(it) { return it == x; };
		}
		if(Array.isArray(obj)) {
			for(var i = 0; i < obj.length; i++)
				if(criteria.call(obj, obj[i], i)) return obj[i];
		}
		else {
			for(var i in obj)
				if(criteria.call(obj, obj[i], i)) return obj[i];
		}

		return null;
	};


	/**
	 * Псевдоним для {@link Ergo.filter}
	 *
	 * @name Ergo.find_all
	 * @function
	 */
	E.find_all = E.filter;



	/**
	 * Получение индекса (или ключа) элемента в коллекции
	 *
	 * Если критерий не является функцией, то используется метод Ergo.eq
	 *
	 * @name Ergo.key_of
	 * @function
	 * @param {Object|Array} obj коллекция
	 * @param {Function|Any} criteria критерий
	 */
	E.key_of = function(obj, criteria) {

		if(!$.isFunction(criteria))
			criteria = E.eq.curry(criteria);

		if( Array.isArray(obj) ) {
			for(var i = 0; i < obj.length; i++)
				if(criteria.call(obj, obj[i], i)) return i;
		}
		else {
			for(var i in obj)
				if(criteria.call(obj, obj[i], i)) return i;
		}
		return -1;
	};


	E.index_of = E.key_of;


	/**
	 * Вызов метода для всех элементов коллекции
	 *
	 * Аргументы вызываемого метода передаются в виде массива
	 *
	 * Ergo.apply_all(items, 'show', [10, 45]);
	 *
	 * @name Ergo.apply_all
	 * @function
	 * @param {Object|Array} obj коллекция
	 * @param {String} m_name имя метода
	 * @param {Array} [args] список аргументов
	 *
	 */
	E.apply_all = function(obj, m_name, args) {
		if( Array.isArray(obj) ) {
			for(var i = 0; i < obj.length; i++) {
				if(obj[i][m_name]) obj[i][m_name].apply(obj[i], args || []);
			}
		}
		else {
			for(var i in obj) {
				if(obj[i][m_name]) obj[i][m_name].apply(obj[i], args || []);
			}
		}
	};

	/**
	 * Вызов метода для всех элементов коллекции
	 *
	 * Аргументы вызываемого метода начинаются с 3 аргумента
	 *
 	 * Ergo.call_all(items, 'show', 10, 45);
	 *
	 * @name Ergo.call_all
	 * @function
	 * @param {Object|Array} obj коллекция
	 * @param {String} m_name имя метода
	 *
	 */
	E.call_all = function(obj, m_name) {
		var args = [];
		for(var i = 2; i < arguments.length; i++) args[i-2] = arguments[i];
		for(var i in obj) {
			if(obj[i][m_name]) obj[i][m_name].apply(obj[i], args);
		}
	};



	/**
	 * Проверка, содержится ли элемент в коллекции
	 *
	 * @name Ergo.includes
	 * @function
	 * @param {Array|Object} obj коллекция
	 * @param {Any} val значение
	 */
	E.includes = function(obj, val) {
		if( Array.isArray(obj) )
			return obj.indexOf(obj) != -1;
		else {
			for(var i in obj)
				if(obj[i] === val) return true;
			return false;
		}
	};

	E.contains = E.includes;
	E.is_include = E.includes;



	E.size = function(obj) {

		if(Array.isArray(obj)) return obj.length;

		return obj.keys().length;
	};





/**
	 * Удаление элементов массива
	 */
	E.remove = function(obj, criteria) {

		var f = criteria;

		if( !$.isFunction(criteria) ) {
			f = function(item, i) { return item === criteria; };
		}

		var indices = [];

		for(var i = 0; i < obj.length; i++) {
			if( f.call(obj, obj[i], i) ) {
				indices.push(i);
			}
		}

//		var arr = this;

		var removed = [];

		for(var i = indices.length-1; i >= 0; i--) {
			var idx = indices[i];
			removed.push(obj[idx]);
			obj.splice(idx, 1);
		}

		// indices.reverse().forEach( function(i) {
		// 	removed.push(arr[i]);
		// 	arr.splice(i, 1);
		// } );

		return removed;
	};



	E.uniq = function(obj) {
		var result = [];
		for(var i = 0; i < obj.length; i++) {
			if(result.indexOf(obj[i]) == -1) result.push(obj[i]);
		}
		return result;
	};






	/**
	 * Удаление элемента из массива (массив уменьшает размерность)
	 *
	 * @name Ergo.remove
	 * @function
	 * @param {Object} arr массив
	 * @param {Object} val удаляемый элемент
	 */

	//TODO в качестве значения может выступать критерий, а удаление может происходить как из массива, так и из хэша

	// E.remove = function(arr, val) {
	// 	var index = -1;
	// 	for(var i = 0; i < arr.length; i++) {
	// 		if(arr[i] === val) {
	// 			index = i;
	// 			break;
	// 		}
	// 	}
	// 	if(index != -1) arr.splice(index, 1);

	// 	return (index != -1);
	// };





})();





(function(){
	
	
	var F = Ergo;

	


	// "пустой" фильтр
	F.noop = function(){ return false; };
	// по индексу
	F.by_index = function(index, child, i){ return index == i; };
	// по совпадению набора свойств
	F.by_props = function(props, child){
		for(var i in props)
			if(child[i] != props[i]) return false;
		return true; 
	};
	// по опциям
	F.by_opts = function(opts, child){
		for(var i in opts)
			if(child.opt(i) != opts[i]) return false;
		return true; 
	};
	// по классу
	F.by_class = function(clazz, child){
		return (child instanceof clazz);
	};
	
	
	
	/**
	 * Предикативная функция равенства
	 * 
	 * Используется оператор ==
	 * 
	 * @name Ergo.eq
	 * @function
	 * @param {Object|Array} obj коллекция
	 * @param {Object} item элемент коллекции
	 * @param {Object} i ключ/индекс элемента
	 */
	F.eq = function(obj, item, i) {
		return obj == item;
	};
	
	/**
	 * Предикативная функция неравенства
	 * 
	 * Используется оператор !=
	 * 
	 * @name Ergo.ne
	 * @function
	 * @param {Object|Array} obj коллекция
	 * @param {Object} item элемент коллекции
	 * @param {Object} i ключ/индекс элемента
	 */
	F.ne = function(obj, item, i) {
		return obj != item;
	};
	
	
	// F.ne = function(obj) {
		// return function(it) { return obj != it; };
	// }
// 
	// F.eq = function(obj) {
		// return function(it) { return obj == it; };
	// }
	
	// комплексный фильтр виджетов
	F.by_widget = function(i) {
		
		var f = null;
		
		if( $.isString(i) ) f = F.by_opts.curry({'name': i});
		else if( $.isNumeric(i) ) f = F.by_index.curry(i);//return this.widgets[i]; // упрощаем
		else if( $.isPlainObject(i) ) f = F.by_props.curry(i);
		else if( $.isClass(i) ) f = F.by_class.curry(i);
		else if( $.isFunction(i) ) f = i;
		
		return f;
	};






})();





(function(){


	var E = Ergo;


	E.indent_s = '\t';

	/**
	 * Печать объекта в удобочитаемой форме
	 *
	 * @name Ergo.pretty_print
	 * @function
	 * @param {Any} obj любой объект/примитив
	 * @param {Integer} indent отступ
	 * @param {Integer} i_symb исимвол отступа
	 * @returns {String}
	 */
	E.pretty_print = function(obj, indent) {

		if(obj == undefined) return undefined;

		indent = indent || 0;
		var tabs = '';
		for(var i = 0; i < indent; i++) tabs += E.indent_s;

		if(obj.pretty_print) return obj.pretty_print(indent);

		if($.isString(obj))
			return '"'+obj.replace(/\n/g, '\\n')+'"';
		else if($.isBoolean(obj))
			return ''+obj;
		else if($.isNumeric(obj) || $.isBoolean(obj))
			return obj;
		else if($.isArray(obj)){
			var items = [];
			E.each(obj, function(item){
				items.push(E.pretty_print(item, indent));
			});
			return '[' + items.join(', ') + ']';
		}
		else if($.isFunction(obj)){
			return 'function() { ... }';
		}
		else if($.isPlainObject(obj) || !indent){
			var items = [];
			E.each(obj, function(item, key){
				if(key[0] == '!' || key[0] == '-' || key[0] == '+') key = "'"+key+"'";
				items.push(tabs + E.indent_s + key + ': ' + E.pretty_print(item, indent+1));
			});
			return '{\n' + items.join(',\n') + '\n' + tabs + '}';
		}
		else
			return obj;

	};


	/**
	 * Экранирование строки для вывода в html
	 *
	 * @name Ergo.escapeHtml
	 * @function
	 * @param {String} s строка
	 * @returns {String} экранированная строка
	 */
	E.escapeHtml = function(s) {
		return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
	};




	/**
	 *
	 *
	 * @name Ergo.timestamp
	 * @function
	 */
	E.timestamp = function() {
		return new Date().getTime();
	};






	/**
	 * Форматированный вывод значений.
	 *
	 * @example
	 * Ergo.format("%s items from %s selected", 1, 10);
	 *
	 * @name Ergo.format
	 * @function
	 * @param {String} format_str строка форматирования
	 * @return {String}
	 */
	E.format = function(format_str) {
		var values = [];
		for(var i = 1; i < arguments.length; i++) values.push(arguments[i]);
		return format_str.replace(/(%s)/g, function(str) {
			var replace_val = '';
			if(str == '%s') replace_val = ''+values.shift();
			return replace_val;
		});
	};

	/**
	 * Форматированный вывод объекта
	 *
	 * @example
	 *
	 * var record = {
	 * 	first_name: 'Alice',
	 * 	last_name: 'Green',
	 * 	email_count: 3
	 * }
	 *
	 * Ergo.format_obj("#{first_name} #{last_name} has #{email_count} e-mails", record);
	 *
	 * Output: Alice Green has 3 e-mails
	 *
	 * @name Ergo.format_obj
	 * @function
	 * @param {Object} format_str строка форматирования
	 * @param {Object} obj объект
	 */
	E.format_obj = function(format_str, obj) {
		if(obj === null || obj === undefined) return '';
		return format_str.replace(/#{\s*(.+?)\s*}/g, function(str, key) {
			var o = obj;

			var fmt_a = [];
			if( key.indexOf('|') > 0 ) {
				var a = key.split('|');
				key = a[0];
				for(var i = 1; i < a.length; i++) {
					fmt = Ergo.alias('formats:'+a[i]);
					if(!fmt)
						console.warn('Format ['+a[i]+'] is not registered');
					fmt_a.push(fmt);
				}
			}

			if(key && key != '*') {
				var arr = key.split('.');
				for(var i = 0; i < arr.length; i++) {
					if(o == null) return o;
					o = o[arr[i]];
				}
			}


			for(var i = 0; i < fmt_a.length; i++)
				o = fmt_a[i](o);

			return o === undefined ? '' : o;
		});
	};



	E.unformat_obj = function(format_str, obj) {

		var n=0;

		var tmpl = ufmt.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");

		var keys = []

		tmpl = tmpl.replace(/#\\{\s*(.+?)\s*\\}/g, function(str, key) {
		  keys.push(key);
		  return '(.+?)'
		});

		var m = s.match(tmpl);

		if( keys[0] == '*') {
			return m[1];
		}
		else {
			var v = {}
			keys.forEach(function(key, i) {
			  v[key] = m[i+1]
			})
			return v;
		}

	};



	/**
	 * Полное копирование объекта.
	 *
	 * Копируются вложенные простые объекты и массивы
	 *
	 * @name Ergo.deep_copy
	 * @function
	 * @param {Any} src копируемый объект
	 */
	E.deep_copy = function(src) {
		var copy = null;

//		var is_po = $.isPlainObject(src);
//		if(is_po || $.isArray(src)){
		var is_po = (src && src.constructor == Object);
		if( src && (is_po || src.constructor == Array)) {
			copy = is_po ? {} : [];
			for(var i in src)
				copy[i] = E.deep_copy(src[i]);
//			E.each(src, function(item, i){
//				copy[i] = E.deep_copy(item);
//			});
		}
		else{
			copy = src;
		}

		return copy;
	};




	E.loadpath = {};


	/*
	 * Синхронная загрузка модулей через Ajax
	 *
	 * В качестве аргументов передается список путей к классам
	 *
	 */
	E.require = function() {

		for(var i = 0; i < arguments.length; i++) {

			var class_name = arguments[i];

			//TODO здесь нужно проверить, загружен ли класс
			try{
				if( eval('typeof '+class_name) == 'function') continue;
			}
			catch(e) {
			}

			for(var j in E.loadpath) {
				if(class_name.search(j) != -1) {
					class_name = class_name.replace(j, E.loadpath[j]);
					break;
				}
			}

			var url = class_name.replace(/\./g, '/') + '.js';

			$.ajax({
			  url: url,
			  dataType: "script",
			  success: function(){
			  	//TODO здесь нужно вызывать функцию, оповещающую, что класс загружен
			  },
			  error: function(jqXHR, textStatus, errorThrown){
			  	console.log(errorThrown);
			  },
			  async: false
			});

		}


	};




	//TODO перенести в примеси
	E.glass_pane = function() {

		return $('<div class="e-glass-pane" autoheight="ignore"/>')
			.on('mousedown', function(e){
				e.preventDefault();
				return false;
			});

	};





	E.debounce = function debounce(func, wait, immediate) {
		var timeout;
		return function() {
			var context = this, args = arguments;
			var later = function() {
				timeout = null;
				if (!immediate) func.apply(context, args);
			};
			var callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if (callNow) func.apply(context, args);
		};
	};









	//FIXME по большому счету это нужно только для корректной работы с событиями клавиатуры
	/*Browser detection patch*/
	E.browser = {};
	E.browser.mozilla = /mozilla/.test(navigator.userAgent.toLowerCase()) && !/webkit/.test(navigator.userAgent.toLowerCase());
	E.browser.webkit = /webkit/.test(navigator.userAgent.toLowerCase());
	E.browser.opera = /opera/.test(navigator.userAgent.toLowerCase());
	E.browser.msie = /msie/.test(navigator.userAgent.toLowerCase());



})();





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





/**
 * @name Ergo.events
 * @namespace
 */


/**
 *
 * @deprecated
 *
 * @class
 * @name Ergo.events.Event
 * @extends Ergo.core.Object
 */
Ergo.declare('Ergo.core.Event', Ergo.core.Object, /** @lends Ergo.events.Event.prototype */{

	_initialize: function(baseEvent) {
		this.base = baseEvent;
	},


// Ergo.core.Event = function(baseEvent) {
// 	this.base = baseEvent;
// }
//
// Ergo.override(Ergo.core.Event.prototype, {

	stop: function(immediate) {
//		if(this.base) this.base.stopPropagation(); //FIXME
		var e = this.base;
		while(e) {
			if(e.stopPropagation) {
				e.stopPropagation();
				break;
			}
			e = e.base;
		}
		this.stopped = true;
		if(immediate)
			this.stopedImmediate = true;
	},
	interrupt: function() {
		var e = this.base;
		while(e) {
			if(e.stopImmediatePropagation) {
				e.stopImmediatePropagation();
				break;
			}
			e = e.base;
		}
//		if(this.base) this.base.stopImmediatePropagation(); //FIXME
		this.stopped = true;
		this.stopedImmediate = true;
	},
	yield: function() {
		this._yielded = true;
	},
	cancel: function() {
		this.canceled = true;
	}

});


// Ergo.declare('Ergo.events.Event', Ergo.core.Object, /** @lends Ergo.events.Event.prototype */{
//
// 	/**
// 	 * @param {Object} overrides
// 	 * @param {Object} baseEvent
// 	 */
// 	_initialize: function(overrides, baseEvent) {
// 		this._super();
// //		Ergo.events.Event.superclass._initialize.call(this);
//
// 		if(overrides) Ergo.override(this, overrides);
//
// //		this.is_stopped = false;
// 		this.baseEvent = baseEvent;
// 		this.canceled = false;
// 		this.stopped = false;
// 	},
//
//
// 	cancel: function(){
// 		this.canceled = true;
// 	},
//
// 	stop: function() {
// 		if(this.baseEvent) this.baseEvent.stopPropagation();
// 		this.stopped = true;
// 	}
//
//
//
// });


// Ergo.declare('Ergo.events.CancelEvent', 'Ergo.events.Event', /** @lends Ergo.events.CancelEvent.prototype */{
//
	// /**
	 // * @constructs
 	 // * @extends Ergo.events.Event
	 // * @param {Object} overrides
	 // * @param {Object} baseEvent
	 // */
	// _initialize: function(overrides, baseEvent) {
		// this._super(overrides, baseEvent);
// //		Ergo.events.CancelEvent.superclass._initialize.apply(this, arguments);
		// this.isCanceled = false;
	// },
//
	// cancel: function(){
		// this.isCanceled = true;
	// }
//
// });




/**
 * Диспетчер событий
 *
 * @class
 * @name Ergo.core.Observer
 * @extends Ergo.core.Object
 */
Ergo.declare('Ergo.core.Observer', 'Ergo.core.Object', /** @lends Ergo.core.Observer.prototype */{

	_initialize: function(target) {
		this.events = {};
		this.target = target;
	},

	/**
	 * Регистрируем событие.
	 *
	 * on(type, callback, target)
	 */
	on: function(type, callback, target) {
		if(!(type in this.events)) this.events[type] = [];//new Ergo.core.Array();
		var h_arr = this.events[type];
		h_arr.push({'callback': callback, 'target': target || this.target});
		return this;
	},

	/**
	 * Однократная обработка события
	 */
	once: function(type, callback, target) {
		if(!(type in this.events)) this.events[type] = [];
		var h_arr = this.events[type];
		h_arr.push({'callback': callback, 'target': target || this.target, 'once': true});
		return this;
	},

	/**
	 * Убираем регистрацию события.
	 *
	 * off(type)
	 * off(callback)
	 * off(type, callback)
	 * off(target)
	 * off();
	 */
	off: function(arg, arg2) {

		var events = this.events;

		if(arguments.length == 0) {
			this.events = {};
		}
		else if(arguments.length == 2){
			events[arg] = events[arg].filter( function(h) { return h.callback != arg2; } );
		}
		else if( $.isString(arg) ){
			// удаляем все обработчики с данным именем
			delete events[arg];
		}
		else if( $.isFunction(arg) ){
			// удаляем указанный обработчик
//			for(var i = 0; i < events.length; i++) {
			for(var i in events) {
				events[i] = events[i].filter( function(h) { return h.callback != arg; } );
			}
		}
		else {
			// удаляем все обработчики для указанного объекта
//			for(var i = 0; i < e.length; i++) {
			for(var i in events) {
				events[i] = events[i].filter( function(h) { return h.target != arg; } );
			}
		}

		return this;
	},

	// unreg_all: function() {
	// 	this.events = {};
	// },

	/**
	 * Инициируем событие.
	 *
	 * fire(type, event)
	 *
	 * type - тип события в формате тип_1.тип_2 ... .тип_N
	 *
	 */
	fire: function(type, _event, baseEvent) {

		// "ленивая" генерация базового события
		// var _event = {
		// 	base: baseEvent,
		// 	stop: function(immediate) {
		// 		if(this.base) this.base.stopPropagation(); //FIXME
		// 		this.stopped = true;
		// 		if(immediate)
		// 			this.stopedImmediate = true;
		// 	},
		// 	interrupt: function() {
		// 		if(this.base) this.base.stopImmediatePropagation(); //FIXME
		// 		this.stopped = true;
		// 		this.stopedImmediate = true;
		// 	},
		// 	yield: function() {
		// 		this._yielded = true;
		// 	}
		// };
		var e = new Ergo.core.Event(baseEvent);

		if(arguments.length == 1) {
//			_event = new Ergo.events.Event();
//			e = new Ergo.events.Event();
		}
		else if( $.isPlainObject(_event) ){
			Ergo.override(e, _event);
//			_event.baseEvent = baseEvent;
//			e = new Ergo.events.Event(e, baseEvent);
		}
		else {
			e = _event;
		}



//		var self = this;
		var h_arr = this.events[type];
		if(h_arr && h_arr.length) {

			var yielded = [];

			for(var i = h_arr.length-1; i >= 0; i--) {
				var h = h_arr[i];
				if(e._yielded) {
					yielded.push(h);
				}
				else {
					h.callback.call(h.target, e, type);
					if(e.stopedImmediate) break;
				}
			}

			for(var i = yielded.length-1; i >= 0; i--) {
				var h = yielded[i];
				h.callback.call(h.target, e, type);
			}

// 			h_arr.forEach( function(h){
// 				// вызываем обработчик события
// 				h.callback.call(h.target, e, type);
// 				// если усьановлен флаг остановки, то прекращаем обработку событий
// //				if(e.stopped) return false;
// 			});
			// ?

			// удаляем обработчики, имеющие статус `once`
			if(this.events[type])
				this.events[type] = this.events[type].filter( function(h) { return !h.once; } );
		}

		if(e.after && !e.stopped)
			e.after.call(this.target, e, type);

//		self.on_fire(type, e, baseEvent);

		return e;
	}


	// bubble: function() {
//
	// }
//
//
	// /**
	 // * Метод, вызываемый после отрабатывания метода fire
	 // *
	 // */
	// on_fire: function(type, e, base_event) {
//
	// }


});




/**
 *
 * @mixin observable
 *
 */
Ergo.alias('includes:observable', {

	_construct: function(o) {

		this.events = new Ergo.core.Observer(this);

	},


	_post_construct: function(o) {


		if('events' in o){
			for(var i in o.events){
				var callback_a = o.events[i];
				callback_a = Array.isArray(callback_a) ? callback_a : [callback_a]; //FIXME
				for(var j in callback_a) {
					var callback = callback_a[j];

					if( $.isString(callback) ) {
						var a = callback.split(':');
						callback = (a.length == 1) ? this[callback] : this[a[0]].rcurry(a[1]).bind(this);
					}

					var name_a = i.split(':');

					if( name_a.length == 2 && this[name_a[0]] ) {
						this[name_a[0]].events.on( name_a[1], callback, this );
					}
					else {
						this.events.on(i, callback, this);
					}

					// if(i.indexOf('ctx:') == 0) {
					// 	// Context
					// 	(this._context || Ergo.context).events.on(i.substr(4), callback, this);
					// }
					// else if(i.indexOf('jquery:') == 0) {
					// 	// jQuery
					// 	self.el.on(i.substr(7), callback.rcurry('jquery').bind(this));
					// }
					// else {
					// 	// Widget
					// 	this.events.on(i, callback, this);
					// }
				}
			}
		}



		var regexp = /^on\S/;
		for(var i in o){
			if(regexp.test(i)){
				var name = i.charAt(2).toLowerCase() + i.slice(3);
				var chain = ( !Array.isArray(o[i]) ) ? [o[i]] : o[i];
				for(var j = 0; j < chain.length; j++) {
					var callback = chain[j];
					if( $.isString(callback) ) {
						var a = callback.split(':');
						callback = (a.length == 1) ? this[callback] : this[a[0]].rcurry(a[1]).bind(this);
					}
					this.events.on( name, callback );
				}
			}
		}

	}


});





/**
 * Источник данных
 *
 * Опции:
 * 	`lazy` "ленивое" создание элементов (только когда происходит обращение по ключу)
 *
 * События:
 * 	`changed` изменился источник данных
 * 	`diff`
 * 	`dirty`
 *
 * @class
 * @name Ergo.core.DataSource
 * @extends Ergo.core.Object
 *
 */
Ergo.declare('Ergo.core.DataSource', 'Ergo.core.Object', /** @lends Ergo.core.DataSource.prototype */{

	defaults: {
//		plugins: [Ergo.Observable],
		include: 'observable',
		lazy: true
	},


	_initialize: function(src, id, o) {

		/**
		 * Ключ связанных данных в источнике данных
		 *
		 * @field id
		 */

		/**
		 * Источник данных
		 *
		 * @field {Any|Ergo.core.DataSource}
		 */
		this.source = src;

		if(arguments.length == 2) {
			if($.isPlainObject(id)) o = id;
			else this._id = id;
		}
		else if(arguments.length == 3) {
			this._id = id;
		}

		if('_id' in this) {
			// if(typeof id == 'string')
			// 	this._id = this._id.split('+');
			if(Array.isArray(id))
				this._id = id;
			else
				this._id = [this._id];
		}


//		this._super(o || {});
		Ergo.core.DataSource.superclass._initialize.call(this, o || {});

		var self = this;
		var o = this.options;
		var val = this.get();

		/**
		 * Элементы данных
		 *
		 * @field
		 */
		this.entries = Array.isArray(val) ? new Ergo.core.Array() : new Ergo.core.Collection();

//		this.events = new Ergo.events.Observer(this);

		if(!o.lazy) {
			Ergo.each(val, function(v, i){	self.entry(i); } );
		}

//		console.log('-- data --');

	},


	_destroy: function() {

		this.del();

		// очищаем регистрацию обработчиков событий
		this.events.off();
		// удаляем все дочерние элементы
		this.entries.apply_all('_destroy');

	},



	/**
	 * Получение вложенного элемента данных по ключу
	 *
	 * @param {String|Any} i ключ
	 * @return {Ergo.core.DataSource} элемент данных
	 */
	entry: function(i) {

//		console.log('-- data entry --');

		var ds = this;

		// multikey
		if( this._id && this._id.length > 1 ) {
			this._id.forEach(function(id) {
				if(id == i) {
					ds = ds.source;
				}
			});
		}

		// если ключ - строка, то он может быть составным
		if($.isString(i)) {
			var a = i.split('.');
			var i = a.pop();
			// двигаемся внутрь объекта по элементам ключа
			for(var j = 0; j < a.length; j++) ds = ds.entry(a[j]);
		}

		var e = ds.entries.get(i);

		if(!e) {
			e = ds._factory(i);
			ds.entries.set(i, e);
		}

		return e;

		// // если ключ существует, то возвращаем соответствующий элемент, иначе - создаем новый
		// if(!ds.entries.has_key(i)) {
		// 	ds.entries.set(i, ds._factory(i));
		// }
		//
		// return ds.entries.get(i);
	},


	/**
	 * Фабрика вложенных элементов
	 *
	 * По умолчанию используется класс Ergo.core.DataSource
	 *
	 * @param {Any} i ключ
	 * @returns {Ergo.core.DataSource}
	 *
	 */
	_factory: function(i) {
		return new Ergo.core.DataSource(this, i);
	},



	_parse: null,

	_compose: null,



	/**
	 * Получение значения источника данных
	 *
	 * Если метод вызывается без аргументов, то он ведет себя как геттер.
	 * Если определен аргумент, то метод является сеттером.
	 *
	 * @param {Any} [v] значение
	 * @private
	 */
	_val: function(v) {
//		if('_cached' in this) return this._cached;
//		var v = undefined;

		if(arguments.length == 0) {
			v = (this.source instanceof Ergo.core.DataSource) ? this.source._val() : this.source;


			if('_id' in this) {

				if(v) {
					// single key
					if(this._id.length == 1) {
						v = v[this._id[0]];
					}
					// multi key
					else {
						var mv = {};
						for(var i = 0; i < this._id.length; i++)
							mv[this._id[i]] = v[this._id[i]];
						v = mv;
						// var mv = [];
						// for(var i = 0; i < this._id.length; i++)
						// 	mv.push( v[this._id[i]] );
						// v = mv;
					}
				}
				else {
					v = undefined;
				}

			}

			// if(this.options.unformat)
			// 	v = this.options.unformat.call(this, v);


		}
		else {

			// if(this.options.format)
			// 	v = this.options.format.call(this, v);

			if (this.source instanceof Ergo.core.DataSource) {
				if('_id' in this) {
					var src = this.source._val();
					// single key
					if(this._id.length == 1) {
						src[this._id[0]] = v
					}
					// multi key
					else {
						for(var i = 0; i < this._id.length; i++) {
							var key = this._id[i];
							if(key in v)
								src[key] = v[key];
						}
						// for(var i in v){//var i = 0; i < this._id.length; i++) {
						// 	src[this._id[i]] = v[i];
						// }
					}
				}
				else {
					this.source._val(v);
				}
	  	}
			else {
				if('_id' in this) {
					var src = this.source;
					// single key
					if(this._id.length == 1) {
						src[this._id[0]] = v
					}
					// multi key
					else {
						for(var i = 0; i < this._id.length; i++) {
							var key = this._id[i];
							if(key in v)
								src[key] = v[key];
						}
						// for(var i in v) {//var i = 0; i < this._id.length; i++) {
						// 	src[this._id[i]] = v[i];
						// }
					}
				}
				else {
					this.source = v;
				}
			}
		}
//		this._cached = v;
		return v;
	},


	/**
	 * Получение значения элемента по ключу
	 *
	 * Если ключ не указан или не определен, то берется значение самого источника данных
	 *
	 * @param {Number|String} [i] ключ
	 * @returns {Any}
	 */
	get: function(i) {
		if(i === undefined){
			return this._val();
		}
		else {
			return this.entry(i).get();
		}
	},

	/**
	 * Полная копия значения
	 *
	 * @param {Number|String} i ключ
	 * @returns {Any}
	 */
	copy: function(i) {
		return Ergo.deep_copy(this.get(i));
	},



	/**
	 * Изменение существующего элемента
	 *
	 * Если аргумент один, то изменяется значение самого источника данных
	 *
	 * @param {String|Number} [i] ключ
	 * @param {Any} val новое значение
	 *
	 */
	set: function(i, newValue) {
		if(arguments.length == 1) {
			newValue = i;

			var oldValue = this.get();





			// var filtered = [];
			// this.entries.each(function(e) {
			// 	//FIXME упрощенная проверка присутствия ключа
			// 	if(newValue && newValue[e.id] === undefined)
			// 		filtered.push(e);
			// });

			// for(var i = 0; i < filtered.length; i++) {
			// 	filtered[i]._destroy();
			// }


			this.entries
				.filter(function(e){
					//FIXME упрощенная проверка присутствия ключа
					return (newValue && newValue[e._id.join('+')] === undefined);
				})
				.each(function(e){
					e._destroy();
				});


			if(this.entries.is_empty())
				this.entries = Array.isArray(newValue) ? new Ergo.core.Array() : new Ergo.core.Collection();

			// удаляем все элементы
//			this.entries.filter(function(e) { return true; }).each(function(e){	e._destroy(); });
			// пересоздаем коллекцию элементов
			// положительный эффект в том, что можно поменять содержимое Object на Array и наоборот
//			this.entries = $.isArray(newValue) ? new Ergo.core.Array() : new Ergo.core.Collection();


			// var entries_to__destroy = [];
//
			// this.entries.each(function(e){
// //				//FIXME упрощенная проверка присутствия ключа
// //				if(newValue[e.id] === undefined) entries_to__destroy.push(e);
				// entries_to__destroy.push(e);
			// });
//
			// for(var i = 0; i < entries_to__destroy.length; i++)
				// entries_to__destroy[i]._destroy();


			// опустошаем список элементов
//			this.entries.apply_all('_destroy');



			this._val(newValue);





			// var ds = this.source;
			// while(ds) {
			// 	ds.events.fire('entry:changed', {entry: this});
			// 	ds = ds.source;
			// }

			if(this.source instanceof Ergo.core.DataSource) {
//				this.source.events.fire('entry:changed', {entry: this, changed: [this]});
				if(!this.source._no_diff) {
					this.source.events.fire('diff', {updated: [this]});
//					this.mark_dirty();
				}
			}

			this.events.fire('changed', {'oldValue': oldValue, 'newValue': newValue});

//			console.log('set', oldValue, newValue);

			if(this.source instanceof Ergo.core.DataSource) {
//				this.source.events.fire('entry:changed', {entry: this, changed: [this]});
				if(!this.source._no_diff) {
//					this.source.events.fire('diff', {updated: [this]});
					this.mark_dirty();
				}
			}


			// var self = this;
			//
			// // FIXME
			// if(this.source instanceof Ergo.core.DataSource) {
			// 	this.source.entries.each(function(e) {
			// 		e._id.forEach(function(id) {
			// 			if(id == self._id[0])
			// 				e.events.fire('changed', {'oldValue': oldValue, 'newValue': newValue});
			// 		})
			// 	});
			// }


//			this._changed = true;
		}
		else {
			return this.entry(i).set(newValue);
		}

	},



	/**
	 * Добавление нового элемента
	 *
	 *
	 * @param {Any} value значение нового атрибута
	 * @param {String|Number} [index] индекс или ключ, куда должен быть добавлен атрибут
	 * @returns {Ergo.core.DataSource}
	 */
	add: function(value, index) {

		var values = this.get();

		var isLast = false;

		if(Array.isArray(values)) {

			if(index == null){
				values.push(value);
				index = values.length-1;
				isLast = true;
			}
			else {

				// меняем индексы элементов данных
				for(var i = values.length-1; i >= index; i--){
					var e = this.entries.get(i);
					// this.events.fire('onIndexChanged', {'oldIndex': j, 'newIndex': (j-1)});
					if(e)
						e._id[0] = i+1;

					this.entries.set(i+1, e);
				}

				// добавляем новый элемент массива
				values.splice(index, 0, value);

				this.entries.set(index, this._factory(index));

			}

		}
		else {
//			throw new Error('Method "add" does not support object src');
			values[index] = value;
		}


		var e = this.entry(index);


//		this.events.fire('entry:added', {'index': isLast ? undefined : index, entry: e});//, 'isLast': isLast});
		if(!this._no_diff) {
			this.events.fire('diff', {created: [e]});
			this.mark_dirty(true);
		}

//		e.events.fire('changed', {created: [e]}); // ?


		return e;
	},


	/**
	 * Удаление элемента.
	 *
	 * Если метод вызывается без аргументов, то удаляется сам источник данных из родительского
	 *
	 * @param {String|Number} [i] ключ
	 *
	 */
	del: function(i) {
		if(arguments.length == 1) {
			this.entry(i).del();
		}
		else {

//			this.events.fire('changed', {/*'oldValue': deleted_value, 'newValue': undefined,*/ deleted: [this]});

			var src = this.source;
			var value = src;

			if( src instanceof Ergo.core.DataSource ) {
				value = src._val();
			}

			var deleted_value = this._val(); //value ? value[this._id[0]] : undefined;

			if(Array.isArray(value)) {

				value.splice(this._id[0], 1);

				if( src instanceof Ergo.core.DataSource ) {
					for(var j = this._id[0]; j < value.length; j++) {
						var e = src.entries.get(j+1);
						if(e)
							e._id[0] = j
					}
				}

			}
			else {
				if(value) {
					for(var j = 0; j < this._id.length; j++)
						delete value[this._id[j]];
				}
			}



			if( this.source instanceof Ergo.core.DataSource ) {
				src.entries.remove(this);
				if(!this.source._no_diff) {
//				src.events.fire('entry:deleted', {'entry': this, 'value': deleted_value});
					this.source.events.fire('diff', {deleted: [this]});
					this.source.mark_dirty(true);
				}
			}


		}
	},




	/**
	 * Удаление элемента.
	 *
	 * @param {Any} [v] элемент
	 *
	 */
	rm: function(v) {

		var val = this._val();

		var k = null;
		var criteria = JSON.stringify(v);
		Ergo.find(val, function(obj, i) {
			if( JSON.stringify(obj) === criteria ) {
				k = i;
				return true; // прекращаем обход
			}
		});

		if( k != null) {
			this.del(k);
		}

	},





	/**
	 * Последовательный обход всех вложенных элементов с поддержкой фильтрации
	 *
	 * @param {Function} callback
	 *
	 */
	each: function(callback, filter, sorter) {

		var ds = this;

		var values = ds.get();
//		var keys = this.keys(this.options.filter);

		var filter = filter || ds.options.filter;
		var sorter = sorter || ds.options.sorter;


		if( filter || sorter ) {

			var kv_a = [];

			// Filtering source and mapping it to KV-array
			Ergo.each(values, function(v, i) {
				if(!filter || filter.call(ds, v, i)) {
					kv_a.push( [i, v] );
	//				callback.call(self, self.entry(i), i, v);
				}
			});



			if(sorter) {
				// Sorting KV-array
				kv_a.sort( sorter );
			}


			for(var i = 0; i < kv_a.length; i++) {
				var kv = kv_a[i];
				callback.call(ds, ds.entry(kv[0]), kv[0], kv[1]);
			}

		}
		else {

			Ergo.each(values, function(v, i) {
				callback.call(ds, ds.entry(i), i, v);
			});

		}


		// var keys = [];
		// if($.isArray(values)) {
			// for(var i = 0; i < values.length; i++) keys.push(i);
		// }
		// else {
			// for(var i in values) keys.push(i);
		// }

		//TODO здесь могут применяться модификаторы списка ключей (сортировка, фильтрация)
		// if(this.options.filter){
			// keys = this.options.filter.call(this, values, keys);
		// }

		// for(var i = 0; i < keys.length; i++){
			// var k = keys[i];
			// callback.call(this, this.entry(k), k, values[k]);
		// }
	},



	sync: function(newData) {

		var valueUid = (this.options.valueUid || this._valueUid);
		var valueEql = (this.options.valueEql || this._valueEql);

		var oldData = this._val();

		var diff = {
			created: [],
			deleted: [],
			updated: []
		}

//		console.log('sync', oldData, newData);

		this._no_diff = true;

		// for arrays

		var value_m = {};
		for(var i = 0; i < newData.length; i++) {
			//TODO способ получения ключа может быть сложнее
			var v = newData[i];
			var k = valueUid.call(this, v, i);
			// if(this.options.idKey) {
			// 	value_m[newData[i][this.options.idKey]] = {value: newData[i], index: i};
			// }
			// else {
			value_m[k] = {value: newData[i], index: i};
//			}
		}

//		console.log('sync', JSON.stringify(value_m));

		for(var i = 0; i < oldData.length; i++) {
			var v = oldData[i];
			var k = valueUid.call(this, v, i);
//			var k = (this.options.idKey) ? v[this.options.idKey] : i;
			if( k in value_m ) {
				delete value_m[k];
			}
			else {
				// DELETE
				diff.deleted.push( this.entry(i) );
			}
		}

		for(var i = diff.deleted.length-1; i >= 0; i-- ) {
			diff.deleted[i].del();
		}


		for(var k in value_m) {
			var v = value_m[k].value;
			var i = value_m[k].index;

			// CREATE
			diff.created.push( this.add(v, i) );

		}


		this._val( newData );


		for(var i = 0; i < newData.length; i++) {
			if( !valueEql(oldData[i], newData[i]) ) {
//			if( JSON.stringify(oldData[i]) !== JSON.stringify(newData[i]) ) {
				diff.updated.push( this.entry(i) );
			}
		}

		// if(diff.updated.length != 0) {
		// }


		this._no_diff = false;


//		console.log('sync diff', diff, oldData, newData);

		this.events.fire('diff', diff);

		// for(var i = diff.created.length-1; i >= 0; i-- ) {
		// 	diff.created[i].events.fire('changed');
		// }
		for(var i = diff.updated.length-1; i >= 0; i-- ) {
			diff.updated[i].events.fire('changed');
		}

		this.mark_dirty(true);

	},


	_valueEql: function(a, b) {
		return JSON.stringify(a) === JSON.stringify(b);
	},

	_valueUid: function(v, i) {
		return i;
	},


	// diff: function(difference, filter, sorter) {
	//
	// 	var ds = this;
	//
	// 	// DELETED
	// 	for(var i = 0; i < difference.deleted.length; i++) {
	// 		var d = difference.created[i];
	// 		this.events.fire('entry:deleted', {entry: d.entry});
	// 	}
	//
	// 	// CREATED
	// 	for(var i = 0; i < difference.created.length; i++) {
	// 		var d = difference.created[i];
	// 		if(!filter || filter.call(this, d.value, d.id)) {
	// 			var index = d.id;
	// 			if(sorter) {
	// 				// FIXME поменять поиск на бинарный
	// 			}
	// 		}
	// 	}
	//
	//
	//
	//
	// },

/*
	keys: function(criteria) {
		var keys = [];
		var values = this.get();

		Ergo.each(function(v, i){
			if(criteria || criteria.call(this, v, i)) keys.push(i);
		});

		return keys;

		// if($.isArray(values)) {
			// for(var i = 0; i < values.length; i++) keys.push(i);
		// }
		// else {
			// for(var i in values) keys.push(i);
		// }
		// return keys
	},
*/


	mark_dirty: function(do_event, e) {
		this._changed = true;

		if(this.source && this.source instanceof Ergo.core.DataSource) {// && !this.source._changed)


			var self = this;

			this.source.entries.each(function(src_entry) {
				if(src_entry != self && src_entry._id.length > 1) {
					src_entry._id.forEach(function(id) {
						// FIXME
						if(id == self._id[0]) {
							src_entry.events.fire('dirty', e || {});
						}
					})
				}
			})

			this.source.mark_dirty(true, {updated: [this]});
		}

		if(do_event)
			this.events.fire('dirty', e || {});

	},



	walk: function(callback) {
		//TODO
	},

	/**
	 * Проверка, изменялся ли источник данных или хотя бы один из его атрибутов/элементов
	 *
	 * @returns {Boolean}
	 */
	changed: function() {
		if(this._changed) return true;
		var found = this.entries.find(function(e){ return e.changed(); });
		return found != null;
	},

	/*
	 * Удаление состояния о том, что источник данных или его атрибуты изменялись
	 */
	clean: function() {
		this._changed = false;
		this.entries.apply_all('clean');
	},


	/**
	 * Количество элементов в источнике данных
	 *
	 * @returns {Number}
	 */
	size: function() {
		return Ergo.size(this._val());
	}



});




/**
 * Пространство имен для данных
 *
 * @namespace Ergo.data
 */
Ergo.data = {};


Ergo.$data = Ergo.object;






/**
 * Менеджер состояний
 *
 *
 * @class
 * @name Ergo.core.StateManager
 * @extends Ergo.core.Object
 */
Ergo.declare('Ergo.core.StateManager', 'Ergo.core.Object', /** @lends Ergo.core.StateManager.prototype */{


	_initialize: function(widget) {
		this._widget = widget;
		this._current = {};
		this._states = {};
		this._transitions = [];
		this._exclusives = {};
	},


	transition: function(from, to, value) {

		var t = this._transitions;
//		var s = name.replace(/\s/g, '');
//		if(!t[from]) t[from] = {};
//		t[from][to] = value;
		t.push({
			from: from,
			to: to,
			action: value
		});

	},


	exclusive: function(name, g) {

//		var excl_template = new RegExp('^'+name+'.*$');
		var excl_template = new RegExp('^'+name+'$');

		var group = this._exclusives[g];
		if(!group) group = [];
		this._exclusives[g] = group;

		group.push(excl_template);
	},

	exclusive_group: function(g, exclusives) {
		for(var i = 0; i < exclusives.length; i++)
			this.exclusive(exclusives[i], g);
	},



	state: function(name, value) {

		// парсим код состояния
		var i = name.indexOf(':');
		if( i == 0 ) {
			var g = name.substr(1);
			this.exclusive_group(g, value);
		}
		else {
			if( i > 0 ) {
				var g = name.substr(i+1);
				name = name.substr(0, i);

				this.exclusive(name, g);
			}

			this._states[name] = value;
		}
	},



	/**
	 * Установка состояния
	 *
	 * @param {String} to имя состояния
	 * @param {Object} data данные, связанные с состоянием
	 * @returns {$.Deferred}
	 */
	set: function(to, data) {

		// Если состояние уже установлено, то ничего не делаем
		if(to && (to in this._current))
			return $.when({});




		var self = this;
		var transitions = this._transitions;
		var states = this._states;//this._widget.options.states;

		var from = [];

		// 1.
		var def = null;
		var deferreds = [];

		for(var i = 0; i < transitions.length; i++) {
			var t = transitions[i];
			if(t.to == to && t.from in this._current) {
				var result = t.action.call(this._widget);
				// Если результат является Deferred-объектом, то сохраняем его в цепочку
//				if(result && result.done)
				deferreds.push(result);
//					deferred = deferred ? $.when(deferred, result) : $.when(result);

				from.push(t.from);
			}
			else if(t.to == to && t.from == '*'){
				def = t;
			}
		}
		// for(var i in this._current) {
			// if(i in transitions && to in transitions[i]) {
				// transitions[i][to].call(this._widget);
				// from.push(i);
			// }
		// }

		for(var g in this._exclusives) {
			if( this._is_exclusive(to, g) ) {

				for(var i in this._current)
					if(this._is_exclusive(i, g)) {
						this._state_off(i);
						delete self._current[i];
					}
//						this.unset(i);

			}
		}





		if(from.length == 0 && def) {
			var result = def.action.call(this._widget);

//			if(result && result.done)
			deferreds.push(result);
//				deferred = $.when(result);
		}





		// if(deferreds.length == 0)
			// deferreds.push({});



		//FIXME хак, если Deferred не определен
		// if(deferred == null) {
			// deferred = $.Deferred();
			// deferred.resolve();
		// }




		return $.when.apply($, deferreds).done(function() {

			// 2. удаляем все исходные состояния переходов из списка активных состояний
			for(var i = 0; i < from.length; i++) {
				delete self._current[from[i]];
			}

			// 3. включаем итоговое состояние
			self._state_on(to, data);
			self._current[to] = from;

			// 4. оповещаем виджет, что состояние изменилось
			self._widget.events.fire('stateChanged', {from: from, to: to, data: data});

		});

//		return deferred;
	},



	_state_on: function(s, data) {

		var self = this;
		var states = this._states;//this._widget.options.states;

		if(s in states) {
			var val = states[s];

			// если состояние определено строкой, то строка содержит имя устанавливаемого класса
			if($.isString(val))
				this._widget.el.addClass(val);
			// если состояние определено массивом, то первый элемент содержит состояние ON, а второй элемент состояние OFF
			else if( Array.isArray(val) ) {
				this._widget.el.addClass(val[0]);
				this._widget.el.removeClass(val[1]);
				// if(val.length > 0) {
				// 	$.when( val[0].call(this._widget, true, data) ).done(function(add_cls) {
				// 		if(add_cls !== false)
				// 			self._widget.el.addClass(add_cls || s);
				// 	});
				// }
			}
			// в иных случаях ожидается, что состояние содержит функцию
			else {
				$.when( val.call(this._widget, true, data) ).done(function(add_cls) {
					if(add_cls !== false)
						self._widget.el.addClass(add_cls || s);
				});
			}
		}
		else {
			this._widget.el.addClass(s);
		}

		this._widget.events.fire('stateChanged', {state: s, op: 'on', data: data});
	},





	_state_off: function(s) {

		var self = this;
		var states = this._states;//this._widget.options.states;

		if(s in states) {
			var val = states[s];

			// если состояние определено строкой, то строка содержит имя устанавливаемого класса
			if($.isString(val))
				this._widget.el.removeClass(val);
			// если состояние опрелено массивом, то первый элемент содержит состояние ON, а второй элемент состояние OFF
			else if( Array.isArray(val) ) {
				this._widget.el.addClass(val[1]);
				this._widget.el.removeClass(val[0]);

				// if(val.length > 1) {
				// 	$.when( val[1].call(this._widget, false) ).done(function(rm_cls) {
				// 		if(rm_cls !== false)
				// 			self._widget.el.removeClass(rm_cls || s);
				// 	});
				// }
			}
			// в иных случаях ожидается, что состояние содержит функцию
			else {
				$.when( val.call(this._widget, false) ).done(function(rm_cls) {
					if(rm_cls !== false)
						self._widget.el.removeClass(rm_cls || s);
				});

//				var rm_cls = val.call(this._widget, false);
//				if(rm_cls !== false)
//					this._widget.el.removeClass(s);
			}
		}
		else {
			this._widget.el.removeClass(s);
		}

		this._widget.events.fire('stateChanged', {state: s, op: 'off'});

	},



	_is_exclusive: function(s, g) {

		var group = this._exclusives[g];

		for(var i = 0; i < group.length; i++) {
			if(s.match(group[i])) return true;
		}

		return false;
	},


	/**
	 * Отключение состояния
	 *
	 * @param {String} from имя состояния
	 * @returns {$.Deferred}
	 */
	unset: function(from) {

		// Если состояние не установлено, то ничего не делаем
		if(from && !(from in this._current)) {
			return $.when({});
		}



		var self = this;
		var transitions = this._transitions;
		var states = this._states; //this._widget.options.states;

		var to = [];

		// 1. Вызываем
		var def = null;
		var deferreds = [];

		for(var i = 0; i < transitions.length; i++) {
			var t = transitions[i];
			if(t.from == from && t.to) {
				var result = t.action.call(this._widget);
				// Если результат является Deferred-объектом, то сохраняем его в цепочку
//				if(result && result.done)
//					deferred = $.when(result);
				deferreds.push(result);

				to.push(t.to);
			}
			else if(t.from == from && t.to == '*') {
				def = t;
			}
		}
		// for(var i in transitions[from]) {
			// transitions[from][i].call(this._widget);
			// to.push(i);
		// }




		for(var g in this._exclusives) {
			if( this._is_exclusive(from, g) && this._exclusives[g].length == 2 ) {

				var group = this._exclusives[g];

				var regexp = from.match(group[0]) ? group[1] : group[0];

				for(var i in this._states)
					if( i.match(regexp) ) {
						this._state_on(i);
						self._current[i] = from;
					}
			}
		}





		if(to.length == 0 && def) {
			var result = def.action.call(this._widget);

			deferreds.push(result);
			// //FIXME
			// if(result && result.done)
				// deferred = $.when(result);

		}



		// 2.
		for(var i = 0; i < to.length; i++) {
			self._current[to[i]] = [from];
			if(to[i] in states) self._state_on(to[i]); //states[to[i]].call(self._widget);
		}

		// 3.
		self._state_off(from);

		delete self._current[from];


		// 3.
//		this.state_off(from);



		//FIXME хак, если Deferred не определен
		// if(deferred == null) {
			// deferred = $.Deferred();
			// deferred.resolve();
		// }



		// deferred.done(function() {
//
		// });



//		return deferred;
		return $.when.apply($, deferreds);
	},



	/**
	 * Переключение состояния
	 *
	 * Состояние устанавливается, если флаг равен true и отключается, если флаг false
	 *
	 * @param {String} name имя состояния
	 * @param {boolean} sw флаг переключения
	 */
	toggle: function(name, sw) {

		if(arguments.length == 1) sw = !this.is(name);

		return sw ? this.set(name) : this.unset(name);

//		return this;
	},



	/**
	 * Установка состояния и отключение других состояний, попадающих под шаблон
	 *
	 * @deprecated
	 *
	 * @param {String} name имя состояния
	 * @param {Array|String|RegExp} unset_template шаблон
	 */
	only: function(name, unset_template) {

		var states_to_unset = [];

		if(unset_template) {

			if( $.isArray(unset_template) )
				states_to_unset = unset_template;
			else {
				if($.isString(unset_template))
					unset_template = new RegExp('^'+unset_template+'.*$');

				for(var i in this._current)
					if(i.match(unset_template)) states_to_unset.push(i);
			}
		}
		else {
			for(var i in this._current)
				if(i != name) states_to_unset.push(i);
		}

		// очищаем состояния, выбранные для удаления
		for(var i = 0; i < states_to_unset.length; i++)
			this.unset(states_to_unset[i]);

		// если состояние еще не установлено, то устанавливаем его
		if(!this.is(name))
			this.set(name);

		return this;
	},



	/**
	 * Очистка всех состояний
	 *
	 */
	clear: function() {
		this._current = {};
		return this;
	},


	/**
	 * Проверка, установлено ли состояние
	 *
	 * @param {String} name имя состояния
	 */
	is: function(name) {
		return (name in this._current);
	}



});











/**
 * Плагин, добавляющий StateManager к объекту
 *
 * @mixin statable
 */

Ergo.alias('includes:statable', {

	_construct: function(o) {

		this.states = new Ergo.core.StateManager(this);

	//	var o = this.options;
		var self = this;

		if('states' in o){
			for(var i in o.states)
				this.states.state(i, o.states[i]);
			// настраиваем особое поведение состояния hover
			if('hover' in o.states){
				this.el.hover(function(){ self.states.set('hover'); }, function(){ self.states.unset('hover'); });
			}
		}

		if('transitions' in o) {
			for(var i in o.transitions) {
				var t = o.transitions[i];
				if($.isPlainObject(t)) {
					//TODO
				}
				else {
					var a = i.split('>');
					if(a.length == 1) a.push('');
					this.states.transition(a[0].trim() || '*', a[1].trim() || '*', t);
				}
			}
		}

	}


});





/**
 * @class
 * @name Ergo.core.Layout
 * @param {Object} opts
 */
Ergo.declare('Ergo.core.Layout', 'Ergo.core.Object', /** @lends Ergo.core.Layout.prototype */ {

	defaults: {
//		updateMode: 'auto'
	},

/*
	_initialize: function(o){
//		this._super(o);
		Ergo.core.Layout.superclass._initialize.call(this, o);

		this.events = new Ergo.events.Observer(this);

//		var o = this.options = {};
//
//		Ergo.hierarchy(this.constructor, function(clazz){
//			if('defaults' in clazz) Ergo.smart_override(o, clazz.defaults);
//		});
//		Ergo.smart_override(o, this.defaults, opts);

	},
*/

	/**
	 * ассоциация компоновки с виджетом
	 * @param {Object} c виджет
	 */
	attach: function(c) {

		var o = this.options;

		this._widget = c;

		if('name' in o) this._widget.el.attr('layout', o.name);
		if('cls' in o) this._widget.el.addClass(o.cls.join(' '));

		this.el = this._widget.el;

		if(o.html){
			var html = $(o.html);
			this.el = (o.htmlSelector) ? $(o.htmlSelector, html) : html;
			this._widget.el.append(html);
		}

	},

	/**
	 * удаление ассоциации компоновки с виджетом
	 */
	detach: function() {
//		if('containerCls' in this.options) this.container.el.removeClass(this.options.containerCls);
		if('name' in this.options) this._widget.el.attr('layout', undefined);
		if('cls' in o) this._widget.el.removeClass(o.cls.join(' '));
		delete this._widget;
	},



	/**
	 * Оборачивание элемента.
	 *
	 * @param {Ergo.core.Widget} item виджет
	 * @return {jQuery} jQuery-объект, содержащий обертку и элемент виджета
	 *
	 */
	wrap: function(item) {
		return item.el;
	},


	/**
	 * jQuery-элемент, куда будут добавляться виджеты
	 *
	 */
	select: function(item) {
		return this.el;
//		var o = this.options;
//		return (o.elementSelector) ? o.elementSelector.call(this, item) : this.el;
	},






	/**
	 * добавление нового элемента-виджета в компоновку
	 *
	 * @param {Ergo.core.Widget} item виджет
	 * @param {int} index порядковый номер (может быть не определен)
	 * @param {int} weight вес группы
	 */
	add: function(item, index, weight) {

//		var selector = item.options.layoutSelector;

//		var el = this.el;

		var o = this.options;

		// выбираем элемент, куда будет добавляться элемент-виджет
		var el = (o.selector) ? o.selector.call(this, item) : this.select(item);

		// если вес не указан, то вес считается равным 0
		var weight = item.options.weight || 0;

		item._weight = weight;

		// создаем обертку (если она необходима) для элемента-виджета
		var item_el = (o.wrapper) ? o.wrapper.call(this, item) : this.wrap(item);



		// экспериментальный код
		if(item.options.wrapper) {

			if(item_el == item.el) {
				item_el = $('<div/>').append(item.el);
			}

			item.wrapper = $.ergo( Ergo.deep_override({etype: 'widgets:widget', html: item_el, autoRender: false}, item.options.wrapper) );
			item.wrapper._weight = weight;

		}


		if(item_el != item.el) {
			item._wrapper = item_el;
		}

		// экспериментальный код
		if(item._key && o.autoClass)
			item_el.addClass(item._key);



//		item_el.data('weight', weight);

		item_el[0]._index = index;

		item_el[0]._weight = weight;

		item_el[0]._group = item.options.group;


//		var elements = el.contents();
		var elements = el[0].childNodes;// new Ergo.core.Array(el[0].childNodes);

		// фильтруем список элементов
		if(item.options.group) {
			elements = Array.prototype.filter.call(elements, function(elem) {
				return ( elem._ergo && elem._ergo.options.group == item.options.group )
			});


			// var filtered = [];
			// for(var j = 0; j < elements.length; j++) {
			// 	var elem = elements[j];
			// 	if( elem._ergo && elem._ergo.options.group == item.options.group ) filtered.push(elem);
			// }
			// elements = filtered;


			// elements = Ergo.filter(elements, function(i, elem){
				// return (elem._ergo) ? (elem._ergo.options.group == item.options.group) : false;
			// });
		}






		// если индекс не определен, то элемент должен быть добавлен последним в свою группу
		if(index == null) {


			// обходим все элементы контейнера в поисках первого с большим весом
			var after_el = null;

			// немножко эвристики
			var last = $(elements[elements.length-1]);

//			index = 0;

			if(elements.length == 0) {
				el.append( item_el );
			}
			else if(last[0]._weight <= weight) {
				last.after(item_el);
			}
			// else if(last[0]._weight == weight) {
			// 	last.after(item_el);
			// 	index = last[0]._index+1;
			// }
			else {

				for(var j = 0; j < elements.length; j++) {
					var elem = elements[j];
					var w = elem._weight;// $(elem).data('weight');
					if(w > weight) {
						after_el = $(elem);
						break;
					}
					// else if(w == weight) {
					// 	index = elem._index+1;
					// }
				}
				// elements.each(function(i, elem){
					// var w = elem._weight;// $(elem).data('weight');
					// if(w > weight) {
						// after_el = $(elem);
						// return false;
					// }
				// });


				if(after_el)
					after_el.before( item_el );
				else if(elements.length)
					/*elements.last()*/last.after( item_el );
				else
					el.append( item_el );
			}




//			item_el[0]._index = index;

			// var after_el = null;
			// el.children().each(function(i, elem){
				// var w = $(elem).ergo();
				// if(w && w._weight > weight) {
					// after_el = $(elem);
					// return false;
				// }
			// });
//
			// if(after_el)
				// after_el.before( item_el );
			// else
				// el.append( item_el );
		}
		// else if(index === 0) {
			// var before_a = [];
			// for(var i = elements.length-1; i >= 0; i--) {
				// var w = $(elements[i]).ergo();
				// if(w && w._weight < weight) before_a.push($(elements[i]));
			// }
//
			// if(before_a.length > 0)
				// before_a[before_a.length-1].after( item_el );
			// else if(elements.length)
				// elements.first().before( item_el );
			// else
				// el.prepend( item_el );
		// }
		else {

//			var elements = el[0].childNodes;// new Ergo.core.Array(el[0].childNodes);


			// немножко эвристики
			var last = $(elements[elements.length-1]);

			// if(elements.length > 0)
				// console.log('last ', last[0]);
//			console.log('--1--');
//			console.log(elements.length);
//			console.log(elements[elements.length-1]);
//			if(elements.length != 0)
//			console.log(last[0], last[0]._weight, last[0]._index);
//			console.log('--2--');

//			console.log(index);

			if(elements.length == 0) {
				el.append( item_el );
//				console.log('---1---');
			}
			else if(last[0]._weight == weight && last[0]._index < index){
				last.after(item_el);
//				console.log('---2---');
			}
			else {

//				console.log('---3---', index, last[0]._index);

//				console.log(index, 'layout');

				var arr = [];
				var before_el = null;
				var after_el = null;
	//			this.container.children.each(function(it){
				for(var k = 0; k < elements.length; k++) {
//				elements.each(function(k, child){
					var child = elements[k];

					// it = $(child).ergo();
					// if(!it || it == item) return; //если элемент еще не отрисован, это вызовет ошибку
					// if(it._weight == weight) arr.push(it);//.el);
					// else if(it._weight <= weight) before_el = it.el;
					// else if(!after_el /* || it._weight > after_el._weight*/) after_el = it.el;

					if(child._weight == weight/* && child._index != null*/) arr.push( child );//.el);
					else if(child._weight <= weight) before_el = $(child);

					else if(!after_el /* || it._weight > after_el._weight*/) after_el = $(child);
				}//);




				// for(var i = 0; i < arr.length; i++) {
				// 	if( arr[i]._index >= index  ) {
				// 		if(!after_el) after_el = arr[i].el;
				// 	}
				// 	else {
				// 		before_el = arr[i].el;
				// 	}
				// }


				for(var i = 0; i < arr.length; i++) {
					if( arr[i]._index >= index  ) {
						if(!after_el) after_el = $(arr[i]);
					}
					else {
						before_el = $(arr[i]);
					}
				}



				if(before_el)
					before_el.after( item_el );
				else if(after_el)
					after_el.before( item_el );
				else if(elements.length)
					/*elements.last()*/last.after( item_el );
				else
					el.append( item_el ); //FIXME это уже не нужно



				// }
				// else {
					// arr[index].before(item_el);
				// }
			}



		}
		// else if(index == 0)
			// el.prepend( item.el );
		// else if($.isNumber(index))
			// el.children().eq(index-1).before(item.el);
		// else
			// index.el.before(item.el);

		item._rendered = true;

		this._widget.events.fire('item:rendered', {item: item});

		// deprecated
//		if('itemCls' in this.options) item.el.addClass(this.options.itemCls);
//		if('itemStyle' in this.options) item.el.css(this.options.itemStyle);
	},


	/**
	 * удаление элемента-виджета из компоновки
	 * @param {Object} item
	 */
	remove: function(item) {

		if(item._wrapper) {
			item._wrapper.remove(); //?

			if(item.wrapper)
				item.wrapper._destroy();
		}
		else
			item.el.remove(); //TODO опасный момент: все дочерние DOM-элементы уничтожаются

		item._rendered = false;

		if('itemCls' in this.options) item.el.removeClass(this.options.itemCls);
	},


	/**
	 * очистка компоновки от всех элементов (уничтожения дочерних элементов не происходит)
	 */
	clear: function() {
		this.el.empty(); //WARN еще опасный момент все дочерние DOM-элементы уничтожаются
	},


	/**
	 * обновление компоновки (позиции, размеров элементов)
	 */
	update: function() {

		// AUTO WIDTH
		if(this._widget.options.autoWidth){

			var _el = this._widget.el;

			// если элемент не отображается - его не надо выравнивать
			if(!_el.not(':hidden')) return;


			// рассчитываем отступы
			var dw = 0;
			if(_el.is(':button')) dw = _el.outerWidth(true) - _el.outerWidth();
			else dw = _el.outerWidth(true) - _el.width();
			// скрываем элемент
//			_el.hide();
			_el.addClass('hidden');

			// ищем родителя, у которого определена ширина
			var w = 0;
			_el.parents().each(function(i, el){
				if(!w) w = $(el).width();
				if(w) return false;
			});

			if(_el.attr('autowidth') != 'ignore-siblings') {
				// обходим всех видимых соседей и получаем их ширину
				_el.siblings().not(':hidden').each(function(i, sibling){
					var sibling = $(sibling);
					if(sibling.attr('autoWidth') != 'ignore')
						w -= sibling.outerWidth(true);
				});
			}

			// задаем ширину элемента (с учетом отступов), если она не нулевая
			if(w - dw)
				_el.width(w - dw);

			// отображаем элемент
//			_el.show();

			_el.removeClass('hidden');
		}

		// AUTO HEIGHT
		if(this._widget.options.autoHeight) {//} &&  this.container.options.autoHeight != 'ignore'){

			if(!this.el.is(":visible")) return;
			if(this.el.attr('autoHeight') == 'ignore') return;


			if(this.el.attr('autoHeight') == 'fit') {

				var h0 = this.el.height();
				var dh = this.el.outerHeight() - this.el.height();

				this.el.hide();

				var h = this._widget.options.height || 0;
				this.el.parents().each(function(i, el){
					if(!h) h = $(el).height();
					if(h) return false;
				});

				h = Math.floor(h - dh);

				if(h > h0)
					this.el.height(h);

				this.el.show();

				return;
			}


			var debug = (this._widget.debug == 'autoheight');

			this.el.height(0);


//			this.el.hide();

			var dh = 0;
			var h = 0;
			this.el.parents().each(function(i, el){
				el = $(el);
				var w = el.ergo();
				if((w && w.options.height) || el.attr('autoHeight') == 'true' || el.attr('autoHeight') == 'stop' || el.is('body')){
					h = el.height();
//					h = el[0].scrollHeight;
					return false;
				}
				else {
//					if(dh == 0) dh = el.height();
					if(el.attr('autoheight') != 'ignore-siblings') {
						dh += (el.outerHeight(true) - el.height());
						el.siblings().not('td, :hidden').each(function(i, sibling){
							sibling = $(sibling);
							if(sibling.attr('autoHeight') != 'ignore')
								dh += sibling.outerHeight(true);
						});
					}
				}
			});


			if(Ergo.context.debug) console.log({h: h, dh: dh});

			dh += (this.el.outerHeight(true) - this.el.height());

			if(Ergo.context.debug) console.log({h: h, dh: dh});


			var self = this;

			// обходим все соседние элементы
			var h_ratio = 1;
			this.el.siblings().not('td').each(function(i, sibling){
				sibling = $(sibling);
				var ah = sibling.attr('autoHeight');
				// элемент видимый
				if(!ah) {
					if(sibling.is(':visible'))
						dh += sibling.outerHeight(true);
				}
				else if(ah != 'ignore-siblings' && ah != 'ignore') {
					h_ratio++;
					dh += sibling.outerHeight(true) - sibling.height();
				}
			});



			// var h_ratio = 1;
//
			// if(this.container.parent) {
//
			// this.container.parent.children.each(function(sibling){
				// if(sibling == self.container) return;
				// var ah = sibling.options.autoHeight;
				// if(!ah) {
					// dh += sibling.el.outerHeight(true);
				// }
				// else if(ah != 'ignore-siblings') {
					// h_ratio++;
					// dh += sibling.el.outerHeight(true) - sibling.el.height();
				// }
			// });
//
			// }



			// if(this.el.attr('autoheight') != 'ignore-siblings') {
				// this.el.siblings().not('td, :hidden').each(function(i, sibling){
					// sibling = $(sibling);
					// if(sibling.attr('autoHeight') != 'ignore') {
						// dh += sibling.outerHeight(true);
						// if(debug)	console.log({type: 'sibling', el: sibling, h: sibling.outerHeight(true)});
					// }
				// });
			// }




			if(Ergo.context.debug) console.log({h: h, dh: dh});

//			this.el.height((h - dh)/h_ratio);

			if( this.options.autoHeightType == 'min' ) {

				this.el.height('');

				this.el.css('min-height', (h - dh)/h_ratio);
			}
			else if( this.options.autoHeightType == 'max' ) {

				this.el.height('');

				this.el.css('max-height', (h - dh)/h_ratio);
			}
			else {
				this.el.height((h - dh)/h_ratio);
			}

//			this.el.show();

		}

		// AUTO FIT
		if(this._widget.options.autoFit === true){

			var dw = this.el.outerWidth() - this.el.width();
			var dh = this.el.outerHeight() - this.el.height();

			this.el.hide();

			var h = this._widget.options.height || 0;
			var w = this._widget.options.width || 0;
			this.el.parents().each(function(i, el){
				if(!h) h = $(el).height();
				if(!w) w = $(el).width();
				if(w && h) return false;
			});

			this.el.siblings().not(':hidden').each(function(i, el){
				w -= $(el).outerWidth(true);
			});

			this.el.width(w - dw);
			this.el.height(Math.floor(h - dh));

			this.el.show();
		}


	},

	/**
	 * обновление компоновки (порядка, количества элементов)
	 */
	rebuild: function() {},



	build: function() {

//		var render_list = [];

		// this._widget.children.each(function(item){
//
//
//
		// });


	}



}, 'layouts:default');






// Ergo.$layout = function(o, etype) {
	// return Ergo.object(o, 'layout:'+etype);
// };



/**
 *  Пространство имен для компоновок
 * @namespace
 */
Ergo.layouts = {};


//Ergo.$layouts = Ergo.object;

Ergo.$layouts = function(o, etype) {

	var clazz = Ergo._aliases[etype];

	if(!clazz/*!Ergo.alias(etype)*/) {

		var i = etype.indexOf(':');
		if(i > 0) {
			etype = etype.substr(i+1);
		}

		o.unshift({name: etype});

		etype = 'layouts:default';
	}

	return Ergo.object(o, etype);
};



/**
 * Общие опции виджетов
 *
 * Опции:
 * 	`text` текстовое содержимое виджета
 * 	`innerText` текстовое соержимое тега
 * 	`innerHtml` html-содержимое тега
 * 	`opacity` непрозрачность 0..1
 * 	`width` ширина
 * 	`height` высота
 * 	`autoWidth` авто-ширина {@link Ergo.core.Layout}
 * 	`autoHeight` авто-высота {@link Ergo.core.Layout}
 * 	`autoBind` авто-связывание данных
 * 	`autoUpdate` авто-обновление данных
 * 	`tooltip` всплывающая подсказка
 * 	`id` HTML id (используется в поиске)
 * 	`name` имя виджета (используется в поиске)
 * 	`tabindex` HTML tabindex
 * 	`format` форматирование связанных данных
 * 	`store` преобразование вводимых данных к формату связанных данных
 * 	`hidden` скрытие элемента
 *
 *
 * @mixin
 */
Ergo.WidgetOptions = {


	get text() {
		if(!this.__c)
			return this.el[0].textContent;
		else if(this.children.size() == 0)
			return this.layout.el[0].textContent;
		else if(this.$content)
			return this.$content.opt('text');
		else
 			return this.layout.el[0].textContent;
	},
//	getText: function() {	return this.layout.el.text();	},
	get_width: function() {	return this.el.outerWidth();	},
	get_height: function() {	return this.el.outerHeight();	},
	get name() { return this._name || this._key || this._index; },





	set text(v) {
		if(!this.__c)
			this.el[0].textContent = ( v == null ? '': v );
		else if(this.children.size() == 0)
//			this.layout.el.text( v == null ? '': v );
			this.layout.el[0].textContent = ( v == null ? '': v );
		else if(this.$content)
			this.$content.opt('text', v == null ? '': v);
		else
//			this.layout.el.text( v == null ? '': v );
 			this.layout.el[0].textContent = ( v == null ? '': v );

	},
	// set_innerText: function(v) {	this.layout.el.text(v); },
	set_innerHtml: function(v) {	this.layout.el.html(v); },
	// set_opacity: function(v) {
	// 	if($.support.opacity)
	// 		this.el.css('opacity', v);
	// 	else {
	// 		this.el.css('filter', 'Alpha(opacity:' + (v*100.0) + ')');
	// 		this.el.css('-ms-filter', 'progid:DXImageTransform.Microsoft.Alpha(Opacity=' + (v*100.0).toFixed() + ')');
	// 	}
	// },
	set_width: function(v) { this.el.outerWidth(v); },
	set_height: function(v) { this.el.outerHeight(v); },
	set_autoWidth: function(v) { v ? this.el.attr('autoWidth', v) : this.el.removeAttr('autoWidth'); },
	set_autoHeight: function(v) {
		if(v) {
			this.el.attr('autoHeight', v);
			if(v === true || v == 'ignore-siblings')
				this.el.css('overflow-y', 'auto');
		}
		else {
			this.el.removeAttr('autoHeight');
			this.el.css('overflow-y', '');
		}
	},
	set tooltip(v) { this.el.attr('title', v); },
//	set_id: function(v) { this.el.attr('id', v); },
//	set_tag: function(v) { this.tag = v; },
	set name(v) { this._name = v; },
//			'name': function(v) { this.name = v; },
//	set_tabindex: function(v) { this.el.attr('tabindex', v); },
	set format(v) {
		if($.isString(v)) this.options.format = Ergo.format_obj.curry(v);
	},
	set unformat(v) {
		if($.isString(v)) this.options.unformat = Ergo.unformat_obj.curry(v);
	},
	set hidden(v) {
		(this._wrapper || this.el).css('display', v ? 'none' : '');
	}
	// setLead: function(v) { this.layout.el.prepend(v); },
	// setTrail: function(v) { this.layout.el.append(v); }

	//TODO placeholder?

};





Ergo.WidgetAttributes = {
	attributes: ['id', 'tabindex']
};





/**
 * Коллекция пар ключ/значение
 *
 * Представляет собой обертку для объектов javascript-класса Object
 * 
 * @class
 * @extends Ergo.core.Object
 *  
 */
Ergo.core.Collection = Ergo.declare('Ergo.core.Collection', 'Ergo.core.Object', /** @lends Ergo.core.Collection.prototype */{
	
	defaults: {
//		plugins: [Ergo.Observable]
	},
	
	_initialize: function(src, options) {
//		this._super(options);
		Ergo.core.Collection.superclass._initialize.call(this, options);

//		this.options = options;
//		this.events = new Ergo.events.Observer(this);

		this.src = src || {};
	},
	
	
	create: function(v) {
		return new Ergo.core.Collection(v);
	},
	
	
	/**
	 * Установка значения
	 * @param {Object} i ключ
	 * @param {Object} item значение
	 */
	set: function(i, item) {
		if(arguments.length == 1) {
			item = i;
			var old = this.src;
			this.src = item;
//			this.events.fire('value:changed', {'value': item, 'oldValue': old});
		}
		else {
			var old = this.src[i];
			this.src[i] = item;
//			this.events.fire('item:changed', {'item': item, 'index': i, 'oldItem': old});			
		}
	},
	
	/**
	 * Удаление значения по ключу
	 * @param {Object} i ключ
	 */
	unset: function(i) {
		this.remove_at(i);
	},
	
	/**
	 * Получение значения по ключу
	 * @param {Object} i
	 */
	get: function(i) {
		return this.src[i];
	},
	
	/**
	 * Добавление нового значения
	 * @param {Object} item значение
	 * @param {Object} [i] ключ
	 * 
	 * Аналогично по работе методу set
	 */
	// add: function(item, i) {
		// this.src[i] = item;
// //		this.events.fire('item:add', {'item': item});
	// },



	/**
	 * Удаление значения по ключу
	 * @param {Object} i ключ
	 */
	remove_at: function(i) {
		var item = this.src[i];
		delete this.src[i];
		return item;
		
//		this.events.fire('item:removed', {'item': item});
	},
	
	/**
	 * Удаление значения
	 *
	 * Для удаления используется метод remove_at
	 *
	 * @param {Object} item значение
	 */
	remove: function(item) {
		this.remove_at(this.key_of(item));
		return item;
	},

	/**
	 * Удаление значения по условию
	 *
	 * Для удаления используется метод remove_at
	 *
	 * @param {Object} criteria функция-условие
	 * 
	 * Значение удаляеся, если результат, возвращаемый criteria равен true 
	 */
	remove_if: function(criteria) {
		var keys = Ergo.filter_keys(this.src, criteria);
		keys.sort(Ergo.sort_numbers).reverse();
		var removed = [];
		for(var i = 0; i < keys.length; i++) removed.push( this.remove_at(keys[i]) );
		return removed;
	},
	

	remove_all: function() {
		for(i in this.src)
			this.remove_at(i);
	},
	
	
	/**
	 * Очистка коллекции от всех значений
	 */
	clear: function() {
		this.remove_all();
//		this.src = {};
	},
	
	/**
	 * Последовательный обход всех значений
	 * @param {Object} callback
	 */
	each: function(callback) {
		return Ergo.each(this.src, callback);
	},
	
//	ensure: function(i) {
//		
//	},
	
	/**
	 * Поиск первого элемента, удовлетворяющего критерию
	 */
	find: function(criteria) {
		return Ergo.find(this.src, criteria);
	},
	
	/**
	 * Поиск всех элементов, удовлетворяющих критерию
	 */
	find_all: function(criteria) {
		return Ergo.filter(this.src, callback);
	},
	
	
	
	//
	//TODO методам filter и map имеет смысл возвращать коллекцию, а не значение
	//
	
	/**
	 * Фильтрация элементов
	 */
	filter: function(callback) {
		return this.create( Ergo.filter(this.src, callback) );
	},
	
	/**
	 * Отображение элементов
	 */
	map: function(callback) {
		return this.create( Ergo.map(this.src, callback) );		
	},
	
	/**
	 * Проверка вхождения значения в коллекцию
	 * @param {Object} criteria
	 */
	includes: function(criteria) {
		return Ergo.includes(this.src, callback);
	},

	is_include: function(criteria) {
		return Ergo.includes(this.src, callback);
	},

	
	/**
	 * Размер коллекции
	 */
	size: function() {
		var n = 0;
		for(var i in this.src) n++;
		return n;
	},
	
	count: function() {
		return this.size();
	},
	
	/**
	 * Проверка, является ли коллекция пустой
	 */
	is_empty: function() {
		return this.size() == 0;
	},
	
	/**
	 * Получение ключа элемента
	 * @param {Object} item
	 */
	key_of: function(item) {
		return Ergo.key_of(this.src, item);
	},
	
	/**
	 * Вызов для всех элементов коллекции указанного метода 
	 *
	 * @param {Object} m
	 * @param {Object} args
	 */
	apply_all: function(m, args, reverse) {
		Ergo.apply_all(this.src, m, args, reverse);
	},
	
	
	/**
	 * Проверка наличия элемента с указанным ключом
	 * @param {Object} i ключ
	 */
	has_key: function(i) {
		return (i in this.src);
	},
	
	/**
	 * Список всех ключей в коллекции
	 */
	keys: function() {
		var k = [];
		for(var i in this.src) k.push(i);
		return k;
	}
	
});











/**
 * Коллекция упорядоченных значений
 *
 * Представляет собой обертку для объектов javascript-класса Array
 *
 * @class
 * @extends Ergo.core.Collection
 *
 */
Ergo.core.Array = Ergo.declare('Ergo.core.Array', 'Ergo.core.Collection', /** @lends Ergo.core.Array.prototype */{

	_initialize: function(src, options) {
//		this._super(src || [], options);
		Ergo.core.Array.superclass._initialize.call(this, src || [], options);
//		this.src = src || [];
//		Ergo.Observable.call(this);
//		this.events = new Ergo.events.Dispatcher();
	},


	create: function(v) {
		return new Ergo.core.Array(v);
	},


	/**
	 * Добавить новый элемент
	 * @param {Object} item
	 * @param {Object} i
	 */
	add: function(item, i) {
		if(i == null) {
			this.src.push(item);
			i = this.src.length-1;
		}
		else {
			this.src.splice(i, 0, item);
		}

//		this.events.fire('item:added', {'item': item, 'index': i});
		return i;
	},


	/**
	 * Удалить элемент по индексу
	 * @param {Object} i
	 */
	remove_at: function(i) {
		var item = this.src[i];
		this.src.splice(i, 1);
		return item;
//		this.events.fire('item:removed', {'item': item});
	},


	remove_all: function() {
		while(this.src.length)
			this.remove_at(0);
	},

	size: function() {
		return this.src.length;
	},

	// clear: function() {
		// this.src = [];
	// },

	/**
	 * Первый элемент коллекции
	 */
	first: function() {
		return this.src[0];
	},

	/**
	 * Последний элемент коллекции
	 */
	last: function() {
		return this.src[this.src.length-1];
	},

	keys: function() {
		var k = [];
		for(var i = 0; i < this.src.length-1; i++) k.push(i);
		return k;
	},

	sort: function(comparator) {
		this.src.sort(comparator);
	},

	copy: function() {
		return this.create(this.src.slice(0));
	}


});






/**
 * Массив виджетов
 *
 *
 * @class
 * @name Ergo.core.WidgetChildren
 * @extends Ergo.core.Array
 *
 *
 */
Ergo.declare('Ergo.core.WidgetChildren', 'Ergo.core.Array', /** @lends Ergo.core.WidgetChildren.prototype */{

	defaults: {
//		plugins: [Ergo.Observable]
//		include: 'observable'
	},


	_initialize: function(w, o) {
//		this._super(null, o);

//		Ergo.core.WidgetArray.superclass._initialize.call(this, null, o);

		this.options = o || {};
		this.src = [];
//		this.events = new Ergo.events.Observer(this);

		this.autobinding = true;

		this.widget = w;
	},


	factory: function(o, type) {
		var default_opt = this.options.defaultOpt || 'text';
		if($.isString(o)) {
			var v = o;
			o = (this.options.shortcuts || {})[v];
			if(!o) {
				o = {};
				o[default_opt] = v;//{text: o};
			}
		}
		else if($.isArray(o)) o = {items: o};
		var default_child = 'default' + type[0].toUpperCase() + type.substr(1);
		default_child = this.options[default_child];
		if( $.isString(default_child) )
			default_child = {etype: default_child};

		return $.ergo( [default_child, o], null, this.scope );
//		return $.ergo( Ergo.smart_override({}, this.options[default_child], o) );
	},



	add: function(item, i, type) {

//		console.log('i', i);

//		var key;
		var w = this.widget;

//		item = w.factory(item);

		// если не определен тип компонента
		if(type == undefined) {
			// если не определен ключ компонента
			type = (i && $.isString(i)) ? 'component' : 'item';
		}

//		type = type || 'item';

		// создаем виджет с помощью фабрики элементов
		if(!(item instanceof Ergo.core.Widget))
			item = (w.options[type+'Factory'] || this.factory).call(w, item, type);

		item._type = type;

		// для элементов с текстовыми ключами (компонентов) сохраняем ключ в поле _key
		if(i && $.isString(i)) {
			item._key = i;
			i = undefined;
		}
		else {
			item._index = i;
		}

		// определяем поле parent
		item.parent = w;

		// добавляем элемент в компоновку с индексом i (для компонентов он равен undefined)
		if(item.options.autoRender === true)
			w.layout.add(item, item._index);//i);

		// определяем индекс элемента в children
		if(i != null && ('_index' in item)) {//item._index) {
			// FIXME здесь нужно немного эвристики
			// if(this.src[this.src.length-1]._index < item._index)
				// i =
			for(i = this.src.length-1; i >= 0; i--) {
				if(('_index' in this.src[i]) && this.src[i]._index < item._index) {
//					i--;
//					i++;
					break;
				}
			}

			i++;
		}
		else if(i == null && ('_index' in item)) {
			// FIXME последний индекс лучше сохранять после пересчета
			item._index = 0;
			for(var j = this.src.length-1; j >= 0; j--) {
				if(this.src[j]._type == item._type) {
					item._index = this.src[j]._index + 1;
					item.el[0]._index = item._index; //WARN это действие должно осуществляться в layout
					break;
				}
			}
		}

//		var i0 = i;


//		console.log('i', i);
		// добавляем элемент в коллекцию
//		i = this._super(item, i);
		i = Ergo.core.WidgetChildren.superclass.add.call(this, item, i);



//		console.log(i0 + ' > '+i);

		// обновляем свойство _index у соседних элементов
		for(var j = i+1; j < this.src.length; j++) {
			if('_index' in this.src[j]) {
				this.src[j]._index++;
				this.src[j].el[0]._index++; //WARN это действие должно осуществляться в layout
			}
		}
//			this.src[j]._index = j;

		//FIXME скорее всего вызов метода show должен находиться не здесь
		// if(item.options.autoRender === true) {
			// if(item.options.showOnRender) item.show();
			// if(item.options.hideOnRender) item.hide();
		// }

		// для элементов с текстовыми ключами (компонентов) добавляем accessor
		if(item._key) {
			w[item._key] = item;
			w['$'+item._key] = item;
		}

		// выполняем иерархическое связывание данных (автобиндинг)
		if(w.data && !item.data && this.autobinding)
			item.bind(w.data, false, false);



//		console.log('item:add');
		//TODO здесь бы применить метод вызова опций как для компоновки
		this.widget.events.fire('item:added', {'item': item});

		return item;
	},

	remove_at: function(i) {

//		var key;
		var w = this.widget;

		// // для компонентов определяем индекс через accessor
		// if($.isString(i)) {
// //			key = i;
			// i = w[i]._index;
		// }


//		var item = this._super(i);
		var item = Ergo.core.WidgetChildren.superclass.remove_at.call(this, i);


//		if('hide' in item) item.hide();

		// обновляем свойство _index у соседних элементов
		for(var j = i; j < this.src.length; j++) {
			if('_index' in this.src[j]) {
				this.src[j]._index--;
				this.src[j].el[0]._index--;
			}
		}

//			this.src[j]._index = j;

		// поля parent, _index и _key больше не нужны
		delete item.parent;
		delete item._index;

		if(item._key) {
			delete w['$'+item._key];
			delete w[item._key];
			delete item._key;
		}


		// if(item.options.hideOnDestroy) {
			// item.hide().then(function(){ w.layout.remove(item); });
		// }
		// else {
			// удаляем элемент из компоновки
//		w.layout.remove(item); //FIXME
		// }


//		this.events.fire('item:remove', {'item': item});

		return item;
	},




	each: function(callback, filter, sorter) {

		var c = this.widget; // возможно не лучшее решение, но практичное

		var values = this.src;

		var filter = filter || c.options.filter;
		var sorter = sorter || c.options.sorter;

		if(filter || sorter) {

			var kv_a = [];

			// Filtering source and mapping it to KV-array
			Ergo.each(values, function(v, i) {
				if(!filter || filter.call(c, v, i)) {
					kv_a.push( [i, v] );
				}
			});



			if(sorter) {
				// Sorting KV-array
				kv_a.sort( sorter );
			}


			for(var i = 0; i < kv_a.length; i++) {
				var kv = kv_a[i];
				callback.call(c, kv[1], i);//kv[0]);
			}

		}
		else {
			// Basic each
			Ergo.each(this.src, callback);

		}

	},



	remove_all: function() {

		var w = this.widget;

		for(var i = 0; i < this.src.length; i++) {
			var item = this.src[i];

			delete item.parent;
			delete item._index;

			if(item._key) {
				delete w['$'+item._key];
				delete w[item._key];
				delete item._key;
			}

		}

		this.src.length = 0; // possible bugs
	},




	// _destroy_all: function() {
		// while(this.src.length)
			// this.remove_at(0)._destroy();
	// }

//	find: function(i) {
//		return Ergo.core.ItemCollection.superclass.find.call(this, Ergo.utils.widget_filter(i));
//	}

});








/**
 * Коллекция компонентов виджета
 *
 *
 * @class
 * @name Ergo.core.WidgetComponents
 * @extends Ergo.core.Array
 *
 *
 */
Ergo.declare('Ergo.core.WidgetComponents', 'Ergo.core.Array', /** @lends Ergo.core.WidgetComponents.prototype */ {

	defaults: {
//		plugins: [Ergo.Observable]
//		include: 'observable'
	},


	_initialize: function(w, o) {
//		this._super(null, o);

		this.options = o;

		this.src = [];
//		this.events = new Ergo.events.Observer(this);

		this._widget = w;
	},


	_source: function() {
		var result = {};
		var o = this.options;
		this._widget.children.each(function(c) { if(c._type == o.type) result[c._key] = c; });
		return result;
	},



	create: function(v) {
		return new Ergo.core.WidgetComponents(this._widget);
	},


	/**
	 * Установка значения
	 * @param {Object} i ключ
	 * @param {Object} item значение
	 */
	set: function(i, item) {
		// if(i in this._widget)
		// 	this.remove_at(i);
		if( ('$'+i) in this._widget)
			this._widget['$'+i]._destroy();
//			this._widget.children.remove_at(i);
		return this._widget.children.add(item, i, this.options.type);
	},




	/**
	 * Получение значения по ключу
	 * @param {Object} i
	 */
	get: function(i) {
		return this._source()[i];
	},

	/**
	 * Добавление нового значения
	 * @param {Object} item значение
	 * @param {Object} [i] ключ
	 *
	 * Аналогично по работе методу set
	 */
	// add: function(item, i) {
		// this.src[i] = item;
// //		this.events.fire('item:add', {'item': item});
	// },



	/**
	 * Удаление значения по ключу
	 * @param {Object} i ключ
	 */
	remove_at: function(i) {
//		return this._widget.children.remove_at(i);
		var removed = this._widget.children.remove_if(function(v) {	return v._key == i;	});

		return removed.length == 0 ? null : removed[0];
	},

	/**
	 * Удаление значения
	 *
	 * Для удаления используется метод remove_at
	 *
	 * @param {Object} item значение
	 */
	remove: function(item) {
		return this.remove_at(item._key);
	},

	/**
	 * Удаление значения по условию
	 *
	 * Для удаления используется метод remove_at
	 *
	 * @param {Object} criteria функция-условие
	 *
	 * Значение удаляеся, если результат, возвращаемый criteria равен true
	 */
	remove_if: function(criteria) {
		var keys = Ergo.filter_keys(this._source(), criteria);
		keys.sort(Ergo.sort_numbers).reverse();
		var removed = [];
		for(var i = 0; i < keys.length; i++) removed.push( this.remove_at(keys[i]) );
		return removed;
	},


	remove_all: function() {
		var src = this._source();
		for(i in src)
			this.remove_at(i);
	},


	/**
	 * Очистка коллекции от всех значений
	 */
	clear: function() {
		this.remove_all();
	},

	/**
	 * Последовательный обход всех значений
	 * @param {Object} callback
	 * @param {Object} delegate
	 */
	each: function(callback) {
		return Ergo.each(this._source(), callback);
	},

//	ensure: function(i) {
//
//	},

	/**
	 * Поиск первого элемента, удовлетворяющего критерию
	 */
	find: function(criteria) {
		return Ergo.find(this._source(), criteria);
	},

	/**
	 * Поиск всех элементов, удовлетворяющих критерию
	 */
	find_all: function(criteria) {
		return Ergo.filter(this._source(), callback);
	},



	//
	//TODO методам filter и map имеет смысл возвращать коллекцию, а не значение
	//

	/**
	 * Фильтрация элементов
	 */
	filter: function(callback) {
		return this.create( Ergo.filter(this._source(), callback) );
	},

	/**
	 * Отображение элементов
	 */
	map: function(callback) {
		return this.create( Ergo.map(this._source(), callback) );
	},

	/**
	 * Проверка вхождения значения в коллекцию
	 * @param {Object} criteria
	 */
	includes: function(criteria) {
		return Ergo.includes(this._source(), callback);
	},

	/**
	 * Размер коллекции
	 */
	size: function() {
		var n = 0;
		var src = this._source();
		for(var i in src) n++;
		return n;
	},

	/**
	 * Проверка, является ли коллекция пустой
	 */
	is_empty: function() {
		return this.size() == 0;
	},

	/**
	 * Получение ключа элемента
	 * @param {Object} item
	 */
	key_of: function(item) {
		return Ergo.key_of(this._source(), item);
	},

	/**
	 * Вызов для всех элементов коллекции указанного метода
	 *
	 * @param {Object} m
	 * @param {Object} args
	 */
	apply_all: function(m, args) {
		Ergo.apply_all(this._source(), m, args);
	},


	/**
	 * Проверка наличия элемента с указанным ключом
	 * @param {Object} i ключ
	 */
	has_key: function(i) {
		return (i in this._source());
	},

	/**
	 * Список всех ключей в коллекции
	 */
	keys: function() {
		var k = [];
		for(var i in this._source()) k.push(i);
		return k;
	},


	add: function(item, i) {
		return this._widget.children.add(item, i, this.options.type);
	},


	first: function() {
		return this._source()[0];
	},


	last: function() {
		var src = this._source();
		return src[src.length-1];
	}


});




/**
 * Коллекция элементов виджета
 *
 *
 * @class
 * @name Ergo.core.WidgetItems
 * @extends Ergo.core.WidgetComponents
 *
 *
 */
Ergo.declare('Ergo.core.WidgetItems', 'Ergo.core.WidgetComponents', /** @lends Ergo.core.WidgetItems.prototype */ {

	_source: function() {
		var result = [];
		this._widget.children.each(function(c) { if(!('_key' in c)) result.push(c); });
		return result;
	},



	create: function(v) {
		return new Ergo.core.WidgetItems(this._widget);
	},


	last: function() {
		var src = this._source();
		return src[src.length-1];
	},

	size: function() {
		var src = this._source();
		return src.length;
	},

	remove_all: function() {
		var src = this._source();
		for(var i = 0; i < src.length; i++)
			this.remove(src[i]);//_at(src[i]._index);
	},



	remove_at: function(i) {
		var removed = this._widget.children.remove_if(function(v) {	return v._index === i;	});

		return removed.length == 0 ? null : removed[0];
	},


	remove: function(item) {
		return this.remove_at(item._index);
	},



/*
	set: function(i, item) {
		this._widget.children.add(item, i, 'item');
	},

	add: function(item, i) {
		this._widget.children.add(item, i, 'item');
	}
*/

});




Ergo.WidgetData = {


  /**
	 * Подключение данных к виджету
	 *
	 * Если опция autoBind = false, то связывание осуществлено не будет.
	 *
	 * @param {Object|Array|string} data подключаемые данные
	 */
	bind: function(data, update, pivot) {

		var o = this.options;
		var self = this;
		var w = this;

		var data_id = o.dataId;

		// if(data_id != null && data_id[0] == '@') {
		// 	data = this._context.data( data_id.substr(1) );//[data_id];//[data_id.substr(1)];
		// 	data_id = undefined;
		// }

		// если данные не определены или биндинг выключен, то биндинг не выполняем
		if(this.data == data || data === undefined || o.autoBind === false) return;

		// открепляем источник данных от виджета:
		//   удаляем все обработчики событий старого источника данных, связанные с текущим виджетом
		if(this.data)
			this.data.events.off(this);


		// определяем, является ли источник данных опорным
		if(pivot === undefined) pivot = true;
		this._pivot = pivot;

//		if(update !== false) update = true;

		//TODO custom data injector
		if( $.isString(data) ) {
			// var w = this;
			// while(!w._scope) {
			// 	w = w.parent;
			// }
			// if(w._scope) {
			// 	data = w._scope[data];
			// }
			// else {
			// 	throw new Error('Can not inject scope datasource into detached widget');
			// }
			var name_a = data.split(':');
			var src = (name_a.length == 1) ? this : this[name_a[0]];
			data = src[name_a[1]];
		}


		// если определен параметр dataId, то источником данных будет дочерний элемент, если нет - то сам источник данных
		if(data_id) //'dataId' in o)
			this.data = (data instanceof Ergo.core.DataSource) ? data.entry(data_id) : new Ergo.core.DataSource(data, data_id);
		else
			this.data = (data instanceof Ergo.core.DataSource) ? data : new Ergo.core.DataSource(data);


		// Если виджет является динамическим (управляется данными)
		if(o.dynamic) {

// 			// если добавлен новый элемент данных, то добавляем новый виджет
// 			this.data.events.on('entry:added', function(e){
//
// //				console.log(e);
//
// 				self.children.autobinding = false;
// 				var item = self.items.add({}, e.isLast ? null : e.index);
// 				self.children.autobinding = true;
// 				item.bind(e.entry);
//
// 				item._dynamic = true;
//
// 				item.render();
// 			}, this);

// 			// если элемент данных удален, то удаляем соответствующий виджет
// 			this.data.events.on('entry:deleted', function(e){
// 				var item = self.item({data: e.entry});
// 				if(item)
// 					item._destroy();
// //				self.children.remove( self.item({data: e.entry}) )._destroy();//e.index) );// {data: self.data.item(e.index)});
// 			}, this);

// 			// если элемент данных изменен, то создаем новую привязку к данным
// 			this.data.events.on('entry:changed', function(e){
// 				//FIXME странное обновление данных
// 				var item = self.item({data: e.entry});
// 				if(!item) {
// 					self.children.autobinding = false;
// 					item = self.items.add({});
// 					self.children.autobinding = true;
//
// 					item.bind(e.entry);
// 					item._dynamic = true;
// 				}
//
// 				//FIXME _rebind ?
// //				item.bind(/*self.data.entry(e.entry.id)*/e.entry, false, false);
// 	//			self.getItem( e.item.id )._dataChanged(); //<-- при изменении элемента обновляется только элемент
// 			}, this);


			// this.data.events.on('entryDirty', function(e){
			// 	if( self.options.dynamicFilter )
			// 		self._rebind(false);
			// });



			// если изменилось само значение массива, то уничожаем все элементы-виджеты и создаем их заново
			this.data.events.on('changed', function(e){

				// если diff не определен, то перерисовываем все
				var diff = (e.created || e.updated || e.deleted) ? {created: e.created, updated: e.updated, deleted: e.deleted} : null;

				self._rebind(true, diff);

			}, this);


			// this.data.events.on('value:sync', function(e){
			//
			// 	self._dataChanged();
			//
			// }, this);

			// для корректного порядка обновления
			this.data.events.on('dirty', function(e){
				self._dataChanged(false, false); // ленивое обновление данных без каскадирования
			});

			// изменилось количество элементов данных или их содержимое
			this.data.events.on('diff', function(e) {

				self._rebind( false, {created: e.created, updated: e.updated, deleted: e.deleted} );

			}, this);



			// создаем вложенные элементы контейнера на основе источника данных

//			this.layout.immediateRebuild = false;

			this.children.filter(function(c){ return c._dynamic; }).apply_all('_destroy');

			this.data.each(function(dataEntry, i){
//					self.items.add({}).bind(dataEntry, true, 2);
					self.children.autobinding = false;
					var item = self.items.add({});//{ 'data': dataEntry, 'autoUpdate': false });
					self.children.autobinding = false;

					item.bind(dataEntry, false);
					item._pivot = false;
					item._dynamic = true;
//					item.el.attr('dynamic', true);
			}, this.options.dynamicFilter, this.options.dynamicSorter);

			// this.layout.immediateRebuild = true;
			// this.layout.rebuild();

			this.render(false);
		}
		else {
			// STATIC BIND

			this.data.events.on('changed', function(e) {
				// при изменении значения обновляем виджет, но только в "ленивом" режиме
				/*if(o.updateOnDataChanged)*/
				//self._dataChanged(true);
				self._rebind();
			}, this);

			this.data.events.on('dirty', function(e) {
				self._dataChanged(false, false); // ленивое обновление данных без каскадирования
			}, this);



			// this.data.events.on('value:sync', function(e){
			//
			// 	self._dataChanged();
			//
			// }, this);


//			this.data.events.on('value:changed', this._rebind.bind(this), this);

			// связываем данные с дочерними компонентами виджета при условии:
			//	1. если дочерний виджет является опорным (логически связан с другим источником данных), то игнорируем его
			// 	2. обновление дочернего виджета не производится (оно будет позже иницировано опорным элементом)
			//	3. дочернtve виджетe явно указывается, что он является опорным
			if(this.__c) {

				this.children.each(function(child){
					if(!child._pivot && child.data != self.data) child.bind(self.data, false, false);
				});
			}

		}

		// обновляем виджет (если это не запрещено в явном виде)
		if(update !== false && !this.data.options.fetchable) this._dataChanged();


		// подключаем события data:
		this._bindNsEvents('data');


//		if( this.data.options.fetchable ) {

		this.data.events.on('fetch:before', function(){
			w.events.fire('fetch');
		}, this);
		this.data.events.on('fetch:after', function(){
			w._layoutChanged();
			w.events.fire('fetched');
		}, this);

		// если установлен параметр autoFetch, то у источника данных вызывается метод fetch()
		if(o.autoFetch)	this.data.fetch();//.then(function(){ self.events.fire('fetch'); });
//		}


		this.events.fire('bound');
	},



	unbind: function() {
		//
	},



	/**
	 *
	 * @protected
	 */
	_rebind: function(update, diff) {

		var o = this.options;
		var self = this;


		if(!this.data) return;

//		console.log('rebind');

		// // если определен параметр dataId, то источником данных будет дочерний элемент, если нет - то сам источник данных
		// if('dataId' in o)
			// data = (data instanceof Ergo.core.DataSource) ? data.entry(o.dataId) : new Ergo.core.DataSource(data, o.dataId);
		// else
			// data = (data instanceof Ergo.core.DataSource) ? data : new Ergo.core.DataSource(data);
//
		// // если источник данных отличается от уже привязанного, то выполняем новое связвание
		// if(data != this.data) {
			// this.bind(data, update, pivot);
			// return
		// }


		// console.log('rebind ('+self.options.dynamic+')');
		// console.log(''+self.options.html + ' ' + self.getValue());



		if(o.dynamic) {
			// TODO

			if(diff) {
				this._dataDiff(diff.created, diff.deleted, diff.updated);

//				this._dataChanged(false, false);
			}
			else {

	//		console.log('rebind (dynamic)');

				// обновляем вложенные элементы контейнера на основе источника данных
	//			this.layout.immediateRebuild = false;

				// // уничтожаем все динамические элементы
				this.children.filter(function(c){ return c._dynamic; }).apply_all('_destroy');

	//			var t0 = Ergo.timestamp();

				this.data.each(function(dataEntry, i){
	//					self.items.add({}).bind(dataEntry, true, 2);
					self.children.autobinding = false;
					var item = self.items.add({});//{ 'data': dataEntry });
					self.children.autobinding = false;

					item.bind(dataEntry);
					item._pivot = false;
					item._dynamic = true;
	//					item.el.attr('dynamic', true);
	//					item.dataPhase = 2;
	//				item.render();
				}, this.options.dynamicFilter, this.options.dynamicSorter);

	//			var t1 = Ergo.timestamp();
	//			console.log(t1 - t0);

				// this.layout.immediateRebuild = true;
				// this.layout.rebuild();

	//			if(!Ergo.noDynamicRender)
				this.render();
			}

			// обновляем виджет (если это не запрещено в явном виде)
//			if(update !== false) this._dataChanged(true);

		}
		else {

//		console.log('rebind (static)');

			if(this.__c) {

				this.children.each(function(child){
	//				if(!child._pivot) child.rebind(false);
					// 1. rebind не вызывается у дочерних элементов со своим dataSource
					// 2. rebind не вызывается у дочерних элементов с общим dataSource
					//      (работает некорректно, если rebind вызывается не событием)
					if(!child._pivot && (child.data != self.data || update === false)) {
							child._rebind(false);
					}
				});

			}

			//TODO возможно, здесь нужно вызвать render() с выключенным каскадированием

//			this._layoutChanged();

		}


		// обновляем виджет (если это не запрещено в явном виде)
		// динамические элементы пропустим
		if(update !== false)
			this._dataChanged(undefined, undefined, true);



	},




  /**
	 * Каскадное обновление связывания
	 *
	 * Если указана функция связывания (`options.binding`), то она используется для обновления виджета
	 *
 	 * @param {Boolean} lazy если true, то не будут обновляться дочерние виджеты, имеющие тот же источник данных
 	 * @param {Boolean} cascade если равно false, то все дочерние виджеты не будут обновляться
 	 * @param {Boolean} noDynamic если равно true, то не будут обновляться дочерние виджеты, имеющие динамическое связывание
 	 *
	 * @protected
	 */
	_dataChanged: function(lazy, cascade, no_dynamic) {

		// если отключено каскадирование, то обновление не производим
//		if(cascade && !this.options.cascading) return;

//		if(!this.options.autoBind /*|| this._lock_data_change*/) return;

		var binding = this.options.binding;

		if(/*this.data &&*/ binding){
			if( $.isString(binding) ) {
				this.opt(binding, this.opt('value'));
			}
			else {
				if( binding.call(this, this.opt('value')) === false) return false;
			}
//			var val = this.getValue();
//			this._lock_value_change = true;
//			delete this._lock_value_change;

			/**
			 *
			 *
			 */
			this.events.fire('dataChanged');//, e);
		}

		// var e = new Ergo.events.CancelEvent({value: this.getValue()});
		// if(e.isCanceled) return;


		if(cascade === false)
			return;

		var self = this;

//		if(cascade !== false) {
		this.children.each(function(child){

			if(no_dynamic && child.options.dynamic) return;

			// Отменяем обновление дочернего элемента, если:
			//  1. определен источник данных
			//  2. источник данных дочернего элемента совпадает с текущим
			//  3. дочерний элемент имеет свой независимый источник данных
			if(lazy && child.data && child.data == self.data) return;
			if(child._pivot || child.options.autoBind === false) return; //FIXME динамические элементы являются опорными => это условие всегда срабатывает
//			if(lazy && child.options.dynamic) return;
			child._dataChanged(lazy, cascade, no_dynamic);
		});
//		}
//			this.children.apply_all('_dataChanged', [true]);

//		this.children.each(function(child) { child._dataChanged(); });

	},




	_dataDiff: function(created, deleted, updated) {

		var filter = this.options.dynamicFilter;
		var sorter = this.options.dynamicSorter;




/*
		var _qfind = function(items, comparator) {

			var after = null;

			if( comparator(items.first()) < 0 ) {
				after = items.first();
			}
			else if( comparator(items.last()) > 0 ) {
				after = null;
			}
			else {
				var min_x = 0;
				var max_x = items.size()-1;

//						var n = this.items.size()+1;
				while(min_x < max_x) {

//								console.log(!!sorter, min_x, max_x);

					// n--;
					//
					// if(n == 0) {
					// 	console.error('error');
					// 	throw new Exception('error');
					// }

					var x = Math.ceil((max_x + min_x)/2);

//								console.log('x', x);

					after = items.get(x);

					if(max_x == x || min_x == x) {
						break;
					}


					var cmp = comparator(after);


//								console.log('compare', cmp);


					if(cmp < 0) {
						// min_x < ? < x < max_x
						max_x = x;
					}
					else if(cmp > 0) {
						// if(min_x == x)
						// 	break;
						// min_x < x < ? < max_x
						min_x = x;
					}
					else {
						break;
					}

				}
			}


			return after;
		}
*/


//		console.log( 'Diff (create, delete, update)', created && created.length, deleted && deleted.length, updated && updated.length );

//		console.log(created, deleted, updated);

		if(deleted) {
//			this.items.each(function(item) { console.log('k', item._index); });
			// DELETED
			for(var i = 0; i < deleted.length; i++) {
				var e = deleted[i];
				var item = this.item({data: e});
				if(item)
					item._destroy();
			}
//			this.items.each(function(item) { console.log('m', item._index); });
		}



		if(created) {
			// CREATED
			for(var i = 0; i < created.length; i++) {
				var e = created[i];
				var index = e._id[0];
				var value = e._val();


				if(!filter || filter.call(this, e._val(), index)) {

					var kv0 = [index, value];

//					console.log('kv', index, value);


					// var compare = function(item) {
					// 	if(sorter) {
					// 		var kv1 = [item.data._id[0], item.data._val()];
					// 		return sorter.call(e, kv0, kv1)
					// 	}
					// 	else {
					// 		return kv0[0] - item.data._id[0];
					// 	}
					// }
					//
					//
					//
					//
					//
					// var after = _qfind(this.items, compare);


					var after = this.items.find(function(item) {
						if(sorter) {
							return true;
							// var kv1 = [item.data._id[0], item.data._val()];
							// if( sorter.call(e, kv0, kv1) <= 0 ) {
							// 	return true;
							// }
						}
						else {
							if( index <= item.data._id[0] ) {
								return true;
							}
						}
					});

					if(sorter)
						index = null;
					else
						index = after ? after._index : null;

//					console.log('create', index);

					// добавляем элемент последним
					this.children.autobinding = false;
					var item = this.items.add({}, index);
					this.children.autobinding = true;
					item.bind(e, true, false);

					item._dynamic = true;

					item.render();


				}
			}
		}




		if(updated) {
			// UPDATED

			var n_upd = 0;

			for(var i = 0; i < updated.length; i++) {


				var e = updated[i];
				var _item = this.item({data: e});
				var index = e._id[0];
				var value = e._val();



				if(filter) {
					if( !filter.call(this, value, index) ) {
						if( _item ) {
							_item._destroy();
							_item = null;
						}
						continue;
					}
				}

//				console.log('kv', index, value);


				var kv0 = [index, value];


				// var compare = function(item) {
				// 	if(sorter) {
				// 		var kv1 = [item.data._id[0], item.data._val()];
				// 		return (item == _item) ? 1 : sorter.call(e, kv0, kv1)
				// 	}
				// 	else {
				// 		return kv0[0] - item.data._id[0];
				// 	}
				// }
				//
				//
				// var after = _qfind(this.items, compare);



				var after = this.items.find(function(item) {
					if(sorter) {
						return true;
						// var kv1 = [item.data._id[0], item.data._val()];
						// // TODO возможно не нужно исключать себя из проверки
						// if( item != _item && sorter.call(e, kv0, kv1) <= 0 ) {
						// 	return true;
						// }
					}
					else {
						if( item != _item && index <= item.data._id[0] ) {
							return true;
						}
					}
				});


				if(sorter)
					index = null;
				else
					index = after ? after._index : null;

//				console.log('update', index, !_item);

				if( !_item ) {

					this.children.autobinding = false;
					_item = this.items.add({}, index);
					this.children.autobinding = true;
					_item.bind(e, false, false);  // обновляться здесь не надо

					_item._dynamic = true;

					_item.render();

				}
				else {

//					console.log('relocate', _item._index, ' => ', index, ' of ', this.items.size());

					if(!sorter) {
						// FIXME
						if(index != _item._index+1) {
							n_upd++;
							_item.unrender()
							this.items.remove(_item);
							this.items.add(_item, index);
							_item.render()
						}
					}

				}





			}


//			console.log('обновлений позиции', n_upd);
		}






		if( sorter ) {

//			var item_values = [];
//			var item_indices = [];

			var kv_a = [];
			this.items.each(function(item, i) {
				kv_a.push( [item.data._id[0], item.data._val(), i, item] );
//				item_values.push(item.data._val());//.timeState);
//				item_indices.push(item._index);//.timeState);
			});

			// Sorting KV-array
			kv_a.sort(sorter);


			var offset_a = [];

//			var values = [];
//			var indices = [];

			kv_a.forEach(function(kv, i) {
				offset_a[kv[2]] = kv[2] - i;
//				indices.push(kv[2]);
//				values.push(kv[1]);//.timeState);
			});

//			console.log( 'indices', indices );
//			console.log( 'item_values', JSON.parse(JSON.stringify(item_values)) );
//			console.log( 'item_indices', JSON.parse(JSON.stringify(item_indices)) );
//			console.log( 'values', JSON.parse(JSON.stringify(values)) );
//			console.log( 'corrections', JSON.parse(JSON.stringify(corr_a)) );

			var n = 0;

			var measure_a = [];

			var moved_a = [];

			while( n < kv_a.length+1 ) {



				var max_measure = [-1,-1];

				measure_a = [];

				for(var i = 0; i < kv_a.length; i++) {
	//				var i_item = this.items.get(i);
					var i_index = i - offset_a[i];

					if( moved_a[i_index] )
						continue;

					var measure = [-1, -1, -1];


					for(var j = 0; j < kv_a.length; j++) {
						var j_index = j - offset_a[j];

	//					var j_item = this.items.get(j);
						if( (j < i && j_index > i_index) || (j > i && j_index < i_index) ) {
							if(measure[0] == -1) {
								measure[1] = j;// Math.min(measure[1], j);
							}
							measure[2] = j;//Math.max(measure[2], j);
							measure[0]++;
						}
					}

					measure_a[i] = measure;

					if(measure[0] > max_measure[0]) {
						max_measure[0] = measure[0];
						max_measure[1] = measure[1];
						max_measure[2] = measure[2];
						max_measure[3] = i;
					}

				}

				if(max_measure[0] == -1)
					break;


				n++;



				// var k = 0;
				//
				// for(var i = 0; i < measure_a.length; i++) {
				// 	if(max_measure[0] == measure_a[i][0])
				// 		k++;
				// }

//				console.log( 'max measure, count', max_measure, k);

				// выполняем перемещение
				var _i = max_measure[3];
				var _j = (max_measure[2] > max_measure[3]) ? max_measure[2] : max_measure[1];

				var _item = this.items.get(_i);

//				console.log('index', _i, _j);

				//TODO нужно оптимизировать с помощью функции items.move()
				_item.unrender()
				this.items.remove(_item);
				this.items.add(_item, _j);
				_item.render()


				moved_a[_i-offset_a[_i]] = true;


				var i_offset = offset_a[_i];

				if(_j < _i) {
					for(var i = _i; i > _j; i--) {
						offset_a[i] = offset_a[i-1]+1;
					}
//					offset_a[_j] = offset_a[_j+1]
				}
				if(_j > _i) {
					for(var i = _i; i < _j; i++) {
						offset_a[i] = offset_a[i+1]-1;
					}
//					offset_a[_j] = offset_a[_j-1]
				}

				offset_a[_j] = i_offset + (_j - _i);

			}


//			console.log( 'итераций', n );

			// console.log( 'measures', measure_a );
			// console.log( 'offsets', offset_a );




		}




	},




	is_bound: function() {
		return (this.data != null);
	},




};




Ergo.WidgetRender = {


  /**
	 * Отрисовка (рендеринг) виджета, т.е. добавление его в DOM-дерево
	 *
	 * Если метод вызывается без параметров, а виджет входит в виртуальное дерево
	 * виджетов, то он будет добавлен в компоновку родителя
	 *
	 * Отрисовка выполняется для всех дочерних виджетов
	 *
	 * После отрисовки вызывается обработчик _layoutChanged
	 *
	 */
	render: function(target, cascade) {


		var self = this;


		if(target === true)
			this.options.autoRender = true; //?


		// только если проиниализирован .children
		if( this.__c ) {

			for(var i = 0; i < this.children.src.length; i++) {

				var item = this.children.src[i];

//			this.children.each(function(item){
				if(!item._rendered && item.options.autoRender !== false && !(item.options.autoRender == 'non-empty' && item.children.src.length == 0 && !item.options.text)) {

					if(this.children.src.length == 1 && item._type != 'item') {
							// если элемент один, то компоновка ему еще не нужна
						// if(item._type == 'item') {
						// 	item.el[0]._index = item._index;
						// 	self.el.append(item.el);
						// }
						// else {
							item.el[0]._weight = item._weight;
							self.el.append(item.el);
//						}

						item._rendered = true;
					}
					else {
						item._type == 'item' ? self.layout.add(item, item._index) : self.layout.add(item);
					}

				}

//			});
			}
			// this.children.each(function(item){
				// item._layoutChanged();
			// });


			for(var i = 0; i < this.children.src.length; i++) {
				var item = this.children.src[i];
//			this.children.each(function(item){
				if( !(item.options.dynamic && item.data) )  //FIXME
					item.render(false, false);
//			});
			}

		}


		if( (target !== false || (this.options.autoRender == 'non-empty' && (!this.__c || !this.children.src.length == 0 || this.options.text))) && this.parent) {

			if(!this._rendered && this.options.autoRender !== false) {

//				console.log(this);

				if(this.parent.children.src.length == 1 && this._type != 'item') {
						// если элемент один, то компоновка ему еще не нужна
					// if(this._type == 'item') {
					// 	this.el[0]._index = this._index;
					// 	this.parent.el.append(this.el);
					// }
					// else {
						this.el[0]._weight = this._weight;
						this.parent.el.append(this.el);
//					}

					this._rendered = true;
				}
				else {
					this._type == 'item' ? this.parent.layout.add(this, this._index) : this.parent.layout.add(this);
				}



//				if(this.options.showOnRender) this.show();
//				if(this.options.hideOnRender) this.hide();
			}

		}
		else if(target) {
			$(target).append(this.el);
			this._rendered = true;
//			target.layout.add(this, this._index);
		}




/*
		this.components.each(function(item){
//			if(!item._dynamic)
				item.render();
		});

		this.items.each(function(item){
			// содержимое динамических элементов отрисовывается через bind
			if(!item.options.dynamic)  //FIXME
				item.render();
		});
*/

/*
		if(cascade !== false) {

			this.children.each(function(item) {
				if(!item.options.dynamic)  //FIXME
					item.render(null, false);
			});

			this.components.each(function(item){
					item.render();
			});

			this.items.each(function(item){
				// содержимое динамических элементов отрисовывается через bind
				if(!item.options.dynamic)  //FIXME
					item.render();
			});

		}
*/

		if(cascade !== false)
			this._layoutChanged();


		return $.when( (this.options.showOnRender || this.options.renderEffects) ? this.show() : true );
	},



	/**
	 * Удаление виджета из DOM-дерева
	 *
	 */
	unrender: function() {

		this._rendered = false;

		return $.when( (this.options.hideOnUnrender || this.options.renderEffects) ? this.hide() : true )
			.then(function() {
				this.el.detach();
			}.bind(this));

	},




	/**
	 * Перерисовка виджета
	 *
	 * @protected
	 *
	 */
	_rerender: function() {

		var w = this;

		// если .children не проинициализирован, значит перерисовывать нечего
		if(!this.__c) return;

		this.children.each(function(item){
			if(item._rendered)
				item.unrender();
		});


		this.children.each(function(item, i){
			if(!item._rendered && item.options.autoRender !== false && !(item.options.autoRender == 'non-empty' && item.children.src.length == 0 && !item.options.text)) {

				item._type == 'item' ? w.layout.add(item, i /*item._index*/) : w.layout.add(item, undefined, i);

			}

		}, this.options.renderFilter, this.options.renderSorter);


	},





  /**
	 * Обработчик, вызываемый когда необходимо обновить компоновку
	 *
	 * @protected
	 */
	_layoutChanged: function(cascade) {

		if(this.__l || this.options.autoHeight || this.options.autoWidth || this.options.autoFit) {
//			console.log(this.el);
			this.layout.update();
		}
		//FIXME возможно следует поменять эту строку на fire('layoutChanged')
//		if(this.layout.options.updateMode == 'auto') this.layout.update();

		if(cascade !== false && this.__c)
			this.children.apply_all('_layoutChanged');

//		this.events.fire('layoutChanged');
	},







};













/**
 * Базовый объект для всех виджетов
 *
 * Опции:
 *
 *
 *
 * @class
 * @name Ergo.core.Widget
 * @extends Ergo.core.Object
 * @param {Object} o параметры
 * @param {string} o.layout компоновка дочерних виджетов
 * @param {function} o.layoutFactory фабрика компоновок
 * @param {string} o.as css-классы или состояния (аналог cls и state)
 * @param {string} o.cls css-классы
 * @param {object} o.style хэш стилей
 * @param {string} o.html html-тег виджета
 * @param {object} o.components хэш компонентов
 * @param {object} o.defaultComponent опции компонента по умолчанию
 * @param {function} o.componentFactory фабрика компонентов
 * @param {array} o.items массив элементов
 * @param {object} o.defaultItem опции элемента по умолчанию
 * @param {function} o.itemFactory фабрика элементов
 * @param {boolean} o.dynamic флаг динамического связывания
 * @param {object|array|string} o.data связываемые данные
 * @param {string} o.dataId ключ в источнике данных
 * @param {object} o.events хэш событий
 * @param {object} o.states хэш состояний
 * @param {object} o.transitions хэш переходов между состояниями
 * @param {string} o.state предустановленное состояние
 * @param {function} o.rendering функция создания jQuery-элемента
 * @param {string} o.renderTo селектор родительского элемента
 * @param {boolean} o.showOnRender вызов метода show при создании
 * @param {boolean} o.hideOnDestroy вызов метода hide при удалении
 * @param {string|function} o.binding функция связывания данных с виджетом
 * @param {Any} o.value значение виджета
 * @param {object} o.wrapper опции "обертки"
 * @param {function} o.format форматирование "сырого" значения к строке, отображаемой виджетом
 * @param {function} o.unformat преобразование отображаемго/редактируемого значения в "сырые" данные
 * @param {boolean} o.autoBind автоматическое связывание с данными
 * @param {boolean} o.autoRender авто-отрисовка при создании
 * @param {boolean} o.autoHeight автоматический расчет высоты
 * @param {boolean} o.autoWidth автоматический расчет ширины
 *
 * @mixes observable
 * @mixes statable
 *
 * @fires dataChanged
 * @fires fetch
 * @fires fetched
 * @fires bound
 * @fires afterBuild
 * @fires click
 * @fires doubleClick
 *
 * @property {object} options
 * @property {Ergo.core.Layout} layout
 * @property {jQuery} el
 * @property {Ergo.core.DataSource} data
 * @property {Ergo.core.Observer} events
 * @property {Ergo.core.StateManager} states
 * @property {Ergo.core.WidgetChildren} children
 * @property {Ergo.core.WidgetItems} items
 * @property {Ergo.core.WidgetComponents} components
 * @property {string} text
 * @property {any} name
 * @property {string} width
 * @property {string} height
 *
 *
 */
Ergo.defineClass('Ergo.core.Widget', 'Ergo.core.Object', /** @lends Ergo.core.Widget.prototype */{


	defaults: {
//		layout: 'default',
		// states: {
// //			'hidden': 'hidden',
			// 'disabled': 'disabled',
			// 'invalid': 'invalid'
// //			'unselectable': 'unselectable'
		// },
//		plugins: [Ergo.Observable, Ergo.Statable],
//		autoBind: true,
//		autoUpdate: true,
		include: ['observable', 'statable'],

		// layoutFactory: function(layout) {
		// 	if( $.isString(layout) )
		// 		layout = $.ergo({etype: layout}, 'layouts');
		// 	else if(!(layout instanceof Ergo.core.Layout))
		// 		layout = $.ergo(Ergo.override({etype: 'default'}, layout), 'layouts');
		// 	return layout;
		// },
//		events: {},
//		defaultItem: {},
		// defaultComponent: {},
		// componentFactory: function(o) {
			// if($.isString(o)) {
				// o = this.options.shortcuts[o] || {text: o};
			// }
			// return Ergo.widget( Ergo.smart_override({}, this.options.defaultComponent, o) );
		// },
//		shortcuts: {},
//		showOnRender: false,
//		hideOnRender: false,
		// set: {
		// },
		// get: {
		// }
	},

	attributes: [],

	// FIXME
	jquery: {
		events: {
			on: function(name, callback, w) {
				w.el.on(name, callback.rcurry('jquery').bind(w));  //FIXME it could be simpler
			}
		}
	},




	// FIXME
	get ctx() {
		return ($context || Ergo.context); //FIXME костыль
	},

	get scope() {
		var w = this;
		while(w) {
			if(w._scope)
				return w._scope;
			w = w.parent;
		}
	},

	// set scope(scope) {
	// 	this
	// }


	// ctx: {
	// 	events: {
	// 		on: function(name, callback, w) {
	// 			(w._context || Ergo.context).events.on(name, callback, w);
	// 		}
	// 	}
	// },

/*
	_initialize: function(o) {
		this._super(o);
//		Ergo.core.Widget.superclass._initialize.apply(this, arguments);


		var o = this.options;
		var self = this;


		// this.events.on_fire = function(type, e, base_event) {
			// if(e.bubble && self.parent) self.parent.events.fire(type, e, base_event);
		// };


		// инициализируем виджет
		this.$init(o);


		// добавляем метод bubble к events
		this.events.bubble = function(name, e) {
			if(!e) e = {}
			e.after = Ergo.bubble;
			e.target = self;
			this.fire(name, e);
		}


		// создаем список дочерних элементов
		this.children = new Ergo.core.WidgetChildren(this);

		this.components = new Ergo.core.WidgetComponents(this, {type: 'component'});
		this.items = new Ergo.core.WidgetItems(this, {type: 'item'});

		//TODO этап генерации jQuery-элемента можно оптимизировать
		// создаем новый элемент DOM или используем уже существующий
		this.el = $(o.html);//this.$html());
		this.el.data('ergo-widget', this);
//		if(this.defaultCls) this.el.addClass(this.defaultCls);
		if('style' in o) this.el.css(o.style);
		if('cls' in o) this.el.addClass(o.cls);
		if('baseCls' in o) this.el.addClass(o.baseCls);


		// создаем компоновку
		this.layout = o.layoutFactory(o.layout);
		//FIXME костыль
//		if(!this.layout.container) this.layout.attach(this);
		this.layout.attach(this.layout.options.container || this);




		// конструируем виджет
		this._construct(o);

		// устанавливаем опциональные параметры
		this._opt(o);

		// добавляем обработку событий (deprecated)
//		this.$events(this);

		// добавляем элемент в документ
		this.render(o.renderTo);

		// подключаем данные и обновляем их, если установлен параметр autoUpdate
		this.bind(o.data, o.autoUpdate);


		this.$afterBuild();

//		if(this.options.debug)	console.log('created');

	},
*/



	/**
	 * Уничтожение виджета
	 *
	 * Удаляются связи в виртуальном дереве виджетов, отключается связь с данными,
	 * удаляется элемент из DOM-дерева, уничтожаются все дочерние виджеты.
	 *
	 * @protected
	 */
	_destroy: function(root) {

		var self = this;

		// if(this.options.hideOnDestroy && !noHide) {
			// return this.hide().then(function() { self._destroy(true); });
		// }
		// else {

		var destroy = function(){

			if(this.data)
				this.data.events.off(this);

			// очищаем регистрацию обработчиков событий
			($context || Ergo.context).events.off(this);

			if(this.scope)
				this.scope.events.off(this); //FIXME события могут быть прикреплены не только к скоупуs

			// очищаем регистрацию обработчиков событий
			this.events.off();

			if(this.__c) {

				// удаление в обратном порядке быстрее
				for(var i = this.children.src.length-1; i >=0 ; i--) {
					this.children.src[i]._destroy(false);
				}

			}

//			if(!eventsOnly) {

			// удаляем элемент и все его содержимое (data + event handlers) из документа
			if(this.parent && root !== false)
				this.parent.children.remove(this);

			if(this.__c) {

				this.children.remove_all();

				// очищаем компоновку
				this.layout.clear();
			}

			if(this.el) {
				this.el.remove();
			}

//			}


			// вызываем метод _destroy для всех дочерних компонентов
			// while( !this.children.is_empty() ) {
			// 	this.children.first()._destroy(true);
			// }

//			this.children.apply_all('_destroy');

			this._destroyed = true;

		};

		if( root !== false )
			this.unrender().then( destroy.bind(this) );
		else
			destroy.call(this);

//		}
//		if(this.options.debug)	console.log('_destroyed');

	},




	/**
	 * В фазе преконструирования происходит следующее:
	 *
	 * Преобразуется "сахарное" определение компонентов с префиксом $
	 *
	 * @protected
	 */
	_pre_construct: function(o) {
		Ergo.core.Widget.superclass._pre_construct.call(this, o);
//		this._super(o);


		var self = this;


		// // "сахарное" определение контента виджета
		// if('content' in o){
		// 	Ergo.smart_override(o, {
		// 		components: {
		// 			content: o.content
		// 		}
		// 	});
		// }


		// "сахарное" определение компонентов
		for(var i in o) {
			if(i[0] == '$') {
				var key_a = i.split('_');
				var overrides = {};
				var val = overrides;

				while(key_a.length > 0) {
					var k = key_a.shift();
					var v = (key_a.length == 0) ? o[i] : {};
					if(k[0] == '$') {
						k = k.substr(1);
						val.components = {};
						val = val.components[k] = v;
					}
					else {
						val = val[k] = v;
					}
				}

				Ergo.smart_override(o, overrides);
			}
		}








	},





	/**
	 * В фазе конструирования виджета:
	 * 1. создаются поля
	 * 2. создается элемнт DOM-дерева (обернутый jQuery)
	 * 3. создаются компоненты
	 * 4. создаются элементы
	 * 5. регистрируются события (виджета, jquery, ctx)
	 * 6. регистрируются обработчики onClick, onDoubleClick
	 *
	 * @protected
	 */
	_construct: function(o) {
		Ergo.core.Widget.superclass._construct.call(this, o);


		var self = this;
//		var el = this.el;


		// создаем список дочерних элементов
		/**
		 * @field
		 *
		 * @description Коллекция дочерних виджетов
		 *
		 */
//		this.children = new Ergo.core.WidgetChildren(this);

		/**
		 * Коллекция компонентов
		 * @field
		 */
//		this.components = new Ergo.core.WidgetComponents(this, {type: 'component'});
		/**
		 * Коллекция элементов
		 * @field
/		 */
//		this.items = new Ergo.core.WidgetItems(this, {type: 'item'});

		//TODO этап генерации jQuery-элемента можно оптимизировать
		// создаем новый элемент DOM или используем уже существующий
		/**
		 * @field
		 *
		 * @description jQuery-объект, с которым связан виджет
		 *
		 */

		if(o.rendering) {

			o.rendering.call(this, o);

		}
		else {

			this.el = $(o.html);//this.$html());

			if(!o.html) {
				this.el = $(document.createTextNode(''));
			}

			if('style' in o) this.el.css(o.style);
			if('cls' in o) this.el.addClass($.isString(o.cls) ? o.cls : o.cls.join(' '));
			if('baseCls' in o) this.el.addClass(o.baseCls);

			if(o.as) {
				var as = o.as.join(' ').split(' ');
				var cls = [];
				for(var i = 0; i < as.length; i++) {
					if(as[i][0] != '+' && as[i][0] != '-')
						cls.push(as[i]);
				}
				this.el.addClass(cls.join(' '));
			}

		}

		this.el[0]._ergo = this;


		/**
		 * Компоновка
		 */
  	if(o.layout)
	 		this.layout; //FIXME если компоновка указана явно, то создаем ее сразу
		//  if(o.layout) {
		// 	 this.layout = (o.layoutFactory || this.layoutFactory)(o.layout);
		//  }
		//  else {
		// 	 this.layout = new Ergo.core.Layout();
		//  }
		//
		// this.layout.attach(this);//this.layout.options._widget || this);







		if('components' in o) {
			var arr = [];
			// преобразуем набор компонентов в массив
			Ergo.each(o.components, function(c, i){
				if(!c.ignore)
					self.children.add(c, i, 'component');
			} );

		}



		if('items' in o){
			for(var i = 0; i < o.items.length; i++)
				this.children.add(o.items[i]);

		}



// 		if('events' in o){
// 			for(var i in o.events){
// 				var callback_a = o.events[i];
// 				callback_a = Array.isArray(callback_a) ? callback_a : [callback_a]; //FIXME
// 				for(var j in callback_a) {
// 					var callback = callback_a[j];
//
// 					if( $.isString(callback) ) {
// 						var a = callback.split(':');
// 						callback = (a.length == 1) ? this[callback] : this[a[0]].rcurry(a[1]).bind(this);
// //						callback = this[callback];
// 					}
// 					// if( $.isString(callback) ) {
// 						// var action = callback;
// 						// callback = function(e, scope) {
// 							// if(scope == 'jquery') e = {base: e};
// 							// this.events.rise(action, e);
// 						// };
// 					// }
//
// 					if(i.indexOf('ctx:') == 0) {
// 						// Context
// 						(this._context || Ergo.context).events.on(i.substr(4), callback, this);
// 					}
// 					else if(i.indexOf('jquery:') == 0) {
// 						// jQuery
// 						self.el.on(i.substr(7), callback.rcurry('jquery').bind(this));
// 					}
// 					else {
// 						// Widget
// 						self.events.on(i, callback, this);
// 					}
// 				}
// 			}
// 		}




		if('onClick' in o)
			this.el[0].addEventListener('click', function(e) { if(!self.states.is('disabled')) self.events.fire('click', {button: e.button}, e); })
//			this.el.click(function(e) { if(!self.states.is('disabled')) self.events.fire('click', {button: e.button}, e); });
		if('onDoubleClick' in o)
			this.el.dblclick(function(e) { if(!self.states.is('disabled')) self.events.fire('doubleClick', {button: e.button}, e); });

//		if(o.fastclick)
//			this.el.mousedown(function(e) { if(!self.states.is('disabled') && e.button === 0) self.events.fire('click', {button: e.button}, e); });



		this.events.rise = Ergo.rise;
		this.events.sink = Ergo.sink;


	},


	get children() {
		if(!this.__c) {
			this.__c = new Ergo.core.WidgetChildren(this);
		}
		return this.__c;
	},

	get components() {
		if(!this.__cmp) {
			this.__cmp = new Ergo.core.WidgetComponents(this, {type: 'component'});
		}
		return this.__cmp;
	},

	get items() {
		if(!this.__itm) {
			this.__itm = new Ergo.core.WidgetItems(this, {type: 'item'});
		}
		return this.__itm;
	},

	get layout() {
		if(!this.__l) {
			var o = this.options;
			if(o.layout) {
 			 this.__l = (o.layoutFactory || this.layoutFactory)(o.layout);
			}
			else {
			 this.__l = new Ergo.core.Layout();
			}

 			this.__l.attach(this);//this.layout.options._widget || this);
		}
		return this.__l;
	},




//	_theme: function() {
//		if(this.options.ui == 'jquery_ui') this._theme_jquery_ui
//	}



	/**
	 * Фаза постконструирования виджета:
	 * 1. рендеринг (renderTo)
	 * 2. подключение данных (data)
	 * 3. установка состояний (state)
	 *
	 * @protected
	 */
	_post_construct: function(o) {
//		this._super(o);
		Ergo.core.Widget.superclass._post_construct.call(this, o);


		// добавляем элемент в документ
		if('renderTo' in o)
			this.render(o.renderTo);

		// подключаем данные и обновляем их, если установлен параметр autoUpdate
		if('data' in o)
			this.bind(o.data, o.autoUpdate);


//		this.$afterBuild();

		var self = this;


		// устанавливаем состояния по умолчанию
		if('state' in o) {
			o.state.join(' ').split(' ').forEach(function(state) {
				if(state[0] == '-')
					self.states.unset(state.substr(1));
				else
					self.states.set(state);
			});
		}

		if(o.as) {
			var as = o.as.join(' ').split(' ');
			for(var i = 0; i < as.length; i++) {
				if(as[i][0] == '+')
					this.states.set(as[i].substr(1));
				else if(as[i][0] == '-')
					this.states.unset(as[i].substr(1));
			}
		}



		this.events.fire('afterBuild');

	},




	// factory: function(item) {
		// if(!(item instanceof Ergo.core.Widget)) {
			// item = this.options.componentFactory.call(this, item);
		// }
		// return item;
	// },




	/**
	 * Генерация всплывающего события
	 *
	 * Если имя события не определено, то используется имя виджета ( `w.opt('name')` )
	 *
	 * Если у оригинального события определен метод `stop()`, то он вызывается
	 *
	 * @param {Object} originalEvent Оригинальное событие
	 * @param {string} eventContext контекст события (`jquery`, `scope` и т.д.)
	 * @param {string} name Имя события
	 *
	 */
	action: function(event, eventType, v) {

		v = v || this.opt('name');
		// if(arguments.length == 1) {
		// 	e = v;
		// 	v = this.opt('name');
		// }

		// if( v == null /*|| $.isNumeric(v)*/ )
		// 	throw new Error('Invalid action name ['+v+"]");

		this.events.rise(''+v, {}, event);

		if(event.stop)
			event.stop();
	},






	/**
	 * Отображение виджета
	 *
	 * В том случае, если он уже включен в DOM-дерево
	 */
	show: function() {
		return $.when( (this._wrapper || this.el).show() );
	},


	/**
	 * Скрытие виджета
	 *
	 * В том случае, если он уже включен в DOM-дерево
	 */
	hide: function() {
		return $.when( (this._wrapper || this.el).hide() );
	},








	filter: function(type, criteria) {

		if(type == 'render') {
//			if(criteria)
			this.options.renderFilter = criteria;
			this._rerender();
		}

		if(type == 'compose') {
			if(this.options.dynamic) {
//				if(criteria)
				this.options.dynamicFilter = criteria;
				this._rebind();
			}
		}

	},




	// filter: function(criteria, opt, type) {

	// 	type = type || 'items';

	// 	this[type].each(function(item) {
	// 		var ok = criteria( opt ? item.opt(opt) : item );
	// 		if( !ok ) {
	// 			item.unrender();
	// 		}
	// 		else if(!item._rendered) {
	// 			item.render();
	// 		}
	// 	});

	// },












	/**
	 * Рекурсивный обход всех дочерних виджетов
	 *
	 * @param {Object} callback метод, вызываемый для каждого компонента
	 */
	walk: function(callback) {
		if( callback.call(this, this) === false)
			return;

		if(!this.__c)
			return;

		this.children.each(function(item){
			item.walk(callback);
		});
	},




	/**
	 * Получение следующего соседнего элемента, если виджет является элементом коллекции
	 */
	next: function() {
		if(!this.parent) return null;
		return this.parent.item(this._index+1);
	},

	/**
	 * Получение предыдущего соседнего элемента, если виджет является элементом коллекции
	 */
	prev: function() {
		if(!this.parent) return null;
		return this.parent.item(this._index-1);
	},

	/**
	 * Поиск элемента
	 *
	 * @param {int|string|class|Function|Object} i индекс|имя|класс|фильтр|шаблон
	 * @returns {Ergo.core.Widget}
	 *
	 * @example
	 * w.item(2) - находит элемент с индексом 2
	 * w.item('header') - находит элемент с именем "header"
	 * w.item(Ergo.widgets.MyWidget) - элемент класса Ergo.widgets.MyWidget
	 * w.item({tag: 'hello'}) - элемент, у которого свойство "tag" равно "hello"
	 *
	 */
	item: function(i) {
//		return this.children.find(Ergo.filters.by_widget(i));
		var finder = Ergo.by_widget(i);
		var j = 0;
		return this.children.find(function(item, i){
			if(item._type == 'item'){
				if(finder.call(this, item, j)) return true;
				j++;
			}
//			return item.type == 'item' && ;
		});
	},


	/**
	 * Поиск компонента
	 *
	 * Поиск элемента
	 *
	 * @param {string|class|Function|Object} i имя|класс|фильтр|шаблон
	 * @returns {Ergo.core.Widget}
	 *
	 */
	component: function(i) {
		var finder = Ergo.by_widget(i);
		return this.children.find(function(item, j){
			return item._type == 'component' && finder.call(this, item, j);
		});
	},





	//-------------------------------------------
	// Методы для работы с компонентами виджета
	//-------------------------------------------


	/**
	 * Получение списка всех родителей виджета.
	 *
	 * Еще здесь применим термин "путь" для деревьев.
	 *
	 * @returns {Array} список родительских виджетов
	 */
	parents: function(list) {
		if(arguments.length == 0) list = [];
		if(!this.parent) return list;
		list.push(this.parent);
		return this.parent.parents(list);
	},

	/*
	 * Получение родительского виджета
	 *
	 * Если критерий не указан, то возвращается непосредственный родитель
	 *
	 * @example
	 * a.parent();
	 * b.parent({'data': dataItem});
	 * c.parent(Ergo.widgets.Box);
	 * d.parent(function(w) { return w.options.width < 100; });
	 * e.parent('header');
	 *
	 * @param {Any} [criteria] критерий
	 *
	 * @deprecated
	 */
	// parent: function(i) {
//
		// if(arguments.length == 0) return this.parent;
//
		// return Ergo.find(this.parents(), Ergo.by_widget(i));
	// },
//







	//---------------------------------------------
	// Методы работы с подсоединенными данными
	//---------------------------------------------








	/**
	 * Получение значения, связанного с виджетом.
	 *
	 * Если задана функция форматирования (`options.format`), то она используется для преобразования результата
	 *
	 * @returns {Any} undefined, если к виджету данные не подключены
	 */
	get value() {
		var val;
		var o = this.options;

		if(this.data)
			val = this.data.get();
		else if('_value' in this)
			val = this._value;
		else
			val = this.opt('text');

//			val = (o.value) ? o.value.call(this) : this.opt('text');

		// если присутствует функция форматирования, то используем ее
		if(this.options.format)
			val = o.format.call(this, val);

		return val;
	},

	/**
	 * Установка значения, связанного с виджетом
	 *
	 * Если задана функция хранения (`options.unformat`), то она используется для преобразования значения
	 *
	 * @param {Any} val значение
	 */
	set value(val) {

//		if(this._lock_value_change) return;

		var o = this.options;

		// deprecated
		if(o.store)
			val = o.store.call(this, val);

		if(o.unformat)
			val = o.unformat.call(this, val);

		if(this.data){

//			this._lock_data_change = true;
//			o.store ? o.store.call(this, val) : this.data.set(val);
			this.data.set(val);
//			delete this._lock_data_change;

		}
		else {
			this._value = val;
			this._dataChanged();
//			o.value ? o.value.call(this, val) : this.opt('text', val);
		}


//		if(o.binding)
//			o.binding.call(this, val);

//		this.events.fire('valueChanged', {'value': val});

	},


/*
	format: function(val) {
		// если присутствует функция форматирования, то используем ее
		if(this.options.format)
			val = this.options.format.call(this, val);
		return val;
	},
*/



	// $valueChanged: function() {
//
	// },






	_bindNsEvents: function(ns) {

		var o = this.options;

		//FIXME bind data events
		if('events' in o) {
			for(var i in o.events){

				var name_a = i.split(':');

				if( name_a.length == 2 && name_a[0] == ns ) {

					var callback_a = o.events[i];
					callback_a = Array.isArray(callback_a) ? callback_a : [callback_a]; //FIXME
					for(var j in callback_a) {
						var callback = callback_a[j];

						if( $.isString(callback) ) {
							var a = callback.split(':');
							callback = (a.length == 1) ? this[callback] : this[a[0]].rcurry(a[1]).bind(this);
						}

						this[name_a[0]].events.on(name_a[1], callback, this);

					}
				}
			}
		}


	},


	// $unknown_opt: function(i, v) {
//
		// // проверяем состояния
		// if(i in this.states._states) {
			// this.states.toggle(i, v)
		// }
		// // проверяем группы
		// else if(i in this.states._exclusions) {
			// this.states.set(v);
		// }
//
	// }


	/**
	 * Установка значения опций
	 *
	 * Порядок поиска опций:
	 * 1. обработчик в `options.set`
	 * 2. сеттер set_*
	 * 3. состояния
	 * 4. ES5-сеттер
	 * 5. группа эксклюзивных состояний
	 * 6. список атрибутов
	 *
	 * @param {object} o опции
	 */
	_opt: function(o) {

//		var self = this;

		var exclusions = {
			components: true,
			items: true,
			set: true,
			get: true,
			mixins: true,
			defaultItem: true,
			defaultComponent: true,
			nestedItem: true,
			events: true,
			states: true,
			attributes: true,
		};

//		var el = this.el;

		for(var i in o) {

			if( (i in exclusions) || i[0] == '$') continue;

			// проверяем наличие сеттеров опций
			if(this.options.set && this.options.set[i])
				this.options.set[i].call(this, o[i], this.options);
			// если сеттер опций не найден, проверяем наличие java-like сеттера
			else {
				// проверяем наличие Java-like сеттеров
				var java_setter = 'set_'+i;//.capitalize();
				if(this[java_setter])
					this[java_setter](o[i]);
				// // проверяем состояния
				// else if(this.layout._etype == 'layouts:'+i)
				// 	this.layout
				// проверяем состояния
				else if(i in this.states._states)
					this.states.toggle(i, o[i]);
				// проверяем группы состояний
				else if( (i in this) && Ergo.setter(this, i) ) {
					// var desc = Object.getOwnPropertyDescriptor(this, i);
					// if(desc && desc.set)
					this[i] = o[i];
				}
				else if(i in this.states._exclusives)
					this.states.set(o[i]);
				// проверяем атрибуты
				else if(this.attributes.indexOf(i) != -1)
					o[i] ? this.el.attr(i, o[i]) : this.el.removeAttr(i);

			}
		}


//		profiler.tick('opt', 'other');
//
//		profiler.stop('opt');

	},




	layoutFactory: function(layout) {
		if( $.isString(layout) )
			layout = $.ergo({etype: layout}, 'layouts');
		else if(!(layout instanceof Ergo.core.Layout))
			layout = $.ergo(Ergo.override({etype: 'default'}, layout), 'layouts');
		return layout;
	}





	// setTextSelection: function(v) {
		// if(!v) {
      // if($.browser.mozilla){//Firefox
        // this.el.css('MozUserSelect','none');
      // }
      // else if($.browser.msie){//IE
        // this.el.bind('selectstart',function(){return false;});
      // }
      // else{//Opera, etc.
        // this.el.mousedown(function(){return false;});
      // }
		// }
	// }





}, 'widgets:widget');



Ergo.override(Ergo.core.Widget.prototype, Ergo.WidgetOptions);

Ergo.override(Ergo.core.Widget.prototype, Ergo.WidgetAttributes);

Ergo.override(Ergo.core.Widget.prototype, Ergo.WidgetData);

Ergo.override(Ergo.core.Widget.prototype, Ergo.WidgetRender);

//Ergo.widget = function(){
//	if(arguments.length == 1) return Ergo.object(arguments[0]);
//	return Ergo.object( Ergo.smart_override.apply(this, arguments) );
//};

Ergo.$widget = Ergo.object;

// Ergo.$widget = function(o, etype) {
	// return Ergo.object(o, 'widget:'+etype);
// };


Ergo.after_rise = function(e, type, base) {
	if(this.parent && !e.stopped) this.parent.events.fire(type, e, base);
};


Ergo.after_sink = function(e, type, base) {
	this.children.each(function(child){
		child.events.fire(type, e, base);
	});
};


Ergo.rise = function(name, e, baseEvent) {
	if(!e) e = {};//new Ergo.core.Event();
	e.after = Ergo.after_rise;
	e.target = e.target || this.target;
	this.fire(name, e, baseEvent);
};

Ergo.sink = function(name, e, baseEvent) {
	if(!e) e = {};//new Ergo.core.Event();
	e.after = Ergo.after_sink;
	e.target = e.target || this.target;
	this.fire(name, e, baseEvent);
};





//------------------------------
// Интегрируемся в jQuery
//------------------------------

$.ergo = function(o, ns, scope) {

//	var o = Ergo.smart_override.apply(this, arguments);

	var etype = null;

	if( Array.isArray(o) ) {
		for(var i = o.length-1; i >= 0; i--) {
			if(o[i])
				etype = o[i].etype;
			if(etype) break;
		}
	}
	else {
		etype = o.etype;
		o = [o];
	}



//	var etype = o.etype;
	ns = ns || 'widgets';
	var i = etype.indexOf(':');
	if(i > 0) {
		ns = etype.substr(0, i);
		etype = etype.substr(i+1);
	}

	if( !Ergo['$'+ns] )
		throw new Error('Namespace "'+ns+'" not defined');

	o.etype = ns+':'+etype;

	return Ergo['$'+ns](o, ns+':'+etype, scope);
}; //Ergo.widget;



$.fn.ergo = function(o) {
	if(this.length > 0){
		var widget = this[0]._ergo;// this.data('ergo-widget');
		if(widget) return widget;
		if(!o) return undefined;
		o.html = this;
	}
	else if(arguments.length == 0) return null;

	return $.ergo(o);
};




/**
 * Пространство для виджетов
 *
 * @namespace
 */
Ergo.widgets = {};


Ergo.$widgets = Ergo.object;


/**
 * Контекст
 *
 * Сериализуемое состояние приложения
 *
 * @class
 * @name Ergo.core.Context
 * @extends Ergo.core.Object
 *
 */
Ergo.defineClass('Ergo.core.Context', 'Ergo.core.Object', /** @lends Ergo.core.Context.prototype */{

	defaults: {
//		plugins: [Ergo.Observable] //, Ergo.Statable]
		include: 'observable',

	},





	_construct: function(o) {
		this._super(o);


		this._scopes = {};
		this._callbacks = {};
		this._depends = {};
		this._data = {};
		this._params = {};


		// if('events' in o) {
		// 	for(var i in o.events) {
		// 		var callback_a = o.events[i];
		// 		for(var j = 0; j < callback_a.length; j++) {
		// 			var callback = callback_a[j];
		// 			if( $.isFunction(callback) ) {
		// 				this.events.on(i, callback, this);
		// 			}
		// 		}
		// 	}
		// }





		if(o.hashLinks) {

			// обрабатываем нажатие ссылок
			$('html').click(function(e){
				var el = $(e.target);
		//		console.log(el[0].localName);
		//		console.log(el.attr('href'));
				if(el[0] && el[0].localName == 'a' && el.attr('href') == '#') {
					e.preventDefault();

					// !
					// var w = el.ergo();
					// if(w && w.opt('link')) {
		// //				$context.setState( w.opt('link'), 'pages', {}, true );
					// }
				}
			});


		}


//		if(o.history) {






			// $(window).on('popstate', function(e) {
			// 	var p = e.originalEvent.state;
			// 	if(p) {
			// 		self._no_history = true;
			// 		self.events.fire('restore', {scope: p._scope, params: p});
			// 		self._no_history = false;
			// 	}
			// });


			// this.events.reg('scope:joined', function(e) {

			// 	if(e.scope.history && !self._no_history) {
			// 		window.history.pushState( Ergo.override({_scope: e.scope._name}, self._params), e.scope._name );//, 'title', '#'+url);
			// 	}

			// });

//		}




		if(o.windowBox) {

			// обновляем компоновку при изменении размеров окна
			$(window).on('resize', function(){

				//устанавливаем высоту <body> по высоте окна
				$('body').height(window.innerHeight);
				// обновляем компоновку
				$context.app._layoutChanged();

			});


			$('body').height(window.innerHeight);
		}



	},


	/*
	state: function(s, fn) {
		this.states.state(s, function() {
			fn.apply(this, arguments);
			return false;
		}.bind(this));
	},
	*/




	open_glass_pane: function() {
		var gp = $('<div class="glass-pane" autoheight="ignore"/>')
			.on('mousedown', function(e){
				e.preventDefault();
				return false;
			});

		$('body').append(gp);

		return gp;
	},


	close_glass_pane: function() {
		$('.glass-pane').remove();
	},



	// получение виджета из контекста (обход всех скоупов)
	widget: function(key) {

		var name_a = key.split('@');

		if(name_a.length == 2) {
			return this._scopes[name_a[0]].widget(name_a[1]);
		}

		// for(var i in this._scopes) {
		// 	var w = this._scopes[i].widgets[key];
		// 	if(w) return w;
		// }

	},


	// получение данных из контекста
	data: function(key, v) {

		if(arguments.length == 1)
			return this._data[key];
		else
			this._data[key] = v;

		// for(var i in this._scopes) {
		// 	var d = this._scopes[i].data[key];
		// 	if(d) return d;
		// }

	},




	param: function(key, v) {
		if(arguments.length == 1)
			return this._params[key];
		else
			this._params[key] = v;
	},


	// регистрация скоупа
	scope: function(name, callback) {

		if(arguments.length == 1) {
			if(name[0] == ':') {
				for(var i in this._scopes) {
					if(i.indexOf(name) > 0)
						return this._scopes[i];
				}
			}
			else {
				return this._scopes[name];
			}
		}
		else if(arguments.length == 2) {
			this._callbacks[name] = callback;
		}
		else {
			this._callbacks[name] = arguments[2];
			this._depends[name] = Array.isArray(arguments[1]) ? arguments[1] : [arguments[1]] ;
		}

	},


	// подсоединяем скоуп к контексту
	join: function(scope_name, params, o) {

		var ctx = this;

		var parent = null;

		var chain = scope_name.split('.');

		console.log('scope chain', chain);

		if( chain.length > 1 ) {
			// инициализируем базовые скоупы
			parent = this._scopes[chain[chain.length-2]] || this.join( chain.splice(0,chain.length-1).join('.'), params, Ergo.override({restored: true}, o) );
		}

		scope_name = chain[chain.length-1];


		if(!this._callbacks[scope_name])
			throw 'Scope ['+scope_name+'] is not registered in context';




		if( parent ) {
			// отсоединяем вложенные скоупы
			// FIXME считается, что они эксклюзивны по отношению к текущему
			for( var i in parent._children )
				this.disjoin( parent._children[i] );
		}

		// var name_a = scope_name.split(':');
		// var group = (name_a.length == 1) ? null : name_a[name_a.length-1];
		//
		// // если присутствует скоуп с такой же группой, то отсоединяем его
		// for(var i in this._scopes) {
		// 	if(i.indexOf(':'+group) != -1) {
		// 		this.events.fire('scope:disjoin', {scope: this._scopes[i]});
		// 		this.disjoin(i);
		// 	}
		// }


		// // если отсутствует базовый скоуп, то сначала присоединяем его
		// if( this._depends[scope_name] ) {
		// 	var base_scopes = this._depends[scope_name];
		//
		// 	var base_scope = null;
		// 	for(var i = 0; i < base_scopes.length; i++) {
		// 		base_scope = this._scopes[base_scopes[i]];
		// 		if(base_scope)
		// 			break;
		// 	}
		//
		// 	if( !base_scope ) {
		// 		ctx.join(base_scopes[0]);
		// 		base_scope = this._scopes[base_scopes[0]]
		// 	}
		//
		// 	parent = base_scope;
		//
		// }


		this._params[scope_name] = this._params[scope_name] || {};

		// создаем скоуп
		var scope = new Ergo.core.Scope(o);
		scope._context = this;
		scope._name = scope_name;
		scope._parent = parent;
		scope._params = Ergo.override(this._params[scope_name], params);// this._params[scope_name];
//		scope._container = container;

//		Ergo.override(scope, overrides);

		scope._chain = parent ? parent._chain.concat(scope_name) : [scope_name];



		if(parent)
			parent._children[scope_name] = scope;

		this._scopes[scope_name] = scope;


		var deferred = $.Deferred();

		scope._promise = deferred.promise();

		// инициализируем скоуп
		var initPromise = this._callbacks[scope_name].call(this, scope, Ergo.override({}, scope._params), scope._promise) || true;

		// загружаем данные скоупа?


		$.when(initPromise).done(function() {

			// рендерим виджеты скоупа (включаем виджеты в скоуп)
			for(var i in scope.widgets) {

				var w = scope.widgets[i];

				if(!w._rendered) {
					// если у родителя определен контейнер, используем его
					if(parent && parent._container) {
						parent._container.components.set(i, w);
						w.render();
					}
					// инче рендерим виджет в <body>
					else
						w.render('body');
				}
			}


			ctx.events.fire('scopeJoin', {scope: scope});
			scope.events.fire('join');

			console.log('join:'+scope_name);

			deferred.resolve(scope, scope._params);
		});

		return scope;//._promise;
	},


	// отсоединяем скоуп от контекста
	disjoin: function(scope) {

		if( $.isString(scope) )
			scope = this._scopes[scope];


		scope.events.fire('disjoin', {scope: scope});
		this.events.fire('scopeDisjoin', {scope: scope});


		// отсоединяем вложенные скоупы
		for(var i in scope._children) {
			this.disjoin( scope._children[i] );
		}


		// удаляем виджеты скоупа (отсоединяем виджеты от скоупа)
		for(var i in scope.widgets) {

			var w = scope.widgets[i];

			console.log('destroy', i);


			w._destroy();

		}


		delete this._scopes[scope._name];

		console.log('disjoin', scope._name);

		if(scope._parent)
			delete scope._parent._children[scope._name];

		scope.events.fire('disjoined');


		// выгружаем данные?

	},


// 	// сменить контекст
// 	to: function(scope_name, params, data) {
//
// 		// удалить текущий субконтекст?
//
//
// 		// создаем новый контекст
// 		var ctx = new Ergo.core.Context();
// 		ctx.params = params;
// 		ctx._data = data;
// //		ctx._scope = this;
//
// 		ctx.join(scope_name);
//
// 		this._subcontext = ctx;
//
// 	},



	reset: function() {

		for(var i in this._scopes) {
//			this.events.fire('scope:disjoin', {scope: this._scopes[i]});
			this.disjoin(i);
		}

	},


	init: function() {

		var ctx = this;

/*
		var p = window.history.state;

		this._no_history = true;

		this.events.fire('scope:restore', {params: (p ? p : ctx.options.main)});

	// 	if(p) {

	// 		// восстанавливаем
	// 		this.restore(p);
	// 	}
	// 	else {
	// 		// устанавливаем по умолчанию
	// //		$context.join( $context.options.main );
	// 		this.restore( $context.options.main )
	// 	}

		this._no_history = false;
*/
	},


	restore: function(name, p) {

		$context.join(name, p);

	// 	// обходим параметры
	// 	for(var i in p) {
	// 		for(var j in this._callbacks) {
	// 			var s = ''+i+':'+p[i];
	// 			if(i == j || s == j) {
	// //				console.log('restore', i);
	// 				$context.join(j);
	// 			}
	// 		}
	// 	}

	}


});







Ergo.context = new Ergo.core.Context();

$context = Ergo.context;



/**
* Скоуп
*
*	Структурный элемент страницы, включающий набор виджетов
*
*
*/

Ergo.defineClass('Ergo.core.Scope', 'Ergo.core.Object', {

	defaults: {
		include: 'observable'
	},


	_construct: function(o) {
		this._super(o);

		this.widgets = {};

		this._children = {};
//		this.data = {};

//		this.context = null;
	},




	// получение/создание виджета из пространства контекста
	widget: function(key, w) {

		if(arguments.length == 1) {
			return this.widgets[key];
		}
		else if(arguments.length == 2) {

			if($.isPlainObject(w)) {
				w = $.ergo(w, null, this);
//				w.bind();
			}

			this.widgets[key] = w;

			return w;
		}

	},


	disjoin: function() {
		this._context.disjoin(this._name);
	},



	get params() {
		return this._params;
	}



});















/**
 * Источник данных как типизированная коллекция
 *
 *
 * @class
 * @name Ergo.data.Collection
 * @extends Ergo.core.DataSource
 */
Ergo.declare('Ergo.data.Collection', 'Ergo.core.DataSource', /** @lends Ergo.data.Collection.prototype */{

	defaults: {
		model: null,
		idKey: 'id',
		query: {}
	},

	/**
	 * Модель элемента коллекции
	 *
	 * @field
	 *
	 */
	model: null,


	/**
	 * Получение элемента коллекции по OID
	 */
	find: function(id) {
		var a = this.get();
		for(var i in a)
			if(a[i][this.options.idKey] == id) return a[i];
		return null;
	},


	find_entry: function(id) {

		var valueUid = (this.options.valueUid || this._valueUid);

		var a = this.get();
		for(var i in a)
			if(valueUid.call(this, a[i], i) == id) return this.entry(i);
		return null;
	},




	_initialize: function(v) {
		if(arguments.length == 0)
			this._super([]);
		else if(arguments.length == 1) {
			Array.isArray(v) ? this._super(v) : this._super([], v);
		}
		else
			this._super.apply(this, arguments);

	},



	/**
	 * Загрузка данных из хранилища => заполнение коллекции данными
	 *
	 */
	fetch: function(q) {

		this._fetched = undefined;

		var parse = this.options.parser || this._parse;
		var query = Ergo.override({}, this.options.query, q);

		this.events.fire('fetch:before');

		var provider = this.options.provider;

		if( $.isString(provider) )
			provider = Ergo.alias('providers:'+provider);


		if(provider) {
			var self = this;
			return provider.find_all(this, query).then(function(data) {

				var v = parse.call(self, data);

				if(self.options.sync) {
					self.sync( v );
					self._fetched = true;
					// self.source = v;
					// self._fetched = 'swap';
				}
				else {
					self.set( v );
					self._fetched = true;
				}
				self.events.fire('fetch:after');
			});
		}
		else {
			this._fetched = true;
			this.events.fire('fetch:after');
		}

	},






	// _merge: function(oldData, newData) {
	//
	//
	// },


/*
	sync: function(q) {

		this._fetched = undefined;

		var parse = this.options.parser || this._parse;
		var query = Ergo.override({}, this.options.query, q);

		var provider = this.options.provider;

		this.events.fire('fetch:before');

		if( $.isString(provider) )
			provider = Ergo.alias('providers:'+provider);


		if(provider) {
			var self = this;
			return provider.find_all(this, query).then(function(data) {

				var v = parse.call(self, data);

				if(v.length == self.source.length) {
					self.source = v;
					self.events.fire('value:sync');
				}
				else {
					self.set( v );
				}
				self._fetched = true;
				self.events.fire('fetch:after');
			});
		}
		else {
			this._fetched = true;
			this.events.fire('fetch:after');
		}

		return $.when(null);
	},
*/



	_parse: function(v) {
		return v;
	},

	_compose: function(v) {
		return v;
	},


	/**
	 * Очистка данных => удаление данных из коллекции
	 *
	 */
	purge: function() {
		this._fetched = false;
	},

	/**
	 * Сброс данных в хранилище (принудительная синхронизация)
	 *
	 */
	flush: function() {

//		var id = this._oid();

		var composer = this.options.composer || this._compose;
		var parser = this.options.parser || this._parse;
		var provider = this.options.provider;

		this.events.fire('flush:before');

		if( $.isString(provider) )
			provider = Ergo.alias('providers:'+provider);

		if(provider) {

			var data = composer.call(this, this.get(), 'update');

			return provider.update(this, data, this.options.query).then(function(data) {
				this.events.fire('flush:after');
				return parser.call(this, data, 'update');
			}.bind(this));

		}
		else {
			this.events.fire('flush:after');
		}

		return $.when(null);
	},



	/**
	 * @deprecated
	 */
	invoke: function(action) {

		var provider = this.options.provider;
		var composer = this.options.composer || this._compose;

		if( $.isString(provider) )
			provider = Ergo.alias('providers:'+provider);

		if(provider) {

			var data = composer.call(this, this.get(), action);

			return provider[action](this, this.options.query).then(function(data) {
				// ?
				return data;
			});
		}

	},







	/**
	 * Фабрика элементов коллекции
	 */
	_factory: function(i) {

		/**
		 * Фабрика должна создавать элементы с помощью функции-генератора класса.
		 * Причем, могут быть такие случаи:
		 *  - задана сама функция
		 *  - задано имя класса
		 *  - задано поле, которое содержит имя класса
		 */

		var model = this.options.model || this.model; // модель можно определить либо в опциях, либо в классе, причем опции имеют больший приоритет
//		if($.isFunction(model)) model = model.call(this, this.val()[i]);
		if($.isFunction(model) && !$.isClass(model)) model = model.call(this, this.get()[i]);
		if($.isString(model)) model = Ergo.alias(model);// eval(model); //TODO здесь лучше загружать класс по зарегистрированному имени
		model = model || Ergo.core.DataSource;

		var o = {provider: this.options.provider};
		return new model(this, i, o);
	}



});



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
		idKey: 'id'
	},

	/**
	 * Определение полей объекта
	 */
	fields: {
	},



	_oid: function() {
		return this.get(this.options.idKey);
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

		this._super.apply(this, arguments);
//		Ergo.data.Model.superclass.set.apply(this, arguments);
	},


	/**
	 * Подгрузка данных
	 *
	 *
	 */
	fetch: function(id) {

		if(arguments.length == 0)
			id = this._oid();

//		this._fetched = true;
		var parser = this.options.parser || this._parse;
		var provider = this.options.provider;

		if( $.isString(provider) )
			provider = Ergo.alias('providers:'+provider);

		this.events.fire('fetch:before');

		if(provider) {
//			var self = this;
			return provider.find(this, id, this.options.query).then(function(data) {
				this.set( parser.call(this, data) );
				this._fetched = true;
				this.events.fire('fetch:after');
				return data;
			}.bind(this));
		}
		else {
			this._fetched = true;
			this.events.fire('fetch:after');
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

		var id = this._oid();

		var composer = this.options.composer || this._compose;
		var parser = this.options.parser || this._parse;
		var provider = this.options.provider;

		this.events.fire('flush:before');

		if( $.isString(provider) )
			provider = Ergo.alias('providers:'+provider);

		if(provider) {

			// create
			if(id == null) {

				var data = composer.call(this, this.get(), 'create');

				return provider.create(this, data, this.options.query).then(function(data) {
					this.events.fire('flush:after');
					return parser.call(this, data, 'create');
				}.bind(this));
			}
			// update
			else {

				var data = composer.call(this, this.get(), 'update');

				return provider.update(this, id, data, this.options.query).then(function(data) {
					this.events.fire('flush:after');
					return parser.call(this, data, 'update');
				}.bind(this));
			}
		}
		else {
			this.events.fire('flush:after');
		}

	},


	_compose: function(v) {
		return v;
	},






	invoke: function(action) {

		var oid = this._oid();

		var provider = this.options.provider;
		var composer = this.options.composer || this._compose;

		if( $.isString(provider) )
			provider = Ergo.alias('providers:'+provider);

		if(provider) {

			var data = composer.call(this, this.get(), action);

			return provider[action](this, oid, data, this.options.query).then(function(data) {
				// ?
				return data;
			});
		}

	},




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






Ergo.defineClass('Ergo.data.NodeList', 'Ergo.data.Collection', {

	defaults: {
	},
	
	model: 'data:node',
	
	purge: function() {
		this.set([]);
		this._fetched = false;
	}
	
}, 'data:node-list');





Ergo.defineClass('Ergo.data.Node', 'Ergo.data.Object', {
	
	defaults: {
	},
	
	fields: {
		'children': 'data:node-list'
	},
	
	
	fetch: function() {
		var d = this;
		d.events.fire('fetch:before');
		return d.entry('children').fetch( {id: d._oid()} ).then(function(){ d._fetched = true; d.events.fire('fetch:after'); });
	},
	
	
	purge: function() {
		this.entry('children').purge();
		this._fetched = false;
	},
	
		
	get_branch: function() {
		return this.get('children');
	}
	
	
}, 'data:node');





Ergo.declare('Ergo.data.PagedCollection', 'Ergo.data.Collection', {
	
	defaults: {
		pageSize: 30,
		totalCount: 0,
		index: 0
	},
	
	
	
	set index(v) {
		this.options.query.from = (v-1)*this.options.pageSize;
		this.options.query.to = v*this.options.pageSize;
	},
	
	
	get count() {
		return Math.ceil(this.options.totalCount / this.options.pageSize);
	},
	
	
	_parse: function(v) {
		this.options.totalCount = v.total;
		this.options.from = v.from;
		this.options.to = v.to;
		
		return v.data;
	}
	
	
	
/*	
	fetch: function() {

		this.events.fire('fetch');
		
		var o = this.options;
		
		if(o.provider) {
			var self = this;
			return o.provider.get(this, Ergo.deep_override({}, this.options.query, {from: o.from,	to: o.to}))
				.then(function(response) {
				
				o.from = response.from;
				o.to = response.to;
				o.totalCount = response.total;
				
				self.set(response.data); 
				self._fetched = true;
				
				self.events.fire('fetched');
			});
		}
		else {
			this._fetched = true;			
			this.events.fire('fetched');
		}
		
	}
*/	
	
	
});



Ergo.defineClass('Ergo.data.AjaxProvider', 'Ergo.core.Object', {
	
	defaults: {
		dataType: 'json'
	},
	
	
	_initialize: function(url, o) {
		this._super(o || {});
		
		this._url = url;
	},
	
	
	find_all: function(ds, query) {
		return $.ajax({
			url: this._url,
			data: query,
			dataType: this.options.dataType
		});
	}
	
	
}, 'data:ajax-provider');









Ergo.declare('Ergo.layouts.Inherited', 'Ergo.core.Layout', {
	
	// select: function(item) {
		// return this.container.parent.el;
	// }
	
	add: function(item, index, weight) {
		
//		var _select = this.container.parent.layout.options.selector;
		
//		var wrapper = this.container._wrapper;
		
//		if(wrapper) {
//			this._widget.el.after(item.el);
		this._widget.parent.layout.add(item, index, weight);
//		}
		
		
//		if(this.container._wrapper)
//			this.container.parent.layout.options.selector = function() { return wrapper; }
		
//		this.container.parent.layout.add(item, index, weight);
		
//		if(this.container._wrapper)
//			this.container.parent.layout.options.selector= _select;
		
	}
	
	
}, 'layouts:inherited');


Ergo.declare('Ergo.layouts.HBox', 'Ergo.core.Layout', {
	
	defaults: {
		name: 'hbox'
	}	
	
}, 'layouts:hbox');


Ergo.declare('Ergo.layouts.Bar', 'Ergo.core.Layout', {
	
	defaults: {
		name: 'bar'
	}
	
}, 'layouts:bar');


Ergo.declare('Ergo.layouts.Row', 'Ergo.core.Layout', {
	
	defaults: {
		name: 'rows'
	},

	wrap: function(item) {
		return (item.options.divider) ? item.el : $('<div/>').append(item.el);
	}	
	
}, 'layouts:rows');


Ergo.declare('Ergo.layouts.HSlide', 'Ergo.core.Layout', {

	defaults: {
		name: 'hslide',
		html: '<div style="white-space: nowrap; display: inline-block"/>',
		include: ['observable']
	},


	_construct: function(o) {
		this._super(o);

		this._offset = 0;
	},




	slide_next: function() {
		var width = this._widget.el.width();
//		if(!this._offset) this._offset = 0;
		this._offset += width;
		if(this._offset > this.el.width() - width) {
			this._offset = this.el.width() - width;
//			this.nextBtn.states.set('disabled');
		}
		else {
//			this.nextBtn.states.unset('disabled');
		}
//		this.prevBtn.states.unset('disabled');

		this.el.css('margin-left', -this._offset);

		this.events.fire('slide', {hasPrev: this.has_prev(), hasNext: this.has_next()});
	},

	slide_prev: function() {
		var width = this._widget.el.width();
//		if(!this._offset) this._offset = 0;
		this._offset -= width;
		if(this._offset <= 0) {
			this._offset = 0;
//			this.prevBtn.states.set('disabled');
		}
		else {
//			this.prevBtn.states.unset('disabled');
		}

//		this.nextBtn.states.unset('disabled');

		this.el.css('margin-left', -this._offset);

		this.events.fire('slide', {hasPrev: this.has_prev(), hasNext: this.has_next()});
	},

	slide_to_item: function(item, bias) {

		bias = bias || 0;

		var x = this._item_offset(item);//this._widget.item(i).el.position().left + this._offset;//_item_offset(i);
		var w = item.el.outerWidth(true);
		var frame_w = this._widget.el.width();
		var box_w = this.el.width();

		if(x - bias < this._offset) {
			this._offset = Math.max(x - bias, 0);
			this.el.css('margin-left', -this._offset);
		}
		else if(x+w+bias > this._offset+frame_w) {
			this._offset = Math.min(box_w-frame_w, x+w-frame_w+bias);
			this.el.css('margin-left', -this._offset);
		}

		this.events.fire('slide', {hasPrev: this.has_prev(), hasNext: this.has_next()});
	},


	_item_offset: function(item) {
		var offset = item.el.offset();
		var offset0 = this.el.offset();

		return offset.left - offset0.left;
	},


	has_prev: function() {
		return this._offset > 0;
	},

	has_next: function() {
		var frame_w = this._widget.el.width();
		var w = this.el.width();
		return (w - this._offset) > frame_w;
	}




}, 'layouts:hslide');



Ergo.declare('Ergo.layouts.VBox', 'Ergo.core.Layout', {
	
	defaults: {
		name: 'vbox'
	}	
	
}, 'layouts:vbox');


Ergo.declare('Ergo.layouts.Stack', 'Ergo.core.Layout', {
	
	defaults: {
		name: 'stack'
	}
	
}, 'layouts:stack');


Ergo.declare('Ergo.layouts.Columns', 'Ergo.core.Layout', {
	
	defaults: {
		name: 'columns'
	},
	


	select: function(item) {
		var _el = this.el;//this.el.filter('.'+item.options.col);
		if( item.options.col ) {
			var elements = this.el[0].childNodes;
			if(elements.length == 0) {
				_el = $('<div class="col '+item.options.col+'"/>');
				_el[0]._col = item.options.col;
				this.el.append(_el);
			}
			else if( item.options.col > elements[elements.length-1]._col ) {
				_el = $('<div class="col '+item.options.col+'"/>');
				_el[0]._col = item.options.col;
				this.el.append(_el);
			}
			else {
				for(var i = 0; i < elements.length; i++) {
					if( item.options.col == elements[i]._col ) {
						_el = $(elements[i]);
						break;
					}
					if( item.options.col < elements[i]._col ) {
						_el = $('<div class="col '+item.options.col+'"/>');
						_el[0]._col = item.options.col;
						this.el.prepend(_el);
						break;
					}
				}
			}
		}
//				console.log(elements.length, _el));
		return _el;//this.el.filter('.'+item.options.col);
	},



	wrap: function(item) {
		// var el = null;
		// if(item.options.col) {
		// 	var el = $('> .col.'+item.options.col, this.el); // [class^="col-
		// 	if(el.length == 0)
		// 		el = $('<div class="col '+item.options.col+'"/>');
		// }
		// else {
		// 	var el = $('> div:not(.col)',  this.el);  //[class^="col-"]
		// 	if(el.length == 0)
		// 		el = $('<div/>');
		// }
		return (item.options.col) ? item.el : $('<div/>').append(item.el);
	}


	// wrap: function(item) {
	// 	return (item.options.divider) ? item.el : $('<div/>').append(item.el);
	// }
	
}, 'layouts:columns');



Ergo.defineClass('Ergo.layouts.Grid', 'Ergo.core.Layout', {
	
	defaults: {
		name: 'grid',
//		pattern: []
	},
	
	
	wrap: function(item) {
		return $('<div autoheight="ignore-siblings"/>').append(item.el);
	},
	
	
	update: function() {
		this._super();

		
		var self = this;
		
		var o = this.options;
		
		var w = this._widget;
		
		var n = w.children.size();
		var k = (n == 0) ? 1 : (12/n).toFixed();

				
		w.children.each(function(item, i) {
			
			if(!item._rendered) return;
			
			var el = item._wrapper || item.el;
			
//			console.log(el._wrapper != null);
			
			
			if(w.options.pattern) {
				
				var offset = 0;
				var n = 0;
				var p = 0;
				for(var j = 0; j < w.options.pattern.length; j++) {
					p = w.options.pattern[j];
					// если размер отрицательный, то добавляем его к смещению
					if(p < 0) {
						offset += p;
					}
					// если размер положительный
					else {
						// если размер соответствует элементу с меньшим порядковым номером
						if(n < i) {
							offset = 0;
							n++;
						}
						else {
							break;
						}
					}
				}
	
				if(n == i) {
					el.addClass('col-'+(item.options.col || p));
					if(offset < 0)
						el.addClass('col-offset'+offset);
//					el.addClass('col-'+(item.options.col || w.options.pattern[i]));				
				}
			}
			else {
				el.addClass('col-'+k);				
			}
			
			
/*			
			for(var i in o.pattern) {
				var j = o.pattern[i];
				
				var k = -1;
				var d = 0;
				// for(var j = 0; j < tmpl.length; j++) {
					// if( tmpl[j] > 0 ) {
						// k++;
					// }
					// else if( tmpl[j] < 0 ) {
						// d -= tmpl[j];
					// }
					// else {
						// d++;
					// }
					
//					if( k == item._index ) {
						el.addClass('col-'+j);
//						if(d)
//							el.addClass('col-'+'-offset-'+d);
//						break;
//					}
					
//					if( j > 0 ) d = 0;
					
//				}
				
			}
*/			
		});
		
		
	}
	
	
}, 'layouts:grid');



Ergo.declare('Ergo.layouts.Table', 'Ergo.core.Layout', {
	
	defaults: {
		name: 'table'
//		columns: []
	},
	
	
	// construct: function(o) {
		// this._super(o);
// 		
	// },
	
	
	// update: function() {
	// 	this._super();
		
	// 	$('tr.group > td', this.el).attr('colspan', this.options.columns.length);
		
	// }
	
	
}, 'layouts:table');


Ergo.declare('Ergo.layouts.Fluid', 'Ergo.core.Layout', {
	
	defaults: {
		name: 'fluid'
	}
	
}, 'layouts:fluid');


Ergo.declare('Ergo.layouts.Float', 'Ergo.core.Layout', {
	
	defaults: {
		name: 'float'
	}
	
}, 'layouts:float');



Ergo.declare('Ergo.layouts.Tiles', 'Ergo.core.Layout', {
	
	defaults: {
		name: 'tiles'
	},


	attach: function(w) {
		Ergo.layouts.Tiles.superclass.attach.call(this, w);

		var sizes = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight'];

		var tiles = this.options.size;

		this.el.addClass( tiles > sizes.length ? 'tiles-'+tiles : sizes[tiles-1] );		
	},


	// set tiles(v) {
	// },

	wrap: function(item) {
		var el = $('<div/>').append(item.el);
//		el.css({'width': '25%'});
		return el;
	}

	
}, 'layouts:tiles');


Ergo.declare('Ergo.layouts.Band', 'Ergo.core.Layout', {
	
	defaults: {
		name: 'band'
	},
	
	wrap: function(item) {
		var w = $('<div/>');
		if(item.label)
			w.append(item.label.el);
		w.append(item.el);
		return w;
	}
	
	
}, 'layouts:band');



Ergo.declare('Ergo.layouts.Form', 'Ergo.core.Layout', {

	defaults: {
		name: 'form'
	},

	wrap: function(item) {
		var w = $('<div/>');
		if(!item.$label && item.options.label) {
			item.$label = $.ergo({etype: 'html:label', text: item.options.label});
		}
		if(item.$label) {
			w.append(item.$label.el);
		}
		w.append(item.el);
		return w;
	}


}, 'layouts:form');





Ergo.declare('Ergo.layouts.HForm', 'Ergo.layouts.Grid', {

	defaults: {
		name: 'hform'
	},

	wrap: function(item) {
		var w = $('<div class="form-item"/>');
		if(!item.$label && item.options.label) {
			item.$label = $.ergo({etype: 'html:label', text: item.options.label});
		}
		if(!item.$message && item.options.message) {
			item.$message = $.ergo({etype: 'text', text: item.options.message, as: 'sub'});
		}
		if(item.$label) {
			w.append(item.$label.el);
		}
		w.append(item.el);
		if(item.$message) {
			w.append(item.$message.el);
		}
		return w;
	}


}, 'layouts:hform');






Ergo.declare('Ergo.layouts.VForm', 'Ergo.layouts.Grid', {

	defaults: {
		name: 'vform'
	},

	wrap: function(item) {
		var w = $('<div/>');
		if(!item.$label && item.options.label) {
			item.$label = $.ergo({etype: 'html:label', text: item.options.label});
		}
		if(item.$label) {
			w.append(item.$label.el);
		}

		var w2 = $('<div class="form-item"/>');
		w2.append(item.el);

		w.append(w2);

		return w;
	},



	update: function() {

//		this._super();


		var self = this;

		var o = this.options;

		var w = this._widget;

		// var sz = w.children.size();
		// var k = (sz == 0) ? 1 : (12/sz).toFixed();


		w.children.each(function(item, i) {

			if(!item._rendered) return;

			var el = item._wrapper.children().filter('div') || item.el;

//			console.log(item._wrapper);


			if(w.options.pattern) {

				if(item.$label)
					item.$label.el.addClass('col-'+w.options.pattern[0]);
				else
				el.addClass('col-offset-'+w.options.pattern[0]);

				el.addClass('col-'+w.options.pattern[1]);

			}
			else {
				if(item.$label)
					item.$label.el.addClass('col-6');
				else
					el.addClass('col-offset-6');

				el.addClass('col-6');
			}

		});




	}





}, 'layouts:vform');



Ergo.declare('Ergo.layouts.Center', 'Ergo.core.Layout', {
	
	defaults: {
		name: 'center'
	},
	
	
	update: function() {
		this._super();
		
		// var box_w = this._widget.parent.el.width();
		// var box_h = this._widget.parent.el.width();

		var w = this._widget.el.width();
		var h = this._widget.el.height();
		
		this._widget.el.css({
			'margin-left': -w/2,
			'margin-top': -h/2
		});
		
	}
	
	
}, 'layouts:center');
























//= flex



/**
 * Перегружаемт методы show() и hide() для поддержки анимации
 * 
 * Опции:
 * 	`effects`
 * 
 * @mixin Ergo.mixins.Effects
 */




Ergo.alias('includes:effects', {

	defaults: {
		effects: {
			show: 'show',
			hide: 'hide',
			delay: 0			
		}
	},



	overrides: {

		show: function() {
			
			var effect = false;

			if( !this.children.is_empty() || this.el.text() ) {  // ?

				var o = this.options.effects;
			
				
				if(o.initial) {
					o = Ergo.override({}, o, o.initial);
					delete this.options.effects.initial;
				}
				
				var el = this._wrapper || this.el;
				
				// FIXME экспериментальный код
				if( !el.is(':visible')) {
					if(this._no_effects) {
						effect = el.show();
					}
					else if( $.isPlainObject(o.show) ) {
						effect = el[o.show.type]({
							duration: o.show.delay || o.delay,
							easing: o.show.easing || 'swing'
						});					
					}
					else {
						effect = el[o.show]({
							duration: o.delay,
							easing: o.easing || 'swing'
						});
					}
					
				}
				
			}

			return $.when( effect )
							.then(function(){ this.events.fire('show'); }.bind(this));		
		},


		hide: function() {
			
			var effect = false;
			
			if( !this.children.is_empty() || this.el.text() ) {  // ?

				var o = this.options.effects;
		
				if(o.initial) {
					o = Ergo.override({}, o, o.initial);
					delete this.options.effects.initial;
				}
				
				var el = this._wrapper || this.el;
			
				if( el.is(':visible')) {
					if( $.isPlainObject(o.hide) ) {
						effect = el[o.hide.type]({
							duration: o.hide.delay || o.delay,
							easing: o.hide.easing || 'swing'
						});					
					}
					else {
						effect = el[o.hide]({
							duration: o.delay,
							easing: o.easing || 'swing'
						});
					}				
				}
	//				effect = el[o.hide](o.delay);
			}

			return $.when( effect )
							.then(function(){ this.events.fire('hide'); }.bind(this));
		}



	}


});




/**
 *
 * @mixin selectable
 *
 */
Ergo.alias('includes:selectable', {

	defaults: {
		// selection: {
		// 	lookup: null,
		// 	multiselect: false
		// },
		events: {
			'select': function(e) {
				this.selection.set( e.key != null ? e.key : (e.target.opt('name') || e.target._index) );
				e.stop();
			},
			'unselect': function(e) {
				this.selection.unset( e.key != null ? e.key : (e.target.opt('name') || e.target._index) );
				e.stop();
			}
		}
	},


	overrides: {

		set selected(selection) {
			this.selection.set(selection);
		},

		get selected() {
			return this.selection.get();
		}

	},


	_construct: function(opts) {

		this.selection = {

			_widget: this,

			_selected: null,

			set: function(key) {

				var o = this._widget.options.selection || {};

				// определяем метод поиска
				var lookup = o.lookup || this._widget.item;
				// режим множественной выборки
				var multiselect = o.multiselect;


				// ищем выбранный элемент
				var selected = (key instanceof Ergo.core.Object) ? key : lookup.call(this._widget, key);

				// TODO здесь нужно обработать вариант, если элемент не найден


				// если новый ключ совпадает со старым, то не меняем выборку
	//			for(var i = 0; i < this._selected.length; i++)
	//				if(this._selected[i] == selected) return;


				// если выборка эксклюзивная, то нужно очистить текущую выборку
				if(!multiselect) {
					if(this._selected) {
						this._selected.states.unset('selected');
					}

					// for(var i = 0; i < this._selected.length; i++) {
					// 	this._selected[i].states.unset('selected');
					// }
				}
				else {

					if(!this._selected)
						this._selected = {};

					if(this._selected[key]) {
						this._selected[key].states.unset('selected');
					}
				}



				// //
				// if(!multiselect)
				// 	this._selected = [];


				if(selected == null) return;


				if(!multiselect) {
					this._selected = selected;
				}
				else {
					this._selected[key] = selected;
				}
//				this._selected.push(selected);


				selected.states.set('selected');


				this._widget.events.fire('selectionChanged', {selection: this.get()});

				return selected;
			},


			unset: function(key) {

				var o = this._widget.options.selection || {};

				// определяем метод поиска
				var lookup = o.lookup || this._widget.item;
				// режим множественной выборки
				var multiselect = o.multiselect;

				// ищем выбранный элемент
				var unselected = (key instanceof Ergo.core.Object) ? key : lookup.call(this._widget, key);



				if(unselected == null) return;


				if(!multiselect) {
					this._selected = null;
				}
				else {
					delete this._selected[key];
				}

//				Ergo.remove(this._selected, unselected);
//				this._selected.remove(unselected);

				unselected.states.unset('selected');


				this._widget.events.fire('selectionChanged', {selection: this.get()});

			},


			get: function(i) {
				if(arguments.length == 0) {
					return this._selected;
				}
				else {
					return this._selected ? this._selected[i] : null;
				}
			},


			is_empty: function() {
				return this._selected.length == 0;
			},

			size: function() {
				return this._selected.length;
			},

			each: function(fn) {
				var o = this._widget.options.selection || {};

				if(!o.multiselect) {
					fn.call(this, this._selected);
				}
				else {
					for(var i in this._selected) {
						fn.call(this, this._selected[i]);
					}
				}

				// for(var item in this._selected) {
				//
				// }
				//
				// this._selected.forEach(fn);
			},

			clear: function() {
				this.each(function(selected) {
					selected.states.unset('selected');
				});
				this._selected = [];
				this._widget.events.fire('selectionChanged', {selection: this.get()});
			}


		};


	}


});


/**
 * Эксклюзивное отображение одного из дочерних виджетов
 * 
 * Опции:
 * 	`active`
 * 
 * @mixin Ergo.mixins.Pageable
 */
Ergo.defineMixin('Ergo.mixins.Pageable', function(o) {
	
	Ergo.smart_override(o, {
		cls: 'pageable',
		// defaultItem: {
			// style: {'display': 'none'}
		// }
	});
	
	
	
	this.set_active = function(i) {
		
		var child = (i instanceof Ergo.core.Widget) ? i : this.children.find( Ergo.by_widget(i) );
		
		// this.children.each(function(c){
			// (c != child) ? c.hide() : c.show();
		// });
		
		if(child.layout) child._layoutChanged();
		
		var promise = $.when(true);
		
		if(this._active) {
			this._active.states.unset('active');
			promise = this._active.hide();
		}

		this._active = child;

		promise.then(function(){
		
			this._active.states.set('active');
			this._active.show();
			
		}.bind(this));
		
		
		return child;
	};
	
	
	this.get_active = function() {
		return this._active;
	};
	
	
	
	
//	Ergo.smart_build(o);
	
}, 'mixins:pageable');



Ergo.alias('includes:pageable', {

	defaults: {
		cls: 'pageable'
	},

	overrides: {

		set_active: function(i) {
			
			var child = (i instanceof Ergo.core.Widget) ? i : this.children.find( Ergo.by_widget(i) );
			
			// this.children.each(function(c){
				// (c != child) ? c.hide() : c.show();
			// });
			
			if(child.layout) child._layoutChanged();
			
			var promise = $.when(true);
			
			if(this._active) {
				this._active.states.unset('active');
				promise = this._active.hide();
			}

			this._active = child;

			promise.then(function(){
			
				this._active.states.set('active');
				this._active.show();
				
			}.bind(this));
			
			
			return child;
		},
		
		
		get_active: function() {
			return this._active;
		}


	}


});

Ergo.alias('includes:focusable', {

	_post_construct: function(o) {

		this.el.attr('tabindex', 0);

	}


});



Ergo.alias('includes:popup', {

	defaults: {
		cls: 'popup',
		popup: {
			to: null,
			at: 'left top',
			my: 'left top',
			offset: [0, 0],
			closeOn: 'outerClick',
			exclusive: true,
			boundary: 'auto'
		},
		states: {
			'dropup-auto:auto': 'dropup-auto',
			'dropdown-auto:auto': 'dropdown-auto',
			'no-auto:auto': ''
		},
		events: {
			'jquery:mouseleave': function(e){
				if(this.options.popup.closeOn == 'mouseleave') this.close();
			}
		},
		autoHeight: 'ignore' // игнорировать высоту контекстного меню при автоматическом расчете высоты
	},



	overrides: {

		open: function(position) {

			var popups = Ergo.context._popups;

			// в эксклюзивном режиме закрываем другие всплывающие виджеты
			if(!popups.is_empty() && this.options.popup.exclusive) {
				popups.apply_all('close');
				popups.remove_all();
			}



			var self = this;

			var x = 0;
			var y = 0;

			if(arguments.length == 2) {
				x = arguments[0];
				y = arguments[1];
				position = {};//offset: [arguments[0], arguments[1]]};
			}

			var p = Ergo.smart_override({}, this.options.popup, position);

			// позиционируем виджет

			// определяем координаты относительно точки "at"
			x += p.offset[0];
			y += p.offset[1];


			// получаем целевой элемент, относительно которого отображаем элемент
			var to_el = null;

			// определяем элемент, к которому будет привязан popup
			if(p.to) {
				to_el = $(p.to);
			}
			else if(this.parent) {
				to_el = this.parent.el;
			}



			// определяем смещение из привязки к элементу "to"


			if(to_el) {

				var at = p.at.split(' ');

				if(at[0] == 'right') x += to_el.outerWidth(false);
				else if(at[0] == 'center') x += to_el.outerWidth(false)/2;

				if(at[1] == 'bottom') y += to_el.outerHeight(false);
				else if(at[1] == 'center') y += to_el.outerHeight(false)/2;

				if(p.adjust)
	//				this.el.width(to_el.outerWidth(false));
					this.el.css('min-width', to_el.outerWidth(false));

			}


			// определяем смещение из привязки точки popup

			// var my = p.my.split(' ');

			// if(my[0] == 'right') x -= this.el.outerWidth(false);
			// else if(my[0] == 'center') x -= this.el.outerWidth(false)/2;

			// if(my[1] == 'bottom') y -= this.el.outerHeight(false);
			// else if(my[1] == 'center') y -= this.el.outerHeight(false)/2;


			// if(to_el) {
				// // смещение целевого элемента
				// var offset = to_el.offset();
	//
				// x += offset.left;
				// y += offset.top;
			// }


			if(p.behaviour == 'contextmenu') {

				var max_w = $(document).scrollLeft() + $(window).width();
				var max_h = $(document).scrollTop() + $(window).height();
				var pop_h = this.el.outerHeight(true);
				var pop_w = this.el.outerWidth(true);

				var dh = (y + pop_h) - max_h;
				if(dh > 0) {
					y -= pop_h;
				}

				var dw = (x + pop_w) - max_w;
				if(dw > 0) {
					x -= dw;//pop_w;
				}

				this.el.css({'left': x, 'top': y});
			}
			else if(p.behaviour == 'global') {

				var offset = to_el.offset();
				x += offset.left;
				y += offset.top;

				y += to_el.outerHeight(false);


				this.el.css({'left': x, 'top': y});
			}




			if(p.behaviour != 'none') {

//				this.el.css({'left': x, 'top': y});

			}



			if(p.boundary == 'auto' && to_el) {
				// изменяем положение виджета в зависимости от расстояния до границы
				var offset = to_el.offset();
				var max_x = $(window).width();
				var max_y = $(window).height();
				var scroll_top = 0;

				this.el.parents().each(function(i, elem) {
					scroll_top += $(elem).scrollTop();
				});

				if(offset.left + this.el.width() > max_x)
					this.states.set('pull-left-auto');
				else
					this.states.unset('pull-left-auto');

				if(offset.top + to_el.height() + this.el.outerHeight(true) - scroll_top > max_y)
					this.states.set('dropup-auto');
				else if(this.states.is('dropup') && (offset.top - this.el.outerHeight(true) - scroll_top < 0))
					this.states.set('dropdown-auto');
				else
					this.states.set('no-auto');


			}



			// настраиваем размер виджета


			// определяем параметры закрытия

			// FIXME возможные проблемы при удалении
			$('html').one('click.ergoPopup', function(e) {
				this.events.fire('outerClick');
				if(this.options.popup.closeOn == 'outerClick') this.close();
			}.bind(this));

			Ergo.context.events.once('outerClick', function(e) {
				this.events.fire('outerClick');
				if(this.options.popup.closeOn == 'outerClick') this.close();
			}.bind(this), this);



			// добавляем текущий объект в список всплывших окон
			popups.add(this);


			return this.show().then(function(){
				self.events.fire('opened');
			});
		},


		close: function() {
			var self = this;
			var popups = Ergo.context._popups;

			var k = popups.key_of(this);
			if( k > -1 ) {//Ergo.context._popup == this) {

				if(this != popups.last()) popups.get(k+1).close();  //TODO возможно, будет лучше, если закрытия будут связаны в цепочку

				popups.remove(this);

				Ergo.context.events.off(this);

				$('html').off('click.ergoPopup');

				return this.hide().then(function(){
					self.events.fire('closed');
				});
			}

		}


	},



	_construct: function() {

		if(!Ergo.context._popups)
			Ergo.context._popups = new Ergo.core.Array();

	}



});


/*
Ergo.defineMixin('Ergo.mixins.Window', function(o) {


	this.open = function() {


		if(arguments.length == 2) {
			// x, y
			var x = arguments[0];
			var y = arguments[1];

			this.el.css({'top': y, 'left': x});
		}

		// получаем новый индекс z-слоя
		var z = Ergo.context._z || 0;
		z++;

		// устанавливаем z-index
		this.el.css({'z-index': z*1000});

		$('body').append(this.el); // FIXME заменить на render

		this.el.show();

	};


	this.close = function() {

		// уменьшаем индекс слоя
		Ergo.context._z--;

		this.el.hide();

		this.el.detach(); // FIXME заменить на unrender

		if(this.options._destroyOnClose)	this._destroy();

	};


	this.resize = function(w, h) {

	};



	this.move = function(x, y) {

		this.el.offset({
			left: x,
			top: y
		});

		// this.el.css({
		// 	left: x,
		// 	top: y
		// });

	};



//	o


	o.appearance = Ergo.smart_override({

	}, o.appearance);



}, 'mixins:window');

*/


Ergo.alias('includes:window', {

	overrides: {

		open: function() {


			if(arguments.length == 2) {
				// x, y
				var x = arguments[0];
				var y = arguments[1];

				this.el.css({'top': y, 'left': x});
			}

			// получаем новый индекс z-слоя
			var z = Ergo.context._z || 0;
			z++;

			// устанавливаем z-index
			this.el.css({'z-index': z*1000});

			$('body').append(this.el); // FIXME заменить на render

			this.el.show();

		},


		close: function() {

			// уменьшаем индекс слоя
			Ergo.context._z--;

			this.el.hide();

			this.el.detach(); // FIXME заменить на unrender

			if(this.options.destroyOnClose)
				this._destroy();

		},


		resize: function(w, h) {

		},



		move: function(x, y) {

			this.el.offset({
				left: x,
				top: y
			});

			// this.el.css({
			// 	left: x,
			// 	top: y
			// });

		}

	}


});




Ergo.alias('includes:modal', {

	defaults: {

		autoHeight: 'ignore',

		destroyOnClose: true,

		components: {
			overlay: {
				etype: 'html:div',
				cls: 'overlay',
				autoHeight: 'ignore',
	//			render: 'body',
				events: {
					'jquery:click': function(e) {

						Ergo.context.events.fire('outerClick', {type: 'overlay'});

						if(this.parent.options.closeOn == 'outerClick')
							this.parent.close();

						// блокируем всплывание событий
						e.preventDefault();
						return false;
					}
				}
			}
		},
		events: {
			'jquery:click': function(e) {
				Ergo.context.events.fire('outerClick', {type: 'modal'});
//				if(this.options.closeOn == 'outerClick')
				e.stopPropagation();
			},
		}
	},


	overrides: {

		open: function() {

			var o = this.options;

			var modal = this;

			if(arguments.length == 2) {
				// x, y
				var x = arguments[0];
				var y = arguments[1];

				modal.el.css({'top': y, 'left': x});
			}

			// получаем новый индекс z-слоя
			var z = Ergo.context._z || 0;
			z++;

			// устанавливаем z-index
			modal.overlay.el.css({'z-index': z*1000});
			modal.el.css({'z-index': z*1000+1});

			$('body').append(modal.overlay.el);

			modal.overlay.el.append(modal.el);

			modal._rendered = true;
			modal.overlay._rendered = true;
	//		this.overlay.items.add(this);
	//		$('body').append(this.el);

			modal.render();





			var result = modal.overlay.show().then(function(){

/*
				//	поскольку оверлей уже отрисовался, можно расчитывать положение окна

				this.el.show();

				// здесь, в зависимости от методики позиционирования, расчитываются параметры


				if(o.position == 'top') {

					// top
					var w = this.el.width();

					var x = w/2;

					this.el.css({'margin-left': -x, 'top': 0});

				}
				else if(o.position == 'right') {

					// top
					var h = this.el.height();

					h = Math.min(h, $(window).height());

					var y = h/2;


					this.el.css({'right': 0, 'left': 'auto', 'margin-top': -y});

				}
				else {

					// center
					var w = this.el.width();
					var h = this.el.height();

					h = Math.min(h, $(window).height());

					var x = w/2;
					var y = h/2;


					this.el.css({'margin-left': -x, 'margin-top': -y});
				}


				this.el.hide();
*/

				this.show().then(function(){
					this.events.fire('opened');
					this._layoutChanged();
				}.bind(this));

				this.events.fire('open');

			}.bind(this));



			return result;
		},


		//
		// Close modal
		//
		close: function() {

			var e = new Ergo.core.Event();

			this.events.fire('close', e);

			if(e.canceled)
				return;


			Ergo.context._z--;

			return this.hide().then(function(){

	//			this.el.detach();

				this.overlay.hide().then(function(){
					this.overlay.el.detach();
					this.events.fire('closed');

					if(this.options.destroyOnClose)
						this._destroy();

				}.bind(this));

			}.bind(this));


		},


		/**
		 *
		 * Resize modal
		 *
		 */
		resize: function(w, h, comp) {

			var w1, h1;

			if(arguments.length > 0) {

				var el = (comp) ? this.component(comp).el : this.el;

				var w0 = el.css('width');//width();
				var h0 = el.css('height');//height();

//				setTimeout(function(){
					el.css({'width': w, 'height': h});
//				}, 1)

				var w1 = this.el.width();
				var h1 = this.el.height();

				// el.css({'width': w0, 'height': h0});

				// el.animate({
				// 	width: w,
				// 	height: h,
				// 	// 'margin-left': -w/2,
				// 	// 'margin-top': -h/2
				// });

			}
			else {
				w1 = this.el.width();
				h1 = this.el.height();
			}

			// return $.when(this.el.animate({
			// 	'margin-left': -w1/2,
			// 	'margin-top': -h1/2
			// }));

			return $.when(true);
		}


	}


});


Ergo.defineMixin('Ergo.mixins.Draggable', function(o) {
	
	o.events = Ergo.smart_override({
		'jquery:mousedown': function(e) {
			
			if( e.button == 0 ) {
				
				var self = this;
				
				var offset = this.el.offset();

				var drag = {
					dx: e.pageX - offset.left,
					dy: e.pageY - offset.top,
				};
				
				// добавляем компенсацию прокрутки
				this.el.parents().each(function(i, p){
					drag.dy += $(p).scrollTop() || 0;
					drag.dx += $(p).scrollLeft() || 0;
				});
				
				
				// добавляем "стекло"
				var glass = $('<div class="glass"/>');
				$('body').append(glass);
				
				glass.on('mousemove', function(e) {
					
					if(drag) {
						self.events.rise('drag', {x: e.pageX, y: e.pageY, dx: drag.dx, dy: drag.dy, target: self});
					}
					
					
				});
				
				glass.on('mouseup', function(e) {
										
					glass.remove();

					self.events.rise('dragEnd', {x: e.pageX, y: e.pageY, dx: drag.dx, dy: drag.dy, target: self});
				});
				
				
				
				this.events.rise('dragStart', {x: e.pageX, y: e.pageY, dx: drag.dx, dy: drag.dy});
				
				e.preventDefault();
			}
			
		}
	}, o.events);



}, 'mixins:draggable');



Ergo.alias('includes:fastclick', {


	_post_construct: function(o) {

		var w = this;

		w.el.mousedown(function(e) { 
			if(!w.states.is('disabled') && e.button === 0) {
				w.events.fire('click', {button: e.button}, e);
			}
		});


		w.el.off('click');


		w.el.click(function(e) {
			e.preventDefault();
			e.stopPropagation();
		});



		// w.el.mouseup(function(e) { 
		// 	if(w._fastclick) {
		// 		delete w._fastclick;
		// 		e.stopPropagation();
		// 	}
		// });


	}

});

Ergo.alias('includes:router', {

  defaults: {
    hashUrl: true
  },



  _construct: function(o) {

    var w = this;

    this.router = {

      restore: function() {

        console.log('router restore', window.location.hash);

        if( window.location.hash ) {
          // FIXME
          w.to(window.location.hash.slice(2));
        }
        else {
          // FIXME
          w.to('');
        }
      }

    }


  },



  overrides: {


    absolutePath: function(path) {
      if( !path ) return path;
      if( path[0] == '/' ) return path;

      if( this.options.hashUrl ) {
        var url = window.location.hash.slice(2);
        path = url + '/' + path;
      }

      return path;
    },



    routeMatch: function(path, route) {

      var out = {};

      var path_a = path.split('/');

      // строковый шаблон
      if( $.isString(route) ) {

        if(route == path)
          return out;

        var route_a = route.split('/');
        if(path_a.length == route_a.length) {
          var matches = 0;
          for(var i = 0; i < path_a.length; i++) {
            var p = path_a[i];
            var r = route_a[i];
            if( r[0] == ':')
              out[r.substr(1)] = p;
            else if( p != r )
              break;
            matches++;
          }

          if(matches == path_a.length)
            return out;
        }
      }

      return null;
    },

    // конфигурация маршрутов
    routes: function(o) {

      var routes = {};

      var f = function(r, parent) {


        var p = (parent.path || '') + (r.path || '');
        var n = parent.name ?  parent.name + '.' + r.name : r.name;

        routes[p] = {
          name: n,
          history: !r.routes,
          path: p
        };

        if(r.routes) {
          for(var i = 0; i < r.routes.length; i++)
            f(r.routes[i], routes[p]);
        }
      };

      f(o, {});

      this._routes = routes;

    },



    to: function(path, params, opts) {

      // преобразуем к абсолютному пути
      path = this.absolutePath(path);

      for(var i in this._routes) {

        var route = this._routes[i];

        var match = this.routeMatch(path, route.path);
        if( match ) {

          console.log('route to', path, route);

          var o = {
            path: '#!'+path,
            history: route.history
          };

          Ergo.override(match, params); // merge path params and route params
          Ergo.smart_override(o, opts); //

          return this.join( route.name, match, o );
        }
      }

      return $.when(null);
    },


    back: function() {
      window.history.back();
    }


  }


});


Ergo.alias('includes:history', {

  defaults: {
    events: {
			'scopeRestore': function(e) {

				console.log('- history', e.scope, e.hash, e.params);

        if(e.params) {
          if(e.scope)
  					this.join(e.scope, e.params);
        }
        else {
          ctx.reset();
          ctx.init();
        }

				// если имя скоупа определено, то подключаем его
//				this.restore(e.scope, e.params, e.hash);
			},
			'scopeJoin': function(e) {

				var scope = e.scope;

				if(scope.options.history && !this._no_history) {


					// var name_a = e.scope._name.split(':');
					// var p = {};
					// p[name_a[0]] = (name_a.length > 1) ? name_a[1] : true;
					// var p = Ergo.override(p, this._params[e.scope._name]);
					var chain = scope._chain.join('.');
					var p = Ergo.deep_override({_scope: chain}, scope._params);
					window.history.pushState( p, scope._name, scope.opt('path') );//, 'title', '#'+url);

					console.log('+ history', scope.opt('path'), scope._name, p);

				}
			}
		}
  },


  _construct: function(o) {

    // для полифила
    var location = window.history.location || window.location;

    var ctx = this;

    $(window).on('popstate', function(e) {

      var p = e.originalEvent.state;

      console.log('popstate', p);
//				console.log(e.originalEvent);
//				console.log(p);

//      if(p) {
        ctx._no_history = true;
        ctx.events.fire('scopeRestore', {/*scope: p._scope,*/ params: p, hash: window.location.hash});
        ctx._no_history = false;
      // }
      // else {
      //   ctx.reset();
      //   ctx.init();
      // }


    //	console.log('popstate:', e.originalEvent);

    });

  }




});



Ergo.alias('includes:provider-methods', {


  _construct: function(o) {

    if(o.provider) {
      var provider = $.isString(o.provider) ? Ergo.alias(o.provider) : o.provider;

      for(var i in provider) {
        var p = provider[i];
        if( $.isFunction(p) ) {

          this['$'+i] = function(action) {
            var composer = this.options.composer || this._compose;
            var parser = this.options.parser || this._parse;

            var data = composer.call(this, this.get(), action);

            var args = [];
            for(var j = 1; j < arguments.length; j++)
              args.push(arguments[j]);

            return $.when(provider[action].bind(provider, this).apply(args)).then(function(data) {
      				return parser.call(this, data, action);
      			});
          }.bind(this, i) //p.bind(provider, this);
        }
      }

    }

  }


});



Ergo.alias('includes:list-navigator', {

	_construct: function(o) {

		var _w = this;

		this.navigator = {

			get selected() {
				return this.__sel;
			},

			set selected(item) {
				if(this.__sel)
					this.__sel.states.unset('selected');

				this.__sel = item;

				if(this.__sel)
					this.__sel.states.set('selected');
			},




			next: function() {
				var item = this.selected ? this.selected.next() : _w.items.first();

				while(item) {
					if(item._rendered)
						break;
					item = item.next();
				}

				this.scroll_to(item);

				this.selected = item;
			},

			prev: function() {
				var item = this.selected ? this.selected.prev() : _w.items.last();

				while(item) {
					if(item._rendered)
						break;
					item = item.prev();
				}

				this.scroll_to(item);

				this.selected = item;
			},


			scroll_to: function(item) {

				if(!item)	return;

				var h = _w.el.height();
				var s_top = _w.el.scrollTop();
				var hi = item.el.outerHeight();
				var p = item.el.position().top;
				if( p + hi > h) {
					_w.el.scrollTop( s_top + p + hi - h );
				}
				else if ( p < 0) {
					_w.el.scrollTop( s_top + p );
				}
				
			}

		};


	}


});



Ergo.alias('includes:user-input', {

  defaults: {
    events: {
      'jquery:keyup': 'do_input'
    }
  },


  overrides: {

    do_input: function(e) {

      var keyCode = e.keyCode;

      var text = this.el.val();

			if(keyCode == Ergo.KeyCode.UP
				|| keyCode == Ergo.KeyCode.DOWN
				|| keyCode == Ergo.KeyCode.ENTER
				|| keyCode == Ergo.KeyCode.ESC) {
				// TODO обработка служебных символов
			}
			else {
				this.events.rise('input', {text: text, keyCode: keyCode});
			}
    }

  }

});



Ergo.alias('includes:expandable', {

	defaults: {
		components: {
			sub: {
				hidden: true
			}
		},
		transitions: {
			'* > expanded': function() {
				this.$sub.show();
			},
			'expanded > *': function() {
				this.$sub.hide();
			}
		},
		events: {
			'expand': function(e) {
				this.states.toggle('expanded');
//				e.stop();
			}
		}
	}

});



Ergo.alias('includes:exclusive-expand', {

	defaults: {
		events: {
			'expand': function() {
				// схлапываем соседние узлы
	      this.parent.items.each(function(item) {
	        if(item != this && item.states.is('expanded'))
	          item.states.unset('expanded');
	      }.bind(this));
			}
		}
	}

});


Ergo.alias('includes:placeholder', {

  overrides: {

    set placeholder(v) {
      var tag = this.el.prop('tagName').toLowerCase();
      if(tag == 'input' || tag == 'textarea') {
        if(v != null) {
          this.el.prop('placeholder', v);
        }
        else {
          this.el.removeProp('placeholder');
        }
      }
      else {
        if(v != null) {
          this.el.attr('data-ph', v);
          this.states.set('ph');
        }
        else {
          this.el.removeAttr('data-ph');
          this.states.unset('ph');
        }
      }
    }

  }

});





















/**
 * Виджет для <iframe>
 * 
 * etype: html:iframe
 *  
 * опции:
 * 	- src
 * 
 * @class
 * @name Ergo.html.Iframe
 * @extends Ergo.core.Widget
 */
Ergo.defineClass('Ergo.html.Iframe', 'Ergo.core.Widget', {
	
	defaults: {
		html: '<iframe/>'
	},
	
	set_src: function(v) {
		this.el.attr('src', v);
	}
	
}, 'html:iframe');



/**
 * Виджет для <input>
 *
 * etype: html:input
 *
 * опции:
 * 	- type
 * 	- placeholder
 * 	- disabled
 * 	- name
 * 	- readonly
 *
 * @class
 * @name Ergo.html.Input
 * @extends Ergo.core.Widget
 */
Ergo.defineClass('Ergo.html.Input', 'Ergo.core.Widget', {

	defaults: {
		html: '<input/>',
		binding: function(v) {
			this.el.val(v);
		},
		events: {
			'jquery:change': 'do_change'
		}
		// onChange: function(e) {
		// 	this.opt('value', this.el.val());
		// }
		// events: {
			// 'jquery:change': function() {
				// this.events.rise('change', {value: this.el.val()});
// //				this.opt('value', this.el.val());
			// }
		// }
	},

	attributes: ['id', 'tabindex', 'type', 'placeholder', 'disabled', 'readonly', 'size'],

	// set_type: function(v) {
	// 	this.el.attr('type', v);
	// },

	// set_placeholder: function(v) {
	// 	this.el.attr('placeholder', v);
	// },

	// set_disabled: function(v) {
	// 	(v) ? this.el.attr('disabled', '') : this.el.removeAttr('disabled');
	// },

	// перегружаем параметр name
	set_name: function(v) {
		this._name = v;
		this.el.attr('name', v);
	},


	set text(v) {
		this.el.val(v);
	},


	set hidden(v) {
		this.el.prop('hidden', true);
	},

	// _change: function(e) {
	// 	this.events.rise('change', {value: this.el.val()});
	// },

	do_change: function(e) {
		this.events.rise('change', {value: this.el.val()});
	},


	// set_readonly: function(v) {
	// 	this.el.attr('readonly', v);
	// }




	// get_value: function() {
		// return this.el.val();
	// },
//
	// set_value: function(v) {
		// this.el.val(v);
	// }



}, 'html:input');





/**
 * Виджет для <input type="text">
 *
 * etype: html:text-input
 *
 * опции:
 *
 * @class
 * @name Ergo.html.TextInput
 * @extends Ergo.core.Widget
 */
Ergo.defineClass('Ergo.html.TextInput', 'Ergo.html.Input', {

	defaults: {
		type: 'text',
		// binding: function(v) {
		// 	this.el.val(v);
		// },
		events: {
			'jquery:keyup': function(e) {
				this.events.rise('keyUp', {text: this.el.val()}, e);
			},
			'jquery:keydown': function(e) {
				this.events.rise('keyDown', {text: this.el.val()}, e);
			}
		},

		onChange: function(e) {
			this.opt('value', e.value);
		},

		onKeyUp: function(e) {

			var keyCode = e.base.keyCode;

			if(keyCode == Ergo.KeyCode.ESC || Ergo.KeyCode.DOWN || Ergo.KeyCode.ENTER || Ergo.KeyCode.ESC) {
				// TODO обработка служебных символов
			}
			else {
				this.events.fire('input', {text: e.text, keyCode: keyCode});
			}
		}


		// events: {
		// 	'jquery:change': function() {
		// 		this.opt('value', this.el.val());
		// 	}
		// }
	},


}, 'html:text-input');





/**
 * Чекбокс
 *
 * :`html:checkbox`
 *
 * Опции:
 * 	`indeterminate`
 *
 * События
 * 	`action` пользователь изменил значение чекбокса
 *
 * @class
 * @name Ergo.html.Checkbox
 * @extends Ergo.core.Widget
 */
Ergo.defineClass('Ergo.html.Checkbox', 'Ergo.html.Input', /** @lends Ergo.html.Checkbox.prototype */{

	defaults: {
//		html: '<input type="checkbox"/>',
		type: 'checkbox',
		binding: function(v) {
			this.el.prop('checked', v);
		},
		onChange: function(e) {
			this.opt('value', e.value);//this.el.prop('checked'));
		}
// 		events: {
// 			'jquery:change': function(e) {
// 				this.opt('value', this.el.prop('checked'));
// //				w.events.fire('action');
// 			}
// 		}
	},


	set_indeterminate: function(v) {
		this.el.prop('indeterminate', v);
	},


	// _change: function() {
	// 	this.events.rise('change', {value: this.el.prop('checked')});
	// },

	do_change: function() {
		this.events.rise('change', {value: this.el.prop('checked')});
	}



}, 'html:checkbox');



/**
 * Радио
 *
 * :`html:radio`
 *
 *
 * @class
 * @name Ergo.html.Radio
 * @extends Ergo.html.Checkbox
 */
Ergo.defineClass('Ergo.html.Radio', 'Ergo.html.Checkbox', /** @lends Ergo.html.Radio.prototype */{

	defaults: {
		type: 'radio',
// 		binding: function(v) {
// 			this.el.prop('checked', v);
// 		},
// 		events: {
// 			'jquery:change': function(e) {
// //				w.opt('value', w.el.prop('checked'));
// 				this.events.rise('change', {value: this.el.prop('checked')});
// 			}
// 		}
	}

}, 'html:radio');





/**
 * Виджет для <select>
 * 
 * etype: html:select
 *  
 * опции:
 * 	- disabled
 * 	- name
 * 	- readonly
 * 	- multiple
 * 
 * @class
 * @name Ergo.html.Select
 * @extends Ergo.core.Widget
 */
Ergo.defineClass('Ergo.html.Select', 'Ergo.core.Widget', {
	
	defaults: {
		html: '<select/>',
		defaultItem: {
			etype: 'html:option',
			binding: 'text'
		}
	},
	
	set_disabled: function(v) {
		(v) ? this.el.attr('disabled', '') : this.el.removeAttr('disabled');
	},
	
	set_name: function(v) {
		this.el.attr('name', v);
	},
	
	set_readonly: function(v) {
		this.el.attr('readonly', v);
	},
	
	set_multiple: function(v) { 
		this.el.attr('multiple', v); 
	}
	
	
}, 'html:select');




/**
 * Виджет для <textarea>
 *
 * etype: html:Textarea
 *
 * опции:
 * 	- rows
 *
 * @class
 * @name Ergo.html.Textarea
 * @extends Ergo.core.Widget
 */
Ergo.defineClass('Ergo.html.TextArea', 'Ergo.core.Widget', {

	defaults: {
		html: '<textarea/>',
		binding: function(v) {
			this.el.val(v);
		},
		events: {
			'jquery:change': 'do_change'
		}
	},

	attributes: ['id', 'tabindex', 'placeholder', 'disabled', 'readonly', 'rows'],


	// set_rows: function(v) {
	// 	this.el.attr('rows', v);
	// },

	// перегружаем параметр name
	set_name: function(v) {
		this._name = v;
		this.el.attr('name', v);
	},


	set text(v) {
		this.el.val(v);
	},


	set hidden(v) {
		this.el.prop('hidden', true);
	},


	do_change: function(e) {
		this.events.rise('change', {value: this.el.val()});
	}


}, 'html:textarea');


/**
 * Виджет для <button>
 * 
 * etype: html:button
 *  
 * @class
 * @name Ergo.html.Button
 * @extends Ergo.core.Widget
 */
Ergo.defineClass('Ergo.html.Button', 'Ergo.core.Widget', {
	
	defaults: {
		html: '<button/>'
	}
	
}, 'html:button');



/**
 * Виджет для <img>
 *
 * etype: html:img
 *
 * опции:
 * 	- src
 *
 * @class
 * @name Ergo.html.Img
 * @extends Ergo.core.Widget
 */
Ergo.defineClass('Ergo.html.Img', 'Ergo.core.Widget', {

	defaults: {
		html: '<img/>'
	},

	attributes: ['id', 'tabindex', 'src']


	// set_src: function(v) {
	// 	this.el.attr('src', v);
	// }

}, 'html:img');


/**
 * Виджет для <label/>
 *
 * @class
 * @name Ergo.html.Label
 * @extends Ergo.core.Widget
 */
Ergo.defineClass('Ergo.html.Label', 'Ergo.core.Widget', {

	defaults: {
		html: '<label/>'
	},


  set _for(v) {
    this.el.prop('for', v);
  }

}, 'html:label');


/**
 * Виджет для <label/>
 *
 * @class
 * @name Ergo.html.Label
 * @extends Ergo.core.Widget
 */
Ergo.defineClass('Ergo.html.A', 'Ergo.core.Widget', {

	defaults: {
		html: '<a/>'
	},

  attributes: ['id', 'tabindex', 'href']


}, 'html:a');


/**
 * Текстовое содержимое
 *
 * :`.`
 *
 * Опции:
 * 	`text`
 *
 * @class
 * @name Ergo.widgets._Text
 * @extends Ergo.core.Widget
 */
Ergo.defineClass('Ergo.html._Text', 'Ergo.core.Widget', {

	set_text: function(v) {
		this.el[0].textContent = (v == null ? '': v);
	}

}, 'html:.');



/**
 * Виджет для <form>
 * 
 * etype: html:form
 *  
 * опции:
 * 	- action
 *	- method
 * 
 * @class
 * @name Ergo.html.Form
 * @extends Ergo.core.Widget
 */
Ergo.defineClass('Ergo.html.Form', 'Ergo.core.Widget', {
	
	defaults: {
		html: '<form method="POST"/>'
	},
	
	set_action: function(v) {
		this.el.attr('action', v);
	},

	set_method: function(v) {
		this.el.attr('method', v);
	}
	
}, 'html:form');


/**
 * @namespace Ergo.html
 */


















/**
 * Основной класс для виджетов пространства имен $html
 *
 * etype: html:widget
 *
 * @class
 * @name Ergo.html.Widget
 * @extends Ergo.core.Widget
 */
Ergo.defineClass('Ergo.html.Widget', 'Ergo.core.Widget', {

	defaults: {
	}

}, 'html:widget');



Ergo.$html = function(o, etype, context) {

	if(!Ergo.alias(etype)) {

//		var _etype = etype;

		var i = etype.indexOf(':');
		if(i > 0) {
//			ns = etype.substr(0, i);
			etype = etype.substr(i+1);
		}

		// var _o = $.isArray(o) ? o[o.length-1] : o;
//
// //		o.etype = 'html:widget';
		// _o.html = '<'+_etype+'/>';

		o.unshift({html: '<'+etype+'/>'});

		etype = 'html:widget';
	}

	return Ergo.object(o, etype, context);
};
