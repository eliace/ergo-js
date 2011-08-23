/**
 * @namespace
 * 
 */
var Ergo = (function(){

	var E = {};



	//
	//
	// 
	//
	//


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
				obj[i] = overrides[i];
			}
		}
		return obj;
	};
	
	
	
	/**
	 * Рекурсивное копирование свойств одного объекта в другой (создание примеси)
	 * 
	 * @name Ergo.override_r
	 * @function
	 * @param {Object} obj целевой объект, которому будут добавлены новые свойства
	 */
	  E.override_r = function(obj) {
		for(var j = 1; j < arguments.length; j++){
			var overrides = arguments[j];
			for(var i in overrides){
				var prop = overrides[i];
				if($.isPlainObject(prop)){
					if(!(i in obj) || !$.isPlainObject(obj[i])) obj[i] = {};
					  E.override_r(obj[i], prop);
				}
				else{
					obj[i] = prop;
				}
			}
		}
		return obj;
	};
	
	/**
	 * Псевдоним для {@link Ergo.override}
	 * @name Ergo.merge
	 * @function
	 */
	  E.merge =   E.override;
	/**
	 * Псевдоним для {@link Ergo.override_r}
	 * @name Ergo.merge_r
	 * @function
	 */
	  E.merge_r = E.override_r;
	
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
		
		
		var F = function(){};
		F.prototype = p_ctor.prototype;
		ctor.prototype = new F();
		ctor.prototype.constructor = ctor;
		ctor.superclass = p_ctor.prototype;
		ctor.super_ctor = p_ctor;
		
		E.override(ctor.prototype, overrides);
		
		if(overrides.etype)
			_etypes[overrides.etype] = ctor;
		
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
	
	
	var _etypes = {};
	
	/**
	 * Объявление класса
	 * 
	 * @param {String} class_name полное имя класса
	 * @param {String|Object} base_class базовый класс или имя базового класса
	 * @param {Object} overrides набор свойств и методов нового класса
	 * @param {String} [etype] dino-тип (если не указан, то новый класс не регистрируется)
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
			_etypes[etype] = clazz;
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
		
		var ctor = _etypes[etype];
		
		if(!ctor ){
//			Ergo.logger.debug('Class for etype "'+etype+'" not found');
			throw new Error('Class for etype "'+etype+'" not found');
//			return null;
		}
				
		return new ctor(options);	
	};

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
	$.isNumber = function(obj) {
		return typeof obj == 'number';
	};	
	
	
	
	
	
	
	
	
	
	
	//------------------------------------
	//
	// Методы для работы с коллекциями
	//
	//------------------------------------
	
	
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
	E.each = function(src, callback, delegate){
		if($.isArray(src)){
			var arr = src;
			for(var i = 0; i < arr.length; i++){
				if( callback.call(delegate || arr, arr[i], i) === false ) break;
			}
		}
		else {
			var obj = src;
			for(var i in obj){
				if( callback.call(delegate || obj, obj[i], i) === false ) break;
			}	
		}
	}
	
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
	E.filter = function(src, fn){
		return ( $.isArray(src) ) ? _filter_arr(src, fn) : _filter_obj(src, fn);
	};
	
	/**
	 * @ignore
	 */
	var _filter_obj = function(obj, fn) {
		var result = {};
		for(var i in obj)
			if( fn.call(obj, obj[i], i) ) result[i] = obj[i];
		return result;
	}

	/**
	 * @ignore
	 */	
	var _filter_arr = function(arr, fn) {
		var result = [];
		for(var i = 0; i < arr.length; i++)
			if( fn.call(arr, arr[i], i) ) result.push(arr[i]);
		return result;
	}
	
	
	E.filter_keys = function(src, fn){
		var result = [];
		for(var i in src)
			if(fn.call(src, src[i], i)) result.push(i);
		return result;
	};
	
	
	/**
	 * Псевдоним для {@link Ergo.filter}
	 * 
	 * @name Ergo.find_all
	 * @function
	 */
	E.find_all = E.filter;
	
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
		if($.isArray(obj)) {
			a = [];
			for(var i = 0; i < obj.length; i++) a[i] = fn.call(obj, obj[i], i);			
		}
		else {
			a = {};
			for(var i in obj) a[i] = fn.call(obj, obj[i], i);			
		}
		return a;	
	};
	
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
		for(var i in obj)
			if(criteria.call(obj, obj[i], i)) return obj[i];
		
		return null;
	};
	
	/**
	 * Получение индекса (или ключа) элемента в коллекции
	 * 
	 * Если критерий не является функцией, то используется метод Ergo.eq
	 * 
	 * @name Ergo.index_of
	 * @function
	 * @param {Object|Array} obj коллекция
	 * @param {Function|Any} criteria критерий 
	 */
	E.index_of = function(obj, criteria) {
		if(!$.isFunction(criteria))
			criteria = E.eq.curry(criteria);
		for(var i in obj)
			if(criteria.call(obj, obj[i], i)) return i;
		return -1;
	};
	
	
	
	E.apply_all = function(obj, m_name, args) {
		for(var i in obj) {
			if(obj[i][m_name]) obj[i][m_name].apply(obj[i], args || []);
		}
	}
	
	E.call_all = function(obj, m_name) {
		var args = [];
		for(var i = 2; i < arguments.length; i++) args[i-2] = arguments[i];
		for(var i in obj) {
			if(obj[i][m_name]) obj[i][m_name].apply(obj[i], args);
		}
	}
	
	
	
	/**
	 * Проверка, содержится ли элемент в массиве
	 * 
	 * @name Ergo.array_include
	 * @function
	 * @param {Array|Object} arr массив
	 * @param {Any} val значение
	 */
	E.include = function(arr, val) {
		for(var i in arr)
			if(arr[i] == val) return true;
//		for(var i = 0; i < arr.length; i++)
//			if(arr[i] == val) return true;
		return false;
	}
	
	/**
	 * Удаление элемента из массива (массив уменьшает размерность)
	 * 
	 * @name Ergo.array_remove
	 * @function
	 * @param {Object} arr массив
	 * @param {Object} val удаляемый элемент
	 */
	E.array_remove = function(arr, val) {
		var index = -1;
		for(var i = 0; i < arr.length; i++) {
			if(arr[i] == val) {
				index = i;
				break;
			}
		}
		if(index != -1) arr.splice(index, 1);
		
		return (index != -1);
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
		
		var is_po = $.isPlainObject(src);
		if(is_po || $.isArray(src)){
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

	
	
	
	
	
	//---------------------------------------------------
	//
	// Фильтры
	//
	//---------------------------------------------------
	
	//FIXME сомнительная польза, поскольку есть метод $.noop
	E.noop = function(){};	
	
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
	E.eq = function(obj, item, i) {
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
	E.ne = function(obj, item, i) {
		return obj != item;
	};
	
	
	//FIXME эта функция не так уж нужна
	E.filter_list = function(val, list) {
		for(var i = 0; i < list.length; i++)
			if(!list[i].call(this, val)) return false;
		return true;
	}
	
	
	
	// /**
	 // * @constructor
	 // * @memberOf Ergo
	 // * @name ObjectTree
	 // * @param {Object} obj
	 // * @param {Object} factory
	 // * @param {Object} ignore
	 // */
	// // набор методов, позволяющих работать с объектом как с деревом
	// E.ObjectTree = function(obj, factory, ignore) {
		// this.obj = obj;
		// this.factory = factory;
		// this.ignore_list = ignore || [];
	// };
// 	
	// /**
	 // * @name Ergo.ObjectTree#ensure
	 // * @function
	 // * @param {Object} path
	 // */
	// E.ObjectTree.prototype.ensure = function(path){
		// if($.isString(path)) path = path.split('.');
// 		
		// var obj = this.obj;
		// for(var i = 0; i < path.length; i++){
			// var key = path[i];
			// if(!(key in obj)) obj[key] = (this.factory) ? this.factory() : {};
			// obj = obj[key];
		// }
		// return obj;
	// }
// 
	// /**
	 // * 
	 // * @name Ergo.ObjectTree#get
	 // * @function
	 // * @param {Object} path
	 // */	
	// E.ObjectTree.prototype.get = function(path){
		// if(E.isString(path)) path = path.split('.');
// 		
		// var obj = this.obj;
		// for(var i = 0; i < path.length; i++){
			// var key = path[i];
			// obj = obj[key];
		// }
		// return obj;
	// }
// 	
	// /**
	 // * 
	 // * @name Ergo.ObjectTree#del
	 // * @function
	 // * @param {Object} path
	 // */
	// E.ObjectTree.prototype.del = function(path) {
		// if($.isString(path)) path = path.split('.');
// 
		// var obj = this.obj;
		// for(var i = 0; i < path.length; i++){
			// var key = path[i];
			// // если это последний элемент пути - удаляем
			// if(i == path.length-1) 
				// delete obj[key];
			// else
				// obj = obj[key];
		// }
	// },
// 	
// 	
	// /**
	 // * 
	 // * @name Ergo.ObjectTree#traverse
	 // * @function
	 // * @param {Object} callback
	 // * @param {Object} obj
	 // */
	// E.ObjectTree.prototype.traverse = function(callback, obj) {
		// if(arguments.length == 1) obj = this.obj;
		// else{
			// if(obj == null || obj == undefined) return;
			// callback.call(this, obj);
		// }
// 		
		// for(var i in obj){
			// if($.isPlainObject(obj[i]) && !(E.include(this.ignore_list, i))) this.traverse(callback, obj[i]);
		// }
	// }
// 	
// 	
	// E.otree = function(obj){
		// return new E.ObjectTree(obj);
	// };
	
	
	
	/**
	 * Печать объекта в удобочитаемой форме
	 * 
	 * @name Ergo.pretty_print
	 * @function
	 * @param {Any} obj любой объект/примитив
	 * @param {Integer} indent отступ
	 * @returns {String}
	 */
	E.pretty_print = function(obj, indent) {
		
		if(obj == undefined) return undefined;
		
		indent = indent || 0;
		var tabs = '';
		for(var i = 0; i < indent; i++) tabs += '\t';
		
		if(obj.pretty_print) return obj.pretty_print(indent);
		
		if($.isString(obj))
			return '"'+obj.replace(/\n/g, '\\n')+'"';
		else if($.isBoolean(obj))
			return ''+obj;
		else if($.isNumber(obj) || $.isBoolean(obj))
			return obj;
		else if($.isArray(obj)){
			var items = [];
			E.each(obj, function(item){
				items.push(E.pretty_print(item, indent));
			});
			return '[' + items.join(', ') + ']';
		}
		else if($.isFunction(obj)){
			return 'function()';
		}
		else if($.isPlainObject(obj) || !indent){
			var items = [];
			E.each(obj, function(item, key){
				items.push(tabs + '\t' + key + ':' + E.pretty_print(item, indent+1));					
			});
			return '{\n' + items.join(',\n') + '\n' + tabs + '}';
		}
		else
			return obj
		
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
	
	
	
	
	
	//----------------------------------------------------------
	//
	// Форматирование
	//
	//----------------------------------------------------------
	
	
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
			var replace_val = ''
			if(str == '%s') replace_val = ''+values.shift();
			return replace_val;
		});
	}
	
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
		if(obj === undefined) return '';
		return format_str.replace(/#{\s*(.+?)\s*}/g, function(str, key) {
			var o = obj;
			var arr = key.split('.');
			for(var i = 0; i < arr.length; i++) o = o[arr[i]]; 
			return o;
		});		
	}
	
	
	
	
	
