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
			
			E.each(srcObj, function(p, i){
				if( p && p.constructor == Object ){//$.isPlainObject(p) ){
	//				if(!(i in o) || !$.isPlainObject(o[i])) o[i] = {};
					if(!(i in o) || o[i].constructor != Object) o[i] = {};
					Ergo.deep_override(o[i], p);
				}
				else if( p && p.constructor == Array ) {//$.isArray(p) ){
	//				if(!(i in o) || !$.isArray(o[i])) o[i] = [];
					if(!(i in o) || o[i].constructor != Array) o[i] = [];
					Ergo.deep_override(o[i], p);
				}
				else {
					o[i] = p;
				}
			});
		
		}
		
		return o;
	}
	
	
	
	
	
	
	
	var _keep_keys = false;
	
	
	
	var smart_override_prop = function(o, srcObj, i) {
	
		var p = srcObj[i];
	
		if(i == 'data') i = 'data!'; 										//<-- поле data не перегружается
	//	if(i == 'items') i = 'items!'; 										//<-- поле items не перегружается
		if(i == 'mixins') i = 'mixins+'; 				//<-- поле mixins сливается
		if(i == 'events') {
			var p2 = {};
			for(var j in p)
				p2[j+'+'] = p[j];
			p = p2;
		}
	
	//	var shared_opts = {'data': null};
	
		
	//	if((i in shared_opts)){//Ergo.in_array(ignore, i)){
	//		o[i] = p;
	//	}
	
		var last_literal = i[i.length-1];
	
		if(last_literal == '!') {
			var j = i.substr(0, i.length-1);
			if(!_keep_keys) i = j;
			o[i] = p;
			if(_keep_keys && (j in o)) delete o[j];
		}
		// else if(last_literal == '!') {
			// var j = i.substr(0, i.length-1);
			// if((j in o) && !Ergo.keep_keys) i = j;
			// o[i] = p;
			// if(Ergo.keep_keys && (j in o)) delete o[j];
		// }
		else if(last_literal == '+') {
			var j = i.substr(0, i.length-1);
			if(!_keep_keys) i = j;
			
			if(!(i in o)) o[i] = [];
			if( !$.isArray(o[i]) ) o[i] = [o[i]];
			p = o[i].concat(p);
			o[i] = p;
	
			if(_keep_keys && (j in o)) delete o[j];
		}
		else{
			//TODO здесь создается полная копия (deep copy) объекта-контейнера
			if( p && p.constructor == Object ) {//$.isPlainObject(p) ){
	//			if(!(i in o) || !$.isPlainObject(o[i])) o[i] = {};
				if(!(i in o) || o[i].constructor != Object) o[i] = {};
				Ergo.smart_override(o[i], p);
			}
			else if( p && p.constructor == Array ){//$.isArray(p) ){
	//			if(!(i in o) || !$.isArray(o[i])) o[i] = [];
				if(!(i in o) || o[i].constructor != Array) o[i] = [];
				Ergo.smart_override(o[i], p);
			}
			else {
				//TODO этот участок кода нужно исправить
				
				// если элемент в перегружаемом параметре существует, то он может быть обработан специфически
				if(i in o){
					// классы сливаются в одну строку, разделенную пробелом
					if(i == 'cls') p = o[i] + ' ' + p;
					if( /^on\S/.test(i) ) {
						if( !$.isArray(o[i]) ) o[i] = [o[i]];
						p = o[i].concat(p);
					}
					// if(i == 'state') {
						// p = o[i] + ' ' + p;
					// }
				}
				o[i] = p;
			}
		}
		
	}
	
	
	/**
	 * "Умное" копирование свойств одного объекта в другой (условная перегрузка) 
	 * @param {Object} obj целевой объект, которому будут добавлены новые свойства
	 * @name @Ergo.smart_override
	 * @function
	 * 
	 */
	E.smart_override = function(o) {
	
		var keep_keys = false;
		
		if(!o) {
			_keep_keys = keep_keys = true;
			o = {};
		}
	
		// обходим все аргументы, начиная со второго
		for(var j = 1; j < arguments.length; j++){
			
			var srcObj = arguments[j];
			
	//		if( $.isArray(srcObj) ){
	//			for(var i = 0; i < srcObj.length; i++)
	//				Ergo.utils.overrideProp(o, srcObj, i);
	//		}
	//		else {
		
			for(var i in srcObj)
				smart_override_prop(o, srcObj, i);				
		
	//		}		
		}
		
		if(keep_keys)
			_keep_keys = false;
		
		return o;
	}
	
	
	
	
	
	
	
	
	
	
	
	
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
	
	
	//FIXME эта функция не так уж нужна
	E.filter_list = function(val, list) {
		for(var i = 0; i < list.length; i++)
			if(!list[i].call(this, val)) return false;
		return true;
	}
	
	
	
	
	
	
	
	
	
	

	
	
	
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
		
		return $('<div class="e-glasspane" autoheight="ignore"/>')
			.on('mousedown', function(e){
				e.preventDefault();
				return false;				
			});
		
	};
	
	
	
	
	return E;
})();

//var _dino = Ergo;


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









