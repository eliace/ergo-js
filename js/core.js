/**
 * Здесь определяется пространство имен Dino и вспомогательные функции.
 * 
 * 
 * 
 */

var Dino = (function(){
	
	var D = {};

	//Копирование свойств одного объекта в другой (создание примеси)
	D.override = function(obj) {
		for(var j = 1; j < arguments.length; j++){
			var overrides = arguments[j];
			for(var i in overrides){
				var prop = overrides[i];
				if((i in obj) && D.isObject(obj[i]))
					D.override(obj[i], prop);
				else
					obj[i] = prop;
			}
		}
		return obj;
	};
	
	// псевдоним для override
	D.merge = D.override;
	
	// создание расширенного класса
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
	
	D.hierarchy = function(ctor, callback) {
		if(!ctor) return;
		D.hierarchy(ctor.super_ctor, callback);
		callback.call(this, ctor.prototype);
	};
	
	
	var _dtypes = {};
	
	/**
	 * Объявляем класс
	 * 
	 * class_name полное имя класса
	 * base_class имя базового класса
	 * overrides набор свойст, специфичный для нового класса
	 * dtype - dino-тип (если не указан, то новый класс не регистрируется)
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
		
		return clazz;
	};
	
	// создание экземпляра объекта (должен присутствовать dtype в options либо defaultType)
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

	D.widget = D.object;
	
	
/*	
	D.isFunction = function(obj) { return obj instanceof Function; };
	D.isArray = function(obj) {return obj instanceof Array;}
	D.isNumber = function(obj) {return typeof obj == 'number';};
	D.isBoolean = function(obj) {return typeof obj == 'boolean';};
	D.isString = function(obj) {return typeof obj == 'string';};
	D.isObject = function(obj) { return obj.constructor == Object; };
*/
	
	// в версии jquery 1.4 появились методы, которые раньше реализовывались в Dino
	D.isFunction = $.isFunction;
	D.isArray = $.isArray;
	D.isObject = $.isPlainObject;
	
	D.isString = function(obj) {
		return typeof obj == 'string';
	};

	D.isBoolean = function(obj) {
		return typeof obj == 'boolean';
	};

	D.isNumber = function(obj) {
		return typeof obj == 'number';
	};	
	
	// в jquery есть функция $.each, но меня не устраивает порядок аргументов в замыкании
	D.each = function(src, callback){
		if(Dino.isArray(src)){
			var arr = src;
			for(var i = 0; i < arr.length; i++) callback.call(arr, arr[i], i);
		}
		else {
			var obj = src;
			for(var i in obj) callback.call(obj, obj[i], i);
		}
	}
	
	/**
	 * фильтрация (как правило приводит к уменьшению размерности)
	 */
	D.filter = function(src, fn){
		return ( D.isArray(src) ) ? _filter_arr(src, fn) : _filter_obj(src, fn);
	};
	
	D._filter_obj = function(obj, fn) {
		var result = {};
		for(var i in obj)
			if( fn.call(obj, i, obj[i]) ) result[i] = obj[i];
		return a;
	}
	
	D._filter_arr = function(arr, fn) {
		var result = [];
		for(var i = 0; i < arr.length; i++)
			if( fn.call(arr, i, arr[i]) ) result.push(arr[i]);
		return result;
	}
	
	/**
	 * отображение (размерность сохраняется)
	 */
	D.map = function(obj, fn) {
		var a = D.isArray(obj) ? [] : {};
		for(var i in obj) a[i] = fn.call(obj, obj[i], i);
		return a;	
	};
	
	/**
	 * поиск первого элемента, удовлетворяющего критерию
	 */
	D.find = function(obj, fn) {
		if(!D.isFunction(fn)){
			var x = fn;
			fn = function(it) { return it == x; };
		}
		for(var i in obj)
			if(fn.call(obj, obj[i])) return i;
		
		return -1;
	};


	/**
	 * печать объекта в человекочитаемой форме
	 */
	D.pretty_print = function(obj, indent) {
		
		if(obj == undefined) return undefined;
		
		indent = indent || 0;
		var tabs = '';
		for(var i = 0; i < indent; i++) tabs += '\t';
		
		if(obj.pretty_print) return obj.pretty_print(indent);
		
		if(Dino.isString(obj))
			return '"'+obj.replace(/\n/g, '\\n')+'"';
		else if(Dino.isNumber(obj) || Dino.isBoolean(obj))
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
		else if(D.isObject(obj) || !indent){
			var items = [];
			D.each(obj, function(item, key){
				items.push(tabs + '\t' + key + ':' + D.pretty_print(item, indent+1));					
			});
			return '{\n' + items.join(',\n') + '\n' + tabs + '}';
		}
		else
			return obj
		
	};
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
	
	
/*	
	D.deep_copy = function(src) {
		if(typeof src == 'string') return src;
		if(typeof src == 'number') return src;
		if(D.isObject(src) || D.isArray(src)){
			var obj = (D.isArray(src))? [] : {};
			for(var i in src)
				obj[i] = D.deep_copy(src[i]);
			return obj;
		}
		
		return src;
	};
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
			args.push(arg);
			return F.apply(this, args);
		};
	};

	
	/**
	 * Базовый объект
	 */
	D.BaseObject = function() {
		this.initialize.apply(this, arguments);
	};
	
	D.BaseObject.prototype.initialize = function() {};
//	D.BaseObject.prototype.destroy = function() {};
	
	
	
	D.log = function(msg) {
		// Если установлен Firebug, то используем его консоль
		if(console) console.log(msg);
	};
	
	D.constants = {
	};
	
//	$.dino = D;
	
	return D;
})();




