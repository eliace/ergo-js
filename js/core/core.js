/**
 * @namespace
 * 
 */
var Dino = (function(){

	var D = {};


	/**
	 * Копирование свойств одного объекта в другой (создание примеси)
	 * @param {Object} obj целевой объект, которому будут добавлены новые свойства
	 * @name Dino.override
	 * @function
	 */
	D.override = function(obj) {
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
	 * @name Dino.override_r
	 * @function
	 * @param {Object} obj целевой объект, которому будут добавлены новые свойства
	 */
	D.override_r = function(obj) {
		for(var j = 1; j < arguments.length; j++){
			var overrides = arguments[j];
			for(var i in overrides){
				var prop = overrides[i];
				if(D.isPlainObject(prop)){
					if(!(i in obj) || !D.isPlainObject(obj[i])) obj[i] = {};
					D.override_r(obj[i], prop);
				}
				else{
					obj[i] = prop;
				}
			}
		}
		return obj;
	};
	
	/**
	 * Псевдоним для {@link Dino.override}
	 * @name Dino.merge
	 * @function
	 */
	D.merge = D.override;
	/**
	 * Псевдоним для {@link Dino.override_r}
	 * @name Dino.merge_r
	 * @function
	 */
	D.merge_r = D.override_r;
	
	/**
	 * Создание расширенного класса
	 * 
	 * @name Dino.extend
	 * @function
	 * @param {Object} p_ctor
	 * @param {Object} ctor
	 * @param {Object} overrides
	 */
	D.extend = function(p_ctor, ctor, overrides) {
		
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
		
		D.override(ctor.prototype, overrides);

		return ctor;
	};
	
	/**
	 * Рекурсивный обход всех базовых классов 
	 * 
	 * @name Dino.hierarchy
	 * @function
	 * @param {Object} ctor класс, для которого нужно выполнить обход
	 * @param {Function} callback метод, вызывваемый для каждого базового класса
	 */
	D.hierarchy = function(ctor, callback) {
		if(!ctor) return;
		D.hierarchy(ctor.super_ctor, callback);
		callback.call(this, ctor.prototype);
	};
	
	
	var _dtypes = {};
	
	/**
	 * Объявление класса
	 * 
	 * @param {String} class_name полное имя класса
	 * @param {String|Object} base_class базовый класс или имя базового класса
	 * @param {Object} overrides набор свойств и методов нового класса
	 * @param {String} [dtype] dino-тип (если не указан, то новый класс не регистрируется)
	 * 
	 * @name Dino.declare
	 * @function
	 */
	D.declare = function(class_name, base_class, overrides, dtype) {
		
		if(typeof base_class == 'string') base_class = eval(base_class);
		
		var clazz = D.extend(base_class, overrides);
		
		// создаем пространство имен для класса
		var cp_a = class_name.split('.');
		var cp = 'window';
		for(var i = 0; i < cp_a.length; i++){
			cp += '.'+cp_a[i];
			eval( 'if(!'+cp+') '+cp+' = {};' );
		}		
		eval(cp + ' = clazz;');
		
		// регистрируем dtype класса (если он есть)
		if(dtype){
			clazz.prototype.dtype = dtype;
			_dtypes[dtype] = clazz;
		}

		clazz.prototype.className = class_name;
		
		return clazz;
	};
	
	
	/**
	 * Создание экземпляра объекта (должен присутствовать dtype в options либо defaultType)
	 * 
	 * @name Dino.object
	 * @function
	 * @param {Object} options
	 * @param {Object} defaultType
	 */
	D.object = function(options, defaultType) {
		
		if(options instanceof Dino.BaseObject) return options;
		
		var dtype = options.dtype || defaultType;
		
		var ctor = _dtypes[dtype];
		
		if(!ctor ){
			Dino.log('Class for dtype "'+dtype+'" not found');
			return null;
		}
				
		return new ctor(options);	
	};

//	D.widget = D.object;
	
	
/*	
	D.isFunction = function(obj) { return obj instanceof Function; };
	D.isArray = function(obj) {return obj instanceof Array;}
	D.isNumber = function(obj) {return typeof obj == 'number';};
	D.isBoolean = function(obj) {return typeof obj == 'boolean';};
	D.isString = function(obj) {return typeof obj == 'string';};
	D.isObject = function(obj) { return obj.constructor == Object; };
*/


	// в версии jquery 1.4 появились методы, которые раньше реализовывались в Dino
	
	/**
	 * Является ли объект функцией 
	 * 
	 * @name Dino.isFunction
	 * @function
	 * @param {Object} obj
	 */
	D.isFunction = $.isFunction;
	/**
	 * Является ли объект массивом
	 * 
	 * @name Dino.isArray
	 * @function
	 * @param {Object} obj
	 */
	D.isArray = $.isArray;
	/**
	 * Является ли объект простым объектом
	 * 
	 * @name Dino.isPlainObject
	 * @function
	 * @param {Object} obj
	 */
	D.isPlainObject = $.isPlainObject;
	/**
	 * Является ли объект строкой
	 * 
	 * @name Dino.isString
	 * @function
	 * @param {Object} obj
	 */
	D.isString = function(obj) {
		return typeof obj == 'string';
	};
	/**
	 * Является ли объект логической переменной
	 * 
	 * @name Dino.isBoolean
	 * @function
	 * @param {Object} obj
	 */
	D.isBoolean = function(obj) {
		return typeof obj == 'boolean';
	};
	/**
	 * Является ли объект числом
	 * 
	 * @name Dino.isNumber
	 * @function
	 * @param {Object} obj
	 */
	D.isNumber = function(obj) {
		return typeof obj == 'number';
	};	
	
	/**
	 * Последовательный обход каждого элемента массива или хэша
	 * 
	 * в jquery есть функция $.each, но меня не устраивает порядок аргументов в замыкании
	 * 
	 * @name Dino.each
	 * @function
	 * @param {Object|Array} src объект, элементы которого необходимо просмотреть
	 * @param {Function} callback функция, вызываемая для каждого элемента
	 */
	D.each = function(src, callback){
		if(Dino.isArray(src)){
			var arr = src;
			for(var i = 0; i < arr.length; i++){
				if( callback.call(arr, arr[i], i) === false ) break;
			}
		}
		else {
			var obj = src;
			for(var i in obj){
				if( callback.call(obj, obj[i], i) === false ) break;
			}	
		}
	}
	
	/**
	 * Фильтрация (как правило приводит к уменьшению размерности)
	 * 
	 * Элемент попадает в итоговый объект
	 * 
	 * @name Dino.filter
	 * @function
	 * @param {Object|Array} src объект, элементы которого необходимо фильтровать
	 * @param {Function} callback функция, вызываемая для каждого элемента
	 * @returns {Object|Array} отфильтрованный объект или массив, в зависимости типа src 
	 */
	D.filter = function(src, fn){
		return ( D.isArray(src) ) ? _filter_arr(src, fn) : _filter_obj(src, fn);
	};
	
	/**
	 * @ignore
	 */
	var _filter_obj = function(obj, fn) {
		var result = {};
		for(var i in obj)
			if( fn.call(obj, obj[i], i) ) result[i] = obj[i];
		return a;
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
	
	/**
	 * Псевдоним для {@link Dino.filter}
	 * 
	 * @name Dino.find_all
	 * @function
	 */
	D.find_all = D.filter;
	
	/**
	 * Отображение (размерность сохраняется)
	 * 
	 * @name Dino.map
	 * @function
	 * @param {Object|Array} src коллекция
	 * @param {Function} callback функция, вызываемая для каждого элемента
	 */
	D.map = function(obj, fn) {
		var a = D.isArray(obj) ? [] : {};
		for(var i in obj) a[i] = fn.call(obj, obj[i], i);
		return a;	
	};
	
	/**
	 * Поиск первого элемента, удовлетворяющего критерию
	 * 
	 * @name Dino.find
	 * @function
	 * @param {Object|Array} obj коллекция
	 * @param {Function|Any} criteria критерий 
	 */
	D.find = function(obj, criteria) {
		if(!D.isFunction(criteria)){
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
	 * Если критерий не является функцией, то используется метод Dino.eq
	 * 
	 * @name Dino.index_of
	 * @function
	 * @param {Object|Array} obj коллекция
	 * @param {Function|Any} criteria критерий 
	 */
	D.index_of = function(obj, criteria) {
		if(!_dino.isFunction(criteria))
			criteria = D.eq.curry(criteria);
		for(var i in obj)
			if(criteria.call(obj, obj[i], i)) return i;
		return -1;
	};
	
	/**
	 * Проверка, содержится ли элемент в массиве
	 * 
	 * @name Dino.in_array
	 * @function
	 * @param {Array} arr массив
	 * @param {Any} val значение
	 */
	D.in_array = function(arr, val) {
		for(var i = 0; i < arr.length; i++)
			if(arr[i] == val) return true;
		return false;
	}
	
	/**
	 * Удаление элемента из массива (массив уменьшает размерность)
	 * 
	 * @name Dino.remove_from_array
	 * @function
	 * @param {Object} arr массив
	 * @param {Object} val удаляемый элемент
	 */
	D.remove_from_array = function(arr, val) {
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
	 * @name Dino.deep_copy
	 * @function
	 * @param {Any} src копируемый объект
	 */
	D.deep_copy = function(src) {
		var copy = null;
		
		var is_po = D.isPlainObject(src);
		if(is_po || D.isArray(src)){
			copy = is_po ? {} : [];
			for(var i in src)
				copy[i] = D.deep_copy(src[i]);				
//			D.each(src, function(item, i){
//				copy[i] = D.deep_copy(item);
//			});
		}
		else{
			copy = src;
		}
		
		return copy;
	};

	
	
	/**
	 * Предикативная функция равенства
	 * 
	 * Используется оператор =
	 * 
	 * @name Dino.eq
	 * @function
	 * @param {Object|Array} obj коллекция
	 * @param {Object} item элемент коллекции
	 * @param {Object} i ключ/индекс элемента
	 */
	D.eq = function(obj, item, i) {
		return obj == item;
	};
	
	/**
	 * Предикативная функция неравенства
	 * 
	 * Используется оператор !=
	 * 
	 * @name Dino.ne
	 * @function
	 * @param {Object|Array} obj коллекция
	 * @param {Object} item элемент коллекции
	 * @param {Object} i ключ/индекс элемента
	 */
	D.ne = function(obj, item, i) {
		return obj != item;
	};
	
	
	
	
	/**
	 * @constructor
	 * @memberOf Dino
	 * @name ObjectTree
	 * @param {Object} obj
	 * @param {Object} factory
	 * @param {Object} ignore
	 */
	// набор методов, позволяющих работать с объектом как с деревом
	D.ObjectTree = function(obj, factory, ignore) {
		this.obj = obj;
		this.factory = factory;
		this.ignore_list = ignore || [];
	};
	
	/**
	 * @name Dino.ObjectTree#ensure
	 * @function
	 * @param {Object} path
	 */
	D.ObjectTree.prototype.ensure = function(path){
		if(D.isString(path)) path = path.split('.');
		
		var obj = this.obj;
		for(var i = 0; i < path.length; i++){
			var key = path[i];
			if(!(key in obj)) obj[key] = (this.factory) ? this.factory() : {};
			obj = obj[key];
		}
		return obj;
	}

	/**
	 * 
	 * @name Dino.ObjectTree#get
	 * @function
	 * @param {Object} path
	 */	
	D.ObjectTree.prototype.get = function(path){
		if(D.isString(path)) path = path.split('.');
		
		var obj = this.obj;
		for(var i = 0; i < path.length; i++){
			var key = path[i];
			obj = obj[key];
		}
		return obj;
	}
	
	/**
	 * 
	 * @name Dino.ObjectTree#del
	 * @function
	 * @param {Object} path
	 */
	D.ObjectTree.prototype.del = function(path) {
		if(D.isString(path)) path = path.split('.');

		var obj = this.obj;
		for(var i = 0; i < path.length; i++){
			var key = path[i];
			// если это последний элемент пути - удаляем
			if(i == path.length-1) 
				delete obj[key];
			else
				obj = obj[key];
		}
	},
	
	
	/**
	 * 
	 * @name Dino.ObjectTree#traverse
	 * @function
	 * @param {Object} callback
	 * @param {Object} obj
	 */
	D.ObjectTree.prototype.traverse = function(callback, obj) {
		if(arguments.length == 1) obj = this.obj;
		else{
			if(obj == null || obj == undefined) return;
			callback.call(this, obj);
		}
		
		for(var i in obj){
			if(D.isPlainObject(obj[i]) && !(D.in_array(this.ignore_list, i))) this.traverse(callback, obj[i]);
		}
	}
	
	
	D.otree = function(obj){
		return new D.ObjectTree(obj);
	};
	
	
	
	/**
	 * Печать объекта в удобочитаемой форме
	 * 
	 * @name Dino.pretty_print
	 * @function
	 * @param {Any} obj любой объект/примитив
	 * @param {Integer} indent отступ
	 * @returns {String}
	 */
	D.pretty_print = function(obj, indent) {
		
		if(obj == undefined) return undefined;
		
		indent = indent || 0;
		var tabs = '';
		for(var i = 0; i < indent; i++) tabs += '\t';
		
		if(obj.pretty_print) return obj.pretty_print(indent);
		
		if(D.isString(obj))
			return '"'+obj.replace(/\n/g, '\\n')+'"';
		else if(D.isBoolean(obj))
			return ''+obj;
		else if(D.isNumber(obj) || Dino.isBoolean(obj))
			return obj;
		else if(D.isArray(obj)){
			var items = [];
			D.each(obj, function(item){
				items.push(D.pretty_print(item, indent));
			});
			return '[' + items.join(', ') + ']';
		}
		else if(D.isFunction(obj)){
			return 'function()';
		}
		else if(D.isPlainObject(obj) || !indent){
			var items = [];
			D.each(obj, function(item, key){
				items.push(tabs + '\t' + key + ':' + D.pretty_print(item, indent+1));					
			});
			return '{\n' + items.join(',\n') + '\n' + tabs + '}';
		}
		else
			return obj
		
	};
	
	
	/**
	 * Экранирование строки для вывода в html
	 * 
	 * @name Dino.escapeHtml
	 * @function
	 * @param {String} s строка
	 * @returns {String} экранированная строка
	 */
	D.escapeHtml = function(s) {
		return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
	};
	
	/**
	 * Форматированный вывод значений.
	 * 
	 * @example
	 * Dino.format("%s items from %s selected", 1, 10);
	 * 
	 * @name Dino.format
	 * @function
	 * @param {String} format_str строка форматирования
	 * @return {String}
	 */
	D.format = function(format_str) {
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
	 * Dino.format_obj("#{first_name} #{last_name} has #{email_count} e-mails", record);
	 * 
	 * Output: Alice Green has 3 e-mails
	 * 
	 * @name Dino.format_obj
	 * @function
	 * @param {Object} format_str строка форматирования
	 * @param {Object} obj объект
	 */
	D.format_obj = function(format_str, obj) {
		return format_str.replace(/#{\s*(.+?)\s*}/g, function(str, key) {
			var o = obj;
			var arr = key.split('.');
			for(var i = 0; i < arr.length; i++) o = o[arr[i]]; 
			return o;
		});		
	}
	
	
	
/*	
	
	D.serialize = function(obj, indent) {
		
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
				if(D.isArray(obj)){
					D.each(obj, function(item){
						items.push(D.pretty_print(item, indent));
					});
					return '[' + items.join(', ') + ']';
				}
				else{
					D.each(obj, function(item, key){
						items.push(tabs + '\t"' + key + '":' + D.pretty_print(item, indent+1));					
					});
					return '{\n' + items.join(',\n') + '\n' + tabs + '}';
				}
			default:
				return obj;
		}
	};
*/	
	
	
	
	/**
	 * @name Dino.timestamp
	 * @function
	 */
	D.timestamp = function() {
		return new Date().getTime();
	};
	
	
	
		
	/**
	 * Добавление карринга к классу Function
	 */
	Function.prototype.curry = function(arg) {
		var F = this;
		return function(){
			var args = [];
			for(var i = 0; i < arguments.length; i++) args.push(arguments[i]);
			args.unshift(arg);
			return F.apply(this, args);
		};
	};

	Function.prototype.rcurry = function(arg) {
		var F = this;
		return function(){
			var args = [];
			for(var i = 0; i < arguments.length; i++) args.push(arguments[i]);
			args.push(arg);
			return F.apply(this, args);
		};
	};
	
	
	/**
	 * Базовый объект
	 * 
	 * @constructor
	 * @memberOf Dino
	 * @name BaseObject
	 */
	D.BaseObject = function() {
		this.initialize.apply(this, arguments);
	};
	
	/** 
	 * @function 
	 * @name Dino.BaseObject#initialize 
	 */
	D.BaseObject.prototype.initialize = function() {};
	/**
	 * @function
	 * @name Dino.BaseObject#destroy
	 */
	D.BaseObject.prototype.destroy = function() {};
	/**
	 * @function
	 * @name Dino.BaseObject#base
	 */
	D.BaseObject.prototype.base = function(method, args) {
		eval(this.className + '.superclass.'+method+'.apply(this, args)');
	};
	
	D.log = function(msg) {
		// Если установлен Firebug, то используем его консоль
		if(console) console.log(msg);
	};
	
	D.constants = {
	};
	
//	$.dino = D;
	
	return D;
})();

var _dino = Dino;


