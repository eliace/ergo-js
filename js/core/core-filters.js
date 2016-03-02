



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
		value ? this.dom.addClass(name) : this.dom.removeClass(name);
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
			this.dom.el.setAttribute(name, v);
		},
		get: function(name) {
			return this.el.dom.getAttribute(name);
		}
	}




//	Ergo = A;

})();
