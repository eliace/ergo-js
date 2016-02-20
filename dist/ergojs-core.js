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
	E.merge = function(obj) {
		for(var j = 1; j < arguments.length; j++){
			var overrides = arguments[j] || {};
			for(var i in overrides) {
				var desc = Object.getOwnPropertyDescriptor(overrides, i);
				if( desc && (desc.set || desc.get) ) {
					var descOrig = Object.getOwnPropertyDescriptor(obj, i);
					if(descOrig) {
						descOrig.set = desc.set || descOrig.set;
						descOrig.get = desc.get || descOrig.get;
					}
					else {
						descOrig = desc;
					}
					Object.defineProperty(obj, i , descOrig);
				}
				else {
					obj[i] = overrides[i];
				}
			}
		}
		return obj;
	};



	// E.merge = function(obj) {
	// 	for(var j = 1; j < arguments.length; j++){
	// 		var overrides = arguments[j] || {};
	// 		for(var i in overrides) {
	// 			var desc = Object.getOwnPropertyDescriptor(overrides, i);
	// 			if( desc && (desc.set || desc.get) ) {
	// 				//
	// 			}
	// 			else {
	// 				obj[i] = overrides[i];
	// 			}
	// 		}
	// 	}
	// 	return obj;
	// };


	// с объектом сливаются геттеры/сеттеры, которых в нем нет
	E.mergeProperties = function(obj) {
		for(var j = 1; j < arguments.length; j++){
			var overrides = arguments[j] || {};
			for(var i in overrides) {
				var desc = Object.getOwnPropertyDescriptor(overrides, i);
				if( desc && (desc.set || desc.get) ) {
					var desc2 = Object.getOwnPropertyDescriptor(obj, i);
					if(desc2) {
						desc2.set = desc2.set || desc.set;
						desc2.get = desc2.get || desc.get;
					}
					else {
						desc2 = desc;
					}
					Object.defineProperty(obj, i , desc2);
				}
			}
		}
		return obj;
	};






	/**
	 * Полное копирование свойств одного объекта в другой (перегрузка)
	 * @param {Object} obj целевой объект, которому будут добавлены новые свойства
	 * @name @Ergo.deepMerge
	 * @function
	 *
	 */
	E.deepMerge = function(o) {

		for(var j = 1; j < arguments.length; j++) {

			var srcObj = arguments[j];

//			E.each(srcObj, function(p, i){
			for(var i in srcObj) {

				var desc = Object.getOwnPropertyDescriptor(srcObj, i);

				if(desc && (desc.get || desc.set) ) {
					var descOrig = Object.getOwnPropertyDescriptor(o, i);
					if(descOrig) {
						descOrig.set = desc.set || descOrig.set;
						descOrig.get = desc.get || descOrig.get;
					}
					else {
						descOrig = desc;
					}
					Object.defineProperty(o, i , descOrig);
				}
				else {

					var p = srcObj[i];

					if( p && p.constructor == Object ){//$.isPlainObject(p) ){
		//				if(!(i in o) || !$.isPlainObject(o[i])) o[i] = {};
						if(!(i in o) || (o[i] && o[i].constructor != Object)) o[i] = {};
						Ergo.deepMerge(o[i], p);
					}
					else if( p && p.constructor == Array ) {//$.isArray(p) ){
		//				if(!(i in o) || !$.isArray(o[i])) o[i] = [];
						if(!(i in o) || (o[i] && o[i].constructor != Array)) o[i] = [];
						Ergo.deepMerge(o[i], p);
					}
					else {
						o[i] = p;
					}
				}
			}

		}

		return o;
	};









	E.copy = function(srcObj) {
		var o = {};
		for(var i in srcObj) {
			o[i] = srcObj[i];
		}
		return o;
	};



	// var ruleTypes = {
	// 	handlers: function(a, b) {
	// 		for(var i in b) {
	//
	// 		}
	// 	}
	// };


	E.rules = {
		include: 'list',
		set: ['override'],
		get: ['override'],
		events: ['object', {'*': 'list'}],
		as: 'list',
		cls: false,//'list',
		data: false,
		etype: false,
//		tag: false,
		// cls: 'list',
		// stt: 'list',
		defaultItem: ['object'],
		defaultComponent: ['object'],
		nestedItem: ['object'],
//		'$*': ['object'],
		components: ['object', {'*': ['object']}],
		items: ['array', {'*': ['object']}],
		states: ['object'],//, {'*': 'list'}],
		style: ['override'],//, {'*': 'list'}],
		transitions: ['object'],//, {'*': 'list'}]
	};




	E.mergeOptions = function(o, sources, rules) {

		sources = Array.isArray(sources) ? sources : [sources];

		rules = rules || E.rules;

		for(var i = 0; i < sources.length; i++) {
			for(var j in sources[i]) {
				var name = (j[0] == '~' || j[0] == '!') ? j.substr(1) : j;
				var rule = (rules[name] != null) ? rules[name] : rules['*'];

				var a = o[name];
				var b = sources[i][j];

				// FIXME
				if( j[0] == '$' ) {
					rule = ['object'];
				}

				// если определено правило, то опции будут представлять из себя коллекцию
				if( rule && rule.constructor === Array ) {

					if( b == null ) {
						o[name] = b;
					}
					else if(rule[0] == 'override') {
//						o[name] = (a == null) ? b : E.deepMerge(a, b);
						o[name] = (a == null) ? E.deepCopy(b) : E.deepMerge(a, b);
					}
					else if( b.constructor === Object ) {
						a = a || {};
						b = b;
						o[name] = E.mergeOptions(a, b, rule[1]);
					}
					else if( b.constructor === Array ) {
						a = a || [];
						b = [b];
						o[name] = E.mergeOptions(a, b, rule[1]);
					}
					// if( /*o[name] != null &&*/ (b.constructor === Object || b.constructor === Array) ) {
					// 	if( rule[0] == 'object' ) {
					// 		a = a || {};
					// 		b = b;
					// 		o[name] = E.mergeOptions(a, b, rule[1]);
					// 	}
					// 	else if( rule[0] == 'array' ) {
					// 		a = a || [];
					// 		b = [b];
					// 		o[name] = E.mergeOptions(a, b, rule[1]);
					// 	}
					// 	else if( rule[0] == 'override' ) {
					// 		o[name] = (a == null) ? b : E.merge(a, b);
					// 	}
					//
					// }
					else {
						o[name] = b;
					}

					// if( b instanceof Object ) {
					//
					// }
					// var a = (rule[0] == 'array') ? (a || []) : (a || {});
					// var b = (rule[0] == 'array') ? [b] : b;
				}
				// else if( rule && rule.constructor === Array ) {
				// 	o[name] = E.mergeOptions(o[name] || [], sources[i][j], rule[0]);
				// }
				else if( rule === false ) {
					o[name] = b;
				}
				else if( rule ) {

					a = Array.isArray(a) ? a : [a];
					b = Array.isArray(b) ? b : [b];

					if( !o[name] ) {
						o[name] = b;
					}
					else if(j[0] == '!') {
						// переписываем опцию
						o[name] = b;
					}
					else if(j[0] == '~') {
						// находим разницу
						for(var n = 0; n < b.length; n++) {
							$ergo.remove(a, b[n]);
						}
						o[name] = a;
					}
					// else if( ruleTypes[rule] ) {
					// 	o[name] = ruleTypes[rule].call(this, a, b);
					// }
					else {
						// находим сумму
						o[name] = a.concat(b);
					}

				}
				else if( a && b && b.constructor == Object ) {
					$ergo.deepMerge(o[name], b);
				}
				else {
					o[name] = $ergo.deepCopy(b);
				}
			}
		}

		return o;
	}






	E.mergeInclude = function(obj, inc) {

		// for(var j = 0; j < includes.length; j++) {
		// 	var inc = includes[j];

			for(var i in inc) {
				var desc = Object.getOwnPropertyDescriptor(inc, i);
				if( desc && (desc.set || desc.get) ) {
					var desc2 = Object.getOwnPropertyDescriptor(obj, i);
					if(desc2) {
						desc2.set = desc2.set || desc.set;
						desc2.get = desc2.get || desc.get;
					}
					else {
						desc2 = desc;
					}
					Object.defineProperty(obj, i , desc2);
				}
				else if(i == 'defaults') {
					obj.options = $ergo.mergeOptions({}, [inc[i], obj.options]);
				}
				else if( i == '_postConstruct' || i == '_preConstruct' || i == '_construct' || i == '_destroy' /*|| i == '_postDestroy' || i == '_preDestroy'*/) {
					// skip
				}

				else if(typeof inc[i] == 'object') {
					obj[i] = $ergo.deepMerge(obj[i], inc[i]);
				}
				else {
					obj[i] = inc[i];
				}



			}

//		}

		return obj;
	};





	E.override = E.merge;
	E.deepOverride = E.deepMerge;
	E.overrideOptions = E.mergeOptions;
	E.overrideProperties = E.mergeProperties;
	E.overrideInclude = E.mergeInclude;







//	var _clear = false;


/*
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
*/



	/**
	 * "Умное" копирование свойств одного объекта в другой (условная перегрузка)
	 * @param {Object} obj целевой объект, которому будут добавлены новые свойства
	 * @name @Ergo.smart_override
	 * @function
	 *
	 */
