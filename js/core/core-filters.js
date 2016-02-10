



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




})();
