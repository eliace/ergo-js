


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
	E.each = function(src, callback, delegate){
		if($.isArray(src)){
			var arr = src;
			for(var i = 0; i < arr.length; i++){
				if( callback.call(delegate || arr, arr[i], i) === false ) return false;
			}
		}
		else {
			var obj = src;
			for(var i in obj){
				if( callback.call(delegate || obj, obj[i], i) === false ) return false;
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
		if( $.isArray(obj) ) {
			result = [];
			for(var i = 0; i < obj.length; i++)
				if( fn.call(obj, obj[i], i) ) result.push(obj[i]);
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
		if($.isArray(src)) {
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
		if($.isArray(obj)) {
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
			
		if($.isArray(obj)) {
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
		for(var i in obj) {
			if(obj[i][m_name]) obj[i][m_name].apply(obj[i], args || []);
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
		for(var i in obj)
			if(obj[i] == val) return true;
//		for(var i = 0; i < arr.length; i++)
//			if(arr[i] == val) return true;
		return false;
	};
	
	E.contains = E.includes;

	
	
	E.size = function(obj) {
		if($.isArray(obj)) return obj.length;

		var n = 0;
		for(var i in obj) n++;
		return n;
	};
	
	
	
	/**
	 * Удаление элемента из массива (массив уменьшает размерность)
	 * 
	 * @name Ergo.array_remove
	 * @function
	 * @param {Object} arr массив
	 * @param {Object} val удаляемый элемент
	 */
	
	E.remove_from_array = function(arr, val) {
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
	
	
	
	
})();
