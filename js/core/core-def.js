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
	E.mergeGettersAndSetters = function(obj) {
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
	 * @name @Ergo.deep_override
	 * @function
	 *
	 */
	E.deep_override = function(o) {

		for(var j = 1; j < arguments.length; j++) {

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
				var rule = rules[name] || rules['*'];

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
						o[name] = (a == null) ? b : E.deep_override(a, b);
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
					// 		o[name] = (a == null) ? b : E.override(a, b);
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
					$ergo.deep_override(o[name], b);
				}
				else {
					o[name] = b;
				}
			}
		}

		return o;
	}






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
