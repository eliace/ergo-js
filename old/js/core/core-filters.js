



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
		
		if( $.isNumeric(i) ) f = F.by_index.curry(i);//return this.widgets[i]; // упрощаем
		else if( $.isString(i) ) f = F.by_props.curry({'_key': i});
		else if( $.isPlainObject(i) ) f = F.by_props.curry(i);
		else if( $.isClass(i) ) f = F.by_class.curry(i);
		else if( $.isFunction(i) ) f = i;
		
		return f;
	};






})();
