
//= require vdom











/**
 * @class
 * @name Ergo.core.Layout
 * @param {Object} opts
 */

// Ergo.core.Layout = function() {
// 	var a = new Array(arguments.length);
// 	for(var i = 0; i < arguments.length; i++)
// 		a[i] = arguments[i];
//
// 	this._initialize.apply(this, arguments);
//
// }
//
// Ergo.merge(Ergo.core.Layout.prototype, {

Ergo.defineClass('Ergo.core.Layout', /** @lends Ergo.core.Layout.prototype */ {

	extends: 'Ergo.core.VDOM',

	defaults: {
//		updateMode: 'auto'
	},


	_initialize: function() {
		Ergo.core.Layout.superclass._initialize.apply(this, arguments);

		var o = this.options;


		this.outerEl = this.el;
    this.innerEl = this.el;


//		this.options = o || {};
		if('name' in this.defaults) {
			this.options.name = this.defaults.name;
		}

		if('name' in o) this.el.setAttribute('layout', o.name);
		if('cls' in o) this.addClass(o.cls.join(' '));

		// зачатки шаблона
    if(this.html) {
      this.el.innerHTML = this.html;
      while(this.innerEl.childNodes.length) {
        this.innerEl = this.innerEl.childNodes[0];
      }
    }



	},




	// get inner() {
	// 	return (this.innerEl == this.el) ? this : new Ergo.core.VDOM(this.innerEl);
	// },
	//
	// get outer() {
	// 	return (this.outerEl == this.el) ? this : new Ergo.core.VDOM(this.outerEl);
	// },






	detach: function() {
		if(this.outerEl.parentNode) {
			this.outerEl.parentNode.removeChild(this.outerEl);
		}
	},


/*
	_initialize: function(o){
//		this._super(o);
		Ergo.core.Layout.superclass._initialize.call(this, o);

		this.events = new Ergo.events.Observer(this);

//		var o = this.options = {};
//
//		Ergo.hierarchy(this.constructor, function(clazz){
//			if('defaults' in clazz) Ergo.smart_override(o, clazz.defaults);
//		});
//		Ergo.smart_override(o, this.defaults, opts);

	},
*/

	/**
	 * ассоциация компоновки с виджетом
	 * @param {Object} c виджет
	 */
// 	attach: function(c) {
//
// 		var o = this.options;
//
// //		this._widget = c;
//
// 		if('name' in o) this.el.setAttribute('layout', o.name);
// 		if('cls' in o) this.addClass(o.cls.join(' '));
//
// 		// this.dom = this._widget.dom;
// 		// this.el = this._widget.dom.el;
//
// 		// if(o.html){
// 		// 	var html = $(o.html);
// 		// 	this.el = (o.htmlSelector) ? $(o.htmlSelector, html) : html;
// 		// 	this._widget.el.append(html);
// 		// }
//
// 		// this._widget.events.on('diff', function(e) {
// 		// 	// перестраиваем компоновку
// 		// 	this._rebuild(e.updated);
// 		// }.bind(this));
//
// 	},

	/**
	 * удаление ассоциации компоновки с виджетом
	 */
// 	detach: function() {
// //		if('containerCls' in this.options) this.container.el.removeClass(this.options.containerCls);
// 		if('name' in this.options) this.el.removeAttribute('layout');
// 		if('cls' in o) this.el.removeClass(o.cls.join(' '));
// 		delete this._widget;
// 	},



	/**
	 * Оборачивание элемента.
	 *
	 * @param {Ergo.core.Widget} item виджет
	 * @return {jQuery} jQuery-объект, содержащий обертку и элемент виджета
	 *
	 */
	wrap: function(item) {
		return item.vdom.el;
	},


	/**
	 * jQuery-элемент, куда будут добавляться виджеты
	 *
	 */
	select: function(item) {
		return this.innerEl;
//		var o = this.options;
//		return (o.elementSelector) ? o.elementSelector.call(this, item) : this.el;
	},






	/**
	 * добавление нового элемента-виджета в компоновку
	 *
	 * @param {Ergo.core.Widget} item виджет
	 * @param {int} index порядковый номер (может быть не определен)
	 * @param {int} weight вес группы
	 */
/*
	add: function(item, pos, weight, group) {

//		var selector = item.options.layoutSelector;

//		var el = this.el;

		var o = this.options;


		//FIXME определяем вес
		// если вес не указан, то вес считается равным 0
		var weight = item.options.weight || 0;
//		item._weight = weight;

		//получаем индекс
//		var index = item._index;


		// выбираем элемент, куда будет добавляться элемент-виджет
		var el = (o.selector) ? o.selector.call(this, item) : this.select(item);

		// создаем обертку (если она необходима) для элемента-виджета
		var item_el = (o.wrapper) ? o.wrapper.call(this, item) : this.wrap(item);



		if(item.options.wrapper) {

			if(item_el == item.__vdom.el) {
				item_el = document.createElement('div');
				item_el.appendChild(item.__vdom.el);
//				item_el = $('<div/>').append(item.dom.el);
			}

			item._wrapper = $.ergo( Ergo.deepMerge({etype: 'widgets:widget', tag: item_el, autoRender: false}, item.options.wrapper) );
			item._wrapper._weight = weight;

		}


		if(item_el != item.__vdom.el) {
			item.__vdom.outerEl = item_el;
		}

		// экспериментальный код
		if(item._key && item.options.autoClass) {
			$ergo.dom.addClass(item_el, item._key);
		}
//			item_el.addClass(item._key);



//		item_el.data('weight', weight);



//		item_el._group = item.options.group;


//		var elements = el.contents();
		var elements = el.childNodes;// new Ergo.core.Array(el[0].childNodes);

		// фильтруем список элементов
		// if(item.options.group) {
		// 	elements = Array.prototype.filter.call(elements, function(elem) {
		// 		return ( elem._ergo && elem._ergo.options.group == item.options.group )
		// 	});
		//
		// 	// var filtered = [];
		// 	// for(var j = 0; j < elements.length; j++) {
		// 	// 	var elem = elements[j];
		// 	// 	if( elem._ergo && elem._ergo.options.group == item.options.group ) filtered.push(elem);
		// 	// }
		// 	// elements = filtered;
		//
		//
		// 	// elements = Ergo.filter(elements, function(i, elem){
		// 		// return (elem._ergo) ? (elem._ergo.options.group == item.options.group) : false;
		// 	// });
		// }


		if(group) {

			var beforeEl = null;
			var afterEl = null;

			for(var i = 0; i < group.length; i++) {
				var g = group[i];
				var groupElements = [];

//				var lastEl = elements[elements.length-1];

				for(var j = 0; j < elements.length; j++) {
					var siblingEl = elements[j];
					var siblingGroup = siblingEl._group[i];
					// та же группа (вес+индекс)
					if(siblingGroup[0] == g[0] && siblingGroup[1] == g[1]) {
						groupElements.push(elements[j]);
					}
					// меньшая группа (вес+индекс)
					else if(siblingGroup[0] < g[0] || siblingGroup[1] < g[1]) {
						beforeEl = siblingEl;
					}
					// большая группа (вес+индекс)
					else if(siblingGroup[0] > g[0] && siblingGroup[1] > g[1]) {
						afterEl = siblingEl;
					}
				}

				elements = groupElements;
			}
		}






		// если индекс не определен, то элемент должен быть добавлен последним в свою группу
		if(pos == null) {

			pos = 0;

			// обходим все элементы контейнера в поисках первого с большим весом
			var after_el = null;

			// немножко эвристики
			var last = elements[elements.length-1];

//			index = 0;

			if(elements.length == 0) {
				el.appendChild( item_el );
			}
			else if(last._weight <= weight) {
				$ergo.dom.insertAfter(item_el, last);
				pos = last._pos+1;
//				last.after(item_el);
			}
			// else if(last[0]._weight == weight) {
			// 	last.after(item_el);
			// 	index = last[0]._index+1;
			// }
			else {

				for(var j = 0; j < elements.length; j++) {
					var elem = elements[j];
					var w = elem._weight;// $(elem).data('weight');
					if(w > weight) {
						after_el = elem;
						break;
					}
					else if(w == weight) {
						pos = elem._pos+1;
					}
					// else if(w == weight) {
					// 	index = elem._index+1;
					// }
				}
				// elements.each(function(i, elem){
					// var w = elem._weight;// $(elem).data('weight');
					// if(w > weight) {
						// after_el = $(elem);
						// return false;
					// }
				// });


				if(after_el)
					$ergo.dom.insertBefore(item_el, after_el);
//					after_el.before( item_el );
				else if(elements.length)
					$ergo.dom.insertAfter(item_el, last);
//					last.after( item_el );
				else
					el.appendChild( item_el );
//					el.append( item_el );
			}




//			item_el[0]._index = index;

			// var after_el = null;
			// el.children().each(function(i, elem){
				// var w = $(elem).ergo();
				// if(w && w._weight > weight) {
					// after_el = $(elem);
					// return false;
				// }
			// });
//
			// if(after_el)
				// after_el.before( item_el );
			// else
				// el.append( item_el );
		}
		// else if(index === 0) {
			// var before_a = [];
			// for(var i = elements.length-1; i >= 0; i--) {
				// var w = $(elements[i]).ergo();
				// if(w && w._weight < weight) before_a.push($(elements[i]));
			// }
//
			// if(before_a.length > 0)
				// before_a[before_a.length-1].after( item_el );
			// else if(elements.length)
				// elements.first().before( item_el );
			// else
				// el.prepend( item_el );
		// }
		else {

//			console.log(index);

//			var elements = el[0].childNodes;// new Ergo.core.Array(el[0].childNodes);


			// немножко эвристики
			var last = elements[elements.length-1];

			// if(elements.length > 0)
				// console.log('last ', last[0]);
//			console.log('--1--');
//			console.log(elements.length);
//			console.log(elements[elements.length-1]);
//			if(elements.length != 0)
//			console.log(last[0], last[0]._weight, last[0]._index);
//			console.log('--2--');

//			console.log(index);

			if(elements.length == 0) {
				el.appendChild( item_el );
//				el.append( item_el );
//				console.log('---1---');
			}
			else if(last._weight == weight && last._pos < pos){
				$ergo.dom.insertAfter(item_el, last);
//				last.after(item_el);
//				console.log('---2---');
			}
			else {

//				console.log('---3---', index, last[0]._index);

//				console.log(index, 'layout');

				var arr = [];
				var before_el = null;
				var after_el = null;
	//			this.container.children.each(function(it){
				for(var k = 0; k < elements.length; k++) {
//				elements.each(function(k, child){
					var child = elements[k];

					// it = $(child).ergo();
					// if(!it || it == item) return; //если элемент еще не отрисован, это вызовет ошибку
					// if(it._weight == weight) arr.push(it);//.el);
					// else if(it._weight <= weight) before_el = it.el;
					// else if(!after_el ) after_el = it.el;

					if(child._weight == weight) arr.push( child );//.el);
					else if(child._weight <= weight) before_el = child;

					else if(!after_el ) after_el = child;
				}//);




				// for(var i = 0; i < arr.length; i++) {
				// 	if( arr[i]._index >= index  ) {
				// 		if(!after_el) after_el = arr[i].el;
				// 	}
				// 	else {
				// 		before_el = arr[i].el;
				// 	}
				// }


				for(var i = 0; i < arr.length; i++) {
					if( arr[i]._pos >= pos  ) {
						if(!after_el) after_el = arr[i];
					}
					else {
						before_el = arr[i];
					}
				}



				if(before_el) {
					$ergo.dom.insertAfter( item_el, before_el );
				}
//					before_el.after( item_el );
				else if(after_el)
					$ergo.dom.insertBefore( item_el, after_el );
//					after_el.before( item_el );
				else if(elements.length)
					$ergo.dom.insertAfter( item_el, last );
//					last.after( item_el );
				else {
					el.appendChild( item_el );
//					el.append( item_el ); //FIXME это уже не нужно
				}



				// }
				// else {
					// arr[index].before(item_el);
				// }
			}



		}
		// else if(index == 0)
			// el.prepend( item.el );
		// else if($.isNumber(index))
			// el.children().eq(index-1).before(item.el);
		// else
			// index.el.before(item.el);

		// VDOM?

		item_el._pos = pos;

		item_el._weight = weight;

		item_el._group = group;


		var sibling = item_el.nextSibling;
		while(sibling && sibling._weight === item_el._weight) {
			sibling._pos++;
			sibling = sibling.nextSibling;
		}



		item._rendered = true;

		this._widget.events.fire('item#rendered', {item: item});

		// deprecated
//		if('itemCls' in this.options) item.el.addClass(this.options.itemCls);
//		if('itemStyle' in this.options) item.el.css(this.options.itemStyle);
	},
*/

	_groupElements: function(group) {

		var beforeEl = null;
		var afterEl = null;

		var elements = this.innerEl.childNodes;


		for(var i = 0; i < group.length; i++) {
			var g = group[i];
			var groupElements = [];

//				var lastEl = elements[elements.length-1];

			for(var j = 0; j < elements.length; j++) {

				if(!elements[j]._group) {
					continue;
				}

				var siblingEl = elements[j];
				var siblingGroup = siblingEl._group[i];
				// та же группа (вес+индекс)
				if(siblingGroup[0] == g[0] && siblingGroup[1] == g[1]) {
					groupElements.push(elements[j]);
				}
				// меньшая группа (вес+индекс)
				else if(siblingGroup[0] < g[0] || siblingGroup[1] < g[1]) {
					beforeEl = siblingEl;
				}
				// большая группа (вес+индекс)
				else if(siblingGroup[0] > g[0] && siblingGroup[1] > g[1]) {
					afterEl = siblingEl;
				}
			}

			elements = groupElements;
		}

		return elements;
	},



	at: function(pos, weight, group) {

		var w = weight || 0;

		var elements = this.innerEl.childNodes;

		if(group) {
			elements = this._groupElements(group);
		}

		for(var i = 0; i < elements.length; i++) {
			if( elements[i]._pos == pos && elements[i]._weight == w ) {
				return elements[i];
			}
		}

		return null;
	},



	addBefore: function(item, otherItem, w, group) {

		var o = this.options;

		var itemEl = item.vdom.outerEl;

		var pos = 0;
		var weight = w || 0;


		// выбираем элемент, куда будет добавляться элемент-виджет
		var targetEl = (o.selector) ? o.selector.call(this, item) : this.select(item);

		// создаем обертку (если она необходима) для элемента-виджета
		var itemEl = (o.wrapper) ? o.wrapper.call(this, item) : this.wrap(item);



		if(item.options.wrapper) {

			if(itemEl == item.__vdom.el) {
				itemEl = document.createElement('div');
				itemEl.appendChild(item.__vdom.el);
//				item_el = $('<div/>').append(item.dom.el);
			}

			item._wrapper = $.ergo( Ergo.deepMerge({etype: 'widgets:widget', tag: itemEl, autoRender: false}, item.options.wrapper) );
			item._wrapper._weight = weight;

		}


		if(itemEl != item.__vdom.el) {
			item.__vdom.outerEl = itemEl;
		}

		// экспериментальный код
		if(item._key && item.options.autoClass) {
			$ergo.dom.addClass(item_el, item._key);
		}




		var elements = targetEl.childNodes;


		if(!otherItem && group) {

			elements = this._groupElements(group);

		}

		var lastEl = elements[elements.length-1];
		var firstEl = elements[0];



		// если указан предыдущий элемент
		if(otherItem) {

			var otherEl = otherItem.vdom.outerEl;

			$ergo.dom.insertBefore(itemEl, otherEl);

			pos = otherEl._pos;

			// увеличиваем индекс всех последующих элементов того же веса
			var _el = itemEl.nextSibling;
			while(_el && _el._weight == weight) {
				_el._pos++;
				_el = _el.nextSibling;
			}

		}
		// если элементов в DOM вообще нет
		else if(elements.length == 0) {
			targetEl.appendChild(itemEl);
		}
		// если вес элемента меньше минимального веса
		else if(firstEl._weight > weight) {
			$ergo.dom.insertBefore(itemEl, firstEl);
		}
		// добавляем элемент в конец группы
		else {
			// ищем последний элемент меньшего веса или первый элемент большего веса
			var beforeEl = null;
			var afterEl = null;
			for(var i = 0; i < elements.length; i++) {
				var _el = elements[i];
				if(_el._weight != null && _el._weight < weight) {
					beforeEl = _el;
				}
				else {
					afterEl = _el;
					break;
				}
			}

			if(beforeEl) {
				$ergo.dom.insertAfter(itemEl, beforeEl);
				pos = beforeEl._pos;
			}
			else if(afterEl) {
				$ergo.dom.insertBefore(itemEl, afterEl);
			}


		}


		itemEl._pos = pos;
		itemEl._weight = weight;
		itemEl._group = group;

		item._rendered = true;

		this._widget.events.fire('item#rendered', {item: item});


	},




	addAfter: function(item, otherItem, w, group) {

		var o = this.options;

		var itemEl = item.vdom.outerEl;

		var pos = 0;
		var weight = w || 0;


		// выбираем элемент, куда будет добавляться элемент-виджет
		var targetEl = (o.selector) ? o.selector.call(this, item) : this.select(item);

		// создаем обертку (если она необходима) для элемента-виджета
		var itemEl = (o.wrapper) ? o.wrapper.call(this, item) : this.wrap(item);



		if(item.options.wrapper) {

			if(itemEl == item.__vdom.el) {
				itemEl = document.createElement('div');
				itemEl.appendChild(item.__vdom.el);
//				item_el = $('<div/>').append(item.dom.el);
			}

			item._wrapper = $.ergo( Ergo.deepMerge({etype: 'widgets:widget', tag: itemEl, autoRender: false}, item.options.wrapper) );
			item._wrapper._weight = weight;

		}


		if(itemEl != item.__vdom.el) {
			item.__vdom.outerEl = itemEl;
		}

		// FIXME
		if(otherItem && otherItem.__vdom.targetKey != item.__vdom.targetKey) {
			otherItem = null;
		}

		// экспериментальный код
		if(item._key && item.options.autoClass) {
			$ergo.dom.addClass(item_el, item._key);
		}




		var elements = targetEl.childNodes;


		if(!otherItem && group) {

			elements = this._groupElements(group);

		}

		var lastEl = elements[elements.length-1];



		// сомнительная оптимизация
		if(otherItem && otherItem.vdom.outerEl == lastEl) {
//			console.log('element insert after (fast)');
			targetEl.appendChild(itemEl);
			pos = lastEl._pos+1;
		}
		// если указан предыдущий элемент
		else if(otherItem) {
//			console.log('element insert after');

			var otherEl = otherItem.vdom.outerEl;

			$ergo.dom.insertAfter(itemEl, otherEl);

			pos = otherEl._pos+1;

			// увеличиваем индекс всех последующих элементов того же веса
			var _el = itemEl.nextSibling;
			while(_el && _el._weight == weight) {
				_el._pos++;
				_el = _el.nextSibling;
			}

		}
		// если элементов в DOM вообще нет
		else if(elements.length == 0) {
			targetEl.appendChild(itemEl);
		}
		// если вес элемента больше максимального веса
		else if(lastEl._weight <= weight) {
			targetEl.appendChild(itemEl);
			pos = lastEl._pos+1;
		}
		// добавляем элемент в конец группы
		else {
//			console.log('element lookup');

			// ищем последний элемент меньшего веса или первый элемент большего веса
			var beforeEl = null;
			var afterEl = null;
			for(var i = 0; i < elements.length; i++) {
				var _el = elements[i];
				if( (_el._weight || 0) <= weight) {
					beforeEl = _el;
				}
				else {
					afterEl = _el;
					break;
				}
			}

			if(beforeEl) {
				$ergo.dom.insertAfter(itemEl, beforeEl);
				pos = beforeEl._pos;
			}
			else if(afterEl) {
				$ergo.dom.insertBefore(itemEl, afterEl);
			}


		}


		itemEl._pos = pos;
		itemEl._weight = weight;
		itemEl._group = group;

		item._rendered = true;

		this._widget.events.fire('item#rendered', {item: item});
	},





	/**
	 * удаление элемента-виджета из компоновки
	 * @param {Object} item
	 */
	remove: function(item) {

		var item_el = item.vdom.outerEl;// (item._wrapper_el || item.dom.el);


		var sibling = item_el.nextSibling;
		while(sibling && sibling._weight === item_el._weight) {
			sibling._pos--;
			sibling = sibling.nextSibling;
		}


		if(item._wrapper_el) {
			item._wrapper_el.remove(); //?

			if(item._wrapper)
				item._wrapper._destroy();
		}
		else {
			item.vdom.detach(); //TODO опасный момент: все дочерние DOM-элементы не уничтожаются
		}

		item._rendered = false;

		if('itemCls' in this.options) item.vdom.el.removeClass(this.options.itemCls);

		this._widget.events.fire('item#unrendered', {item: item});

	},


	/**
	 * очистка компоновки от всех элементов (уничтожения дочерних элементов не происходит)
	 */
	clear: function() {
		$ergo.dom.clear(this.el);
//		this.el.empty(); //WARN еще опасный момент все дочерние DOM-элементы уничтожаются
	},


	/**
	 * обновление компоновки (позиции, размеров элементов)
	 */
	update: function() {


		// AUTO WIDTH
		if(this._widget.options.autoWidth){

			var _el = this._widget.el;

			// если элемент не отображается - его не надо выравнивать
			if(!_el.not(':hidden')) return;


			// рассчитываем отступы
			var dw = 0;
			if(_el.is(':button')) dw = _el.outerWidth(true) - _el.outerWidth();
			else dw = _el.outerWidth(true) - _el.width();
			// скрываем элемент
//			_el.hide();
			_el.addClass('hidden');

			// ищем родителя, у которого определена ширина
			var w = 0;
			_el.parents().each(function(i, el){
				if(!w) w = $(el).width();
				if(w) return false;
			});

			if(_el.attr('autowidth') != 'ignore-siblings') {
				// обходим всех видимых соседей и получаем их ширину
				_el.siblings().not(':hidden').each(function(i, sibling){
					var sibling = $(sibling);
					if(sibling.attr('autoWidth') != 'ignore')
						w -= sibling.outerWidth(true);
				});
			}

			// задаем ширину элемента (с учетом отступов), если она не нулевая
			if(w - dw)
				_el.width(w - dw);

			// отображаем элемент
//			_el.show();

			_el.removeClass('hidden');
		}

		// AUTO HEIGHT
		if(this._widget.options.autoHeight) {//} &&  this.container.options.autoHeight != 'ignore'){

			var _el = $(this.el);


			if(!_el.is(":visible")) return;
			if(_el.attr('autoHeight') == 'ignore') return;


			if(_el.attr('autoHeight') == 'fit') {

				var h0 = _el.height();
				var dh = _el.outerHeight() - _el.height();

				_el.hide();

				var h = this._widget.options.height || 0;
				_el.parents().each(function(i, el){
					if(!h) h = $(el).height();
					if(h) return false;
				});

				h = Math.floor(h - dh);

				if(h > h0)
					_el.height(h);

				_el.show();

				return;
			}


			var debug = (this._widget.debug == 'autoheight');

			_el.height(0);


//			this.el.hide();

			var dh = 0;
			var h = 0;
			_el.parents().each(function(i, el){
				el = $(el);
				var w = el.ergo();
				if((w && w.options.height) || el.attr('autoHeight') == 'true' || el.attr('autoHeight') == 'stop' || el.is('body')){
					h = el.height();
//					h = el[0].scrollHeight;
					return false;
				}
				else {
//					if(dh == 0) dh = el.height();
					if(el.attr('autoheight') != 'ignore-siblings') {
						dh += (el.outerHeight(true) - el.height());
						el.siblings().not('td, :hidden').each(function(i, sibling){
							sibling = $(sibling);
							if(sibling.attr('autoHeight') != 'ignore')
								dh += sibling.outerHeight(true);
						});
					}
				}
			});


//			if(Ergo.context.debug) console.log({h: h, dh: dh});

			dh += (_el.outerHeight(true) - _el.height());

//			if(Ergo.context.debug) console.log({h: h, dh: dh});


			var self = this;

			// обходим все соседние элементы
			var h_ratio = 1;
			_el.siblings().not('td').each(function(i, sibling){
				sibling = $(sibling);
				var ah = sibling.attr('autoHeight');
				// элемент видимый
				if(!ah) {
					if(sibling.is(':visible'))
						dh += sibling.outerHeight(true);
				}
				else if(ah != 'ignore-siblings' && ah != 'ignore') {
					h_ratio++;
					dh += sibling.outerHeight(true) - sibling.height();
				}
			});



			// var h_ratio = 1;
//
			// if(this.container.parent) {
//
			// this.container.parent.children.each(function(sibling){
				// if(sibling == self.container) return;
				// var ah = sibling.options.autoHeight;
				// if(!ah) {
					// dh += sibling.el.outerHeight(true);
				// }
				// else if(ah != 'ignore-siblings') {
					// h_ratio++;
					// dh += sibling.el.outerHeight(true) - sibling.el.height();
				// }
			// });
//
			// }



			// if(this.el.attr('autoheight') != 'ignore-siblings') {
				// this.el.siblings().not('td, :hidden').each(function(i, sibling){
					// sibling = $(sibling);
					// if(sibling.attr('autoHeight') != 'ignore') {
						// dh += sibling.outerHeight(true);
						// if(debug)	console.log({type: 'sibling', el: sibling, h: sibling.outerHeight(true)});
					// }
				// });
			// }




			if(Ergo.context.debug) console.log({h: h, dh: dh, k: h_ratio});

//			this.el.height((h - dh)/h_ratio);

			if( this.options.autoHeightType == 'min' ) {

				_el.height('');

				_el.css('min-height', (h - dh)/h_ratio);
			}
			else if( this.options.autoHeightType == 'max' ) {

				_el.height('');

				_el.css('max-height', (h - dh)/h_ratio);
			}
			else {
				_el.height((h - dh)/h_ratio);
			}

//			this.el.show();

		}

		// AUTO FIT
		if(this._widget.options.autoFit === true){

			var _el = $(this.el);

			var dw = _el.outerWidth() - _el.width();
			var dh = _el.outerHeight() - _el.height();

			_el.hide();

			var h = this._widget.options.height || 0;
			var w = this._widget.options.width || 0;
			_el.parents().each(function(i, el){
				if(!h) h = $(el).height();
				if(!w) w = $(el).width();
				if(w && h) return false;
			});

			_el.siblings().not(':hidden').each(function(i, el){
				w -= $(el).outerWidth(true);
			});

			_el.width(w - dw);
			_el.height(Math.floor(h - dh));

			_el.show();
		}

	},

	/**
	 * обновление компоновки (порядка, количества элементов)
	 */
	_rebuild: function(updated) {

		console.log('REBUILD LAYOUT', updated);

		// if(updated) {
		// 	for(var i = 0; i < updated.length; i++) {
		// 		var item = updated[i];
		// 		item.unrender();
		// 		item.render();
		// 	}
		// }

	},



	build: function() {

//		var render_list = [];

		// this._widget.children.each(function(item){
//
//
//
		// });


	}



});//, 'layouts:default');


Ergo.alias('layouts:default', Ergo.core.Layout);


// Ergo.$layout = function(o, etype) {
	// return Ergo.object(o, 'layout:'+etype);
// };




/**
 *  Пространство имен для компоновок
 * @namespace
 */
Ergo.layouts = {};


//Ergo.$layouts = Ergo.object;

Ergo.$layouts = function(o, etype) {

	var clazz = Ergo._aliases['layouts:'+etype];

	if(!clazz/*!Ergo.alias(etype)*/) {

		// var i = etype.indexOf(':');
		// if(i > 0) {
		// 	etype = etype.substr(i+1);
		// }

		o.unshift({name: etype});

		etype = 'default';
	}

	return Ergo.object('layouts', etype, o);
};