/*	
	
	E.serialize = function(obj, indent) {
		
		if(obj == undefined) return obj;
		
		indent = indent || 0;
		var tabs = '';
		for(var i = 0; i < indent; i++) tabs += '\t';
		
		if(obj.pretty_print) return obj.pretty_print(indent);
		
		switch(typeof obj){
			case 'string':
				return '"'+obj.replace(/\n/g, '\\n')+'"';
			case 'object':
				var items = [];
				if(E.isArray(obj)){
					E.each(obj, function(item){
						items.push(E.pretty_print(item, indent));
					});
					return '[' + items.join(', ') + ']';
				}
				else{
					E.each(obj, function(item, key){
						items.push(tabs + '\t"' + key + '":' + E.pretty_print(item, indent+1));					
					});
					return '{\n' + items.join(',\n') + '\n' + tabs + '}';
				}
			default:
				return obj;
		}
	};
*/	
	
	
	
	/**
	 * @name Ergo.timestamp
	 * @function
	 */
	E.timestamp = function() {
		return new Date().getTime();
	};
	
	
	
		
	

	E.logger = {
		debug: function(msg) {
			if(console) console.log(msg);
		}
	};
	
	
	
	
	E.loadpath = {};
	
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
			  async: false
			});			
			
		}
		
		
	}
	
	
	
	
	
	
	
	return E;
})();

