



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