/*
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

		// // применяем модификатор -
		// for(var i in o) {
		//
		// 	var prefix = i[0];
		//
		// 	if(prefix == '-') {
		//
		// 		var j = i.substr(1);
		//
		// 		var m = (j in o) ? o[j] : [];
		// 		if( !$.isArray(m) ) m = [m];
		//
		// 		for(var n = 0; n < o[i].length; n++) {
		// 			for(var k = 0; k < m.length; k++) {
		// 				if(m[k] == o[i][n]) m.splice(k, 1);
		// 			}
		// 		}
		//
		// 		delete o[i];
		// 	}
		// }
		//
		// // применяем модификатор !
		// for(var i in o) {
		//
		// 	var prefix = i[0];
		//
		// 	if(prefix == '!') {
		//
		// 		var j = i.substr(1);
		//
		// 		if( o[i] === undefined )
		// 			delete o[j];
		// 		else
		// 			o[j] = o[i];
		//
		// 		delete o[i];
		// 	}
		//
		// }



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
*/


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
	E.isString = $.isString = function(obj) {
		return typeof obj == 'string';
	};
	/**
	 * Является ли объект логической переменной
	 *
	 * @name Ergo.isBoolean
	 * @function
	 * @param {Object} obj
	 */
	E.isBoolean = $.isBoolean = function(obj) {
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

//$ergo = Ergo;


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
	 * @name Ergo.walk_hierarchy
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

/*
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
*/



(function(){


  var DOM = {};



	DOM.remove = function(elem) {
		if(elem.parentNode) {
			elem.parentNode.removeChild(elem);
		}
	};

	DOM.clear = function(elem) {
		while (elem.firstChild) elem.removeChild(elem.firstChild);
	};

  DOM.insertAfter = function(elem, after) {
		after.parentNode.insertBefore(elem, after.nextSibling);
	};

	DOM.insertBefore = function(elem, before) {
		before.parentNode.insertBefore(elem, before);
	};

	DOM.prependChild = function(elem, child) {
		if(elem.childNodes[0]) {
			elem.insertBefore(child, elem.childNodes[0]);
		}
		else {
			elem.appendChild(elem);
		}
	};


	DOM.addClass = function(el, cls) {
		if( cls && (el instanceof Element) ) {
			(''+cls).split(' ').forEach(function(c) {

				if(!c) return;

				if(el.classList) {
					el.classList.add(c);
				}
				else {
					// IE9
					var re = new RegExp("(^|\\s)" + c + "(\\s|$)", "g");
					if(!re.test(el.className)) {
						el.className = (el.className + " " + c).replace(/\s+/g, " ").replace(/(^ | $)/g, "")
					}
				}
			});
		}
	};


	DOM.numberStyleToPx = function(k, v) {
    // postfixes
    var partials = [['padding', 'margin', 'border'], ['top', 'right', 'bottom', 'left']];
    for(var i = 0; i < partials[0].length; i++) {
			if(partials[0][i] == k) return v+'px';
      for(var j = 0; j < partials[1].length; j++) {
        if(partials[0][i]+'-'+partials[1][j] == k) return v+'px';
      }
    }
    // prefixes
    partials = [['width', 'height'], ['max', 'min']];
    for(var i = 0; i < partials[0].length; i++) {
			if(partials[0][i] == k) return v+'px';
      for(var j = 0; j < partials[1].length; j++) {
        if(partials[1][j]+'-'+partials[0][i] == k) return v+'px';
      }
    }

    // prefixes
    partials = [['top', 'right', 'bottom', 'left'], []];
    for(var i = 0; i < partials[0].length; i++) {
			if(partials[0][i] == k) return v+'px';
      for(var j = 0; j < partials[1].length; j++) {
        if(partials[1][j]+'-'+partials[0][i] == k) return v+'px';
      }
    }

    return v;
  };


  Ergo.dom = DOM;

})();




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
	E.filterKeys = function(src, fn){
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
	E.findAll = E.filter;



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
	E.keyOf = function(obj, criteria) {

		if(!$.isFunction(criteria))
			criteria = E.eq.bind(this, criteria);

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


	E.indexOf = E.keyOf;


	/**
	 * Вызов метода для всех элементов коллекции
	 *
	 * Аргументы вызываемого метода передаются в виде массива
	 *
	 * Ergo.applyAll(items, 'show', [10, 45]);
	 *
	 * @name Ergo.applyAll
	 * @function
	 * @param {Object|Array} obj коллекция
	 * @param {String} m_name имя метода
	 * @param {Array} [args] список аргументов
	 *
	 */
	E.applyAll = function(obj, m_name, args) {
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
 	 * Ergo.callAll(items, 'show', 10, 45);
	 *
	 * @name Ergo.callAll
	 * @function
	 * @param {Object|Array} obj коллекция
	 * @param {String} m_name имя метода
	 *
	 */
	E.callAll = function(obj, m_name) {
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
//	E.is_include = E.includes;



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

		if( $.isString(i) ) f = $ergo.curry(F.by_opts, {'name': i});
		else if( $.isNumeric(i) ) f = $ergo.curry(F.by_index, i);//return this.widgets[i]; // упрощаем
		else if( $.isPlainObject(i) ) f = $ergo.curry(F.by_props, i);
		else if( $ergo.isClass(i) ) f = $ergo.curry(F.by_class, i);
		else if( $.isFunction(i) ) f = i;

		return f;
	};



	// F.sort = {
	// 	natural: function(a, b) {
	// 		if(a < b) return -1;
	// 		if(a > b) return 1;
	// 		return 0;
	// 	}
	// }



	A = Ergo;


	A.EventAction = function(name, value) {
		this.emit(name, value);
	};

	A.StateAction = function(name, value) {
		if(value instanceof Ergo.core.Event) {
			value = value.$data;
		}
		this.set(name, value);
	}

	A.PropAction = function(name, value) {
		if(value instanceof Ergo.core.Event) {
			value = value.$data;
		}
		this.prop(name, value);
	}

	A.ClsAction = function(name, value) {
		value ? this.vdom.addClass(name) : this.vdom.removeClass(name);
	}


	A.Action = function(name, value) {
		this._widget[name](value);
	}


	Ergo.alias('actions:event', A.EventAction);
	Ergo.alias('actions:state', A.StateAction);
	Ergo.alias('actions:prop', A.PropAction);

	Ergo.alias('actions:cls', A.ClsAction);




	A.DOMAttribute = {
		set: function(v, name) {
			this.vdom.el.setAttribute(name, v);
		},
		get: function(name) {
			return this.el.vdom.getAttribute(name);
		}
	}




//	Ergo = A;

})();





(function(){


	var E = Ergo;






	E.fixDisorder = function(kv_a, callback) {

		// разница между индексами и позициями
		var indexDeltas = [];

		kv_a.forEach(function(kv, i) {
			indexDeltas[kv[2]] = kv[2] - i;
		});



		var n = 0;

		var indexDisorders = [];

		var moved_a = [];

		while( n < kv_a.length+1 ) {


			// 0 -
			// 1 -
			// 2 -
			// 3 - индекс
			var maxDisorder = [-1,-1];

			indexDisorders = [];

			for(var i = 0; i < kv_a.length; i++) {
				// индекс элемента i
				var i_index = i - indexDeltas[i];

				// пропускаем элемент, если мы его уже переместили
				if( moved_a[i_index] )
					continue;

				// 0 количество нарушений
				// 1 позиция первого нарушения
				// 2 позиция последнего нарушения
				var disorder = [-1, -1, -1];

				//
				for(var j = 0; j < kv_a.length; j++) {
					// индекс элемента j
					var j_index = j - indexDeltas[j];

					// если присутствует нарушение порядка, запоминаем его
					if( (j < i && j_index > i_index) || (j > i && j_index < i_index) ) {
						if(disorder[0] == -1) {
							disorder[1] = j;
						}
						disorder[2] = j;
						disorder[0]++;
					}
				}

				// обновляем информацию о нарушении
				indexDisorders[i] = disorder;

				// запоминаем наибольшее нарушение
				if(disorder[0] > maxDisorder[0]) {
					maxDisorder[0] = disorder[0];
					maxDisorder[1] = disorder[1];
					maxDisorder[2] = disorder[2];
					maxDisorder[3] = i;
				}

			}

			// если наибольшее нарушение не определено - исправление закончено
			if(maxDisorder[0] == -1) {
				break;
			}


			n++;



			// var k = 0;
			//
			// for(var i = 0; i < measure_a.length; i++) {
			// 	if(max_measure[0] == measure_a[i][0])
			// 		k++;
			// }

//				console.log( 'max measure, count', max_measure, k);

			// выполняем перемещение
			var _i = maxDisorder[3];
			var _j = (maxDisorder[2] > maxDisorder[3]) ? maxDisorder[2] : maxDisorder[1];


			// уведомляем о перемещении
			callback(_i, _j, kv_a[_i], kv_a[_j]);

			// запоминаем перемещенный индекс
			moved_a[_i-indexDeltas[_i]] = true;

			// корректируем дельту после перемещения
			var i_delta = indexDeltas[_i];

			if(_j < _i) {
				for(var i = _i; i > _j; i--) {
					indexDeltas[i] = indexDeltas[i-1]+1;
				}
			}
			if(_j > _i) {
				for(var i = _i; i < _j; i++) {
					indexDeltas[i] = indexDeltas[i+1]-1;
				}
			}

			indexDeltas[_j] = i_delta + (_j - _i);

		}


	}





	E.print = JSON.stringify;


	E.indent_s = '  ';

	E.prettyPrint = function(obj) {
		return JSON.stringify(obj, null, E.indent_s);
	}


	/**
	 * Печать объекта в удобочитаемой форме
	 *
	 * @name Ergo.prettyPrint
	 * @function
	 * @param {Any} obj любой объект/примитив
	 * @param {Integer} indent отступ
	 * @param {Integer} i_symb исимвол отступа
	 * @returns {String}
	 */
	// E.prettyPrint = function(obj, indent) {
	//
	// 	if(obj == undefined) return undefined;
	//
	// 	indent = indent || 0;
	// 	var tabs = '';
	// 	for(var i = 0; i < indent; i++) tabs += E.indent_s;
	//
	// 	if(obj.prettyPrint) return obj.prettyPrint(indent);
	//
	// 	if($.isString(obj))
	// 		return '"'+obj.replace(/\n/g, '\\n')+'"';
	// 	else if($.isBoolean(obj))
	// 		return ''+obj;
	// 	else if($.isNumeric(obj) || $.isBoolean(obj))
	// 		return obj;
	// 	else if($.isArray(obj)){
	// 		var items = [];
	// 		E.each(obj, function(item){
	// 			items.push(E.prettyPrint(item, indent));
	// 		});
	// 		return '[' + items.join(', ') + ']';
	// 	}
	// 	else if($.isFunction(obj)){
	// 		return 'function() { ... }';
	// 	}
	// 	else if($.isPlainObject(obj) || !indent){
	// 		var items = [];
	// 		E.each(obj, function(item, key){
	// 			if(key[0] == '!' || key[0] == '-' || key[0] == '+') key = "'"+key+"'";
	// 			items.push(tabs + E.indent_s + key + ': ' + E.prettyPrint(item, indent+1));
	// 		});
	// 		return '{\n' + items.join(',\n') + '\n' + tabs + '}';
	// 	}
	// 	else
	// 		return obj;
	//
	// };


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
	E.ms = E.timestamp = function() {
		return new Date().getTime();
	};

//	E.ms = E.timestamp;






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



	E.formatValue = function(key, obj) {

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

		var m = format_str.match(/^{{([^}{]+?)}}$/);

		if(m) {

		}


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



	E.unformat_obj = function(ufmt, s) {

		var n=0;

		var tmpl = ufmt.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");

		var keys = []

		tmpl = tmpl.replace(/#\\{\s*(.+?)\s*\\}/g, function(str, key) {

			key = key.replace(/\\\*|\\\|/g, function(s) {
			  return s.substr(1);
			});

		  keys.push(key);
		  return '(.+?)'
		});

		var m = s.match('^'+tmpl+'$');

		var obj = {};

		for(var i = 0; i < keys.length; i++ ) {
			var k = keys[i];
			var v = m[i+1];
			var key_a = k.split('|');
			k = key_a.shift(0);

			key_a.forEach(function(fmt) {
				fmt = Ergo.alias('formats:'+fmt);
				if(!fmt) {
					console.warn('Unformat ['+a[i]+'] is not registered');
				}
				v = fmt(v);
			});

			if(k == '*') {
				return v;
			}
			else {
				obj[k] = v;
			}
		}

		return obj;

		// if( keys[0] == '*') {
		// 	return m[1];
		// }
		// else {
		// 	var v = {}
		// 	keys.forEach(function(key, i) {
		// 	  v[key] = m[i+1]
		// 	})
		// 	return v;
		// }

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
	E.deepCopy = function(src) {

		if(src && src.constructor == Object) {
			var copy = {};
			for(var i in src) {
				copy[i] = E.deepCopy(src[i]);
			}
			return copy;
		}
		else if(src && src.constructor == Array) {
			var copy = [];
			for(var i = 0; i < src.length; i++) {
				copy[i] = E.deepCopy(src[i]);
			}
			return copy;
		}
		else {
			return src;
		}


/*
		var copy = null;

//		var is_po = $.isPlainObject(src);
//		if(is_po || $.isArray(src)){
		var is_po = (src && src.constructor == Object);
		if( src && (is_po || src.constructor == Array)) {
			copy = is_po ? {} : [];
			for(var i in src)
				copy[i] = E.deepCopy(src[i]);
//			E.each(src, function(item, i){
//				copy[i] = E.deep_copy(item);
//			});
		}
		else{
			copy = src;
		}

		return copy;
*/
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




	E.curry = function(func) {
		var F = func;
		var post_args = arguments;
		return function(){
			var args = [];
			for(var i = 1; i < post_args.length; i++) args.push(post_args[i]);
			for(var i = 0; i < arguments.length; i++) args.push(arguments[i]);
	//			args.push(arg);
			return F.apply(this, args);
		};
	};


	E.rcurry = function(func) {
		var F = func;
		var post_args = arguments;
		return function(){
			var args = [];
			for(var i = 0; i < arguments.length; i++) args.push(arguments[i]);
			for(var i = 1; i < post_args.length; i++) args.push(post_args[i]);
	//			args.push(arg);
			return F.apply(this, args);
		};
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



	E.measure = function(callback) {
		var t0 = E.ms();
		callback();
		var t1 = E.ms();
		return (t1-t0)
	};




	E.parseQueryString = function(queryStr) {

		var query = {};

		var query_a = queryStr.split('&');

		for(var i = 0; i < query_a.length; i++) {
			var p_a = query_a[i].split('=');
			var p_name = decodeURIComponent(p_a[0]);
			if( p_name ) {
				if( p_a.length == 1 ) {
					query[p_name] = '';
				}
				else {
					query[p_name] = decodeURIComponent(p_a[1].replace(/\+/g, " "));
				}
			}
		}

		return query;
	}








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
 *   `set` хэш сеттеров
 *   `get` хэш геттеров
 *   `include` список примесей
 *
 *
 * @class
 *
 */
Ergo.core.Object = function () {
  // possible optimization
  var a = new Array(arguments.length);
  for (var i = 0; i < arguments.length; i++)
    a[i] = arguments[i];

  // if( this.constructor === Object ) {
  //   return new (Function.prototype.bind.apply(objectConstructor, arguments));
  // }
  // else {
  this._initialize.apply(this, a);
};

Ergo.core.Object.extend = function (o) {
  return Ergo.extend(this, o);
};





Ergo.merge(Ergo.core.Object.prototype, /** @lends Ergo.core.Object.prototype */{

  defaults: {
    // options
  },


  props: {
    get: {},
    set: {}
  },

  /**
   * Инициализация объекта.
   *
   * Процесс инициализации разбивается на три фазы:
   *   1. преконструирование
   *   2. конструирование
   *   3. постконструирование
   *
   *
   * Для каждой фазы вызывается свой обработчик
   *
   * @private
   *
   */
  _initialize: function (opts) {//}, scope) {

    var o = {
    };

    var p = {
    };

    var r = {

    }

    //
    if(!this.constructor.NO_REBUILD_SKELETON) {
      var prevDefaults = null;
      Ergo.walkPrototypes(this.constructor, function(clazz){
        if(clazz.defaults == prevDefaults) return;
        if('defaults' in clazz) $ergo.mergeOptions(o, clazz.defaults);
        prevDefaults = clazz.defaults;
      });

      // var prevRules = null;
      // Ergo.walk_hierarchy(this.constructor, function(clazz){
      //   if(clazz.rules == prevRules) return;
      //   if('rules' in clazz) $ergo.deepMerge(r, clazz.rules);
      //   prevRules = clazz.rules;
      // });

      var prevProps = null;
      Ergo.walkPrototypes(this.constructor, function(clazz){
        if(clazz.props == prevProps) return;
        if('props' in clazz) $ergo.deepMerge(p, clazz.props);
        prevProps = clazz.props;
      });

      this.constructor.NO_REBUILD_SKELETON = true;
      this.constructor.prototype.defaults = Ergo.deepCopy(o);
      this.constructor.prototype.props = Ergo.deepCopy(p);
//      this.constructor.prototype.rules = Ergo.deep_copy(r);
//      Ergo.smart_build(this.constructor.prototype.defaults);

    }
    else {
      o = $ergo.deepCopy(this.defaults);// JSON.parse(JSON.stringify(this.defaults));
//      Ergo.deepMerge(o, this.defaults);
    }


//    this._scope = scope;


    this.options = $ergo.mergeOptions(o, opts) //Array.isArray(opts) ? Ergo.smart_override.apply(this, [o].concat(opts)) : Ergo.smart_override(o, opts);


    // сборка опций
//    Ergo.smart_build(this.options);


    if('include' in this.options) {
      this._includes = Ergo.uniq( o.include.join(' ').split(' ') );

//      var rebuild = false;

      for(var i = 0; i < this._includes.length; i++) {
        var inc = Ergo._aliases['includes:'+this._includes[i]];
        if(!inc) {
          throw new Error('Include [includes:'+this._includes[i]+'] not found');
        }

        $ergo.mergeInclude(this, inc);

        // if(inc.defaults) {
        //   this.options = $ergo.mergeOptions({}, [inc.defaults, this.options]);  //FIXME
        // }
        // if(inc.overrides) {
        //   Ergo.merge(this, inc.overrides);
        // }
      }

      // if(rebuild) {
      //   Ergo.smart_build(this.options);
      // }
    }


//    this._constructing = true;

    // определен набор базовых опций - можно выполнить донастройку опций
    this._preConstruct(this.options);

    // определен весь набор опций - можно выполнять сборку объекта
    this._construct(this.options);

    // объект готов - можно выполнить донастройку объекта
    this._postConstruct(this.options);

//    if(this.$init)
//      this.$init(o);

//    delete this._constructing;

  },



  //--------------------------------------------------------------------------
  // Хуки
  //--------------------------------------------------------------------------


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
  _preConstruct: function (o) {

    // динамическое подключение расширений
    if('include' in o) {
//      this._includes = o.include.join(' ').split(' ').uniq();

      for(var i = 0; i < this._includes.length; i++) {
        var inc = Ergo._aliases['includes:'+this._includes[i]];
        if(inc._preConstruct)
          inc._preConstruct.call(this, o);
      }
    }

    // // динамическая перегрузка
    // if('override' in o) {
    //   $ergo.merge(this, o.override);
    // }

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
  _construct: function (o) {

    if(this._includes) {
//      var mods = o.mods.join(' ').split(' ').uniq();
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
   * По умолчанию происходит инициализация свойств
   *
   * @protected
   * @param {Object} o опции
   */
  _postConstruct: function(o) {

    if(this._includes) {
//      var mods = o.mods.join(' ').split(' ').uniq();
      for(var i = 0; i < this._includes.length; i++) {
        var inc = Ergo._aliases['includes:'+this._includes[i]];
        if(inc._postConstruct)
          inc._postConstruct.call(this, o);
      }
    }


    // инициализируем свойства
    for(var i in o) {
      if( !(i in Ergo.rules) ) {
        this.prop(i, o[i]);
      }
    }

//    this._opt(o);

  },


  /**
   * Обработчик удаления объекта
   *
   * @protected
   */
  _destroy: function() {
    //

    if(this._includes) {
//      var mods = o.mods.join(' ').split(' ').uniq();
      for(var i = 0; i < this._includes.length; i++) {
        var inc = Ergo._aliases['includes:'+this._includes[i]];
        if(inc._destroy)
          inc._destroy.call(this);
      }
    }

  },




  /**
   * Установка опций (options) объекта.
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
    else if(typeof o == 'string'){

      // // или геттер
      // if( (o in this.options.get) ) {
      //   return this.options.get[o].bind(this)();
      // }
      // else if( (o in this.props.get) ) {
      //   return this.props.get[o].bind(this)();
      // }
      // else if( (o in this) && $ergo.hasGetter(this, o) ) {
      //   return this[o];
      // }
      return this.prop(o, null, this.options[o]);
    }

//    Ergo.smart_override(this.options, opts);
    $ergo.merge(this.options, opts);

    for(var i in opts) {
      if( !(i in Ergo.rules) ) {
        this.prop(i, opts[i]);
      }
    }

//    this._opt(opts);

    return this;
  },


  /**
   * Изменение/получение свойства
   *
   * @example
   * // если указано только name, то метод работает как геттер
   * obj.prop('text')
   *
   * // если указаны оба аргумента, то метод работает как сеттер
   * obj.prop('text', 'Hello, world!');
   *
   * @param {string} name имя свойства
   * @param {Any} [value] значение свойства
   *
   */
  prop: function(i, v, defaultValue) {

    if(arguments.length == 1 || arguments.length == 3) {

      if( this.options.get && (i in this.options.get) ) {
        return this.options.get[i].bind(this)();
      }
      else if( (i in this.props) && this.props[i].get ) {
        return this.props[i].get.bind(this)(i);
      }
      else if( (i in this.props.get) ) {
        return this.props.get[i].bind(this)();
      }
      else if( (i in this) && $ergo.hasGetter(this, i) ) {
        return this[i];
      }

      return defaultValue;
    }
    else if(arguments.length == 2) {

      if( this.options.set && (i in this.options.set) ) {
        this.options.set[i].bind(this)(v);
      }
      else if( (i in this.props) && this.props[i].set ) {
        this.props[i].set.bind(this)(v, i);
      }
      else if( (i in this.props.set) ) {
        this.props.set[i].bind(this)(v);
      }
      else if( (i in this) && $ergo.hasSetter(this, i) ) {
        this[i] = v;
      }

      return this;
    }

  },


  /**
   * Обработчик "потерянного" действия
   *
   * @param {string} name имя действия
   * @param {*} value значение действия
   *
   * @protected
   *
   */
  _missedAction: function(name, value) {
    console.warn('Action ['+name+'] is undefined');
//    this.prop(name, value);
  },



  /**
   * Проверка установленного включения `include`
   *
   * @function
   * @param {string} name имя включения
   */
//   is: function(ex) {
//     return (this._includes) ? Ergo.includes(this._includes, ex) : false;
// //    var o = this.options;
// //    if($.isString(ex)) ex = Ergo.alias('mixins:'+ex);
// //    return ('mixins' in o) ? Ergo.includes(o.mixins, ex) : false;
//   },

  includes: function(ex) {
    return (this._includes) ? $ergo.contains(this._includes, ex) : false;
  },


  /**
   * Вызов метода родительского класса из перегруженного метода
   *
   * По сути является "синтаксическим сахаром"
   *
   * @deprecated
   * @private
   */
  _super: function(){
    var caller = arguments.callee.caller;
    return caller.__class__.superclass[caller.__name__].apply(this, arguments);
  },






});






$ergo = Ergo.merge(function(o, ns, scope) {

//  var o = Ergo.smart_override.apply(this, arguments);

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


  if(!etype) {
//    console.warn('Etype is missed. Using `widget` ettype by default \n'+$ergo.prettyPrint(o)+'');
    etype = 'widget';
//    throw new Error('Object etype is not defined \n'+$ergo.prettyPrint(o)+'');
  }

  // var ns = null;
  // var scope = null;
  //
  // if( $.isString(ns_or_scope) ) {
  //   ns = ns_or_scope;
  // }
  // else {
  //   scope = ns_or_scope;
  // }

//  var etype = o.etype;
  ns = ns || 'widgets';
  var i = etype.indexOf(':');
  if(i > 0) {
    ns = etype.substr(0, i);
    etype = etype.substr(i+1);
  }

  if( !Ergo['$'+ns] )
    throw new Error('Namespace "'+ns+'" not defined');

  o.etype = ns+':'+etype;

  var w = Ergo['$'+ns](etype, o);//, scope);

  scope = scope || Ergo._scope;

  if(scope && w.options.sid) {//w.opt('scopeKey')) {
    scope.addWidget( w.options.sid, w );
  }

  return w;

}, Ergo);





Ergo.$objects = $ergo.object.bind(this, 'objects');




// /**
//  * Добавляем метод для регистрации примесей в ErgoJS
//  *
//  * @deprecated
//  */
// Ergo.declare_mixin = function(mixin_name, obj, alias) {
//
//   // создаем пространство имен для класса
//   var cp_a = mixin_name.split('.');
//   var cp = window;
//   for(var i = 0; i < cp_a.length-1; i++){
//     var c = cp_a[i];
//     if(!cp[c]) cp[c] = {};
//     cp = cp[c];
//   }
//
//   cp[cp_a[cp_a.length-1]] = obj;
//
//
//   // создаем пространство имен для расширения
//   // var cp_a = mixin_name.split('.');
//   // var cp = 'window';
//   // for(var i = 0; i < cp_a.length; i++){
//     // cp += '.'+cp_a[i];
//     // eval( 'if(!'+cp+') '+cp+' = {};' );
//   // }
//   // eval(cp + ' = obj;');
//
//   if(alias)
//     Ergo.alias(alias, obj);
//
//   return obj;
// }
// ;
//
// Ergo.defineMixin = Ergo.declare_mixin;





/**
 * @name Ergo.events
 * @namespace
 */


/**
 *
 * @class
 * @name Ergo.events.Event
 * @extends Ergo.core.Object
 */
// Ergo.defineClass('Ergo.core.Event', 'Ergo.core.Object', /** @lends Ergo.events.Event.prototype */{
//
// 	_initialize: function(baseEvent) {
// 		this.base = baseEvent;
// 		this._queue = [];
// 	},


Ergo.core.Event = function(baseEvent) {
	this.base = baseEvent;
	this._queue = [];
}

Ergo.merge(Ergo.core.Event.prototype, {

	stop: function(stopHtmlEvent) {
//		if(this.base) this.base.stopPropagation(); //FIXME
		var e = this.base;
		while(e && stopHtmlEvent !== false) {
			if(e.stopPropagation) {
				e.stopPropagation();
				break;
			}
			e = e.base;
		}
		this.stopped = true;
		// if(immediate)
		// 	this.stopedImmediate = true;
	},
	interrupt: function(interruptHtmlEvent) {
		var e = this.base;
		while(e && interruptHtmlEvent !== false) {
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
	yield: function(callback) {

		while(this._queue.length) {
			var h = this._queue.pop();
			h.callback.call(h.target, this);
			if(this.stopedImmediate) break;
		}

		// if( !this._yielded ) {
		// 	this._yielded = [];
		// }
		// this._yielded.push(callback);
	},
	cancel: function() {
		this.canceled = true;
	}

});


// Ergo.defineClass('Ergo.events.Event', Ergo.core.Object, /** @lends Ergo.events.Event.prototype */{
//
// 	/**
// 	 * @param {Object} overrides
// 	 * @param {Object} baseEvent
// 	 */
// 	_initialize: function(overrides, baseEvent) {
// 		this._super();
// //		Ergo.events.Event.superclass._initialize.call(this);
//
// 		if(overrides) Ergo.merge(this, overrides);
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


// Ergo.defineClass('Ergo.events.CancelEvent', 'Ergo.events.Event', /** @lends Ergo.events.CancelEvent.prototype */{
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
// Ergo.defineClass('Ergo.core.Observer', 'Ergo.core.Object', /** @lends Ergo.core.Observer.prototype */{
//
// 	_initialize: function(target) {
// 		this.events = {};
// 		this.target = target;
// 	},


Ergo.core.Observer = function(target) {
	this.events = {};
	this.target = target;
}

Ergo.merge(Ergo.core.Observer.prototype, /** @lends Ergo.core.Observer.prototype */{



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
	 * Генерация события
	 * @param {string} name наименование события
	 * @param {Any} data данные события
	 * @param {Ergo.core.Event} baseEvent инициирующее событие
	 *
	 * Обработка данных:
	 *  * Object - "слияние" с объектом события
	 *  * Event - "проброс" события
	 *
	 *  Остальные типы данных будут записаны в поле $data
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
		else if(_event.constructor === Object) {
			$ergo.merge(e, _event);
		}
		else if(_event instanceof Ergo.core.Event) {
			e = _event;
		}
		else {
			e.$data = _event;
		}
// 		else if( _event.constructor === Object ){
// 			Ergo.merge(e, _event);
// //			_event.baseEvent = baseEvent;
// //			e = new Ergo.events.Event(e, baseEvent);
// 		}
// 		else {
// 			e = _event;
// 		}



//		var self = this;
		var h_arr = this.events[type];
		if(h_arr && h_arr.length) {

//			var yielded = [];

			e._queue = h_arr.slice();

			while(e._queue.length) {
				var h = e._queue.pop();
				h.callback.call(h.target, e, type);
				if(e.stopedImmediate) break;
			}

			// for(var i = h_arr.length-1; i >= 0; i--) {
			// 	var h = h_arr[i];
			// 	// if(e._yielded) {
			// 	// 	yielded.push(h);
			// 	// }
			// 	// else {
			// 	h.callback.call(h.target, e, type);
			// 	if(e.stopedImmediate) break;
			// 	// }
			// }
			//
			//
			// if(e._yielded) {
			// 	e._yielded.reverse().forEach(function(callback) {
			// 		callback(e);
			// 	});
			// }

			// for(var i = yielded.length-1; i >= 0; i--) {
			// 	var h = yielded[i];
			// 	h.callback.call(h.target, e, type);
			// }

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
	},


	emit: function() {
		this.fire.apply(this, arguments);
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
 * @mixin observable
 *
 */
Ergo.alias('mixins:observable', /** @lends observable */ {

	/**
	 * Обработчик событий
	 * @returns {Ergo.core.Observer}
	 */
	get events() {
		if(!this.__evt) {
			this.__evt = new Ergo.core.Observer(this);
		}
		return this.__evt;
	},


	/**
	 * Подписка на события, указанные в опции `events`
	 *
	 * Подписка может быть выполнена на события полей объекта
	 *
	 * @param {string} [targetProperty] имя целевого поля
	 *
	 */
	_bindEvents: function(targetProperty) {

		var o = this.options;

		var target = targetProperty ? this[targetProperty] : this;

		if(!target)
			throw new Error('Target property "'+targetProperty+'" not found');

		if('events' in o) {

			for(var i in o.events){

				var name_a = i.split(':');

				var eventName = i;

				if(name_a[0] == targetProperty && name_a.length > 1) {
					eventName = name_a[1];
				}
				else if(name_a.length > 1 || targetProperty) {
					// инициализируем свойство
					this[targetProperty || name_a[0]];
					continue;
				}


				var callback_a = o.events[i];
				callback_a = Array.isArray(callback_a) ? callback_a : [callback_a]; //FIXME
				for(var j in callback_a) {
					var callback = callback_a[j];

					if( typeof callback == 'string' ) {
						var a = callback.split(':');
						// action
						var action = $ergo.alias('actions:'+a[0]) || this[a[0]];
						if( action ==  null ) {
							//TODO missed action
							callback = this._missedAction.bind(this, callback);
						}
						else {
							callback = action.bind(this, a[1]);
						}
//						callback = (a.length == 1) ? this[callback].bind(this, null) : this[a[0]]/*.rcurry(a[1])*/.bind(this, a[1]);
					}

					target.events.on(eventName, callback, this);
				}
			}
		}


		if( target == this ) {

			var regexp = /^on\S/;
			for(var i in o){
				if( i[0] == 'o' && i[1] == 'n' && regexp.test(i)){
					var name = i.charAt(2).toLowerCase() + i.slice(3);
					var chain = ( !Array.isArray(o[i]) ) ? [o[i]] : o[i];
					for(var j = 0; j < chain.length; j++) {
						var callback = chain[j];
						if( typeof callback == 'string' ) {
							var a = callback.split(':');
//							callback = (a.length == 1) ? this[callback].bind(this, null) : this[a[0]]/*.rcurry(a[1])*/.bind(this, a[1]);
							// action
							var action = $ergo.alias('actions:'+a[0]) || this[a[0]];
							if( action ==  null ) {
								//TODO missed action
								callback = this._missedAction.bind(this, callback);
							}
							else {
								callback = action.bind(this, a[1]);
							}

						}
						this.events.on( name, callback );
					}
				}
			}


		}

	},

	/**
	 * Подписка на событие
	 * @see {@link Ergo.core.Observer#on}
	 */
	on: function() {
		this.events.on.apply(this.events, arguments);
	},

	/**
	 * Единовременная подписка на событие
	 * @see {@link Ergo.core.Observer#once}
	 */
	once: function() {
		this.events.once.apply(this.events, arguments);
	},

	/**
	 * Отключение подписки на событие
	 * @see {@link Ergo.core.Observer#off}
	 */
	off: function() {
		this.events.off.apply(this.events, arguments);
	},

	/**
	 * Генерация события
	 * @deprecated
	 */
	fire: function() {
		this.events.fire.apply(this.events, arguments);
	},

	/**
	 * Генерация события
	 *
	 * @see {@link Ergo.core.Observer#fire}
	 */
	emit: function() {
		this.events.fire.apply(this.events, arguments);
	}

	// off: function(type, callback) {
	// 	var name_a = type.split(':');
	// 	var obj = this;
	// 	if(name_a.length > 1) {
	// 		obj = this[name_a[0]];
	// 		type = name_a[1];
	// 	}
	// 	obj.events.on(type, callback, this);
	// }



});






/**
 *
 *
 */
Ergo.alias('includes:observable', {

	_construct: function(o) {

		this.events = new Ergo.core.Observer(this);

	},




	_postConstruct: function(o) {


		if('events' in o){
			for(var i in o.events){

				var name_a = i.split(':');

				// вложенные события игнорируем
				if( name_a.length > 1 ) continue;

				var callback_a = o.events[i];
				callback_a = Array.isArray(callback_a) ? callback_a : [callback_a]; //FIXME
				for(var j in callback_a) {
					var callback = callback_a[j];

					if( $.isString(callback) ) {
						var a = callback.split(':');
						callback = (a.length == 1) ? this[callback] : this[a[0]].rcurry(a[1]).bind(this);
					}

					// if( name_a.length == 2 && this[name_a[0]] && this[name_a[0]].events ) {
					// 	console.log(i);
					// 	this[name_a[0]].events.on( name_a[1], callback, this );
					// }
					// else {
					this.events.on(i, callback, this);
					// }

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
			if( i[0] == 'o' && i[1] == 'n' && regexp.test(i)){
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
 * 	@fires Ergo.core.Event#changed
 * 	@fires Event#diff
 * 	@fires Event#dirty
 *
 * @class
 * @name Ergo.core.DataSource
 * @extends Ergo.core.Object
 * @mixes observable
 *
 */
Ergo.defineClass('Ergo.core.DataSource', /** @lends Ergo.core.DataSource.prototype */{

	extends: 'Ergo.core.Object',

	mixins: ['observable'],

	defaults: {
//		plugins: [Ergo.Observable],
//		include: 'observable',
		lazy: true
	},


	_initialize: function(src, id, o) {


		/**
		 * Источник данных
		 *
		 * @field {Any|Ergo.core.DataSource}
		 */
		this.source = src;

		/**
		 * Ключ связанных данных в источнике данных
		 *
		 * @field _id
		 */
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
			if(Array.isArray(id)) {
				this._id = id;
			}
			else {
				this._id = [this._id];
			}
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
			$ergo.each(val, function(v, i){	self.entry(i); } );
		}



		this._bindEvents();

//		console.log('-- data --');

	},


	_destroy: function() {

//		var src = this.source;

//		this.del();

		// очищаем регистрацию обработчиков событий
		this.events.off();
		// удаляем все дочерние элементы
//		this.entries.applyAll('_destroy');
		while(this.entries.count()) {
			this.entries.last()._destroy()
		}

		if( this.source instanceof Ergo.core.DataSource ) {
			this.source.entries.remove(this);
		}

	},



	/**
	 * Получение вложенного элемента данных по ключу
	 *
	 * Если элемента данных нет, то он будет создан
	 *
	 * @param {String|Any} i ключ
	 * @return {Ergo.core.DataSource} entry элемент данных
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
		if( typeof i == 'string' ) {
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
	 * @protected
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
	 * "Сырое" значение, ассоциированное с источником данных
	 * @returns {Any}
	 */
	raw: function() {
		return this._val();
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
	 * Полная копия "сырых" данных
	 *
	 * @param {Number|String} i ключ
	 * @returns {Any}
	 */
	rawCopy: function(i) {
		return Ergo.deepCopy(this.get(i));
	},



	/**
	 * Изменение существующего элемента
	 *
	 * Если аргумент один, то изменяется значение самого источника данных
	 *
	 * @emits Ergo.core.Event#changed
	 * @emits Ergo.core.Event#diff
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


			if(this.entries.isEmpty())
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
//			this.entries.applyAll('_destroy');



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
			return this;
		}
		else {
			return this.entry(i).set(newValue);
		}

	},



	/**
	 * Добавление нового элемента
	 *
	 * @emits Ergo.core.Event#changed
	 * @emits Ergo.core.Event#diff
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
	 * @emits Ergo.core.Event#diff
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
	 * Удаление элемента по значению.
	 *
	 * @param {Any} [v] значение элемента
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
	 * Последовательный обход всех вложенных элементов с поддержкой фильтрации и сортировки
	 *
	 * @param {Function} filter фильтр
	 * @param {Function} sorter сортировка
	 * @param {Function} pager страница
	 * @param {Function} callback
	 *
	 */
	stream: function(filter, sorter, pager, callback) {

		var ds = this;

		var values = ds.get();
//		var keys = this.keys(this.options.filter);

		var filter = filter || ds.options.filter;
		var sorter = sorter || ds.options.sorter;


		if( filter || sorter ) {

			var kv_a = [];

			// Filtering source and mapping it to KV-array
			Ergo.each(values, function(v, i) {
				if(!filter || filter(v, i)) {
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


	/**
	 * Обновление данных с синхронизацией
	 *
	 * Определяется разница между новыми и старыми данными, формируется diff-объект и
	 * генерируется событие `diff`
	 *
	 * @emits Ergo.core.Event#diff
	 *
	 * @params {Any} newData новые данные
	 *
	 */
	sync: function(newData) {

		var self = this;

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

		if( Array.isArray(oldData) && Array.isArray(newData) ) {

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


			Object.keys(value_m)
				.map(function(k) { return value_m[k] })
				.sort(function(a,b) { return a.index-b.index; })
				.forEach(function(val) {

					var v = val.value;
					var i = val.index;

					// CREATE
					diff.created.push( self.add(v, i) );

				});


			this._val( newData );


			for(var i = 0; i < newData.length; i++) {
				if( !valueEql(oldData[i], newData[i]) ) {
	//			if( JSON.stringify(oldData[i]) !== JSON.stringify(newData[i]) ) {
					diff.updated.push( this.entry(i) );
				}
			}


		}
		// for objects
		else {

			var value_m = {};

			// строим ассоциацию uid-ов и значений
			for(var i in newData) {
				var v = newData[i];
				var k = valueUid.call(this, v, i);
				value_m[k] = {value: newData[i], index: i};
			}

			// составляем список uid-ов для удаления
			for(var i in oldData) {

				var v = oldData[i];
				var k = valueUid.call(this, v, i);

				if( k in value_m ) {
					delete value_m[k];
				}
				else {
					// DELETE
					diff.deleted.push( this.entry(i) );
				}
			}

			// удаляем элементы данных
			for(var i = diff.deleted.length-1; i >= 0; i-- ) {
				diff.deleted[i].del();
			}

			// добавляем новые элементы данных
			Object.keys(value_m)
				.map(function(k) { return value_m[k] })
				.forEach(function(val) {

					var v = val.value;
					var i = val.index;

					// CREATE
					diff.created.push( self.set(i, v) );

				});


			// обновляем значение
			this._val( newData );

			// различающиеся элементы помечаем для обновления
			for(var i in newData) {
				if( !valueEql(oldData[i], newData[i]) ) {
					diff.updated.push( this.entry(i) );
				}
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
		this.entries.applyAll('clean');
	},


	/**
	 * Количество элементов "сырых" данных
	 *
	 * @returns {Number}
	 */
	size: function() {
		return $ergo.size(this._val());
	}



});




//Ergo.merge(Ergo.core.DataSource.prototype, Ergo.alias('mixins:observable'));



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
Ergo.core.StateManager = function(target) {
	this._widget = target;
	this._current = {};
	this._states = {};
	this._transitions = [];
	this._exclusives = {};
	this._groups = {};
}

Ergo.merge(Ergo.core.StateManager.prototype, /** @lends Ergo.core.StateManager.prototype */{

//Ergo.defineClass('Ergo.core.StateManager', 'Ergo.core.Object', /** @lends Ergo.core.StateManager.prototype */{


	_initialize: function(widget) {
		this._widget = widget;
		this._current = {};
		this._states = {};
		this._transitions = [];
		this._exclusives = {};
		this._groups = {};
//		thi._substates = {};
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


	/**
	 * Добавление нового состояния
	 *
	 * @param {String} name наименование
	 * @param {String|Function} состояние
	 *
	 */
	state: function(name, value) {

		if(arguments.length == 1) {
			return this._current[name];
		}

		// добавляем эксклюзивные группы
		if(value && value.constructor === Object) {
			var group = this._groups[name] || {};
			for(var i in value) {
				this.state(i, value[i]);
				group[i] = true;
			}
			this._groups[name] = group;
			// var group = this._exclusives[name] || [];
			// for(var i in value) {
			// 	this.state(i, value[i]);
			// 	group.push(new RegExp('^'+i+'$'));
			// }
			// this._exclusives[name] = group;
		}
		else {

			//FIXME парсим код состояния
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
		}
	},



	/**
	 * Установка состояния
	 *
	 * @param {String} to имя состояния
	 * @param {Object} data данные, связанные с состоянием
	 */
	set: function(to, data) {

		if(!to || (typeof to !== 'string')) {
			console.warn('State key ['+$ergo.print(to)+'] must be of type string');
			return false;
		}

		var to_a = to.split('.');

		var parent = null;
		var group = null;

		// устанавливаем базовые состояния, убираем
		if(to_a.length > 1) {

			to = to_a.pop();

			// восстанавливаем состояния
			for(var i = 0; i < to_a.length; i++) {
				var stt = to_a[i];
				if(!this._current[stt]) {

					var g = null;
					for(var i in this._groups) {
						if( this._groups[i][stt] ) {
							g = i;
							break;
						}
					}

					this._state_on(stt, data);
					this._current[stt] = {
						name: stt,
						from: null, //FIXME
						data: data,
						parent: parent,
						group: g
					}
				}
				parent = stt;
			}


		}

		// Если состояние уже установлено, то ничего не делаем
		if(to && (to in this._current))
			return false;//$.when({});




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

/*
		for(var g in this._exclusives) {
			if( this._is_exclusive(to, g) ) {

				for(var i in this._current)
					if(this._is_exclusive(i, g)) {
						this._state_off(i, self._current[i]);
						delete self._current[i];
					}
//						this.unset(i);

			}
		}
*/


		// TODO ищем только первую группу, а нужно - все
		for(var i in this._groups) {
			if( this._groups[i][to] ) {
				group = i;
				break;
			}
		}

		// if(parent && !group) {
		// 	group = parent.
		// }

		// отключаем эксклюзивные состояния
		for(var i in this._current) {
			var stt = this._current[i];
			if( stt.group == group && (group || (parent != null && stt.parent == parent)) ) {
				this.unset(i);
				break;
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


		var changeState = function() {
			// 2. удаляем все исходные состояния переходов из списка активных состояний
			for(var i = 0; i < from.length; i++) {
				delete self._current[from[i]];
			}

			// 3. включаем итоговое состояние
			self._state_on(to, data);
			self._current[to] = {
				name: to,
				from: from,
				data: data,
				parent: parent,
				group: group
			};

			// 4. оповещаем виджет, что состояние изменилось
//			self._widget.events.fire('stateChanged', {from: from, to: to, data: data});

			return true;
		}



		return (deferreds.length == 0) ? changeState.call(this) : $.when.apply($, deferreds).done(changeState);

//		return deferred;
	},



	_state_on: function(s, data) {

		var self = this;
		var states = this._states;//this._widget.options.states;

		if(s in states) {
			var val = states[s];

			// если состояние определено строкой, то строка содержит имя устанавливаемого класса
			if(typeof val == 'string') {
				// action
				var a = val.split(':');
				var action = $ergo.alias('actions:'+a[0]) || this._widget[a[0]];
				if(action == null) {
					this._widget._missedAction(val, true, data);
				}
				else {
					action.call(this._widget, a[1], true);
				}
//				this._widget.vdom.addClass(val);
			}
//				this._widget.el.classList.add(val);
			// если состояние определено массивом, то первый элемент содержит состояние ON, а второй элемент состояние OFF
			else if( Array.isArray(val) ) {
				this._widget.vdom.addClass(val);
				this._widget.vdom.removeClass(val[1]);
				// this._widget.el.classList.add(val[0]);
				// this._widget.el.classList.remove(val[1]);

				// if(val.length > 0) {
				// 	$.when( val[0].call(this._widget, true, data) ).done(function(add_cls) {
				// 		if(add_cls !== false)
				// 			self._widget.el.addClass(add_cls || s);
				// 	});
				// }
			}
			else if(val.constructor == Object) {
				console.warn('State group ['+s+'] can not be used as state');
			}
			// в иных случаях ожидается, что состояние содержит функцию
			else {
				val.call(this._widget, true, data);
				// $.when( val.call(this._widget, true, data) ).done(function(add_cls) {
				// 	if(add_cls !== false)
				// 		self._widget.vdom.addClass(add_cls || s);
				// });
			}
		}
		else {
			this._widget._missedState(s, true, data);
//			this._widget.vdom.addClass(s);
		}

		this._widget.events.fire('stateChanged', {state: s, op: 'on', data: data});
	},





	_state_off: function(s, data) {

		var self = this;
		var states = this._states;//this._widget.options.states;

		if(s in states) {
			var val = states[s];

			// если состояние определено строкой, то строка содержит имя устанавливаемого класса
			if(typeof val == 'string') {
				// action
				var a = val.split(':');
				var action = $ergo.alias('actions:'+a[0]) || this._widget[a[0]];
				if(action == null) {
					this._widget._missedAction(val, false, data);
				}
				else {
					action.call(this._widget, a[1], false);
				}
//				this._widget.vdom.removeClass(val);
			}

			// если состояние опрелено массивом, то первый элемент содержит состояние ON, а второй элемент состояние OFF
			else if( Array.isArray(val) ) {
				this._widget.vdom.addClass(val[1]);
				this._widget.vdom.removeClass(val[0]);

				// if(val.length > 1) {
				// 	$.when( val[1].call(this._widget, false) ).done(function(rm_cls) {
				// 		if(rm_cls !== false)
				// 			self._widget.el.removeClass(rm_cls || s);
				// 	});
				// }
			}
			// в иных случаях ожидается, что состояние содержит функцию
			else {
				val.call(this._widget, false, data);


				// $.when( val.call(this._widget, false) ).done(function(rm_cls) {
				// 	if(rm_cls !== false)
				// 		self._widget.vdom.removeClass(rm_cls || s);
				// });

//				var rm_cls = val.call(this._widget, false);
//				if(rm_cls !== false)
//					this._widget.el.removeClass(s);
			}
		}
		else {
//			this._widget.vdom.removeClass(s);
			this._widget._missedState(s, false, data);
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
	 */
	unset: function(from) {

		// Если состояние не установлено, то ничего не делаем
		if(from && !(from in this._current)) {
			return false;//$.when({});
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




// 		for(var g in this._exclusives) {
// 			if( this._is_exclusive(from, g) && this._exclusives[g].length == 2 ) {
//
// 				var group = this._exclusives[g];
//
// 				var regexp = from.match(group[0]) ? group[1] : group[0];
//
// 				for(var i in this._states)
// 					if( i.match(regexp) ) {
// 						this._state_on(i);
// 						self._current[i] = {
// 							from: from
// //							data: data
// 						}
// 					}
// 			}
// 		}





		if(to.length == 0 && def) {
			var result = def.action.call(this._widget);

			deferreds.push(result);
			// //FIXME
			// if(result && result.done)
				// deferred = $.when(result);

		}



		// 2.
		for(var i = 0; i < to.length; i++) {
			self._current[to[i]] = {from: [from]/*, data: data*/};
			if(to[i] in states) self._state_on(to[i]); //states[to[i]].call(self._widget);
		}

		// 3.
		self._state_off(from, self._current[from]);

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
		return (deferreds.length == 0) ? true : $.when.apply($, deferreds);
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

		if(arguments.length == 1 || typeof sw != 'boolean') sw = !this.is(name);

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
	// only: function(name, unset_template) {
	//
	// 	var states_to_unset = [];
	//
	// 	if(unset_template) {
	//
	// 		if( $.isArray(unset_template) )
	// 			states_to_unset = unset_template;
	// 		else {
	// 			if($.isString(unset_template))
	// 				unset_template = new RegExp('^'+unset_template+'.*$');
	//
	// 			for(var i in this._current)
	// 				if(i.match(unset_template)) states_to_unset.push(i);
	// 		}
	// 	}
	// 	else {
	// 		for(var i in this._current)
	// 			if(i != name) states_to_unset.push(i);
	// 	}
	//
	// 	// очищаем состояния, выбранные для удаления
	// 	for(var i = 0; i < states_to_unset.length; i++)
	// 		this.unset(states_to_unset[i]);
	//
	// 	// если состояние еще не установлено, то устанавливаем его
	// 	if(!this.is(name))
	// 		this.set(name);
	//
	// 	return this;
	// },



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
 * Состояния
 *
 * @mixin statable
 */
Ergo.alias('mixins:statable', /** @lends statable */ {

	get states() {
		if( !this.__stt ) {
			this.__stt = new Ergo.core.StateManager(this);
		}
		return this.__stt;
	},



	// set stt(v) {
	// 	var self = this;
	// 	if(Array.isArray(v)) {
	// 		v = v.join(' ');
	// 	}
	// 	v.split(' ').forEach(function(s) {
	// 		self.states.set(s);
	// 	});
	// },


	/**
	 * Регистрация состояний, указанных в опции `states`
	 *
	 */
	_bindStates: function() {
		var o = this.options;

		if('states' in o){
			for(var i in o.states) {
				this.states.state(i, o.states[i]);
			}
			// // настраиваем особое поведение состояния hover ?
			// if('hover' in o.states) {
			// 	this.el.hover(function(){ self.states.set('hover'); }, function(){ self.states.unset('hover'); });
			// }
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

	},


	/**
	 * Обработчик "потерянного" состояния
	 *
	 * @param {String} name имя состояния
	 * @param {Boolean} on начение состояния
	 *
	 */
	_missedState: function(name, on) {
		console.warn('State ['+name+'] is undefined');
	},




	is: function(name) {
		return this.states.is(name);
	},

	set: function(name) {
		this.states.set(name);
	},

	unset: function(name) {
		this.states.unset(name);
	},

	toggle: function(name, on) {
		this.states.toggle(name, on);
	}


});





Ergo.core.VDOM = function() {
	var a = new Array(arguments.length);
	for(var i = 0; i < arguments.length; i++)
		a[i] = arguments[i];

	this._initialize.apply(this, arguments);

}



Ergo.merge(Ergo.core.VDOM.prototype, {


	_initialize: function(tag, widget, options, ns) {

    var vdom = this;

    this._widget = widget;
    this.options = options || {};


//    var o = this._widget.options;

    // рендерим DOM-элемент
    if( tag ) {
			if(tag.constructor == String) {
				this.el = ns ? document.createElementNS(ns, tag) : document.createElement(tag)
			}
			else {
				this.el = tag;
			}
    }
    else {
      this.el = document.createTextNode('');
    }


    // здесь нужно добавить стили и классы




    // обработчик событий
    this.events = {

      listeners: {},

      on: function(name, callback) {
        this.listeners[name] = callback.bind(vdom._widget);
        vdom.el.addEventListener(name, this.listeners[name]);
        // widget.events.on('dom#'+name, callback);
        // if(!this.listeners[name]) {
        //   this.listeners[name] = function(e) { this.events.fire('dom#'+name, {}, e); }.bind(widget);
        //   vdom.el.addEventListener(name, this.listeners[name]);
        // }
      },

      off: function(name) {
				if(arguments.length == 0) {
					for(var i in this.listeners) {
						vdom.el.removeEventListener(i, this.listeners[i]);
					}
					this.listeners = {};
				}
				else {
	        vdom.el.removeEventListener(name, this.listeners[name]);
	        delete this.listeners[name];
				}
        // _widget.events.off('dom#'+name);
        // for(var i in this._listeners) {
        //   vdom.el.removeEventListener(name);
        // }
      }

    }


    //FIXME идеологически это неправильно
    this.el._vdom = this;

	},



	_destroy: function() {

		// осоединяемся от DOM
		this.detach();

		// удаляем все обработчики событий
		this.events.off();

	},




	setStyle: function(k, v) {
		if(arguments.length == 2) {
			v = (typeof v === 'number') ? $ergo.dom.numberStyleToPx(k, v) : v;
			this.el.style[k] = v;
		}
		else if(arguments.length == 1 && k) {
			if( k.constructor === Object ) {
				for(var i in k) {
					var v = k[i];
					v = (typeof v === 'number') ? $ergo.dom.numberStyleToPx(i, v) : v;
					this.el.style[i] = v;
				}
			}
			else if( k.constructor === String ) {
				return this.el.style[k];
			}
		}
	},



	setClass: function(cls) {
		if( cls && this.el instanceof Element ) {
			this.el.className = cls;//.join(' ');
		}
	},

	addClass: function(cls) {
		if( cls && this.el instanceof Element ) {
      var vdom = this;
			(''+cls).split(' ').forEach(function(c) {

				if(!c) return;

				if(vdom.el.classList) {
					vdom.el.classList.add(c);
				}
				else {
					// IE9
					var re = new RegExp("(^|\\s)" + c + "(\\s|$)", "g");
					if(!re.test(vdom.el.className)) {
						vdom.el.className = (vdom.el.className + " " + c).replace(/\s+/g, " ").replace(/(^ | $)/g, "")
					}
				}
			});
		}
	},

	removeClass: function(cls) {
		if( cls && this.el instanceof Element ) {
      var vdom = this;
			(''+cls).split(' ').forEach(function(c) {

				if(!c) return;

				if(vdom.el.classList) {
					vdom.el.classList.remove(c);
				}
				else {
					// IE9
					var re = new RegExp("(^|\\s)" + c + "(\\s|$)", "g");
					vdom.el.className = vdom.el.className.replace(re, "$1").replace(/\s+/g, " ").replace(/(^ | $)/g, "");
				}
			});
		}
	},

	detach: function() {
		if(this.el.parentNode) {
			this.el.parentNode.removeChild(this.el);
		}
	},


	each: function(callback) {
		Array.prototype.forEach.call(this.el.childNodes, callback);
	}



});














/**
 * @class
 * @name Ergo.core.Layout
 * @param {Object} opts
 */

// Ergo.core.Layout = function() {
// 	var a = new Array(arguments.length);
// 	for(var i = 0; i < arguments.length; i++)
// 		a[i] = arguments[i];
//
// 	this._initialize.apply(this, arguments);
//
// }
//
// Ergo.merge(Ergo.core.Layout.prototype, {

Ergo.defineClass('Ergo.core.Layout', /** @lends Ergo.core.Layout.prototype */ {

	extends: 'Ergo.core.VDOM',

	defaults: {
//		updateMode: 'auto'
	},


	_initialize: function() {
		Ergo.core.Layout.superclass._initialize.apply(this, arguments);

		var o = this.options;


		this.outerEl = this.el;
    this.innerEl = this.el;


//		this.options = o || {};
		if('name' in this.defaults) {
			this.options.name = this.defaults.name;
		}

		if('name' in o) this.el.setAttribute('layout', o.name);
		if('cls' in o) this.addClass(o.cls.join(' '));

		// зачатки шаблона
    if(this.html) {
      this.el.innerHTML = this.html;
      while(this.innerEl.childNodes.length) {
        this.innerEl = this.innerEl.childNodes[0];
      }
    }



	},




	// get inner() {
	// 	return (this.innerEl == this.el) ? this : new Ergo.core.VDOM(this.innerEl);
	// },
	//
	// get outer() {
	// 	return (this.outerEl == this.el) ? this : new Ergo.core.VDOM(this.outerEl);
	// },






	detach: function() {
		if(this.outerEl.parentNode) {
			this.outerEl.parentNode.removeChild(this.outerEl);
		}
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
// 	attach: function(c) {
//
// 		var o = this.options;
//
// //		this._widget = c;
//
// 		if('name' in o) this.el.setAttribute('layout', o.name);
// 		if('cls' in o) this.addClass(o.cls.join(' '));
//
// 		// this.dom = this._widget.dom;
// 		// this.el = this._widget.dom.el;
//
// 		// if(o.html){
// 		// 	var html = $(o.html);
// 		// 	this.el = (o.htmlSelector) ? $(o.htmlSelector, html) : html;
// 		// 	this._widget.el.append(html);
// 		// }
//
// 		// this._widget.events.on('diff', function(e) {
// 		// 	// перестраиваем компоновку
// 		// 	this._rebuild(e.updated);
// 		// }.bind(this));
//
// 	},

	/**
	 * удаление ассоциации компоновки с виджетом
	 */
// 	detach: function() {
// //		if('containerCls' in this.options) this.container.el.removeClass(this.options.containerCls);
// 		if('name' in this.options) this.el.removeAttribute('layout');
// 		if('cls' in o) this.el.removeClass(o.cls.join(' '));
// 		delete this._widget;
// 	},



	/**
	 * Оборачивание элемента.
	 *
	 * @param {Ergo.core.Widget} item виджет
	 * @return {jQuery} jQuery-объект, содержащий обертку и элемент виджета
	 *
	 */
	wrap: function(item) {
		return item.vdom.el;
	},


	/**
	 * jQuery-элемент, куда будут добавляться виджеты
	 *
	 */
	select: function(item) {
		return this.innerEl;
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
/*
	add: function(item, pos, weight, group) {

//		var selector = item.options.layoutSelector;

//		var el = this.el;

		var o = this.options;


		//FIXME определяем вес
		// если вес не указан, то вес считается равным 0
		var weight = item.options.weight || 0;
//		item._weight = weight;

		//получаем индекс
//		var index = item._index;


		// выбираем элемент, куда будет добавляться элемент-виджет
		var el = (o.selector) ? o.selector.call(this, item) : this.select(item);

		// создаем обертку (если она необходима) для элемента-виджета
		var item_el = (o.wrapper) ? o.wrapper.call(this, item) : this.wrap(item);



		if(item.options.wrapper) {

			if(item_el == item.__vdom.el) {
				item_el = document.createElement('div');
				item_el.appendChild(item.__vdom.el);
//				item_el = $('<div/>').append(item.dom.el);
			}

			item._wrapper = $.ergo( Ergo.deepMerge({etype: 'widgets:widget', tag: item_el, autoRender: false}, item.options.wrapper) );
			item._wrapper._weight = weight;

		}


		if(item_el != item.__vdom.el) {
			item.__vdom.outerEl = item_el;
		}

		// экспериментальный код
		if(item._key && item.options.autoClass) {
			$ergo.dom.addClass(item_el, item._key);
		}
//			item_el.addClass(item._key);



//		item_el.data('weight', weight);



//		item_el._group = item.options.group;


//		var elements = el.contents();
		var elements = el.childNodes;// new Ergo.core.Array(el[0].childNodes);

		// фильтруем список элементов
		// if(item.options.group) {
		// 	elements = Array.prototype.filter.call(elements, function(elem) {
		// 		return ( elem._ergo && elem._ergo.options.group == item.options.group )
		// 	});
		//
		// 	// var filtered = [];
		// 	// for(var j = 0; j < elements.length; j++) {
		// 	// 	var elem = elements[j];
		// 	// 	if( elem._ergo && elem._ergo.options.group == item.options.group ) filtered.push(elem);
		// 	// }
		// 	// elements = filtered;
		//
		//
		// 	// elements = Ergo.filter(elements, function(i, elem){
		// 		// return (elem._ergo) ? (elem._ergo.options.group == item.options.group) : false;
		// 	// });
		// }


		if(group) {

			var beforeEl = null;
			var afterEl = null;

			for(var i = 0; i < group.length; i++) {
				var g = group[i];
				var groupElements = [];

//				var lastEl = elements[elements.length-1];

				for(var j = 0; j < elements.length; j++) {
					var siblingEl = elements[j];
					var siblingGroup = siblingEl._group[i];
					// та же группа (вес+индекс)
					if(siblingGroup[0] == g[0] && siblingGroup[1] == g[1]) {
						groupElements.push(elements[j]);
					}
					// меньшая группа (вес+индекс)
					else if(siblingGroup[0] < g[0] || siblingGroup[1] < g[1]) {
						beforeEl = siblingEl;
					}
					// большая группа (вес+индекс)
					else if(siblingGroup[0] > g[0] && siblingGroup[1] > g[1]) {
						afterEl = siblingEl;
					}
				}

				elements = groupElements;
			}
		}






		// если индекс не определен, то элемент должен быть добавлен последним в свою группу
		if(pos == null) {

			pos = 0;

			// обходим все элементы контейнера в поисках первого с большим весом
			var after_el = null;

			// немножко эвристики
			var last = elements[elements.length-1];

//			index = 0;

			if(elements.length == 0) {
				el.appendChild( item_el );
			}
			else if(last._weight <= weight) {
				$ergo.dom.insertAfter(item_el, last);
				pos = last._pos+1;
//				last.after(item_el);
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
						after_el = elem;
						break;
					}
					else if(w == weight) {
						pos = elem._pos+1;
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
					$ergo.dom.insertBefore(item_el, after_el);
//					after_el.before( item_el );
				else if(elements.length)
					$ergo.dom.insertAfter(item_el, last);
//					last.after( item_el );
				else
					el.appendChild( item_el );
//					el.append( item_el );
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

//			console.log(index);

//			var elements = el[0].childNodes;// new Ergo.core.Array(el[0].childNodes);


			// немножко эвристики
			var last = elements[elements.length-1];

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
				el.appendChild( item_el );
//				el.append( item_el );
//				console.log('---1---');
			}
			else if(last._weight == weight && last._pos < pos){
				$ergo.dom.insertAfter(item_el, last);
//				last.after(item_el);
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
					// else if(!after_el ) after_el = it.el;

					if(child._weight == weight) arr.push( child );//.el);
					else if(child._weight <= weight) before_el = child;

					else if(!after_el ) after_el = child;
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
					if( arr[i]._pos >= pos  ) {
						if(!after_el) after_el = arr[i];
					}
					else {
						before_el = arr[i];
					}
				}



				if(before_el) {
					$ergo.dom.insertAfter( item_el, before_el );
				}
//					before_el.after( item_el );
				else if(after_el)
					$ergo.dom.insertBefore( item_el, after_el );
//					after_el.before( item_el );
				else if(elements.length)
					$ergo.dom.insertAfter( item_el, last );
//					last.after( item_el );
				else {
					el.appendChild( item_el );
//					el.append( item_el ); //FIXME это уже не нужно
				}



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

		// VDOM?

		item_el._pos = pos;

		item_el._weight = weight;

		item_el._group = group;


		var sibling = item_el.nextSibling;
		while(sibling && sibling._weight === item_el._weight) {
			sibling._pos++;
			sibling = sibling.nextSibling;
		}



		item._rendered = true;

		this._widget.events.fire('item#rendered', {item: item});

		// deprecated
//		if('itemCls' in this.options) item.el.addClass(this.options.itemCls);
//		if('itemStyle' in this.options) item.el.css(this.options.itemStyle);
	},
*/

	_groupElements: function(group) {

		var beforeEl = null;
		var afterEl = null;

		var elements = this.innerEl.childNodes;


		for(var i = 0; i < group.length; i++) {
			var g = group[i];
			var groupElements = [];

//				var lastEl = elements[elements.length-1];

			for(var j = 0; j < elements.length; j++) {

				if(!elements[j]._group) {
					continue;
				}

				var siblingEl = elements[j];
				var siblingGroup = siblingEl._group[i];
				// та же группа (вес+индекс)
				if(siblingGroup[0] == g[0] && siblingGroup[1] == g[1]) {
					groupElements.push(elements[j]);
				}
				// меньшая группа (вес+индекс)
				else if(siblingGroup[0] < g[0] || siblingGroup[1] < g[1]) {
					beforeEl = siblingEl;
				}
				// большая группа (вес+индекс)
				else if(siblingGroup[0] > g[0] && siblingGroup[1] > g[1]) {
					afterEl = siblingEl;
				}
			}

			elements = groupElements;
		}

		return elements;
	},



	at: function(pos, weight, group) {

		var w = weight || 0;

		var elements = this.innerEl.childNodes;

		if(group) {
			elements = this._groupElements(group);
		}

		for(var i = 0; i < elements.length; i++) {
			if( elements[i]._pos == pos && elements[i]._weight == w ) {
				return elements[i];
			}
		}

		return null;
	},



	addBefore: function(item, otherItem, w, group) {

		var o = this.options;

		var itemEl = item.vdom.outerEl;

		var pos = 0;
		var weight = w || 0;


		// выбираем элемент, куда будет добавляться элемент-виджет
		var targetEl = (o.selector) ? o.selector.call(this, item) : this.select(item);

		// создаем обертку (если она необходима) для элемента-виджета
		var itemEl = (o.wrapper) ? o.wrapper.call(this, item) : this.wrap(item);



		if(item.options.wrapper) {

			if(itemEl == item.__vdom.el) {
				itemEl = document.createElement('div');
				itemEl.appendChild(item.__vdom.el);
//				item_el = $('<div/>').append(item.dom.el);
			}

			item._wrapper = $.ergo( Ergo.deepMerge({etype: 'widgets:widget', tag: itemEl, autoRender: false}, item.options.wrapper) );
			item._wrapper._weight = weight;

		}


		if(itemEl != item.__vdom.el) {
			item.__vdom.outerEl = itemEl;
		}

		// экспериментальный код
		if(item._key && item.options.autoClass) {
			$ergo.dom.addClass(item_el, item._key);
		}




		var elements = targetEl.childNodes;


		if(!otherItem && group) {

			elements = this._groupElements(group);

		}

		var lastEl = elements[elements.length-1];
		var firstEl = elements[0];



		// если указан предыдущий элемент
		if(otherItem) {

			var otherEl = otherItem.vdom.outerEl;

			$ergo.dom.insertBefore(itemEl, otherEl);

			pos = otherEl._pos;

			// увеличиваем индекс всех последующих элементов того же веса
			var _el = itemEl.nextSibling;
			while(_el && _el._weight == weight) {
				_el._pos++;
				_el = _el.nextSibling;
			}

		}
		// если элементов в DOM вообще нет
		else if(elements.length == 0) {
			targetEl.appendChild(itemEl);
		}
		// если вес элемента меньше минимального веса
		else if(firstEl._weight > weight) {
			$ergo.dom.insertBefore(itemEl, firstEl);
		}
		// добавляем элемент в конец группы
		else {
			// ищем последний элемент меньшего веса или первый элемент большего веса
			var beforeEl = null;
			var afterEl = null;
			for(var i = 0; i < elements.length; i++) {
				var _el = elements[i];
				if(_el._weight != null && _el._weight < weight) {
					beforeEl = _el;
				}
				else {
					afterEl = _el;
					break;
				}
			}

			if(beforeEl) {
				$ergo.dom.insertAfter(itemEl, beforeEl);
				pos = beforeEl._pos;
			}
			else if(afterEl) {
				$ergo.dom.insertBefore(itemEl, afterEl);
			}


		}


		itemEl._pos = pos;
		itemEl._weight = weight;
		itemEl._group = group;

		item._rendered = true;

		this._widget.events.fire('item#rendered', {item: item});


	},




	addAfter: function(item, otherItem, w, group) {

		var o = this.options;

		var itemEl = item.vdom.outerEl;

		var pos = 0;
		var weight = w || 0;


		// выбираем элемент, куда будет добавляться элемент-виджет
		var targetEl = (o.selector) ? o.selector.call(this, item) : this.select(item);

		// создаем обертку (если она необходима) для элемента-виджета
		var itemEl = (o.wrapper) ? o.wrapper.call(this, item) : this.wrap(item);



		if(item.options.wrapper) {

			if(itemEl == item.__vdom.el) {
				itemEl = document.createElement('div');
				itemEl.appendChild(item.__vdom.el);
//				item_el = $('<div/>').append(item.dom.el);
			}

			item._wrapper = $.ergo( Ergo.deepMerge({etype: 'widgets:widget', tag: itemEl, autoRender: false}, item.options.wrapper) );
			item._wrapper._weight = weight;

		}


		if(itemEl != item.__vdom.el) {
			item.__vdom.outerEl = itemEl;
		}

		// FIXME
		if(otherItem && otherItem.__vdom.targetKey != item.__vdom.targetKey) {
			otherItem = null;
		}

		// экспериментальный код
		if(item._key && item.options.autoClass) {
			$ergo.dom.addClass(item_el, item._key);
		}




		var elements = targetEl.childNodes;


		if(!otherItem && group) {

			elements = this._groupElements(group);

		}

		var lastEl = elements[elements.length-1];



		// сомнительная оптимизация
		if(otherItem && otherItem.vdom.outerEl == lastEl) {
//			console.log('element insert after (fast)');
			targetEl.appendChild(itemEl);
			pos = lastEl._pos+1;
		}
		// если указан предыдущий элемент
		else if(otherItem) {
//			console.log('element insert after');

			var otherEl = otherItem.vdom.outerEl;

			$ergo.dom.insertAfter(itemEl, otherEl);

			pos = otherEl._pos+1;

			// увеличиваем индекс всех последующих элементов того же веса
			var _el = itemEl.nextSibling;
			while(_el && _el._weight == weight) {
				_el._pos++;
				_el = _el.nextSibling;
			}

		}
		// если элементов в DOM вообще нет
		else if(elements.length == 0) {
			targetEl.appendChild(itemEl);
		}
		// если вес элемента больше максимального веса
		else if(lastEl._weight <= weight) {
			targetEl.appendChild(itemEl);
			pos = lastEl._pos+1;
		}
		// добавляем элемент в конец группы
		else {
//			console.log('element lookup');

			// ищем последний элемент меньшего веса или первый элемент большего веса
			var beforeEl = null;
			var afterEl = null;
			for(var i = 0; i < elements.length; i++) {
				var _el = elements[i];
				if( (_el._weight || 0) <= weight) {
					beforeEl = _el;
				}
				else {
					afterEl = _el;
					break;
				}
			}

			if(beforeEl) {
				$ergo.dom.insertAfter(itemEl, beforeEl);
				pos = beforeEl._pos;
			}
			else if(afterEl) {
				$ergo.dom.insertBefore(itemEl, afterEl);
			}


		}


		itemEl._pos = pos;
		itemEl._weight = weight;
		itemEl._group = group;

		item._rendered = true;

		this._widget.events.fire('item#rendered', {item: item});
	},





	/**
	 * удаление элемента-виджета из компоновки
	 * @param {Object} item
	 */
	remove: function(item) {

		var item_el = item.vdom.outerEl;// (item._wrapper_el || item.dom.el);


		var sibling = item_el.nextSibling;
		while(sibling && sibling._weight === item_el._weight) {
			sibling._pos--;
			sibling = sibling.nextSibling;
		}


		if(item._wrapper_el) {
			item._wrapper_el.remove(); //?

			if(item._wrapper)
				item._wrapper._destroy();
		}
		else if(item.__vdom) {
			item.vdom.detach(); //TODO опасный момент: все дочерние DOM-элементы не уничтожаются
		}

		item._rendered = false;

		if('itemCls' in this.options) item.vdom.el.removeClass(this.options.itemCls);

		this._widget.events.fire('item#unrendered', {item: item});

	},


	/**
	 * очистка компоновки от всех элементов (уничтожения дочерних элементов не происходит)
	 */
	clear: function() {
		$ergo.dom.clear(this.el);
//		this.el.empty(); //WARN еще опасный момент все дочерние DOM-элементы уничтожаются
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

			var _el = $(this.el);


			if(!_el.is(":visible")) return;
			if(_el.attr('autoHeight') == 'ignore') return;


			if(_el.attr('autoHeight') == 'fit') {

				var h0 = _el.height();
				var dh = _el.outerHeight() - _el.height();

				_el.hide();

				var h = this._widget.options.height || 0;
				_el.parents().each(function(i, el){
					if(!h) h = $(el).height();
					if(h) return false;
				});

				h = Math.floor(h - dh);

				if(h > h0)
					_el.height(h);

				_el.show();

				return;
			}


			var debug = (this._widget.debug == 'autoheight');

			_el.height(0);


//			this.el.hide();

			var dh = 0;
			var h = 0;
			_el.parents().each(function(i, el){
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


//			if(Ergo.context.debug) console.log({h: h, dh: dh});

			dh += (_el.outerHeight(true) - _el.height());

//			if(Ergo.context.debug) console.log({h: h, dh: dh});


			var self = this;

			// обходим все соседние элементы
			var h_ratio = 1;
			_el.siblings().not('td').each(function(i, sibling){
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




			if(Ergo.context.debug) console.log({h: h, dh: dh, k: h_ratio});

//			this.el.height((h - dh)/h_ratio);

			if( this.options.autoHeightType == 'min' ) {

				_el.height('');

				_el.css('min-height', (h - dh)/h_ratio);
			}
			else if( this.options.autoHeightType == 'max' ) {

				_el.height('');

				_el.css('max-height', (h - dh)/h_ratio);
			}
			else {
				_el.height((h - dh)/h_ratio);
			}

//			this.el.show();

		}

		// AUTO FIT
		if(this._widget.options.autoFit === true){

			var _el = $(this.el);

			var dw = _el.outerWidth() - _el.width();
			var dh = _el.outerHeight() - _el.height();

			_el.hide();

			var h = this._widget.options.height || 0;
			var w = this._widget.options.width || 0;
			_el.parents().each(function(i, el){
				if(!h) h = $(el).height();
				if(!w) w = $(el).width();
				if(w && h) return false;
			});

			_el.siblings().not(':hidden').each(function(i, el){
				w -= $(el).outerWidth(true);
			});

			_el.width(w - dw);
			_el.height(Math.floor(h - dh));

			_el.show();
		}

	},

	/**
	 * обновление компоновки (порядка, количества элементов)
	 */
	_rebuild: function(updated) {

		console.log('REBUILD LAYOUT', updated);

		// if(updated) {
		// 	for(var i = 0; i < updated.length; i++) {
		// 		var item = updated[i];
		// 		item.unrender();
		// 		item.render();
		// 	}
		// }

	},



	build: function() {

//		var render_list = [];

		// this._widget.children.each(function(item){
//
//
//
		// });


	}



});//, 'layouts:default');


Ergo.alias('layouts:default', Ergo.core.Layout);


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

	var clazz = Ergo._aliases['layouts:'+etype];

	if(!clazz/*!Ergo.alias(etype)*/) {

		// var i = etype.indexOf(':');
		// if(i > 0) {
		// 	etype = etype.substr(i+1);
		// }

		o.unshift({name: etype});

		etype = 'default';
	}

	return Ergo.object('layouts', etype, o);
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


	// get text() {
	// 	if(this.$content) {
	// 		return this.$content.opt('text');
	// 	}
	// 	else {
	// 		return this.vdom.innerEl.textContent;
	// 	}
	// },
//	getText: function() {	return this.layout.el.text();	},
	// get width() {	return this.el.outerWidth();	},
	// get height() { return this.el.outerHeight();	},
	// get name() {
	// 	return this._name || this._key || this._index;
	// },



// 	set text(v) {
// 		if(this.$content) {
// 			this.$content.opt('text', v == null ? '': v);
// 		}
// 		else {
// 			this.vdom.innerEl.textContent = ( v == null ? '': v );
// 		}
//
// 		this.__txt = v;
//
// // 		if(!this.__c)
// // 			this.dom.el.textContent = ( v == null ? '': v );
// // 		else if(this.children.size() == 0)
// // //			this.layout.el.text( v == null ? '': v );
// // 			this.layout.el.textContent = ( v == null ? '': v );
// // 		else if(this.$content)
// // 			this.$content.opt('text', v == null ? '': v);
// // 		else
// // //			this.layout.el.text( v == null ? '': v );
// //  			this.layout.el.textContent = ( v == null ? '': v );
//
// 	},
	// set_innerText: function(v) {	this.layout.el.text(v); },
//	set innerHtml(v) {	this.vdom.innerEl.innerHTML = (v || ''); },
	// set_opacity: function(v) {
	// 	if($.support.opacity)
	// 		this.el.css('opacity', v);
	// 	else {
	// 		this.el.css('filter', 'Alpha(opacity:' + (v*100.0) + ')');
	// 		this.el.css('-ms-filter', 'progid:DXImageTransform.Microsoft.Alpha(Opacity=' + (v*100.0).toFixed() + ')');
	// 	}
	// },
	// set width(v) { this.el.outerWidth(v); },
	// set height(v) { this.el.outerHeight(v); },



// 	set autoWidth(v) {
// 		v ? this.vdom.el.setAttribute('autoWidth', v) : this.vdom.el.removeAttribute('autoWidth');
// 	},
// 	set autoHeight(v) {
// 		if(v) {
// 			this.vdom.el.setAttribute('autoHeight', v);
// 			if(v === true || v == 'ignore-siblings')
// 				this.vdom.setStyle('overflow-y', 'auto');//.el.style['overflow-y'] = 'auto';//('overflow-y', 'auto');
// 		}
// 		else {
// 			this.vdom.el.removeAttribute('autoHeight');
// 			this.vdom.setStyle('overflow-y', '');
// //			this.el.css('overflow-y', '');
// //			this.el.style['overflow-y'] = '';
// 		}
// 	},




//	set name(v) { this._name = v; },


// 	set format(v) {
// 		if($.isString(v)) this.options.format = Ergo.format_obj.curry(v);
// 	},
// 	set unformat(v) {
// 		if($.isString(v)) this.options.unformat = Ergo.unformat_obj.curry(v);
// 	},

	//FIXME для совместимости
// 	set hidden(v) {
// 		this.vdom.outerEl.style.display = (v ? 'none' : '');//.css('display', v ? 'none' : '');
// //		this.el.css('display', v ? 'none' : '');
// 	},




	//TODO placeholder?



};





Ergo.WidgetAttributes = {
	attributes: ['id', 'tabindex']
};




/**
 * @lends Ergo.core.Widget.prototype
 */
Ergo.WidgetProps = {

  props: {

    get: {
      text: function() {
    		if(this.$content) {
    			return this.$content.opt('text');
    		}
    		else {
    			return this.vdom.innerEl.textContent;
    		}
    	}
    },

    set: {

      text: function(v) {
    		if(this.$content) {
    			this.$content.opt('text', v == null ? '': v);
    		}
    		else {
    			this.vdom.innerEl.textContent = ( v == null ? '': v );
    		}

    		this.__txt = v;  //TODO пока это нужно только для оптимизации отрисовки
    	},

      innerHtml: function(v) {
        this.vdom.innerEl.innerHTML = (v || '');
      },

      autoWidth: function(v) {
    		v ? this.vdom.el.setAttribute('autoWidth', v) : this.vdom.el.removeAttribute('autoWidth');
    	},

    	autoHeight: function(v) {
    		if(v) {
    			this.vdom.el.setAttribute('autoHeight', v);
    			if(v === true || v == 'ignore-siblings')
    				this.vdom.setStyle('overflow-y', 'auto');//.el.style['overflow-y'] = 'auto';//('overflow-y', 'auto');
    		}
    		else {
    			this.vdom.el.removeAttribute('autoHeight');
    			this.vdom.setStyle('overflow-y', '');
    //			this.el.css('overflow-y', '');
    //			this.el.style['overflow-y'] = '';
    		}
    	},


    	hidden: function(v) {
    		this.vdom.outerEl.style.display = (v ? 'none' : '');//.css('display', v ? 'none' : '');
    //		this.el.css('display', v ? 'none' : '');
    	},



      // атрибуты

      id: function(v) {
    		this.vdom.el.setAttribute('id', v);
    	},

    	tabindex: function(v) {
    		this.vdom.el.setAttribute('tabindex', v);
    	},

    	tooltip: function(v) {
    		this.vdom.el.setAttribute('title', v);
    	}



    }

  }

};





/**
 * Коллекция пар ключ/значение
 *
 * Представляет собой обертку для объектов javascript-класса Object
 *
 * @class
 *
 */
Ergo.core.Collection = function(src) {

	var a = new Array(arguments.length);
	for(var i = 0; i < arguments.length; i++)
		a[i] = arguments[i];

	this._initialize.apply(this, a);
}

$ergo.merge(Ergo.core.Collection.prototype, {
// Ergo.core.Collection = Ergo.defineClass('Ergo.core.Collection', 'Ergo.core.Object', /** @lends Ergo.core.Collection.prototype */{
//
// 	defaults: {
// //		plugins: [Ergo.Observable]
// 	},
//
	_initialize: function(src) {
		this.src = src || {};
	},


	_factory: function(v) {
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
		this.removeAt(i);
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
	removeAt: function(i) {
		var item = this.src[i];
		delete this.src[i];
		return item;

//		this.events.fire('item:removed', {'item': item});
	},

	/**
	 * Удаление значения
	 *
	 * Для удаления используется метод removeAt
	 *
	 * @param {Object} item значение
	 */
	remove: function(item) {
		this.removeAt(this.keyOf(item));
		return item;
	},

	/**
	 * Удаление значения по условию
	 *
	 * Для удаления используется метод removeAt
	 *
	 * @param {Object} criteria функция-условие
	 *
	 * Значение удаляеся, если результат, возвращаемый criteria равен true
	 */
	removeIf: function(criteria) {
		var keys = Ergo.filterKeys(this.src, criteria);
		keys.sort(Ergo.sort_numbers).reverse();
		var removed = [];
		for(var i = 0; i < keys.length; i++) {
			removed.push( this.removeAt(keys[i]) );
		}
		return removed;
	},


	/**
	 * Удаление всех элементов коллекции
	 */
	removeAll: function() {
		for(i in this.src) {
			this.removeAt(i);
		}
	},


	clear: function() {
		this.removeAll();
//		this.src = {};
	},

	/**
	 * Последовательный обход всех значений
	 * @param {Object} callback
	 */
	each: function(callback) {
		return $ergo.each(this.src, callback);
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
	findAll: function(criteria) {
		return Ergo.findAll(this.src, callback);
	},



	//
	//TODO методам filter и map имеет смысл возвращать коллекцию, а не значение
	//

	/**
	 * Фильтрация элементов
	 */
	filter: function(callback) {
		return this._factory( Ergo.filter(this.src, callback) );
	},

	/**
	 * Отображение элементов
	 */
	map: function(callback) {
		return this._factory( Ergo.map(this.src, callback) );
	},

	/**
	 * Проверка вхождения значения в коллекцию
	 * @param {Object} criteria
	 */
	contains: function(criteria) {
		return Ergo.contains(this.src, callback);
	},

	// isInclude: function(criteria) {
	// 	return Ergo.contains(this.src, callback);
	// },


	/**
	 * Размер коллекции
	 */
	count: function() {
		var n = 0;
		for(var i in this.src) n++;
		return n;
	},

	size: function() {
		return this.count();
	},

	/**
	 * Проверка, является ли коллекция пустой
	 */
	isEmpty: function() {
		return this.count() == 0;
	},

	/**
	 * Получение ключа элемента
	 * @param {Object} item
	 */
	keyOf: function(item) {
		return Ergo.keyOf(this.src, item);
	},

	/**
	 * Вызов для всех элементов коллекции указанного метода
	 *
	 * @param {Object} m
	 * @param {Object} args
	 */
	applyAll: function(m, args, reverse) {
		$ergo.applyAll(this.src, m, args, reverse);
	},


	/**
	 * Проверка наличия элемента с указанным ключом
	 * @param {Object} i ключ
	 */
	hasKey: function(i) {
		return (i in this.src);
	},

	/**
	 * Список всех ключей в коллекции
	 */
	keys: function() {
		return Object.keys(this.src);
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
Ergo.core.Array = Ergo.defineClass('Ergo.core.Array', /** @lends Ergo.core.Array.prototype */{

	extends: 'Ergo.core.Collection',

	_initialize: function(src, options) {
		Ergo.core.Array.superclass._initialize.call(this, src || []);//, options);
	},


	_factory: function(v) {
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
			if(i > this.src.length) {
				console.warn('Add item at index greater than array length may cause errors');
			}
			this.src.splice(i, 0, item);
		}

//		this.events.fire('item:added', {'item': item, 'index': i});
		return i;
	},


	/**
	 * Удалить элемент по индексу
	 * @param {Object} i
	 */
	removeAt: function(i) {
		var item = this.src[i];
		this.src.splice(i, 1);
		return item;
//		this.events.fire('item:removed', {'item': item});
	},


	removeAll: function() {
		while(this.src.length)
			this.removeAt(0);
	},

	count: function() {
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
		return this._factory(this.src.slice(0));
	}


});






/**
 * Массив виджетов
 *
 *
 * @class
 * @name Ergo.core.Children
 * @extends Ergo.core.Array
 *
 *
 */
Ergo.defineClass('Ergo.core.Children', /** @lends Ergo.core.Children.prototype */{

	extends: 'Ergo.core.Array',

// 	defaults: {
// //		plugins: [Ergo.Observable]
// //		include: 'observable'
// 	},


	_initialize: function(w) {
//		this._super(null, o);

//		Ergo.core.WidgetArray.superclass._initialize.call(this, null, o);

//		this.options = o || {};
		this.src = [];
//		this.events = new Ergo.events.Observer(this);

		this.autobinding = true;

		this._widget = w;
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
		else if(Array.isArray(o)) o = {items: o};
		var default_child = 'default' + type[0].toUpperCase() + type.substr(1);
		default_child = this.options[default_child];

//		for(var i = 0; i < default_child.length; i++) {
			if( $.isString(default_child) ) {
				default_child = {etype: default_child};
			}
//			default_child[i] = $ergo.copy(default_child[i]);
//		}

//		console.log(type, default_child, o, this.options);

		return $.ergo( [default_child, o] );//, null, this.scope );
//		return $.ergo( Ergo.smart_override({}, this.options[default_child], o) );
	},



	// get _source() {
	// 	return this.src;
	// },




	add: function(item, i, type) {

//		console.log('add item');

//		var key;
		var w = this._widget;

//		item = w.factory(item);

		// если не определен тип компонента
		if(type == undefined) {
			// если не определен ключ компонента
			type = (i && $.isString(i)) ? 'component' : 'item';
		}

//		type = type || 'item';

		// создаем виджет с помощью фабрики элементов
		if(!(item instanceof Ergo.core.Widget)) {
			item = (w.options[type+'Factory'] || this.factory).call(w, item, type);
		}
//		item = (w.options[type+'Factory'] || this.factory).call(w, item, type);

		item._type = type;

		// для элементов с текстовыми ключами (компонентов) сохраняем ключ в поле _key
		if(i && (typeof i === 'string')) {
			item._key = i;
			i = undefined;
		}
		else {
			item._index = i;
		}

		// определяем поле parent
		item.parent = w;


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
//					item.dom.el._index = item._index; //WARN это действие должно осуществляться в layout
					break;
				}
			}
		}

//		var i0 = i;


//		console.log('i', i);
		// добавляем элемент в коллекцию
//		i = this._super(item, i);
		i = Ergo.core.Children.superclass.add.call(this, item, i);



//		console.log(i0 + ' > '+i);

		// обновляем свойство _index у соседних элементов
		for(var j = i+1; j < this.src.length; j++) {
			if('_index' in this.src[j]) {
				this.src[j]._index++;
//				this.src[j].dom.el._index++; //WARN это действие должно осуществляться в layout
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
//			w[item._key] = item;
			w['$'+item._key] = item;
		}



		// добавляем элемент в компоновку с индексом i (для компонентов он равен undefined)
		// if(item.options.autoRender === true)
		// 	w.vdom.add(item, item._index);//i);


		// выполняем иерархическое связывание данных (автобиндинг)
		if(w.data && !item.data && this.autobinding)
			item.bind(w.data, false, false);



//		console.log('item:add');
		//TODO здесь бы применить метод вызова опций как для компоновки
		this._widget.events.fire('item#added', {'item': item});

		return item;
	},




	removeAt: function(i) {

//		var key;
		var w = this._widget;

		// // для компонентов определяем индекс через accessor
		// if($.isString(i)) {
// //			key = i;
			// i = w[i]._index;
		// }


//		var item = this._super(i);
		var item = Ergo.core.Children.superclass.removeAt.call(this, i);


//		if('hide' in item) item.hide();

		// обновляем свойство _index у соседних элементов
		for(var j = i; j < this.src.length; j++) {
			if('_index' in this.src[j]) {
				this.src[j]._index--;
//				this.src[j].dom.el._index--;
			}
		}

//			this.src[j]._index = j;

		// поля parent, _index и _key больше не нужны
		delete item.parent;
		delete item._index;

		if(item._key) {
			delete w['$'+item._key];
//			delete w[item._key];
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




	each: function(callback/* filter, sorter*/) {

		// var c = this._widget; // возможно не лучшее решение, но практичное
		//
		// var values = this.src;
		//
		// var filter = filter || c.options.filter;
		// var sorter = sorter || c.options.sorter;
		//
		// if(filter || sorter) {
		//
		// 	var kv_a = [];
		//
		// 	// Filtering source and mapping it to KV-array
		// 	values.forEach(function(v, i) {
		// 		if(!filter || filter(v, i)) {
		// 			kv_a.push( [i, v] );
		// 		}
		// 	});
		//
		//
		// 	if(sorter) {
		// 		// Sorting KV-array
		// 		kv_a.sort( sorter );
		// 	}
		//
		//
		// 	for(var i = 0; i < kv_a.length; i++) {
		// 		var kv = kv_a[i];
		// 		var prev = i ? kv_a[i-1][1] : undefined;
		// 		callback.call(c, kv[1], i, prev);//kv[0]);
		// 	}
		//
		// }
		// else {
			// Basic each
			this.src.forEach(callback);
//			Ergo.each(this.src, callback);

//		}

	},



	stream: function(filter, sorter, pager, callback) {

		var c = this._widget; // возможно не лучшее решение, но практичное

		var filter = filter || c.options.filter;
		var sorter = sorter || c.options.sorter;
		var pager = pager || c.options.pager;

		if(filter || sorter || pager) {

			var kv_a = [];

			// Filtering source and mapping it to KV-array
			this.src.forEach(function(v, i) {
				if(!filter || filter(v, i)) {
					kv_a.push( [i, v] );
				}
			});


			if(sorter) {
				// Sorting KV-array
				kv_a.sort( sorter );
			}


			for(var i = 0; i < kv_a.length; i++) {
				var kv = kv_a[i];
//				var prev = (i > 0) ? kv_a[i-1][1] : undefined;
				callback.call(c, kv[1], i);//kv[0]);
			}

			//TODO pager
		}
		else{
			this.src.forEach(callback.bind(c));
		}

	},







	removeAll: function() {

		var w = this._widget;

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
			// this.removeAt(0)._destroy();
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
 * @name Ergo.core.Components
 * @extends Ergo.core.Array
 *
 *
 */
Ergo.defineClass('Ergo.core.Components', /** @lends Ergo.core.Components.prototype */ {

	extends: 'Ergo.core.Array',

// 	defaults: {
// //		plugins: [Ergo.Observable]
// //		include: 'observable'
// 	},

	_type: 'component',


	_initialize: function(w) {//}, o) {
//		this._super(null, o);

//		this.options = o;

		this.src = [];
//		this.events = new Ergo.events.Observer(this);

		this._widget = w;
	},


	get _source() {
		var result = {};
		var _type = this._type;
//		var o = this.options;
		this._widget.children.src.forEach(function(c) { if(c._type == _type) result[c._key] = c; });
		return result;
	},



	_factory: function(v) {
		return new Ergo.core.Components(this._widget);
	},


	/**
	 * Установка значения
	 * @param {Object} i ключ
	 * @param {Object} item значение
	 */
	set: function(i, item) {
		// if(i in this._widget)
		// 	this.removeAt(i);
		if( ('$'+i) in this._widget)
			this._widget['$'+i]._destroy();
//			this._widget.children.removeAt(i);
		return this._widget.children.add(item, i, this._type);
	},




	/**
	 * Получение значения по ключу
	 * @param {Object} i
	 */
	get: function(i) {
		return this._source[i];
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
	removeAt: function(i) {
//		return this._widget.children.removeAt(i);
		var removed = this._widget.children.removeIf(function(v) {	return v._key == i;	});

		return removed.length == 0 ? null : removed[0];
	},

	/**
	 * Удаление значения
	 *
	 * Для удаления используется метод removeAt
	 *
	 * @param {Object} item значение
	 */
	remove: function(item) {
		return this.removeAt(item._key);
	},

	/**
	 * Удаление значения по условию
	 *
	 * Для удаления используется метод removeAt
	 *
	 * @param {Object} criteria функция-условие
	 *
	 * Значение удаляеся, если результат, возвращаемый criteria равен true
	 */
	removeIf: function(criteria) {
		var keys = Ergo.filter_keys(this._source, criteria);
		keys.sort(Ergo.sort_numbers).reverse();
		var removed = [];
		for(var i = 0; i < keys.length; i++) removed.push( this.removeAt(keys[i]) );
		return removed;
	},


	removeAll: function() {
		var src = this._source;
		for(i in src)
			this.removeAt(i);
	},


	/**
	 * Очистка коллекции от всех значений
	 */
	clear: function() {
		this.removeAll();
	},

	/**
	 * Последовательный обход всех значений
	 * @param {Object} callback
	 * @param {Object} delegate
	 */
	// each: function(callback) {
	// 	return Ergo.each(this._source, callback);
	// },

	each: function(callback/*, filter, sorter*/) {

		// var c = this._widget; // возможно не лучшее решение, но практичное
		//
		// var values = this._source;
		//
		// var filter = filter || c.options.filter;
		// var sorter = sorter || c.options.sorter;
		//
		// if(filter || sorter) {
		//
		// 	var kv_a = [];
		//
		// 	// Filtering source and mapping it to KV-array
		// 	values.forEach(function(v, i) {
		// 		if(!filter || filter(v, i)) {
		// 			kv_a.push( [i, v] );
		// 		}
		// 	});
		//
		//
		// 	if(sorter) {
		// 		// Sorting KV-array
		// 		kv_a.sort( sorter );
		// 	}
		//
		//
		// 	for(var i = 0; i < kv_a.length; i++) {
		// 		var kv = kv_a[i];
		// 		var prev = (i > 0) ? kv_a[i-1][1] : undefined;
		// 		callback.call(c, kv[1], i, prev);//kv[0]);
		// 	}
		//
		// }
		// else {
			// Basic each
			this._source.forEach(callback);
//			Ergo.each(this.src, callback);

//		}

	},




	stream: function(filter, sorter, pager, callback) {

		var c = this._widget; // возможно не лучшее решение, но практичное

		var filter = filter || c.options.filter;
		var sorter = sorter || c.options.sorter;
		var pager = pager || c.options.pager;


		if(filter || sorter || pager) {

			var kv_a = [];

			// Filtering source and mapping it to KV-array
			this._source.forEach(function(v, i) {
				if(!filter || filter(v, i)) {
					kv_a.push( [i, v] );
				}
			});


			if(sorter) {
				// Sorting KV-array
				kv_a.sort( sorter );
			}


			for(var i = 0; i < kv_a.length; i++) {
				var kv = kv_a[i];
//				var prev = (i > 0) ? kv_a[i-1][1] : undefined;
				callback.call(c, kv[1], i);//kv[0]);
			}

			//TODO pager

		}
		else{
			this._source.forEach(callback.bind(c));
		}

	},




//	ensure: function(i) {
//
//	},

	/**
	 * Поиск первого элемента, удовлетворяющего критерию
	 */
	find: function(criteria) {
		return Ergo.find(this._source, criteria);
	},

	/**
	 * Поиск всех элементов, удовлетворяющих критерию
	 */
	findAll: function(criteria) {
		return Ergo.filter(this._source, callback);
	},



	//
	//TODO методам filter и map имеет смысл возвращать коллекцию, а не значение
	//

	/**
	 * Фильтрация элементов
	 */
	filter: function(callback) {
		return this.create( Ergo.filter(this._source, callback) );
	},

	/**
	 * Отображение элементов
	 */
	map: function(callback) {
		return this.create( Ergo.map(this._source, callback) );
	},

	/**
	 * Проверка вхождения значения в коллекцию
	 * @param {Object} criteria
	 */
	includes: function(criteria) {
		return Ergo.contains(this._source, callback);
	},

	/**
	 * Размер коллекции
	 */
	count: function() {
		var n = 0;
		var src = this._source;
		for(var i in src) n++;
		return n;
	},

	/**
	 * Проверка, является ли коллекция пустой
	 */
	isEmpty: function() {
		return this.count() == 0;
	},

	/**
	 * Получение ключа элемента
	 * @param {Object} item
	 */
	keyOf: function(item) {
		return Ergo.keyOf(this._source, item);
	},

	/**
	 * Вызов для всех элементов коллекции указанного метода
	 *
	 * @param {Object} m
	 * @param {Object} args
	 */
	applyAll: function(m, args) {
		Ergo.applyAll(this._source, m, args);
	},


	/**
	 * Проверка наличия элемента с указанным ключом
	 * @param {Object} i ключ
	 */
	has_key: function(i) {
		return (i in this._source);
	},

	/**
	 * Список всех ключей в коллекции
	 */
	keys: function() {
		var k = [];
		for(var i in this._source) k.push(i);
		return k;
	},


	add: function(item, i) {
		return this._widget.children.add(item, i, this._type);
	},


	first: function() {
		return this._source[0];
	},


	last: function() {
		return this._source[src.length-1];
	}


});




/**
 * Коллекция элементов виджета
 *
 *
 * @class
 * @name Ergo.core.Items
 * @extends Ergo.core.Components
 *
 *
 */
Ergo.defineClass('Ergo.core.Items', /** @lends Ergo.core.Items.prototype */ {

	extends: 'Ergo.core.Components',

	_type: 'item',

	get _source() {
		var result = [];
		this._widget.children.src.forEach(function(c) { if(!('_key' in c)) result.push(c); });
		return result;
	},



	_factory: function(v) {
		return new Ergo.core.Items(this._widget);
	},


	last: function() {
		var src = this._source;
		return src[src.length-1];
	},

	count: function() {
		var src = this._source;
		return src.length;
	},

	removeAll: function() {
		var src = this._source;
		for(var i = 0; i < src.length; i++)
			this.remove(src[i]);//_at(src[i]._index);
	},



	removeAt: function(i) {
		var removed = this._widget.children.removeIf(function(v) {	return v._index === i;	});

		return removed.length == 0 ? null : removed[0];
	},


	remove: function(item) {
		return this.removeAt(item._index);
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




/**
 * @lends Ergo.core.Widget.prototype
 */
Ergo.WidgetData = {


  /**
	 * Подключение данных к виджету
	 *
	 * Если опция autoBind = false, то связывание осуществлено не будет.
	 *
	 * @param {Object|Array|String} data подключаемые данные
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
			var src = this[name_a[0]];
			if(src == null) {
				throw new Error('Injecting data source ['+data+'] is undefined');
			}
			// if(src && !src.data) {
			// 	throw new Error('Injecting data source ['+data+'] has no property \"data\"');
			// }
			// src = src.data;
			if(name_a[1]) {
				var prop_a = name_a[1].split('.');
				while(prop_a.length) {
					if(src == null) {
						throw new Error('Injecting data source property ['+data+'] does not exist');
					}
					src = src[prop_a.shift()];
				}
			}
			// var src = (name_a.length == 1) ? this : this[name_a[0]];
			// var prop_a = name_a[1].split('.');
			// while(prop_a.length) {
			// 	src = src[prop_a.shift()];
			// }
			data = src;// src[name_a[1]];
		}


		// если определен параметр dataId, то источником данных будет дочерний элемент, если нет - то сам источник данных
		if(data_id) //'dataId' in o)
			this.__dta = (data instanceof Ergo.core.DataSource) ? data.entry(data_id) : new Ergo.core.DataSource(data, data_id);
		else
			this.__dta = (data instanceof Ergo.core.DataSource) ? data : new Ergo.core.DataSource(data);





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
				if(e.created || e.updated || e.deleted) {
					self._rebind(true, e);
				}
				else {
					self._rebind(false);
					self._dataChanged(false, false);  //FIXME это нужно делать параметрами _rebind
				}

			}, this);


			// this.data.events.on('value:sync', function(e){
			//
			// 	self._dataChanged();
			//
			// }, this);

			// для корректного порядка обновления
			this.data.events.on('dirty', function(e){
				self._dataChanged(false, false); // ленивое обновление данных без каскадирования
			}, this);

			// изменилось количество элементов данных или их содержимое
			this.data.events.on('diff', function(e) {

				self._rebind( false, {created: e.created, updated: e.updated, deleted: e.deleted} );

			}, this);



			// создаем вложенные элементы контейнера на основе источника данных

//			this.layout.immediateRebuild = false;

			this.children.filter(function(c){ return c._dynamic; }).applyAll('_destroy');

			var filter = o.dynamicFilter ? o.dynamicFilter.bind(this) : undefined;
			var sorter = o.dynamicSorter ? o.dynamicSorter.bind(this) : undefined;
			var pager = o.dynamicPager ? o.dynamicPager.bind(this) : undefined;


			this.data.stream(filter, sorter, pager, function(dataEntry, i){
//					self.items.add({}).bind(dataEntry, true, 2);
					self.children.autobinding = false;
					var item = self.items.add({});//{ 'data': dataEntry, 'autoUpdate': false });
					self.children.autobinding = false;

					item.bind(dataEntry, false, false);
//					item._pivot = false;
					item._dynamic = true;

//					item.el.attr('dynamic', true);
			});

			// this.layout.immediateRebuild = true;
			// this.layout.rebuild();


			filter = o.renderFilter ? o.renderFilter.bind(this) : undefined;
			sorter = o.renderSorter ? o.renderSorter.bind(this) : undefined;
			pager = o.renderPager ? o.renderPager.bind(this) : undefined;

			var prev = undefined;
			this.items.stream(filter, sorter, pager, function(item, i) {

				item.render(null, null, prev); //FIXME возможны проблемы с условной отрисовкой

				if(item._rendered) {
					prev = item;
				}

				// if(item._dynamic && !item._rendered && item.options.autoRender !== false) {
				// 	self.vdom.add(item, i);
				// }
			});

//			this._layoutChanged();

		}
		else {
			// STATIC BIND

			if(this._pivot || this.options.binding) {


				this.data.events.on('changed', function(e) {

					// при изменении значения обновляем виджет, но только в "ленивом" режиме
					/*if(o.updateOnDataChanged)*/
					//self._dataChanged(true);
					self._rebind();
				}, this);

				this.data.events.on('dirty', function(e) {
					self._dataChanged(false, false); // ленивое обновление данных без каскадирования
				}, this);

			}




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
		if(update !== false /*&& !this.data.fetch*/) {
			this._dataChanged();
		}



		if(this.data.fetch) {
			this.data.on('fetched', function() {
				this._layoutChanged();
			}.bind(this), this);
		}

		// подключаем события data:
//		this._bindNsEvents('data');

		this._bindEvents('data');


//		if( this.data.options.fetchable ) {

		// this.data.events.on('fetched', function(){
		// 	// ?
		// 	w._layoutChanged();
		// }, this);

		// если установлен параметр autoFetch, то у источника данных вызывается метод fetch()
		if(o.autoFetch)	this.data.fetch();//.then(function(){ self.events.fire('fetch'); });
//		}


//		this.events.fire('bound');
	},



	unbind: function() {
		//
		delete this._dta;
	},



	/**
	 *
	 * @protected
	 */
	_rebind: function(update, diff, initial) {

		var o = this.options;
		var self = this;


		if(!this.__dta) return;

		initial = initial || this;

//		console.log('rebind', this);

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

//			console.log('rebind (dynamic)');

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
				this.children.filter(function(c){ return c._dynamic; }).applyAll('_destroy');

	//			var t0 = Ergo.timestamp();

				var filter = o.dynamicFilter ? o.dynamicFilter.bind(this) : undefined;
				var sorter = o.dynamicSorter ? o.dynamicSorter.bind(this) : undefined;
				var pager = o.dynamicPager ? o.dynamicPager.bind(this) : undefined;


				this.data.stream(filter, sorter, pager, function(dataEntry, i) {
	//					self.items.add({}).bind(dataEntry, true, 2);
					self.children.autobinding = false;
					var item = self.items.add({});//{ 'data': dataEntry });
					self.children.autobinding = false;

					item.bind(dataEntry, undefined, false);
//					item._pivot = false;
					item._dynamic = true;
	//					item.el.attr('dynamic', true);
	//					item.dataPhase = 2;
	//				item.render();
				});

	//			var t1 = Ergo.timestamp();
	//			console.log(t1 - t0);

				// this.layout.immediateRebuild = true;
				// this.layout.rebuild();

	//			if(!Ergo.noDynamicRender)
//				this.render();


				// filter = o.renderFilter ? o.renderFilter.bind(this) : undefined;
				// sorter = o.renderSorter ? o.renderSorter.bind(this) : undefined;
				// pager = o.renderPager ? o.renderPager.bind(this) : undefined;
				//
				// this.items.each(function(item, i) {
				// 	if(item._dynamic && !item._rendered) {
				// 		item.render();
				// 	}
				// }, filter, sorter, pager);

				this.render();

			}

			// обновляем виджет (если это не запрещено в явном виде)
//			if(update !== false) this._dataChanged(true);

		}
		else {


//			console.log('rebind (static)', this._pivot);

			if(this.__c) {

				this.children.each(function(child){
	//				if(!child._pivot) child.rebind(false);
					// 1. rebind не вызывается у дочерних элементов со своим dataSource
					// 2. rebind не вызывается у дочерних элементов с общим dataSource
					//      (работает некорректно, если rebind вызывается не событием)

					// дочерний элемент не является опорным
					// дочерний элнмент не является динамическим, связанным с данными инициатора rebind
					// дочерний элемент не имеет биндинга
					if(!child._pivot && !(initial.data == child.data && child.options.dynamic) && (child.data != self.data || update === false || !child.options.binding)) {
						child._rebind(false, undefined, initial);
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

//		this.events.fire('refresh');//, e);

		// если отключено каскадирование, то обновление не производим
//		if(cascade && !this.options.cascading) return;

//		if(!this.options.autoBind /*|| this._lock_data_change*/) return;

		var binding = this.options.binding;

		if(binding && (('__dta' in this) || ('__val' in this))){ //FIXME неочевидная оптимизация

			if( typeof binding == 'string' ) {
				var a = binding.split(':');
				var action = $ergo.alias('actions:'+a[0]) || this[a[0]];
				if(action == null) {
					this._missedAction(binding, this.value);
				}
				else {
					action.call(this, a[1], this.value);
				}
//				this[binding] = this.value;
//				this.prop(binding, this.value);
			}
			else {
				if( binding.call(this, this.value) === false) return false;
//				if( binding.call(this, this.value) === false) return false;
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
//			this.children.applyAll('_dataChanged', [true]);

//		this.children.each(function(child) { child._dataChanged(); });

	},




	_dataDiff: function(created, deleted, updated) {

		var o = this.options;

		var filter = o.dynamicFilter ? o.dynamicFilter.bind(this) : null;
		var sorter = o.dynamicSorter ? o.dynamicSorter.bind(this) : null;
		var pager = o.dynamicPager ? o.dynamicPager.bind(this) : null;


		var rerender_a = [];
		var rerender_new_a = [];



//		console.log( 'Diff (create, delete, update)', created && created.length, deleted && deleted.length, updated && updated.length );

//		console.log(created, deleted, updated);

		var self = this;



		if(deleted) {
//			this.items.each(function(item) { console.log('k', item._index); });
			// DELETED
			for(var i = 0; i < deleted.length; i++) {
				var e = deleted[i];
				var item = this.item({data: e});
				if(item) {
					item._destroy();
				}
			}
//			this.items.each(function(item) { console.log('m', item._index); });
		}



		// this.items.each(function(item) {
		// 	var ok = false;
		// 	self.data.entries.each(function(entry) {
		// 		if( entry == item.data )
		// 			ok = true;
		// 	});
		// 	if(!ok)
		// 		console.warn('before create', item);
		// });



		if(created) {
			// CREATED
			for(var i = 0; i < created.length; i++) {
				var e = created[i];
				var index = e._id[0];
				var value = e._val();


				if(!filter || filter(e._val(), index)) {

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

//					item.render();
					rerender_new_a.push(item);


				}
			}
		}



		// this.items.each(function(item) {
		// 	var ok = false;
		// 	self.data.entries.each(function(entry) {
		// 		if( entry == item.data )
		// 			ok = true;
		// 	});
		// 	if(!ok)
		// 		console.warn('before update', item);
		// });



		if(updated) {
			// UPDATED

			var n_upd = 0;

			for(var i = 0; i < updated.length; i++) {


				var e = updated[i];
				var _item = this.item({data: e});
				var index = e._id[0];
				var value = e._val();



				if(filter) {
					if( !filter(value, index) ) {
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

					rerender_new_a.push( _item );
					// if(!sorter) {
					// 	rerender_a.push( _item );
					// }
					// else {
//						_item.render();
//					}

				}
				else {

//					console.log('relocate', _item._index, ' => ', index, ' of ', this.items.size());

					if(!sorter) {
						// FIXME
						if(index != _item._index+1) {
							n_upd++;
//							_item.unrender()
							this.items.remove(_item);
							this.items.add(_item, index);
//							_item.render()

							rerender_a.push( _item );
						}
					}

				}





			}


//			console.log('обновлений позиции', n_upd);
		}



		//
		// [id0, val0, index, item]
		//





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


			$ergo.fixDisorder(kv_a, function(i, j) {

				var _item = this.items.get(i);

				//TODO нужно оптимизировать с помощью функции items.move()
				this.items.remove(_item);
				this.items.add(_item, j);

				rerender_a.push( _item );

			}.bind(this));


/*
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
//				_item.unrender()
				this.items.remove(_item);
				this.items.add(_item, _j);
//				_item.render()

				rerender_a.push( _item );


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
*/

//			console.log( 'итераций', n );

			// console.log( 'measures', measure_a );
			// console.log( 'offsets', offset_a );




		}


		this.events.fire('diff', {created: rerender_new_a, updated: rerender_a});


	}




	// is_bound: function() {
	// 	return (this.data != null);
	// },




};




/**
 * @lends Ergo.core.Widget.prototype
 */
Ergo.WidgetRender = {




	/**
	 * Подключение VDOM к виджету
	 *
	 * Если опция autoBind = false, то связывание осуществлено не будет.
	 *
	 * @param {Object|Array|String} data подключаемые данные
	 */
	_bindVDOM: function() {

		var o = this.options;

		if(o.layout) {
			if(typeof o.layout === 'string') {
				var clazz = $ergo.alias(o.layout) || $ergo.alias('layouts:'+o.layout);
				if(!clazz) {
					throw new Error('Unknown layout ['+o.layout+']');
				}
				this.__vdom = new (clazz)(o.tag, this, null, o.tagNS);
			}
			else if( o.layout.constructor === Object ) {
				var name = o.layout.etype || 'default';
				this.__vdom = new ($ergo.alias('layouts:'+name))(o.tag, this, o.layout, o.tagNS);
//				this.__vdom = new Ergo.core.Layout(o.tag, this, o.layout);
			}
			else if( o.layout.constructor === Function ) {
				this.__vdom = o.layout.call(this, o.tag, null, o.tagNS);
			}
			else {
				console.error('Can not create vdom for layout ['+o.layout+']');
			}
//		 this.__vdom = (o.layoutFactory || this.layoutFactory)(layout);
		}
		else {
		 this.__vdom = new Ergo.core.Layout(o.tag, this, null, o.tagNS);
		}

//		this.__vdom.attach(this);//this.layout.options._widget || this);


		if( o.dynamic ) {
			this.events.on('diff', function(e) {
				// перестраиваем компоновку
				this._rerender(false, {created: e.created, deleted: e.deleted, updated: e.updated});
			}.bind(this));
		}

	},




	/**
	 * Отрисовка виджета
	 *
	 * @param {DOMElement|String} target целевой объект отрисовки
	 * @param {true|false} cascade каскадное обновление компоновки
	 * @param {Ergo.core.Widget} beforeItem элемент, после которого будет добавлен виджет
	 *
	 */
	render: function(target, cascade, beforeItem) {

//		console.log('render');

//    var el = this.el;

		// нет дочерних элементов и non-empty не рисуем
		if( this.options.autoRender == 'non-empty' && !this.__txt && (!this.__c || this.__c.src.length == 0) ) {
			return;
		}


		// есть дочерние элементы и виджет явно не управляетя данными
		if( this.__c) {

			var self = this;
			var o = this.options;
			var filter = o.renderFilter ? o.renderFilter.bind(this) : null;
			var sorter = o.renderSorter ? o.renderSorter.bind(this) : null;
			var pager = o.renderPager ? o.renderPager.bind(this) : null;


			// сначала добавляем все неотрисованные элементы в DOM
			var prev = null;
			this.__c.stream(filter, sorter, pager, function(child, i) {

				// // динамические элемены не рисуем
				// if(item._dynamic && item.data) {
				// 	return;
				// }

//				if(!item._rendered && item.options.autoRender !== false && !(item.options.autoRender == 'non-empty' && item.children.src.length == 0 && !item.options.text)) {  // options.text?
				if(!child._rendered) {
					child.render(null, false, prev);
				}

				if(child._rendered) {
					prev = child;
				}


					// if( self.__c.src.length == 1 && item._type != 'item' ) {
					// 	item.el._weight = item._weight;
			    //   self.el.appendChild(item.el);
					// 	item._rendered = true;
					// }
					// else {
					// 	item._type == 'item' ? self.layout.add(item, item._index) : self.layout.add(item);
					// }
//				}

//				item.render(false);

	    });

			// this.__c.src.forEach(function(item) {
			// });
		}
		// нет дочерних элементов
		else {

		}



		if( this.parent && target == null ) {//} && (target == null || (this.options.autoRender == 'non-empty' && (!this.__c || !this.__c.src.length == 0 || this.options.text))) ) {

			if(!this._rendered && this.options.autoRender !== false) {
				// if( this.parent.__c.src.length == 1 && this._type != 'item' ) {
				// 	this.dom.el._weight = this._weight;
				// 	this.parent.dom.el.appendChild(this.dom.el);
				// 	this._rendered = true;
				// }
				// else {

				if(beforeItem && beforeItem.options.weight == this.options.weight) {
					this.parent.vdom.addAfter(this, beforeItem, this.options.weight);
				}
				else {
					this.parent.vdom.addAfter(this, undefined, this.options.weight);
				}

				// if(forcedIndex != null) {
				// 	this._type == 'item' ? this.parent.vdom.add(this, forcedIndex) : this.parent.vdom.add(this);
				// }
				// else {
				// 	this._type == 'item' ? this.parent.vdom.add(this, this._index) : this.parent.vdom.add(this);
				// }

//				}
			}

		}
		else if(target) {
			if( target.constructor === String ) {
				if(target[0] == '#') {
					target = document.getElementById(target.substr(1));
				}
				else if(target[0] == '.') {
					target = document.getElementsByClassName(target.substr(1))[0];
				}
				else {
					target = document.getElementsByTagName(target)[0];
				}
			}
			if(target) {
				target.appendChild(this.vdom.outerEl);
				this._rendered = true;
			}
		}


		// обновляем компоновку
//		if(cascade !== false) {
			this._layoutChanged(cascade);
//		}


		if( this.options.showOnRender || this.options.renderEffects ) {
			this.show();
		}


  },




	/**
	 * Удаление виджета из VDOM/компоновки
	 *
	 */
	unrender: function() {

		this._rendered = false;

		var callback = function() {
			if(this.parent) {
				this.parent.vdom.remove(this);
			}
			else {
				this.__vdom.detach();
			}
		};


		if( this.options.hideOnUnrender || this.options.renderEffects ) {
			this.hide().then(callback.bind(this));
		}
		else {
			callback.call(this);
		}

//		return $.when( /*(this.options.hideOnUnrender || this.options.renderEffects) ? this.hide() :*/ true )
//			.then(function() {
//			}.bind(this));
	},




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


/*
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





		if(cascade !== false)
			this._layoutChanged();


		return $.when( (this.options.showOnRender || this.options.renderEffects) ? this.show() : true );
	},
*/


	/**
	 * Удаление виджета из DOM-дерева
	 *
	 */


/*
	unrender: function() {

		this._rendered = false;

		return $.when( (this.options.hideOnUnrender || this.options.renderEffects) ? this.hide() : true )
			.then(function() {
				if(this.parent && this.parent.__l) {
					this.parent.layout.remove(this);
				}
				else {
					this.el.detach();
				}
			}.bind(this));

	},
*/



	/**
	 * Перерисовка виджета
	 *
	 *
	 *
	 * @protected
	 *
	 */
	_rerender: function(cascade, diff) {

		var w = this;
		var o = this.options;

		// если .children не проинициализирован, значит перерисовывать нечего
		if(!this.__c) return;



		// обработка `non-empty`
		if( this._rendered ) {
			if( this.options.autoRender !== true && (this.options.autoRender == 'non-empty' && this.__c.src.length == 0 && !this.__txt) ) {
				this.unrender();
//				w.layout.remove( this );
			}
		}
		else if( this.parent ) {
			if( this.options.autoRender !== false && !(this.options.autoRender == 'non-empty' && this.__c.src.length == 0 && !this.__txt) ) {
				this.render();
//				this._type == 'item' ? this.parent.layout.add(this, this._index /*item._index*/) : this.parent.layout.add(this, undefined, this._weight);
			}
		}


		if(diff) {

			// Частичная перерисовка

			this._renderDiff(diff.created, diff.deleted, diff.updated);


		}
		else {

			var filter = o.renderFilter ? o.renderFilter.bind(this) : null;
			var sorter = o.renderSorter ? o.renderSorter.bind(this) : null;
			var pager = o.renderPager ? o.renderPager.bind(this) : null;

			// Полная перерисовка

//			console.log('full rerender');

			// убираем из DOM-дерева все элементы
			this.__c.each(function(child){
				if(child._rendered)
					child.unrender();
			});


			// добавляем в DOM-дерево элементы
			var prev = undefined;
			this.__c.stream(filter, sorter, pager, function(child, i) {

				if(!child._rendered && child.options.autoRender !== false) {
					child.render(null, false, prev);
//					this.vdom.addAfter(child, prev, child.options.weight);
//					child._type == 'item' ? this.vdom.add(child, i) : this.vdom.add(child);
//					item.render();
				}

				if(child._rendered) {
					prev = child;
				}

				// if(!item._rendered && item.options.autoRender !== false && !(item.options.autoRender == 'non-empty' && item.__c.src.length == 0 && !item.options.text)) {
				//
				// 	item._type == 'item' ? w.layout.add(item, i /*item._index*/) : w.layout.add(item, undefined, i);
				//
				// }
			});

		}


		// обновляем компоновку
//		if(cascade !== false) {
			this._layoutChanged(cascade);
//		}

	},





  /**
	 * Обработчик обновления компоновки (vdom)
	 *
	 * @protected
	 */
	_layoutChanged: function(cascade) {

//		if(this.options.autoHeight || this.options.autoWidth || this.options.autoFit) {
//			console.log(this.el);
		this.vdom.update();

		if(this.options.rendering) {
			this.options.rendering.call(this);
		}
//		}
		//FIXME возможно следует поменять эту строку на fire('layoutChanged')
//		if(this.layout.options.updateMode == 'auto') this.layout.update();

		if(cascade !== false && this.__c && !(this.data && this.options.dynamic)) {
			this.__c.applyAll('_layoutChanged');
		}

//		this.events.fire('layoutChanged');
	},




	/**
	 * Обработчик обновления компоновки на основе diff
	 *
	 * @protected
	 */
	_renderDiff: function(created, deleted, updated) {

//		console.log('render diff', arguments);

		var o = this.options;

		var filter = o.renderFilter ? o.renderFilter.bind(this) : null;
		var sorter = o.renderSorter ? o.renderSorter.bind(this) : null;
		var pager = o.renderPager ? o.renderPager.bind(this) : null;

		var self = this;

		var vdom = this.vdom;




		if(created) {
			for(var i = 0; i < created.length; i++) {
				var item = created[i];
				var index = item._index;

				if(filter) {
					if( !filter(item, item._index) ) {
						// если элемент не прошел фильтр, то не будем его добавлять в vdom
						continue;
					}

				}


				item.render();  //FIXME куда рендерим?

//				console.log('create', item.text, item._index, item.vdom.outerEl._pos);

			}
		}




		var kv_a = [];
//		var prev = undefined;
		this.items.each(function(item, i) {
			// добавляем только отфильтрованные отрисованные элементы
			if(item._rendered && (!filter || filter(item, item._index))) {
				kv_a.push( [item._index, item, item.vdom.el._pos, item.vdom] );
//				prev = item;
			}
		});


		if(sorter) {
			// Sorting KV-array
			kv_a.sort(sorter);
		}


		// console.log('disorder', kv_a);
		// var texts = [];
		// for(var i = 0; i < this.vdom.innerEl.childNodes.length; i++) {
		// 	texts.push(this.vdom.innerEl.childNodes[i].textContent);
		// }
		// console.log('text', texts);


		$ergo.fixDisorder(kv_a, function(i, j, kv_i, kv_j) {

			var item_i = this.vdom.at(i)._vdom._widget;
			var item_j = this.vdom.at(j)._vdom._widget;

//			var _item = this.items.get(i);

//			console.log('move', i, j, item_i, item_j);//kv_i[1].text, kv_j[1].text, i, j, kv_i[1].vdom.outerEl._pos, kv_j[1].vdom.outerEl._pos);

			//TODO нужно оптимизировать с помощью функции items.move()
			vdom.remove(item_i);
//			vdom.add(_item, j);
			if(i < j) {
				vdom.addAfter(item_i, item_j, item_i.options.weight);
			}
			else {
				vdom.addBefore(item_i, item_j, item_i.options.weight);
			}

		}.bind(this));





/*
		if(deleted) {

		}



		if(created) {
			for(var i = 0; i < created.length; i++) {
				var item = created[i];
				var index = item._index;

				if(filter) {
					if( !filter(item, item._index) ) {
						// если элемент не прошел фильтр, то не будем его добавлять в vdom
						continue;
					}

				}

				// // при наличии сортировки индекс виджета не важен
				// if(sorter) {
				// 	index = null;
				// }

//				vdom.render(item);
				item.render();  //FIXME куда рендерим?

			}
		}


		if(updated) {

			for(var i = 0; i < updated.length; i++) {
				var item = updated[i];

				if(filter) {
					if( !filter(item, item._index) ) {
						// если элемент не прошел фильтр и отрисован, то убираем его из VDOM
						if(item._rendered) {
							vdom.remove(item);
						}
						continue;
					}
				}


				// если элемент не отрисован рисуем его в позицию item._index
				if(!item._rendered) {
					vdom.add(item, item._index);
				}
				// если есть sorter, то обновлять отрисованный элемент нет смысла
				else if(!sorter){
					// MOVE
					vdom.remove(item);
					vdom.add(item, item._index);
				}

			}

		}



		if(sorter) {

			var kv_a = [];
			this.items.each(function(item, i) {
				// добавляем только отрисованные элементы
				if(item._rendered) {
					kv_a.push( [item._index, item, item.dom.el._pos, item.dom] );
				}
			});


			// Sorting KV-array
			kv_a.sort(sorter);


			$ergo.fixDisorder(kv_a, function(i, j) {

				var _item = this.items.get(i);

				//TODO нужно оптимизировать с помощью функции items.move()
				vdom.remove(_item);
				vdom.add(_item, j);

			}.bind(this));


		}
*/

	}







};



Ergo.alias('mixins:jquery', {

  get el() {
    return $(this.vdom.el);
  },


  get jquery() {
    if(!this.__jq) {
      var self = this;

      this.__jq = {
        events: {
          on: function(name, callback) {
            self.el.on(name, callback.bind(self));
          }
        },

        get el() {
          return self.el;
        }
      }

      this._bindEvents('jquery');
    }

    return this.__jq;
  },


  set width(v) { this.el.outerWidth(v); },
	set height(v) { this.el.outerHeight(v); },

  get width() {	return this.el.outerWidth();	},
	get height() { return this.el.outerHeight();	},


  // $render: function(target) {
  //   return target ? this.render($(target)[0]) : this.render();
  // },

  /**
	 * Отображение виджета
	 *
	 * В том случае, если он уже включен в DOM-дерево
	 */
	show: function(wrapperAware) {
		return $.when( (wrapperAware !== false) ? $(this.vdom.outerEl).show() : this.el.show() );
	},


	/**
	 * Скрытие виджета
	 *
	 * В том случае, если он уже включен в DOM-дерево
	 */
	hide: function(wrapperAware) {
		return $.when( (wrapperAware !== false) ? $(this.vdom.outerEl).hide() : this.el.hide() );
	}






});
















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
 * @param {string} o.tag html-тег виджета
 * @param {object} o.components хэш компонентов
 * @param {object} o.defaultComponent опции компонента по умолчанию
 * @param {function} o.componentFactory фабрика компонентов
 * @param {array} o.items массив элементов
 * @param {object} o.defaultItem опции элемента по умолчанию
 * @param {function} o.itemFactory фабрика элементов
 * @param {boolean} o.dynamic флаг динамического связывания
 * @param {string} o.dataId ключ в источнике данных
 * @param {object} o.events хэш событий
 * @param {object} o.states хэш состояний
 * @param {object} o.transitions хэш переходов между состояниями
 * @param {string} o.stt предустановленное состояние
 * @param {function} o.rendering обработчик перерисовки
 * @param {string} o.renderTo селектор родительского элемента
 * @param {boolean} o.showOnRender вызов метода show при создании
 * @param {boolean} o.hideOnDestroy вызов метода hide при удалении
 * @param {string|function} o.binding обработчик связывания данных с виджетом
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
 * @property {object} options Опции
 * @property {Ergo.core.VDOM} vdom Узел виртуального DOM
 * @property {jQuery} el
 * @property {Ergo.core.DataSource} data Связанный источник данных
 * @property {Ergo.core.Observer} events Обработчик событий
 * @property {Ergo.core.StateManager} states Обработчик состояний
 * @property {Ergo.core.Items} items Элементы
 * @property {Ergo.core.Components} components Компоненты
 * @property {any} name Служебное имя/индекс/ключ
 * @property {any} value Значение
 * @property {Ergo.core.Widget} parent Родительский виджет
 *
 *
 */
Ergo.defineClass('Ergo.core.Widget', /** @lends Ergo.core.Widget.prototype */{

	extends: 'Ergo.core.Object',

	mixins: ['observable', 'statable'],

	defaults: {
	},



	/**
	 * Уничтожение виджета
	 *
	 * Удаляются связи в виртуальном дереве виджетов, отключается связь с данными,
	 * удаляется элемент из DOM-дерева, уничтожаются все дочерние виджеты.
	 *
	 * @protected
	 */
	_destroy: function(root) {
		Ergo.core.Widget.superclass._destroy.call(this);

		var self = this;


		this.events.fire('beforeDestroy');

		// if(this.options.hideOnDestroy && !noHide) {
			// return this.hide().then(function() { self._destroy(true); });
		// }
		// else {

		var destroy = function(){

			if(this.data)
				this.data.events.off(this);

			// очищаем регистрацию обработчиков событий
			if(this.context) {
				this.context.events.off(this);
			}

			if(this.scope) {
				this.scope.events.off(this); //FIXME события могут быть прикреплены не только к скоупуs
			}

			// очищаем регистрацию обработчиков событий
			this.events.off();

			if(this.__c) {

				// удаление в обратном порядке быстрее
				for(var i = this.__c.src.length-1; i >=0 ; i--) {
					this.__c.src[i]._destroy(false);
				}

			}

//			if(!eventsOnly) {

			// удаляем элемент и все его содержимое (data + event handlers) из документа
			if(this.parent && root !== false)
				this.parent.children.remove(this);

			if(this.__c) {

				this.children.removeAll();

				// очищаем компоновку
//				this.layout.clear();  //?
			}

			if(this.__vdom) {
//				this.__vdom.clear();
				this.__vdom._destroy();
//				$ergo.dom.remove(this.el);
//				this.el.remove();
			}

//			}


			// вызываем метод _destroy для всех дочерних компонентов
			// while( !this.children.isEmpty() ) {
			// 	this.children.first()._destroy(true);
			// }

//			this.children.applyAll('_destroy');

			this._destroyed = true;

		};

		if( root !== false ) {
			this.unrender()
			destroy.call(this);
			//			this.unrender().then( destroy.bind(this) );
		}
		else {
			destroy.call(this);
		}

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
	_preConstruct: function(o) {
		Ergo.core.Widget.superclass._preConstruct.call(this, o);
//		this._super(o);



		var self = this;


		// "сахарное" определение компонентов
		for(var i in o) {
			if(i[0] == '$') {
				var key_a = i.split('__');
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

				$ergo.mergeOptions(o, overrides);
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






/*
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
*/

		var _widget = this;

//		if(o.layout) {
//		this.layout = o.layout;
//		}







		// if(o.tag)
		// 	this.layout;

		// if('layout' in o) {
		// 	this.layout;
		// }

		//FIXME это нужно перенести в vdom


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




		this._bindEvents();

		this._bindStates();




		if('style' in o) {
			this.vdom.setStyle(o.style);
		}

		if('cls' in o) {
			this.vdom.setClass(o.cls);
		}

		if('css' in o) {
			this.vdom.setStyle(o.css);
		}

		if('stt' in o) {
			var stt = o.stt;
			if(Array.isArray(stt)) {
				stt = stt.join(' ');
			}
			stt.split(' ').forEach(function(s) {
				self.states.set(s);
			});
		}






	},




	/**
	 * Фаза постконструирования виджета:
	 * 1. рендеринг (renderTo)
	 * 2. подключение данных (data)
	 * 3. установка состояний (state)
	 *
	 * @protected
	 */
	_postConstruct: function(o) {
//		this._super(o);
		Ergo.core.Widget.superclass._postConstruct.call(this, o);




		if('as' in o) {
      var as = o.as.join(' ').split(' ');

			for(var i = 0; i < as.length; i++) {
				if(as[i][0] == '+' || as[i][0] == '&')
					this.states.set(as[i].substr(1));
				else if(as[i][0] == '-' || as[i][0] == '!')
					this.states.unset(as[i].substr(1));
				else {
//					this.dom.el.classList.add(as[i]);
					this.vdom.addClass(as[i]);
				}
			}

      // for(var i = 0; i < clsList.length; i++) {
      //   this.dom.addClass(clsList[i]);
      // }
    }


//		console.log(this.events.events);

		if(Ergo._scope) {
			this.scope = Ergo._scope;
		}


		if('renderTo' in o) {
			this.render(o.renderTo);
		}


		if('data' in o) {
			this.data = o.data;
		}




		if(this.__evt) {

			if(this.events.events['click']) {
				this.vdom.events.on('click', function(e) { this.events.fire('click', {}, e); });
			}

			if(this.events.events['doubleClick']) {
				this.vdom.events.on('dblclick', function(e) { this.events.fire('doubleClick', {}, e); });
			}

			this.events.fire('afterConstruct');
		}


		// this.events.rise = Ergo.rise;
		// this.events.sink = Ergo.sink;

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
	 * @deprecated
	 */
	action: function(v, event, eventType) {

		v = v || this.opt('name');
		// if(arguments.length == 1) {
		// 	e = v;
		// 	v = this.opt('name');
		// }

		// if( v == null /*|| $.isNumeric(v)*/ )
		// 	throw new Error('Invalid action name ['+v+"]");

		this.rise(''+v, {}, event);

		if(eventType != v && event.stop)
			event.stop();
	},














// 	filter: function(type, criteria) {
//
// 		if(type == 'render') {
// //			if(criteria)
// 			this.options.renderFilter = criteria;
// 			this._rerender();
// 		}
//
// 		if(type == 'compose') {
// 			if(this.options.dynamic) {
// //				if(criteria)
// 				this.options.dynamicFilter = criteria;
// 				this._rebind();
// 			}
// 		}
//
// 	},




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







	//---------------------------------------------
	// Методы работы с подсоединенными данными
	//---------------------------------------------



	get children() {
		if(!this.__c) {
			this.__c = new Ergo.core.Children(this);
		}
		return this.__c;
	},

	get components() {
		if(!this.__cmp) {
			this.__cmp = new Ergo.core.Components(this, {type: 'component'});
		}
		return this.__cmp;
	},

	get items() {
		if(!this.__itm) {
			this.__itm = new Ergo.core.Items(this, {type: 'item'});
		}
		return this.__itm;
	},

	get data() {
		return this.__dta;
	},

	set data(v) {
		if(v != null) {
			this.bind(v);
		}
		else {
//			this._unbindEvents('data');
			this.unbind();
		}
	},


	get vdom() {
		if(!this.__vdom) {
			this._bindVDOM();
			this._bindEvents('vdom');
		}
		return this.__vdom;
	},


	get scope() {
		if(!this.__scp && this.parent) {
			this.__scp = this.parent.scope;
		}
		return this.__scp;
	},

	set scope(v) {
		if(v != null) {
			this.__scp = v;
			this._bindEvents('scope');
		}
		else if(this.__scp) {
			this.__scp.off(this);
			delete this.__scp;
		}

	},

	get context() {
//		return $context || Ergo.context;
		//TODO возможен случай когда контекст отличается
		if(!this.__ctx) {
			this.__ctx = $context || Ergo.context;
//			this.__ctx = (this.scope) ? this.scope._context : Ergo.context;
			this._bindEvents('context');
		}
		return this.__ctx;
	},


	// get dom() {
	// 	var el = this.el;
	// 	if(!this.__dom) {
	// 		this.__dom = {
	// 			events: {
	// 				on: function(name, callback) {
	// 					el.addEventListener(name, callback);
	// 				}
	// 			}
	// 		}
	// 	}
	// 	return this.__dom;
	// },


	// get layout() {
	// 	if(!this.__l) {
	// 		var o = this.options;
	// 		if(o.layout) {
 // 			 this.__l = (o.layoutFactory || this.layoutFactory)(o.layout);
	// 		}
	// 		else {
	// 		 this.__l = new Ergo.core.Layout();
	// 		}
	//
 // 			this.__l.attach(this);//this.layout.options._widget || this);
	//
	// 		if( o.dynamic ) {
	// 			this.events.on('diff', function(e) {
	// 				// перестраиваем компоновку
	// 				this._rerender(false, {created: e.created, deleted: e.deleted, updated: e.updated});
	// 			}.bind(this));
	// 		}
	//
	// 	}
	// 	return this.__l;
	// },


	get name() {
		return this._name || this._key || this._index;
	},

	set name(v) {
		this._name = v;
	},



	// set format(v) {
	// 	this.__fmt = (typeof v == 'string') ? $ergo.format_obj.curry(v) : v;
	// },
	//
	// get format() {
	// 	return this.__fmt;
	// },
	//
	// set unformat(v) {
	// 	this.__ufmt = (typeof v == 'string') ? $ergo.unformat_obj.curry(v) : v;
	// },
	//
	// get unformat() {
	// 	return this.__ufmt;
	// },

	get value() {
		var val;
		var o = this.options;

		if(this.data)
			val = this.data.get();
//		else if('__val' in this)
		else
			val = this.__val;
		// else
		// 	val = this.opt('text');

//			val = (o.value) ? o.value.call(this) : this.opt('text');

		// если присутствует функция форматирования, то используем ее
		var fmt = this._format || this.options.format;
		if(fmt) {
			if(typeof fmt == 'string') {
				var m = fmt.match(/^#{([^}{]+?)}$/);
				if( m ) {
					val = $ergo.formatValue.call(this, m[1], val);
				}
				else {
					val = $ergo.format_obj.call(this, fmt, val);
				}
			}
			else {
				val = fmt.call(this, val);
			}
//			val = (typeof fmt == 'string') ? $ergo.format_obj.call(this, fmt, val) : fmt.call(this, val);// this.__fmt.call(this, val);
		}

		return val;
	},




	set value(val) {

//		if(this._lock_value_change) return;

		var o = this.options;

		// deprecated
//		if(o.store)
//			val = o.store.call(this, val);

		var ufmt = this._unformat || this.options.unformat;
		if(ufmt) {
			val = (typeof ufmt == 'string') ? $ergo.unformat_obj.call(this, ufmt, val) : ufmt.call(this, val);//this.__ufmt.call(this, val);
		}

		if(this.data) {

			// связывание будет обновлено автоматически
			this.data.set(val);

		}
		else {
			this.__val = val;
			// а здесь связывание нужно обновить
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





	prop: function(i, v, defaultValue) {

		if(arguments.length == 1 || arguments.length == 3) {

			if( this.options.get && (i in this.options.get) ) {
				return this.options.get[i].bind(this)(i);
			}
			else if( (i in this.props) && this.props[i].get ) {
				return this.props[i].get.bind(this)(i);
			}
			else if( i in this.props.get ) {
				return this.props.get[i].bind(this)(i);
			}
			else if( (i in this) && $ergo.hasGetter(this, i) ) {
				return this[i];
			}
			else if((this.__stt) && (i in this.__stt._states)) {
				return this.states.is(i);
			}

			return defaultValue;
		}
		else if(arguments.length == 2) {

			if( this.options.set && (i in this.options.set) ) {
				this.options.set[i].bind(this)(v, i);
			}
			else if( (i in this.props) && this.props[i].set ) {
				this.props[i].set.bind(this)(v, i);
			}
			else if( (i in this.props.set) ) {
				this.props.set[i].bind(this)(v, i);
			}
			else if( (i in this) && $ergo.hasSetter(this, i) ) {
				this[i] = v;
			}
			else if(i in this.states._states) {
				this.states.toggle(i, v);
			}
			//FIXME
			else if(i in this.states._groups) {
				this.states.set(v);
			}
			// else {
			// 	console.warn('Property ['+i+'] not found');
			// }

			return this;
		}

	},






	//  _opt: function(o) {
	//
 // 		for(var i in o) {
 // 			if( !(i in $ergo.rules) ) {
 // 				if( (i in this) && $ergo.setter(this, i) ) {
 // 					this[i] = o[i];
 // 				}
	// 			else if(i in this.states._states) {
	// 				this.states.toggle(i, o[i]);
	// 			}
	// 			else if(i in this.states._exclusives) {
	// 				this.states.set(o[i]);
	// 			}
 // 			}
 // 		}
	//
 // 	},



/*
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
*/


	/**
	 *
	 */
	layoutFactory: function(layout) {
		if( $.isString(layout) )
			layout = $.ergo({etype: layout}, 'layouts');
		else if(!(layout instanceof Ergo.core.Layout))
			layout = $.ergo(Ergo.merge({etype: 'default'}, layout), 'layouts');
		return layout;
	},




	/**
	 * "Всплытие" события по дереву виджетов
	 *
	 * @see {@link Ergo.core.Observer#fire}
	 */
	rise: function(name, e, baseEvent) {
		if(!e) e = {};
		e.target = e.target || this;
		e = this.events.fire(name, e, baseEvent);
		if(this.parent && !e.stopped) {
			this.parent.rise(name, e);
		}
	},


	/**
	 * "Погружение" события по дереву виджетов
	 *
	 * @see {@link Ergo.core.Observer#fire}
	 */
	sink: function(name, e, baseEvent) {
		if(!e) e = {};
		e.target = e.target || this;
		e = this.events.fire(name, e, baseEvent);
		if(!e.stopped) {
			this.children.each(function(child){
				child.sink(name, e);
			});
		}
	},




	/**
	 * Обработчик "потерянного" состояния
	 *
	 * Устанавливает класс `vdom`
	 */
	_missedState: function(name, on, data) {
		on ? this.vdom.addClass(name) : this.vdom.removeClass(name);
	},



	// _missedAction: function(name, on, data) {
	// 	on ? this.vdom.addClass(name) : this.vdom.removeClass(name);
	// }








/*
	get __skeleton() {

		var s = {
			components: [],
			items: [],
			states: [],
			events: [],
			options: {}
		};



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
			__skeleton: true,
			include: true,
			children: true
		};

		// simple options
		for(var i in this.options) {
			if( !(i in exclusions) && !/on\S/.test(i) ) {
				s.options[i] = ['get', 'set'];
			}
		}

		// get/set options
		if( this.options.get ) {
			for(var i in get) {
				if( !(i in s.options) ) {
					s.options[i] = ['get'];
				}
			}
		}
		if( this.options.set ) {
			for(var i in set) {
				if( !(i in s.options) ) {
					s.options[i].push('set');
				}
			}
		}

		// state options
		for(var i in this.states._states) {
			s.options[i] = ['get', 'set'];
		}
		for(var i in this.states._exclusives) {
			s.options[i] = ['get', 'set'];
		}

		// property options
		var w = this;
		while(w) {
			for(var i in w) {
				var desc = Object.getOwnPropertyDescriptor(w, i);
				if(desc && !(i in exclusions)) {
					if(desc.get) {
						s.options[i] = s.options[i] ? s.options[i].concat('get') : ['get'];
					}
					if(desc.set) {
						s.options[i] = s.options[i] ? s.options[i].concat('set') : ['set'];
					}
				}
			}
			w = w.constructor.superclass;
		}


		this.components.each(function(c, i) {
			s.components.push(i);
		})


		s.states = Object.keys(this.states._states);

		s.events = Object.keys(this.events.events);

		return s;
	}
*/




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




//Ergo.merge(Ergo.core.Widget.prototype, Ergo.alias('mixins:observable'));

//Ergo.merge(Ergo.core.Widget.prototype, Ergo.alias('mixins:statable'));

//Ergo.merge(Ergo.core.Widget.prototype, Ergo.WidgetOptions);

Ergo.deepMerge(Ergo.core.Widget.prototype, Ergo.WidgetProps);

Ergo.merge(Ergo.core.Widget.prototype, Ergo.WidgetData);

Ergo.merge(Ergo.core.Widget.prototype, Ergo.WidgetRender);

Ergo.merge(Ergo.core.Widget.prototype, Ergo.alias('mixins:jquery'));

/*
Ergo.merge(Ergo.core.Widget.prototype, Ergo.WidgetAttributes);

Ergo.merge(Ergo.core.Widget.prototype, Ergo.WidgetRender);
*/


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


$.ergo = $ergo;



$.fn.ergo = function(o) {
	if(this.length > 0){
		var widget = (this[0]._vdom) ? this[0]._vdom._widget : undefined;// this.data('ergo-widget');
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


Ergo.$widgets = $ergo.object.bind(this, 'widgets');


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
Ergo.defineClass('Ergo.core.Context', /** @lends Ergo.core.Context.prototype */{

	extends: 'Ergo.core.Object',

	defaults: {
//		plugins: [Ergo.Observable] //, Ergo.Statable]
		include: 'observable',

		events: {
			'restore': function(e) {
				//TODO здесь нужно указывать парметры по умолчанию
			}
		}

	},





	_construct: function(o) {
		this._super(o);


		this._scopes = {};
		this._callbacks = {};
		this._depends = {};
		this._data = {};
		this._params = {};

		this._widget = null;


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

		var ctx = this;


		this.scopes = {

			scope: function(name, callback) {

				if(arguments.length == 1) {
					if(name[0] == ':') {
						for(var i in ctx._scopes) {
							if(i.indexOf(name) > 0)
								return ctx._scopes[i];
						}
					}
					else {
						return ctx._scopes[name];
					}
				}
				else if(arguments.length == 2) {
					ctx._callbacks[name] = callback;
				}
				else {
					ctx._callbacks[name] = arguments[2];
					ctx._depends[name] = Array.isArray(arguments[1]) ? arguments[1] : [arguments[1]] ;
				}

			},


			get: function(name) {
				return ctx._scopes[i];
			}

		};





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
			// 		window.history.pushState( Ergo.merge({_scope: e.scope._name}, self._params), e.scope._name );//, 'title', '#'+url);
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



	get data() {
		return this._data;
	},


/*
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




	// param: function(key, v) {
	// 	if(arguments.length == 1)
	// 		return this._params[key];
	// 	else
	// 		this._params[key] = v;
	// },


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
*/

	// подсоединяем скоуп к контексту
	join: function(scope_name, params, widget) {

		var ctx = this;

		var parent = null;

		var chain = scope_name.split('.');

		console.log('scope chain', chain);

		if( chain.length > 1 ) {
			// инициализируем базовые скоупы
			parent = this._scopes[chain[chain.length-2]] || this.join( chain.splice(0,chain.length-1).join('.'), $ergo.merge(params || {}, {$prejoin: true}) );
		}

		scope_name = chain[chain.length-1];


		if(!this._callbacks[scope_name]) {
			throw new Error('Scope ['+scope_name+'] is not registered in context');
		}


		if( parent ) {
			// отсоединяем вложенные скоупы
			// FIXME считается, что они эксклюзивны по отношению к текущему
			for( var i in parent._children )
				this.disjoin( parent._children[i] );
		}


		var scope = this._scopes[scope_name];


		if( !scope ) {
			// var scope = this._scopes[scope_name];
			// ctx.events.fire('scope:rejoin', {scope: scope, params: scope._params});
			// scope.events.fire('rejoin');
			//
			// console.log('rejoin:'+scope_name);
			// return this._scopes[scope_name];


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


//		this._params[scope_name] = this._params[scope_name] || {};

			// создаем скоуп
			scope = new Ergo.core.Scope(widget);
			scope._context = this;
			scope._name = scope_name;
			scope._parent = parent;
	//		scope._container = container;

	//		Ergo.merge(scope, overrides);

			scope._chain = parent ? parent._chain.concat(scope_name) : [scope_name];



			if(parent)
				parent._children[scope_name] = scope;

			this._scopes[scope_name] = scope;

		}



		scope._params = params || {};// Ergo.merge(this._params[scope_name], params);// this._params[scope_name];


		var deferred = $.Deferred();

		scope._promise = deferred.promise();



	//		ctx.events.fire('scope:prejoin', {scope: scope, params: scope._params});
		ctx.events.fire('scope#join', {scope: scope, params: scope._params});
		scope.events.fire('join');


		var _scope = Ergo._scope;

		Ergo._scope = scope;

		// инициализируем скоуп
		var initPromise = this._callbacks[scope_name].call(this, scope, Ergo.merge({}, scope._params), scope._promise) || true;

		Ergo._scope = _scope;

		// загружаем данные скоупа?





		$.when(initPromise).done(function() {

			// встраиваем и рендерим виджеты
			scope.createWidgets();

			ctx.events.fire('scope#joined', {scope: scope, params: scope._params});
			scope.events.fire('joined');

			console.log('join:'+scope_name);

			scope._joined = true;

			try {
				deferred.resolve(scope, scope._params);
			}
			catch(err) {
				console.log(err);
			}
		});

		return scope;//._promise;
	},


	// отсоединяем скоуп от контекста
	disjoin: function(scope) {

		if( $.isString(scope) )
			scope = this._scopes[scope];


		scope.events.fire('disjoin', {scope: scope});
		this.events.fire('scope#disjoin', {scope: scope, params: scope._params});


		// отсоединяем вложенные скоупы
		for(var i in scope._children) {
			this.disjoin( scope._children[i] );
		}


		// удаляем виджеты скоупа (отсоединяем виджеты от скоупа)

		scope.destroyWidgets();


		// for(var i in scope.widgets) {
		//
		// 	var w = scope.widgets[i];
		//
		// 	console.log('destroy', i);
		//
		//
		// 	w._destroy();
		//
		// }


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

		var e = this.events.fire('restore', {name: null, params: {}});//, opts: {}});


		this.join( e.name, e.params );//, e.options );

//		var ctx = this;

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
	}


	// restore: function(name, p) {
	//
	// 	$context.join(name, p);
	//
	// // 	// обходим параметры
	// // 	for(var i in p) {
	// // 		for(var j in this._callbacks) {
	// // 			var s = ''+i+':'+p[i];
	// // 			if(i == j || s == j) {
	// // //				console.log('restore', i);
	// // 				$context.join(j);
	// // 			}
	// // 		}
	// // 	}
	//
	// }


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

Ergo.defineClass('Ergo.core.Scope', {

	extends: 'Ergo.core.Object',

	defaults: {
		include: 'observable'
	},


	_initialize: function(widget, o) {
		Ergo.core.Scope.superclass._initialize.call(this, o);

		this.widgets = {};

		this._children = {};
//		this.data = {};
		this._widget = widget;

	},


// 	_construct: function(o) {
// 		this._super(o);
//
//
// //		this.context = null;
// 	},



	addWidget: function(key, widget) {

		//
		if(widget.constructor === Object) {
			widget = $.ergo(widget);
		}

		this.widgets[key] = widget;
		widget.scope = this;

		return widget;
	},



	widget: function(k, w) {

		if(arguments.length == 1) {
			return this.widgets[k];
		}
		else {
			return this.addWidget(k, w);
		}

	},


	// removeWidget: function(key) {
	//
	// 	var w = this.widgets[key];
	//
	// 	//
	//
	// 	delete w.scope;
	// 	delete this.widgets[key];
	//
	// 	w._destroy();
	//
	// },



	createWidgets: function() {

		// рендерим виджеты скоупа (включаем виджеты в скоуп)
		for(var i in this.widgets) {

			var w = this.widgets[i];

			// ищем контейнер, куда можно присоединиться
			var container = null//this._widget;
			for(var scope = this._parent; scope && !container; scope = scope._parent) {
				container = scope._widget;
			}

			var container = container || this._context._widget;

			// если виджет не встроен и не отрисован
			if(!w.parent && !w._rendered) {
				// если у родителя определен контейнер, используем его
				container.components.set(i, w);
//				w.render();
			}

			container.render();
		}

	},



	destroyWidgets: function() {

		Object.keys(this.widgets).forEach(function(key) {

			var w = this.widgets[key];

			w._destroy();

			// w.unrender();
			//
			// w.parent.components.remove(key);

		}.bind(this));

	},




/*
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
			w.scope = this;
			this['$'+key] = w;

			return w;
		}

	},
*/

	disjoin: function() {

		//TODO здесь нужно удалить все виджеты скоупа

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
Ergo.defineClass('Ergo.data.Collection', /** @lends Ergo.data.Collection.prototype */{

	extends: 'Ergo.core.DataSource',

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
		var query = Ergo.merge({}, this.options.query, q);

		this.events.fire('fetch');

		var provider = this.options.provider;

		if( $.isString(provider) )
			provider = Ergo.alias('providers:'+provider);


		if(provider) {
			var self = this;
			return provider.findAll(this, query).then(function(data) {

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
				self.events.fire('fetched');

				return data;
			});
		}
		else {
			this._fetched = true;
			this.events.fire('fetched');
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
		var query = Ergo.merge({}, this.options.query, q);

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

		this.events.fire('flush');

		if( $.isString(provider) )
			provider = Ergo.alias('providers:'+provider);

		if(provider) {

			var data = composer.call(this, this.get(), 'update');

			return provider.update(this, data, this.options.query).then(function(data) {
				this.events.fire('flushed');
				return parser.call(this, data, 'update');
			}.bind(this));

		}
		else {
			this.events.fire('flushed');
		}

		return $.when(null);
	},




	drop: function(id) {

		this.events.fire('drop');

		if( $.isString(provider) )
			provider = Ergo.alias('providers:'+provider);

		if(provider) {

			return provider.delete(this, id)
				.done(function(data) {
					this.events.fire('dropped');
					return data;
				}.bind(this));

		}
		else {
			this.events.fire('dropped');
		}


		return $.when(null);
	},






	/**
	 * @deprecated
	 */
	// invoke: function(action) {
	//
	// 	var provider = this.options.provider;
	// 	var composer = this.options.composer || this._compose;
	//
	// 	if( $.isString(provider) )
	// 		provider = Ergo.alias('providers:'+provider);
	//
	// 	if(provider) {
	//
	// 		var data = composer.call(this, this.get(), action);
	//
	// 		return provider[action](this, this.options.query).then(function(data) {
	// 			// ?
	// 			return data;
	// 		});
	// 	}
	//
	// },







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
		if($.isFunction(model) && !$ergo.isClass(model)) model = model.call(this, this.get()[i]);
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
Ergo.defineClass('Ergo.data.Object', /** @lends Ergo.data.Object.prototype */{

	extends: 'Ergo.core.DataSource',

	defaults: {
		idKey: 'id',
		oidKey: 'id'
	},

	/**
	 * Определение полей объекта
	 */
	fields: {
	},



	_oid: function() {
		return this.get(this.options.idKey);
	},

	get oid() {
		return this.get(this.options.oidKey);
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

//		return this._super.apply(this, arguments);
		return Ergo.data.Object.superclass.set.apply(this, arguments);
	},


	/**
	 * Подгрузка данных
	 *
	 *
	 */
	fetch: function(id) {

		if(arguments.length == 0)
			id = this.oid;

//		this._fetched = true;
		var parser = this.options.parser || this._parse;
		var provider = this.options.provider;

		if( $.isString(provider) )
			provider = Ergo.alias('providers:'+provider);

		this.events.fire('fetch');

		if(provider) {
//			var self = this;
			return provider.find(this, id, this.options.query).then(function(data) {
				this.set( parser.call(this, data) );
				this._fetched = true;
				this.events.fire('fetched');
				return data;
			}.bind(this));
		}
		else {
			this._fetched = true;
			this.events.fire('fetched');
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

		var oid = this.oid;

		var composer = this.options.composer || this._compose;
		var parser = this.options.parser || this._parse;
		var provider = this.options.provider;

		this.events.fire('flush');

		if( $.isString(provider) )
			provider = Ergo.alias('providers:'+provider);

		if(provider) {

			// create
			if(oid == null) {

				var data = composer.call(this, this.get(), 'create');

				return provider.create(this, data, this.options.query)
					.done(function(data) {
						this.events.fire('flushed');
						return parser.call(this, data, 'create');
					}.bind(this));
			}
			// update
			else {

				var data = composer.call(this, this.get(), 'update');

				return provider.update(this, oid, data, this.options.query)
					.then(function(data) {
						this.events.fire('flushed');
						return parser.call(this, data, 'update');
					}.bind(this));
			}
		}
		else {
			this.events.fire('flushed');
		}

		return $.when(null);
	},


	_compose: function(v) {
		return v;
	},



	drop: function() {

		var oid = this.oid;

		this.events.fire('drop');

		if( $.isString(provider) )
			provider = Ergo.alias('providers:'+provider);

		if(provider) {

			return provider.delete(this, oid)
				.done(function(data) {
					this.events.fire('dropped');
					return data;
				}.bind(this));

		}
		else {
			this.events.fire('dropped');
		}


		return $.when(null);
	},





	// invoke: function(action) {
	//
	// 	var oid = this._oid();
	//
	// 	var provider = this.options.provider;
	// 	var composer = this.options.composer || this._compose;
	//
	// 	if( $.isString(provider) )
	// 		provider = Ergo.alias('providers:'+provider);
	//
	// 	if(provider) {
	//
	// 		var data = composer.call(this, this.get(), action);
	//
	// 		return provider[action](this, oid, data, this.options.query).then(function(data) {
	// 			// ?
	// 			return data;
	// 		});
	// 	}
	//
	// },




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
		if($.isFunction(obj) && !$ergo.isClass(obj))
			obj = obj.call(this, this.get()[i]);
		if($.isString(obj))
			obj = Ergo.alias(obj);// || obj); //TODO здесь лучше загружать класс по зарегистрированному имени
		obj = obj || Ergo.core.DataSource;

		o.provider = this.options.provider;

		return new obj(this, i, o);
	}

}, 'data:object');






Ergo.defineClass('Ergo.data.NodeList', {

	extends: 'Ergo.data.Collection',

	defaults: {
	},

	model: 'data:node',

	purge: function() {
		this.set([]);
		this._fetched = false;
	}

}, 'data:node-list');




Ergo.defineClass('Ergo.data.Node', {

	extends: 'Ergo.data.Object',

	defaults: {
	},

	fields: {
		'children': 'data:node-list'
	},


	fetch: function() {
		var d = this;
		d.events.fire('fetch');
		return d.entry('children').fetch( {id: d.oid} ).then(function(){ d._fetched = true; d.events.fire('fetched'); });
	},


	purge: function() {
		this.entry('children').purge();
		this._fetched = false;
	},


	get branch() {
		return this.get('children');
	}


}, 'data:node');




Ergo.defineClass('Ergo.data.PagedCollection', {

	extends: 'Ergo.data.Collection',

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
			return o.provider.get(this, Ergo.deepMerge({}, this.options.query, {from: o.from,	to: o.to}))
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



Ergo.defineClass('Ergo.data.AjaxProvider', {

	extends: 'Ergo.core.Object',

	defaults: {
		dataType: 'json'
	},


	_initialize: function(url, o) {
		this._super(o || {});

		this._url = url;
	},


	findAll: function(ds, query) {
		return $.ajax({
			url: this._url,
			data: query,
			dataType: this.options.dataType
		});
	}


}, 'data:ajax-provider');









Ergo.defineClass('Ergo.layouts.Inherited', {

	extends: 'Ergo.core.Layout',

	// select: function(item) {
		// return this.container.parent.el;
	// }


	_initialize: function() {
		Ergo.layouts.Inherited.superclass._initialize.apply(this, arguments);

		// отключаем отрисовку
		this._widget.options.autoRender = false;
	},



	// add: function(item, index, weight, group) {
	//
	// 	var g = [[this._widget.options.weight, this._widget._index]];
	//
	// 	this._widget.parent.vdom.add(item, index, weight, group ? g.concat(group) : g);
	//
	// },


	addAfter: function(item, otherItem, weight, group) {

		var g = [[this._widget.options.weight, this._widget._index]];  //FIXME this._widget._index некорректный индекс

		this._widget.parent.vdom.addAfter(item, otherItem, weight, group ? g.concat(group) : g);

	},


	addBefore: function(item, otherItem, weight, group) {

		var g = [[this._widget.options.weight, this._widget._index]];  //FIXME this._widget._index некорректный индекс

		this._widget.parent.vdom.addBefore(item, otherItem, weight, group ? g.concat(group) : g);

	}




}, 'layouts:inherited');


Ergo.alias('layouts:contents', Ergo.layouts.Inherited);


Ergo.defineClass('Ergo.layouts.HBox', {

	extends: 'Ergo.core.Layout',

	defaults: {
		name: 'hbox'
	}

}, 'layouts:hbox');


Ergo.defineClass('Ergo.layouts.Bar', {

	extends: 'Ergo.core.Layout',

	defaults: {
		name: 'bar'
	}

}, 'layouts:bar');


Ergo.defineClass('Ergo.layouts.Row', {

	extends: 'Ergo.core.Layout',

	defaults: {
		name: 'rows'
	},

	wrap: function(item) {
		return ((item.options.divider) ? item.el : $('<div/>').append(item.el))[0];
	}

}, 'layouts:rows');


Ergo.defineClass('Ergo.layouts.HSlide', {

	extends: 'Ergo.core.Layout',

	defaults: {
		name: 'hslide',
		// html: '<div style="white-space: nowrap; display: inline-block"/>',
		// include: ['observable']
	},

	html: '<div style="white-space: nowrap; display: inline-block"/>',


	_initialize: function() {
		Ergo.layouts.HSlide.superclass._initialize.apply(this, arguments);
//		this._super(o);

		this._offset = 0;
	},




	slide_next: function() {
		var width = $(this.el).width();
//		if(!this._offset) this._offset = 0;
		this._offset += width;
		if(this._offset > $(this.innerEl).width() - width) {
			this._offset = $(this.innerEl).width() - width;
//			this.nextBtn.states.set('disabled');
		}
		else {
//			this.nextBtn.states.unset('disabled');
		}
//		this.prevBtn.states.unset('disabled');

		$(this.innerEl).css('margin-left', -this._offset);

		this._widget.events.fire('layout#slide', {hasPrev: this.has_prev(), hasNext: this.has_next()});
	},

	slide_prev: function() {
		var width = $(this.el).width();
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

		$(this.innerEl).css('margin-left', -this._offset);

		this._widget.events.fire('layout#slide', {hasPrev: this.has_prev(), hasNext: this.has_next()});
	},



	slide_to_item: function(item, bias) {

		bias = bias || 0;

		var x = this._item_offset(item);//this._widget.item(i).el.position().left + this._offset;//_item_offset(i);
		var w = $(item.vdom.el).outerWidth(true);
		var frame_w = $(this.el).width();
		var box_w = $(this.innerEl).width();

		if(x - bias < this._offset) {
			this._offset = Math.max(x - bias, 0);
			$(this.innerEl).css('margin-left', -this._offset);
		}
		else if(x+w+bias > this._offset+frame_w) {
			this._offset = Math.min(box_w-frame_w, x+w-frame_w+bias);
			$(this.innerEl).css('margin-left', -this._offset);
		}

		this._widget.events.fire('layout#slide', {hasPrev: this.has_prev(), hasNext: this.has_next()});
	},


	_item_offset: function(item) {
		var offset = $(item.vdom.el).offset();
		var offset0 = $(this.innerEl).offset();

		return offset.left - offset0.left;
	},


	has_prev: function() {
		return this._offset > 0;
	},

	has_next: function() {
		var frame_w = $(this.el).width();
		var w = $(this.innerEl).width();
		return (w - this._offset) > frame_w;
	}




}, 'layouts:hslide');



Ergo.defineClass('Ergo.layouts.VBox', {

	extends: 'Ergo.core.Layout',

	defaults: {
		name: 'vbox'
	}

}, 'layouts:vbox');


Ergo.defineClass('Ergo.layouts.Stack', {

	extends: 'Ergo.core.Layout',

	defaults: {
		name: 'stack'
	}

}, 'layouts:stack');


Ergo.defineClass('Ergo.layouts.Columns', {

	extends: 'Ergo.core.Layout',

	defaults: {
		name: 'columns'
	},



	select: function(item) {
		var _el = this.el;//this.el.filter('.'+item.options.col);
		if( item.options.col ) {
			var elements = this.el.childNodes;
			if(elements.length == 0) {
				_el = $('<div class="col '+item.options.col+'"/>')[0];
				_el._col = item.options.col;
				item.vdom.targetKey = item.options.col;
				this.el.appendChild(_el);
			}
			else if( item.options.col > (elements[elements.length-1]._col || 0) ) {
				_el = $('<div class="col '+item.options.col+'"/>')[0];
				_el._col = item.options.col;
				item.vdom.targetKey = item.options.col;
				this.el.appendChild(_el);
			}
			else {
				for(var i = 0; i < elements.length; i++) {
					if( item.options.col == elements[i]._col ) {
						_el = elements[i];
						break;
					}
					if( item.options.col < (elements[i]._col || 0) ) {
						_el = $('<div class="col '+item.options.col+'"/>')[0];
						_el._col = item.options.col;
						item.vdom.targetKey = item.options.col;
						$ergo.dom.prependChild(this.el, _el);
//						this.el.prepend(_el);
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
		return ((item.options.col) ? item.el : $('<div/>').append(item.el))[0];
	}


	// wrap: function(item) {
	// 	return (item.options.divider) ? item.el : $('<div/>').append(item.el);
	// }

}, 'layouts:columns');



Ergo.defineClass('Ergo.layouts.Grid', {

	extends: 'Ergo.core.Layout',

	defaults: {
		name: 'grid',
//		pattern: []
	},


	wrap: function(item) {
		return $('<div autoheight="ignore-siblings"/>').append(item.el)[0];
	},


	update: function() {
		Ergo.layouts.Grid.superclass.update.call(this);
//		this._super();


		var self = this;

		var o = this.options;

		var w = this._widget;

		var n = w.children.count();
		var k = (n == 0) ? 1 : (12/n).toFixed();


		w.children.each(function(item, i) {

			if(!item._rendered) return;

			var el = $(item.vdom.outerEl);

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



Ergo.defineClass('Ergo.layouts.Table', {

	extends: 'Ergo.core.Layout',

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



Ergo.defineClass('Ergo.layouts.Float', {

	extends: 'Ergo.core.Layout',

	defaults: {
		name: 'float'
	}

}, 'layouts:float');



Ergo.defineClass('Ergo.layouts.Tiles', {

	extends: 'Ergo.core.Layout',

	defaults: {
		name: 'tiles'
	},


	attach: function(w) {
		Ergo.layouts.Tiles.superclass.attach.call(this, w);

		var sizes = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight'];

		var tiles = this.options.size;

		$(this.el).addClass( tiles > sizes.length ? 'tiles-'+tiles : sizes[tiles-1] );
	},


	// set tiles(v) {
	// },

	wrap: function(item) {
		var el = $('<div/>').append(item.el);
//		el.css({'width': '25%'});
		return el[0];
	}


}, 'layouts:tiles');


Ergo.defineClass('Ergo.layouts.Band', {

	extends: 'Ergo.core.Layout',

	defaults: {
		name: 'band'
	},

	wrap: function(item) {
		var w = $('<div/>');
		if(item.$label)
			w.append(item.$label.el);
		w.append(item.el);
		return w[0];
	}


}, 'layouts:band');



Ergo.defineClass('Ergo.layouts.Form', {

	extends: 'Ergo.core.Layout',

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
		return w[0];
	}


}, 'layouts:form');





Ergo.defineClass('Ergo.layouts.HForm', {

	extends: 'Ergo.layouts.Grid',

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
		return w[0];
	}


}, 'layouts:hform');






Ergo.defineClass('Ergo.layouts.VForm', {

	extends: 'Ergo.layouts.Grid',

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

		return w[0];
	},



	update: function() {

//		this._super();

		console.log('update vform');


		var self = this;

		var o = this.options;

		var w = this._widget;

		// var sz = w.children.size();
		// var k = (sz == 0) ? 1 : (12/sz).toFixed();


		w.children.each(function(item, i) {

			if(!item._rendered) return;

			var el = $(item.vdom.outerEl).children().filter('div') || $(item.el);

//			console.log(item._wrapper);


			if(w.options.pattern) {

				if(item.$label)
					item.$label.vdom.addClass('col-'+w.options.pattern[0]);
				else
					el.addClass('col-offset-'+w.options.pattern[0]);

				el.addClass('col-'+w.options.pattern[1]);

			}
			else {
				if(item.$label)
					item.$label.vdom.addClass('col-6');
				else
					el.addClass('col-offset-6');

				el.addClass('col-6');
			}

		});




	}





}, 'layouts:vform');



Ergo.defineClass('Ergo.layouts.Center', {

	extends: 'Ergo.core.Layout',

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



Ergo.defineClass('Ergo.layouts.Flex', {

	extends: 'Ergo.core.Layout',

	defaults: {
		name: 'flex'
	},

}, 'layouts:flex');




























/**
 * Перегружаемт методы show() и hide() для поддержки анимации
 *
 * Опции:
 * 	`effects`
 *
 * @mixin Ergo.mixins.Effects
 */


$ergo.rules['effects'] = ['override'];



Ergo.alias('includes:effects', {

	defaults: {
		effects: {
			show: 'show',
			hide: 'hide',
			delay: 0
		}
	},



//	overrides: {

		show: function() {

			var effect = false;

//			if( !this.children.isEmpty() || this.el.text() ) {  // ?

				var o = this.options.effects;


				if(o.initial) {
					o = Ergo.merge({}, o, o.initial);
					delete this.options.effects.initial;
				}

				var el = $(this.vdom.outerEl);//_wrapper_el || this.el);

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

//			}

			return $.when( effect )
							.then(function(){ this.events.fire('show'); }.bind(this));
		},


		hide: function() {

			var effect = false;

//			if( !this.children.isEmpty() || this.el.text() ) {  // ?

				var o = this.options.effects;

				if(o.initial) {
					o = Ergo.merge({}, o, o.initial);
					delete this.options.effects.initial;
				}

				var el = $(this.vdom.outerEl);//_wrapper_el || this.dom.el);

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
//			}

			return $.when( effect )
							.then(function(){ this.events.fire('hide'); }.bind(this));
		}



//	}


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


	set selected(selection) {
		this.selection.set(selection);
	},

	get selected() {
		return this.selection.get();
	},




	_construct: function(opts) {

		var o = opts.selection || {};

		this.selection = {

			_widget: this,

			_selected: (o.multiselect) ? {} : null,

			set: function(key) {

				if(key == undefined) return null;

				var o = this._widget.options.selection || {};

				// определяем метод поиска
				var lookup = o.lookup || this._widget.item;
				// режим множественной выборки
				var multiselect = o.multiselect;

				var selected = null;
				// ищем выбранный элемент
				if( key instanceof Ergo.core.Object ) {
					selected = key;
					key = selected.prop('name');
				}
				else {
					selected = lookup.call(this._widget, key);
				}
//				var selected = (key instanceof Ergo.core.Object) ? key : lookup.call(this._widget, key);

				// TODO здесь нужно обработать вариант, если элемент не найден


				// если новый ключ совпадает со старым, то не меняем выборку
	//			for(var i = 0; i < this._selected.length; i++)
	//				if(this._selected[i] == selected) return;


				// если выборка эксклюзивная, то нужно очистить текущую выборку
				if(!multiselect) {
					if(this._selected) {
						this._selected.unset('selected');
					}
				}
				else {

					if(!this._selected)
						this._selected = {};

					if(this._selected[key]) {
						this._selected[key].unset('selected');
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


				selected.set('selected');

				// если виджет будет удален, то нужно его выбросить из выборки
				selected.events.once('beforeDestroy', function() {
					this._selected = null;
				}, this);


				this._widget.emit('selectionChanged', {selection: this.get(), selected: selected});

				return selected;
			},


			unset: function(key) {

				var o = this._widget.options.selection || {};

				// определяем метод поиска
				var lookup = o.lookup || this._widget.item;
				// режим множественной выборки
				var multiselect = o.multiselect;


				var unselected = null;

				if( arguments.length == 0 ) {
					unselected = this._selected;
				}
				else {
					// ищем выбранный элемент
//					unselected = (key instanceof Ergo.core.Object) ? key : lookup.call(this._widget, key);

					if( key instanceof Ergo.core.Object ) {
						unselected = key;
						key = unselected.opt('name');
					}
					else {
						unselected = lookup.call(this._widget, key);
					}


				}



				if(unselected == null) return;


				if(!multiselect) {
					this._selected = null;
				}
				else {
					delete this._selected[key];
				}

//				Ergo.remove(this._selected, unselected);
//				this._selected.remove(unselected);

				unselected.unset('selected');

				unselected.off(this);


				this._widget.emit('selectionChanged', {selection: this.get(), unselected: unselected});

			},


			get: function(i) {
				if(arguments.length == 0) {
					return this._selected;
				}
				else {
					return this._selected ? this._selected[i] : null;
				}
			},


			toggle: function(key) {
				var o = this._widget.options.selection || {};

				// определяем метод поиска
				var lookup = o.lookup || this._widget.item;

				var selected = null;

				if( key instanceof Ergo.core.Object ) {
					selected = key;
					key = selected.opt('name');
				}
				else {
					selected = lookup.call(this._widget, key);
				}


				if(!selected)
					return;


				if( selected.is('selected') ) {
					this.unset(key);
				}
				else {
					this.set(key);
				}

			},


			isEmpty: function() {
				return this._selected.length == 0;
			},

			size: function() {
				return this._selected.length;
			},

			count: function() {
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
				var o = this._widget.options.selection || {};

				this.each(function(selected) {
					selected.unset('selected');
				});

				this._selected = o.multiselect ? {} : null;

				this._widget.emit('selectionChanged', {selection: this.get()});
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
Ergo.alias('includes:pageable', {

	defaults: {
		as: 'pageable'
	},

//	overrides: {

		set active(i) {

			var child = (i instanceof Ergo.core.Widget) ? i : this.children.find( Ergo.by_widget(i) );

			// this.children.each(function(c){
				// (c != child) ? c.hide() : c.show();
			// });

			if(child) {
				child._layoutChanged();
			}

//			var promise = $.when(true);

			if(this._active) {
				this._active.unset('active');
				promise = this._active.hide();
			}

			this._active = child;

//			promise.then(function(){

				this._active.set('active');
				this._active.show();

//			}.bind(this));


			return child;
		},


		get active() {
			return this._active;
		}


//	}


});


Ergo.alias('includes:focusable', {

	_postConstruct: function(o) {

		this.el.attr('tabindex', 0);

	}


});


$ergo.rules['popup'] = ['object'];

$ergo.alias('includes:popup', {

	defaults: {
		as: 'popup',
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



//	overrides: {

		open: function(position) {

			var popups = Ergo.context._popups;

			// в эксклюзивном режиме закрываем другие всплывающие виджеты
			if(!popups.isEmpty() && this.options.popup.exclusive) {
				popups.applyAll('close');
				popups.removeAll();
			}



			var self = this;

			var x = 0;
			var y = 0;

			if(arguments.length == 2) {
				x = arguments[0];
				y = arguments[1];
				position = {};//offset: [arguments[0], arguments[1]]};
			}

			var p = $ergo.mergeOptions({}, [this.options.popup, position]);

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

			var k = popups.keyOf(this);
			if( k > -1 ) {//Ergo.context._popup == this) {

				if(this != popups.last()) popups.get(k+1).close();  //TODO возможно, будет лучше, если закрытия будут связаны в цепочку

				popups.remove(this);

				Ergo.context.events.off(this);

				$('html').off('click.ergoPopup');

				return this.hide().then(function(){
					self.events.fire('closed');
				});
			}

		},


//	},



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

//	overrides: {

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

//	}


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
			modal.$overlay.el.css({'z-index': z*1000});
			modal.el.css({'z-index': z*1000+1});

			modal.$overlay.render('body');
//			$('body').append(modal.$overlay.el);

			modal.$overlay.el.append( modal.el );

			modal._rendered = true;
			modal.$overlay._rendered = true;
	//		this.overlay.items.add(this);
	//		$('body').append(this.el);

			modal.render();





			var result = modal.$overlay.show().then(function(){

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

				this.events.fire('open');

				return this.show().then(function(){
					this.events.fire('opened');
					this._layoutChanged();
				}.bind(this));

			}.bind(this));



			return result;
		},


		//
		// Close modal
		//
		close: function() {

			var e = this.events.fire('close');

			if(e.canceled)
				return;


			Ergo.context._z--;

			return this.hide().then(function(){

	//			this.el.detach();

				this.$overlay.hide().then(function(){
					$ergo.dom.remove( this.$overlay.el );
//					this.overlay.el.detach();
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




});

/*
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

*/




Ergo.alias('includes:fastclick', {


	_postConstruct: function(o) {

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
    hashUrl: true,
    events: {
      'restore': function(e) {

        console.log('restore from route', window.location.hash);

        var query = {};

        // восстанавлливаем параметры из hash
        var hash_a = window.location.hash.split('?');
        var path = hash_a[0];

        if(hash_a.length > 1) {
          $ergo.merge( query, $ergo.parseQueryString(hash_a[1]) );
        }

        // восстанавлливаем параметры из search
        var search = window.location.search;

        if(search.length > 1) {
          $ergo.merge( query, $ergo.parseQueryString(search.substr(1)) );
        }

        e.params.$query = query;


        // url = url.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        // var regex = new RegExp("[\\?&]" + url + "=([^&#]*)"),
        //     results = regex.exec(location.search);
        // return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));

        //FIXME
        path = path ? path.slice(2) : '';


        e.name = this.restoreFromPath( path, e.params );//, e.opts );

        console.log('router restore', e.params);

        // this.to( path, e.params );
        //
        // e.interrupt();
      }

    }
  },



  _construct: function(o) {

    var w = this;

    this.router = {

      // restore: function(params) {
      //
      // }

    }


  },



//  overrides: {


    buildQuery: function(params) {
      var query = [];
      for(var i in params) {
        query.push( encodeURIComponent(i) + '=' + encodeURIComponent(params[i]) );
      }
      return query.join('&');
    },


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



    restoreFromPath: function(path, params) {//}, opts) {

      // преобразуем к абсолютному пути
      path = this.absolutePath(path);

      for(var i in this._routes) {

        var route = this._routes[i];

        var match = this.routeMatch(path, route.path);
        if( match ) {

          var o = {
            $path: '#!'+path,
            $history: route.history
          };

          $ergo.merge(params, match, o); // merge path params and route params
//          $ergo.mergeOptions(opts, [o]); //

          return route.name;// {name: route.name, params: match, options: o};// this.join( route.name, match, o );
        }
      }

      return null;
    },



    to: function(path, params) {//}, opts) {

      params = params || {};
//      opts = opts || {};


      var name = this.restoreFromPath(path, params);//, opts);

      console.log('route to', name, params);//, opts);

      if( name ) {

        if(params && params.$query) {
          params.$path += '?' + this.buildQuery(params.$query);
        }

        return this.join( name, params );//, opts );
      }

      return $.when(null);

      // // преобразуем к абсолютному пути
      // path = this.absolutePath(path);
      //
      // for(var i in this._routes) {
      //
      //   var route = this._routes[i];
      //
      //   var match = this.routeMatch(path, route.path);
      //   if( match ) {
      //
      //     console.log('route to', path, params, route);
      //
      //     var o = {
      //       path: '#!'+path,
      //       history: route.history
      //     };
      //
      //     if(params && params.query) {
      //       o.path += '?' + this.buildQuery(params.query);
      //     }
      //
      //     Ergo.merge(match, params); // merge path params and route params
      //     Ergo.smart_override(o, opts); //
      //
      //     return this.join( route.name, match, o );
      //   }
      // }
      //
      // return $.when(null);
    },


    back: function() {
      window.history.back();
    }


//  }


});


Ergo.alias('includes:history', {

  defaults: {
    events: {
			'restore': function(e) {

//				console.log('- history', e.scope, e.hash, e.params);

        console.log('history restore', e.params);

        // if(e.params) {
        //   if(e.scope)
  			// 		this.join(e.scope, e.params);
        // }
        // else {
        //   ctx.reset();
        //   ctx.init();
        // }

				// если имя скоупа определено, то подключаем его
//				this.restore(e.scope, e.params, e.hash);
			},
			'scope#joined': function(e) {


				var scope = e.scope;

				if(scope._params.$history && !this._no_history) {

//          console.log('join history', e);

          var p = e.params.history || {};

					// var name_a = e.scope._name.split(':');
					// var p = {};
					// p[name_a[0]] = (name_a.length > 1) ? name_a[1] : true;
					// var p = Ergo.merge(p, this._params[e.scope._name]);
//					var chain = scope._chain.join('.');
//					var p = Ergo.deepMerge({_scope: chain}, scope._params);
					window.history.pushState( p, scope._name, scope._params.$path );//opt('path') );//, 'title', '#'+url);

					console.log('+ history', /*scope.opt('path')*/scope._params.$path, scope._name, p);

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

      if(p) {

        // восстановление скоупа по данным состояния history

        var e = ctx.events.fire('restore', {name: null, params: {history: p}/*, opt: {}*/});///*scope: p._scope,*/ params: p, hash: window.location.hash});

        ctx._no_history = true;
        ctx.join(e.name, e.params);//, e.opts);
        ctx._no_history = false;

      }
      else {
        console.warn('No popstate data. Scope can not be restored!');
      }

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

      var provider = o.provider;

      if( $.isString(provider) )
        provider = Ergo.alias('providers:'+provider);

      for(var i in provider) {
        var p = provider[i];
        if( $.isFunction(p) ) {

          this['$'+i] = function(action) {
            var composer = this.options.composer || this._compose;
            var parser = this.options.parser || this._parse;

            var data = composer.call(this, this.get(), action);

            var args = [this];
            for(var j = 1; j < arguments.length; j++)
              args.push(arguments[j]);

            return $.when(provider[action].apply(provider, args)).then(function(data) {
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
      'jquery:input': 'do_input'
    }
  },


//  overrides: {

    do_input: function(eventName, e) {

      var keyCode = e.keyCode;

      // var text = this.el.val();
      //

      var text = this.vdom.el.value || this.vdom.el.textContent;

      console.log('input', text, this.value, this.__val );


			if(keyCode == Ergo.KeyCode.UP
				|| keyCode == Ergo.KeyCode.DOWN
				|| keyCode == Ergo.KeyCode.ENTER
				|| keyCode == Ergo.KeyCode.ESC) {
				// TODO обработка служебных символов
			}
			else {
				this.rise('input', {text: text, keyCode: keyCode});
			}
    }

//  }

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

//  overrides: {

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

//  }

});



Ergo.alias('includes:local-storage', {

  defaults: {
    lsKey: 'default',
    events: {
      'restore': function(e) {

//        console.log('localStorage restore', e.params);

      },
      'scope#join': function(e) {


        if(e.params) {

          var json = JSON.parse( window.localStorage.getItem(this.options.lsKey) ) || {};

          e.params.ls = json[e.scope._name] || {};

//           var json = JSON.parse( window.localStorage.getItem(this.options.lsKey) ) || {};
//           json[e.scope._name] = e.params.ls;
// //          Ergo.merge( json.params, e.params.ls);
//           window.localStorage.setItem(this.options.lsKey, JSON.stringify(json));
        }

      },
      'scope#disjoin': function(e) {

//        console.log('localStorage save', e.scope._name, e.params);

        if(e.params && e.params.ls) {
          var json = JSON.parse( window.localStorage.getItem(this.options.lsKey) ) || {};
          json[e.scope._name] = e.params.ls;
//          Ergo.merge( json.params, e.params.ls);
          window.localStorage.setItem(this.options.lsKey, JSON.stringify(json));
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
Ergo.defineClass('Ergo.html.Iframe', {

	extends: 'Ergo.core.Widget',

	defaults: {
		tag: 'iframe'
	},

	props: {
		set: {
			'src': function(v) {
				this.vdom.el.setAttribute('src', v);
			}
		}
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
Ergo.defineClass('Ergo.html.Input', {

	extends: 'Ergo.core.Widget',

	defaults: {
		tag: 'input',
		binding: function(v) {
			this.el.val(v);
//			this.dom.el.value = v;
		},
		events: {
			'jquery:change': 'do_change',
			'jquery:input': 'input'
			// 'vdom:input': function(e) {
			// 	this.prop('value', this.vdom.el.value);
			// }
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


	props: {
		set: {

			text: function(v) {
				this.el.val(v);
			},

			hidden: function(v) {
				this.el.prop('hidden', true);
			},

			type: function(v) {
				this.vdom.el.setAttribute('type', v);
			},

			placeholder: function(v) {
				this.vdom.el.setAttribute('placeholder', v);
			}

		},
		get: {

			text: function() {
				return this.el.val();
			}

		}
	},

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
	set name(v) {
		this._name = v;
		this.vdom.el.setAttribute('name', v);
	},


	// set text(v) {
	// 	this.el.val(v);
	// },


	// set hidden(v) {
	// 	this.el.prop('hidden', true);
	// },
	//
	// set type(v) {
	// 	this.vdom.el.setAttribute('type', v);
	// },
	//
	// set placeholder(v) {
	// 	this.vdom.el.setAttribute('placeholder', v);
	// },

	// _change: function(e) {
	// 	this.events.rise('change', {value: this.el.val()});
	// },

	do_change: function(e) {
		this.opt('value', this.el.val());
		this.rise('change', {value: this.el.val()});
	},

	input: function(e) {
		this.prop('value', this.vdom.el.value);
		this.emit('input', this.vdom.el.value);//this.el.val());//this.prop('val'));
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
Ergo.defineClass('Ergo.html.TextInput', {

	extends: 'Ergo.html.Input',

	defaults: {
		type: 'text',
		// binding: function(v) {
		// 	this.el.val(v);
		// },
		events: {
			// jquery
			'jquery:keyup': function(e) {
				this.rise('keyUp', {text: this.el.val()}, e);
			},
			'jquery:keydown': function(e) {
				this.rise('keyDown', {text: this.el.val()}, e);
			},
			// widget
			'change': function(e) {
				this.prop('value', e.value);
			},
			'keyUp': function(e) {
				var keyCode = e.base.keyCode;

				if(keyCode == Ergo.KeyCode.ESC
					|| keyCode == Ergo.KeyCode.DOWN
					|| keyCode == Ergo.KeyCode.ENTER
					|| keyCode == Ergo.KeyCode.ESC) {
					// TODO обработка служебных символов
				}
				else {
					this.rise('input', {text: e.text, keyCode: keyCode});
				}

			}
		}

		// onChange: function(e) {
		// 	this.opt('value', e.value);
		// },
		//
		// onKeyUp: function(e) {
		//
		// }

		// events: {
		// 	'jquery:change': function() {
		// 		this.opt('value', this.el.val());
		// 	}
		// }
	}


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
Ergo.defineClass('Ergo.html.Checkbox', /** @lends Ergo.html.Checkbox.prototype */{

	extends: 'Ergo.html.Input',

	defaults: {
//		html: '<input type="checkbox"/>',
		type: 'checkbox',
		binding: function(v) {
			this.el.prop('checked', v);
		},
		onChange: function(e) {
			this.prop('value', e.value);//this.el.prop('checked'));
		},

		states: {
			indeterminate: function(on) {
				this.el.prop('indeterminate', v);
			}
		}
// 		events: {
// 			'jquery:change': function(e) {
// 				this.opt('value', this.el.prop('checked'));
// //				w.events.fire('action');
// 			}
// 		}
	},


	// set_indeterminate: function(v) {
	// 	this.el.prop('indeterminate', v);
	// },


	// _change: function() {
	// 	this.events.rise('change', {value: this.el.prop('checked')});
	// },

	do_change: function() {
		this.rise('change', {value: this.el.prop('checked')});
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
Ergo.defineClass('Ergo.html.Radio', /** @lends Ergo.html.Radio.prototype */{

	extends: 'Ergo.html.Checkbox',

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
Ergo.defineClass('Ergo.html.Select', {

	extends: 'Ergo.core.Widget',

	defaults: {
		tag: 'select',
		defaultItem: {
			etype: 'html:option',
			binding: 'text'
		}
	},

	props: {
		set: {
			name: function(v) {
				this.el.attr('name', v);
			},

			readonly: function(v) {
				this.el.attr('readonly', v);
			},

			multiple: function(v) {
				this.el.attr('multiple', v);
			},

			disabled: function(v) {
				(v) ? this.vdom.el.setAttribute('disabled', '') : this.vdom.el.removeAttribute('disabled');
			}
		}
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
Ergo.defineClass('Ergo.html.TextArea', {

	extends: 'Ergo.core.Widget',

	defaults: {
		tag: 'textarea',
		binding: function(v) {
			this.el.val(v);
		},
		events: {
			'jquery:change': 'do_change'
		}
	},

	attributes: ['id', 'tabindex', 'placeholder', 'disabled', 'readonly', 'rows'],


	props: {
		set: {
			text: function(v) {
				this.el.val(v);
			},

			hidden: function(v) {
				this.el.prop('hidden', v);
			}

		},
		get: {
			text: function() {
				return this.el.val();
			}
		}
	},


	// set_rows: function(v) {
	// 	this.el.attr('rows', v);
	// },

	// перегружаем параметр name
	set name(v) {
		this._name = v;
		this.vdom.el.setAttribute('name', v);
	},



	do_change: function(e) {
		this.rise('change', {value: this.prop('text')});
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
Ergo.defineClass('Ergo.html.Button', {

	extends: 'Ergo.core.Widget',

	defaults: {
		tag: 'button'
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
Ergo.defineClass('Ergo.html.Img', {

	extends: 'Ergo.core.Widget',

	defaults: {
		tag: 'img'
	},

	attributes: ['id', 'tabindex', 'src'],

	props: {
		set: {
			src: function(v) {
				this.vdom.el.setAttribute('src', v);
			}
		}
	}



}, 'html:img');


/**
 * Виджет для <label/>
 *
 * @class
 * @name Ergo.html.Label
 * @extends Ergo.core.Widget
 */
Ergo.defineClass('Ergo.html.Label', {

	extends: 'Ergo.core.Widget',

	defaults: {
		tag: 'label'
	},

	props: {
		set: {
			_for: function(v) {
		    this.vdom.el.setAttribute('for', v);
		  }
		}
	}



}, 'html:label');


/**
 * Виджет для <label/>
 *
 * @class
 * @name Ergo.html.Label
 * @extends Ergo.core.Widget
 */
Ergo.defineClass('Ergo.html.A', {

	extends: 'Ergo.core.Widget',

	defaults: {
		tag: 'a'
	},

  attributes: ['id', 'tabindex', 'href'],

	props: {
		set: {
			'href': function(v) {
				this.vdom.el.setAttribute('href', v);
			}
		}
	}

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
Ergo.defineClass('Ergo.html._Text', {

  extends: 'Ergo.core.Widget',

	// set_text: function(v) {
	// 	this.el[0].textContent = (v == null ? '': v);
	// }

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
Ergo.defineClass('Ergo.html.Form', {

	extends: 'Ergo.core.Widget',

	defaults: {
//		html: '<form method="POST"/>'
		tag: 'form',
		method: 'POST'
	},


	props: {
		set: {
			action: function(v) {
				this.vdom.el.setAttribute('action', v);
			},

			method: function(v) {
				this.vdom.el.setAttribute('method', v);
			}
		}
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
Ergo.defineClass('Ergo.html.Widget', {

	extends: 'Ergo.core.Widget',

	defaults: {
	}

}, 'html:widget');




Ergo.defineClass('Ergo.widgets.Html', {

	extends: 'Ergo.core.Widget',

	defaults: {
		defaultItem: {
			etype: 'html'
		},
		defaultComponent: {
			etype: 'html'
		}
	},

	props: {
		'href': $ergo.DOMAttribute,
		'forName': {
			set: function(v) { this.vdom.el.setAttribute('for', v) },
			get: function(v) { return this.vdom.el.getAttribute('for') }
		},
		'checked': {
			set: function(v) { this.vdom.el.checked = !!v; },//setAttribute('checked', '') : this.vdom.el.removeAttribute('checked') },
			get: function(v) { return this.vdom.el.checked; }//.hasAttribute('checked') }
		},
		'src': $ergo.DOMAttribute,
		'type': $ergo.DOMAttribute,
		'placeholder': $ergo.DOMAttribute,
	}

}, 'widgets:html');







Ergo.$html = function(etype, o) {

	if(!Ergo.alias('html:'+etype)) {

//		var _etype = etype;

// 		var i = etype.indexOf(':');
// 		if(i > 0) {
// //			ns = etype.substr(0, i);
// 			etype = etype.substr(i+1);
// 		}

		// var _o = $.isArray(o) ? o[o.length-1] : o;
//
// //		o.etype = 'html:widget';
		// _o.html = '<'+_etype+'/>';

//		o.unshift({html: '<'+etype+'/>'});
		o.unshift({tag: etype});

		etype = 'widget';
	}

	return Ergo.object('html', etype, o);
};
