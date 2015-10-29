



(function(){


	var E = Ergo;


	E.indent_s = '\t';

	/**
	 * Печать объекта в удобочитаемой форме
	 *
	 * @name Ergo.pretty_print
	 * @function
	 * @param {Any} obj любой объект/примитив
	 * @param {Integer} indent отступ
	 * @param {Integer} i_symb исимвол отступа
	 * @returns {String}
	 */
	E.pretty_print = function(obj, indent) {

		if(obj == undefined) return undefined;

		indent = indent || 0;
		var tabs = '';
		for(var i = 0; i < indent; i++) tabs += E.indent_s;

		if(obj.pretty_print) return obj.pretty_print(indent);

		if($.isString(obj))
			return '"'+obj.replace(/\n/g, '\\n')+'"';
		else if($.isBoolean(obj))
			return ''+obj;
		else if($.isNumeric(obj) || $.isBoolean(obj))
			return obj;
		else if($.isArray(obj)){
			var items = [];
			E.each(obj, function(item){
				items.push(E.pretty_print(item, indent));
			});
			return '[' + items.join(', ') + ']';
		}
		else if($.isFunction(obj)){
			return 'function() { ... }';
		}
		else if($.isPlainObject(obj) || !indent){
			var items = [];
			E.each(obj, function(item, key){
				if(key[0] == '!' || key[0] == '-' || key[0] == '+') key = "'"+key+"'";
				items.push(tabs + E.indent_s + key + ': ' + E.pretty_print(item, indent+1));
			});
			return '{\n' + items.join(',\n') + '\n' + tabs + '}';
		}
		else
			return obj;

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




	/**
	 *
	 *
	 * @name Ergo.timestamp
	 * @function
	 */
	E.timestamp = function() {
		return new Date().getTime();
	};






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



	E.unformat_obj = function(format_str, obj) {

		var n=0;

		var tmpl = ufmt.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");

		var keys = []

		tmpl = tmpl.replace(/#\\{\s*(.+?)\s*\\}/g, function(str, key) {
		  keys.push(key);
		  return '(.+?)'
		});

		var m = s.match(tmpl);

		if( keys[0] == '*') {
			return m[1];
		}
		else {
			var v = {}
			keys.forEach(function(key, i) {
			  v[key] = m[i+1]
			})
			return v;
		}

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

//		var is_po = $.isPlainObject(src);
//		if(is_po || $.isArray(src)){
		var is_po = (src && src.constructor == Object);
		if( src && (is_po || src.constructor == Array)) {
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









	//FIXME по большому счету это нужно только для корректной работы с событиями клавиатуры
	/*Browser detection patch*/
	E.browser = {};
	E.browser.mozilla = /mozilla/.test(navigator.userAgent.toLowerCase()) && !/webkit/.test(navigator.userAgent.toLowerCase());
	E.browser.webkit = /webkit/.test(navigator.userAgent.toLowerCase());
	E.browser.opera = /opera/.test(navigator.userAgent.toLowerCase());
	E.browser.msie = /msie/.test(navigator.userAgent.toLowerCase());



})();