//var _dino = Ergo;






//------------------------------------------------------
//
// Расширения базовых классов
//
//------------------------------------------------------


String.prototype.capitalize = function() {
	return this.charAt(0).toUpperCase() + this.slice(1);
};



/**
 * Добавление карринга к классу Function
 */
Function.prototype.curry = function(arg) {
	var F = this;
	var pre_args = arguments;
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





//---------------------------------------------------------------
//
// Снова фильтры, но уже в пространстве имен Ergo.filters
//
//---------------------------------------------------------------



Ergo.filters = (function(){
	
	var F = {};
	
	// "пустой" фильтр
	F.nop = function(){ return false };
	// по индексу
	F.by_index = function(index, child, i){ return index == i; };
	// по совпадению набора свойств
	F.by_props = function(props, child){
		for(var i in props)
			if(child[i] != props[i]) return false;
		return true; 
	};
	F.by_class = function(clazz, child){
		return (child instanceof clazz);
	}
	
	F.ne = function(obj) {
		return function(it) { return obj != it; };
	}

	F.eq = function(obj) {
		return function(it) { return obj == it; };
	}
	
	F.by_widget = function(i) {
		
		var f = null;
		
		if( $.isNumber(i) ) f = F.by_index.curry(i);//return this.widgets[i]; // упрощаем
		else if( $.isString(i) ) f = F.by_props.curry({'tag': i});
		else if( $.isFunction(i) && ('superclass' in i) ) f = F.by_class.curry(i);
		else if( $.isFunction(i) ) f = i;
		else if( $.isPlainObject(i) ) f = F.by_props.curry(i);
		
		return f;
	}
	
	
	return F;
})();

