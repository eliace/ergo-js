
//= require data
//= require states
//= require layout
//= require widget-opts
//= require widget-props
//= require widget-list
//= require widget-data
//= require widget-render
//= require widget-jquery





/**
 * Базовый объект для всех виджетов
 *
 * Опции:
 *
 *
 *
 * @class
 * @name Ergo.core.Widget
 * @extends Ergo.core.Object
 * @param {Object} o параметры
 * @param {string} o.layout компоновка дочерних виджетов
 * @param {function} o.layoutFactory фабрика компоновок
 * @param {string} o.as css-классы или состояния (аналог cls и state)
 * @param {string} o.cls css-классы
 * @param {object} o.style хэш стилей
 * @param {string} o.tag html-тег виджета
 * @param {object} o.components хэш компонентов
 * @param {object} o.defaultComponent опции компонента по умолчанию
 * @param {function} o.componentFactory фабрика компонентов
 * @param {array} o.items массив элементов
 * @param {object} o.defaultItem опции элемента по умолчанию
 * @param {function} o.itemFactory фабрика элементов
 * @param {boolean} o.dynamic флаг динамического связывания
 * @param {string} o.dataId ключ в источнике данных
 * @param {object} o.events хэш событий
 * @param {object} o.states хэш состояний
 * @param {object} o.transitions хэш переходов между состояниями
 * @param {string} o.stt предустановленное состояние
 * @param {function} o.rendering обработчик перерисовки
 * @param {string} o.renderTo селектор родительского элемента
 * @param {boolean} o.showOnRender вызов метода show при создании
 * @param {boolean} o.hideOnDestroy вызов метода hide при удалении
 * @param {string|function} o.binding обработчик связывания данных с виджетом
 * @param {object} o.wrapper опции "обертки"
 * @param {function} o.format форматирование "сырого" значения к строке, отображаемой виджетом
 * @param {function} o.unformat преобразование отображаемго/редактируемого значения в "сырые" данные
 * @param {boolean} o.autoBind автоматическое связывание с данными
 * @param {boolean} o.autoRender авто-отрисовка при создании
 * @param {boolean} o.autoHeight автоматический расчет высоты
 * @param {boolean} o.autoWidth автоматический расчет ширины
 *
 * @mixes observable
 * @mixes statable
 *
 * @property {object} options Опции
 * @property {Ergo.core.VDOM} vdom Узел виртуального DOM
 * @property {jQuery} el
 * @property {Ergo.core.DataSource} data Связанный источник данных
 * @property {Ergo.core.Observer} events Обработчик событий
 * @property {Ergo.core.StateManager} states Обработчик состояний
 * @property {Ergo.core.Items} items Элементы
 * @property {Ergo.core.Components} components Компоненты
 * @property {any} name Служебное имя/индекс/ключ
 * @property {any} value Значение
 * @property {Ergo.core.Widget} parent Родительский виджет
 *
 *
 */
Ergo.defineClass('Ergo.core.Widget', /** @lends Ergo.core.Widget.prototype */{

	extends: 'Ergo.core.Object',

	mixins: ['observable', 'statable'],

	defaults: {
	},



	/**
	 * Уничтожение виджета
	 *
	 * Удаляются связи в виртуальном дереве виджетов, отключается связь с данными,
	 * удаляется элемент из DOM-дерева, уничтожаются все дочерние виджеты.
	 *
	 * @protected
	 */
	_destroy: function(root) {
		Ergo.core.Widget.superclass._destroy.call(this);

		var self = this;


		this.events.fire('beforeDestroy');

		// if(this.options.hideOnDestroy && !noHide) {
			// return this.hide().then(function() { self._destroy(true); });
		// }
		// else {

		var destroy = function(){

			if(this.data)
				this.data.events.off(this);

			// очищаем регистрацию обработчиков событий
			if(this.context) {
				this.context.events.off(this);
			}

			if(this.scope) {
				this.scope.events.off(this); //FIXME события могут быть прикреплены не только к скоупуs
			}

			// очищаем регистрацию обработчиков событий
			this.events.off();

			if(this.__c) {

				// удаление в обратном порядке быстрее
				for(var i = this.__c.src.length-1; i >=0 ; i--) {
					this.__c.src[i]._destroy(false);
				}

			}

//			if(!eventsOnly) {

			// удаляем элемент и все его содержимое (data + event handlers) из документа
			if(this.parent && root !== false)
				this.parent.children.remove(this);

			if(this.__c) {

				this.children.removeAll();

				// очищаем компоновку
//				this.layout.clear();  //?
			}

			if(this.__vdom) {
//				this.__vdom.clear();
				this.__vdom._destroy();
//				$ergo.dom.remove(this.el);
//				this.el.remove();
			}

//			}


			// вызываем метод _destroy для всех дочерних компонентов
			// while( !this.children.isEmpty() ) {
			// 	this.children.first()._destroy(true);
			// }

//			this.children.applyAll('_destroy');

			this._destroyed = true;

		};

		if( root !== false ) {
			this.unrender()
			destroy.call(this);
			//			this.unrender().then( destroy.bind(this) );
		}
		else {
			destroy.call(this);
		}

//		}
//		if(this.options.debug)	console.log('_destroyed');

	},




	/**
	 * В фазе преконструирования происходит следующее:
	 *
	 * Преобразуется "сахарное" определение компонентов с префиксом $
	 *
	 * @protected
	 */
	_preConstruct: function(o) {
		Ergo.core.Widget.superclass._preConstruct.call(this, o);
//		this._super(o);



		var self = this;


		// "сахарное" определение компонентов
		for(var i in o) {
			if(i[0] == '$') {
				var key_a = i.split('__');
				var overrides = {};
				var val = overrides;

				while(key_a.length > 0) {
					var k = key_a.shift();
					var v = (key_a.length == 0) ? o[i] : {};
					if(k[0] == '$') {
						k = k.substr(1);
						val.components = {};
						val = val.components[k] = v;
					}
					else {
						val = val[k] = v;
					}
				}

				$ergo.mergeOptions(o, overrides);
			}
		}








	},





	/**
	 * В фазе конструирования виджета:
	 * 1. создаются поля
	 * 2. создается элемнт DOM-дерева (обернутый jQuery)
	 * 3. создаются компоненты
	 * 4. создаются элементы
	 * 5. регистрируются события (виджета, jquery, ctx)
	 * 6. регистрируются обработчики onClick, onDoubleClick
	 *
	 * @protected
	 */
	_construct: function(o) {
		Ergo.core.Widget.superclass._construct.call(this, o);


		var self = this;
//		var el = this.el;






/*
		if(o.rendering) {

			o.rendering.call(this, o);

		}
		else {

			this.el = $(o.html);//this.$html());

			if(!o.html) {
				this.el = $(document.createTextNode(''));
			}

			if('style' in o) this.el.css(o.style);
			if('cls' in o) this.el.addClass($.isString(o.cls) ? o.cls : o.cls.join(' '));
			if('baseCls' in o) this.el.addClass(o.baseCls);

			if(o.as) {
				var as = o.as.join(' ').split(' ');
				var cls = [];
				for(var i = 0; i < as.length; i++) {
					if(as[i][0] != '+' && as[i][0] != '-')
						cls.push(as[i]);
				}
				this.el.addClass(cls.join(' '));
			}

		}

		this.el[0]._ergo = this;


  	if(o.layout)
	 		this.layout; //FIXME если компоновка указана явно, то создаем ее сразу
		//  if(o.layout) {
		// 	 this.layout = (o.layoutFactory || this.layoutFactory)(o.layout);
		//  }
		//  else {
		// 	 this.layout = new Ergo.core.Layout();
		//  }
		//
		// this.layout.attach(this);//this.layout.options._widget || this);
*/

		var _widget = this;

//		if(o.layout) {
//		this.layout = o.layout;
//		}







		// if(o.tag)
		// 	this.layout;

		// if('layout' in o) {
		// 	this.layout;
		// }

		//FIXME это нужно перенести в vdom


		if('components' in o) {
			var arr = [];
			// преобразуем набор компонентов в массив
			Ergo.each(o.components, function(c, i){
				if(!c.ignore)
					self.children.add(c, i, 'component');
			} );

		}



		if('items' in o){
			for(var i = 0; i < o.items.length; i++)
				this.children.add(o.items[i]);

		}




		this._bindEvents();

		this._bindStates();




		if('style' in o) {
			this.vdom.setStyle(o.style);
		}

		if('cls' in o) {
			this.vdom.setClass(o.cls);
		}

		if('css' in o) {
			this.vdom.setStyle(o.css);
		}

		if('stt' in o) {
			var stt = o.stt;
			if(Array.isArray(stt)) {
				stt = stt.join(' ');
			}
			stt.split(' ').forEach(function(s) {
				self.states.set(s);
			});
		}






	},




	/**
	 * Фаза постконструирования виджета:
	 * 1. рендеринг (renderTo)
	 * 2. подключение данных (data)
	 * 3. установка состояний (state)
	 *
	 * @protected
	 */
	_postConstruct: function(o) {
//		this._super(o);
		Ergo.core.Widget.superclass._postConstruct.call(this, o);




		if('as' in o) {
      var as = o.as.join(' ').split(' ');

			for(var i = 0; i < as.length; i++) {
				if(as[i][0] == '+' || as[i][0] == '&')
					this.states.set(as[i].substr(1));
				else if(as[i][0] == '-' || as[i][0] == '!')
					this.states.unset(as[i].substr(1));
				else {
//					this.dom.el.classList.add(as[i]);
					this.vdom.addClass(as[i]);
				}
			}

      // for(var i = 0; i < clsList.length; i++) {
      //   this.dom.addClass(clsList[i]);
      // }
    }


//		console.log(this.events.events);

		if(Ergo._scope) {
			this.scope = Ergo._scope;
		}


		if('renderTo' in o) {
			this.render(o.renderTo);
		}


		if('data' in o) {
			this.data = o.data;
		}




		if(this.__evt) {

			if(this.events.events['click']) {
				this.vdom.events.on('click', function(e) { this.events.fire('click', {}, e); });
			}

			if(this.events.events['doubleClick']) {
				this.vdom.events.on('dblclick', function(e) { this.events.fire('doubleClick', {}, e); });
			}

			this.events.fire('afterConstruct');
		}


		// this.events.rise = Ergo.rise;
		// this.events.sink = Ergo.sink;

	},










	// factory: function(item) {
		// if(!(item instanceof Ergo.core.Widget)) {
			// item = this.options.componentFactory.call(this, item);
		// }
		// return item;
	// },




	/**
	 * Генерация всплывающего события
	 *
	 * Если имя события не определено, то используется имя виджета ( `w.opt('name')` )
	 *
	 * Если у оригинального события определен метод `stop()`, то он вызывается
	 *
	 * @param {Object} originalEvent Оригинальное событие
	 * @param {string} eventContext контекст события (`jquery`, `scope` и т.д.)
	 * @param {string} name Имя события
	 *
	 * @deprecated
	 */
	action: function(v, event, eventType) {

		v = v || this.opt('name');
		// if(arguments.length == 1) {
		// 	e = v;
		// 	v = this.opt('name');
		// }

		// if( v == null /*|| $.isNumeric(v)*/ )
		// 	throw new Error('Invalid action name ['+v+"]");

		this.rise(''+v, {}, event);

		if(eventType != v && event.stop)
			event.stop();
	},














// 	filter: function(type, criteria) {
//
// 		if(type == 'render') {
// //			if(criteria)
// 			this.options.renderFilter = criteria;
// 			this._rerender();
// 		}
//
// 		if(type == 'compose') {
// 			if(this.options.dynamic) {
// //				if(criteria)
// 				this.options.dynamicFilter = criteria;
// 				this._rebind();
// 			}
// 		}
//
// 	},




	// filter: function(criteria, opt, type) {

	// 	type = type || 'items';

	// 	this[type].each(function(item) {
	// 		var ok = criteria( opt ? item.opt(opt) : item );
	// 		if( !ok ) {
	// 			item.unrender();
	// 		}
	// 		else if(!item._rendered) {
	// 			item.render();
	// 		}
	// 	});

	// },












	/**
	 * Рекурсивный обход всех дочерних виджетов
	 *
	 * @param {Object} callback метод, вызываемый для каждого компонента
	 */
	walk: function(callback) {
		if( callback.call(this, this) === false)
			return;

		if(!this.__c)
			return;

		this.children.each(function(item){
			item.walk(callback);
		});
	},




	/**
	 * Получение следующего соседнего элемента, если виджет является элементом коллекции
	 */
	next: function() {
		if(!this.parent) return null;
		return this.parent.item(this._index+1);
	},

	/**
	 * Получение предыдущего соседнего элемента, если виджет является элементом коллекции
	 */
	prev: function() {
		if(!this.parent) return null;
		return this.parent.item(this._index-1);
	},

	/**
	 * Поиск элемента
	 *
	 * @param {int|string|class|Function|Object} i индекс|имя|класс|фильтр|шаблон
	 * @returns {Ergo.core.Widget}
	 *
	 * @example
	 * w.item(2) - находит элемент с индексом 2
	 * w.item('header') - находит элемент с именем "header"
	 * w.item(Ergo.widgets.MyWidget) - элемент класса Ergo.widgets.MyWidget
	 * w.item({tag: 'hello'}) - элемент, у которого свойство "tag" равно "hello"
	 *
	 */
	item: function(i) {
//		return this.children.find(Ergo.filters.by_widget(i));
		var finder = Ergo.by_widget(i);
		var j = 0;
		return this.children.find(function(item, i){
			if(item._type == 'item'){
				if(finder.call(this, item, j)) return true;
				j++;
			}
//			return item.type == 'item' && ;
		});
	},


	/**
	 * Поиск компонента
	 *
	 * Поиск элемента
	 *
	 * @param {string|class|Function|Object} i имя|класс|фильтр|шаблон
	 * @returns {Ergo.core.Widget}
	 *
	 */
	component: function(i) {
		var finder = Ergo.by_widget(i);
		return this.children.find(function(item, j){
			return item._type == 'component' && finder.call(this, item, j);
		});
	},





	//-------------------------------------------
	// Методы для работы с компонентами виджета
	//-------------------------------------------


	/**
	 * Получение списка всех родителей виджета.
	 *
	 * Еще здесь применим термин "путь" для деревьев.
	 *
	 * @returns {Array} список родительских виджетов
	 */
	parents: function(list) {
		if(arguments.length == 0) list = [];
		if(!this.parent) return list;
		list.push(this.parent);
		return this.parent.parents(list);
	},







	//---------------------------------------------
	// Методы работы с подсоединенными данными
	//---------------------------------------------



	get children() {
		if(!this.__c) {
			this.__c = new Ergo.core.Children(this);
		}
		return this.__c;
	},

	get components() {
		if(!this.__cmp) {
			this.__cmp = new Ergo.core.Components(this, {type: 'component'});
		}
		return this.__cmp;
	},

	get items() {
		if(!this.__itm) {
			this.__itm = new Ergo.core.Items(this, {type: 'item'});
		}
		return this.__itm;
	},

	get data() {
		return this.__dta;
	},

	set data(v) {
		if(v != null) {
			this.bind(v);
		}
		else {
//			this._unbindEvents('data');
			this.unbind();
		}
	},


	get vdom() {
		if(!this.__vdom) {
			this._bindVDOM();
			this._bindEvents('vdom');
		}
		return this.__vdom;
	},


	get scope() {
		if(!this.__scp && this.parent) {
			this.__scp = this.parent.scope;
		}
		return this.__scp;
	},

	set scope(v) {
		if(v != null) {
			this.__scp = v;
			this._bindEvents('scope');
		}
		else if(this.__scp) {
			this.__scp.off(this);
			delete this.__scp;
		}

	},

	get context() {
//		return $context || Ergo.context;
		//TODO возможен случай когда контекст отличается
		if(!this.__ctx) {
			this.__ctx = $context || Ergo.context;
//			this.__ctx = (this.scope) ? this.scope._context : Ergo.context;
			this._bindEvents('context');
		}
		return this.__ctx;
	},


	// get dom() {
	// 	var el = this.el;
	// 	if(!this.__dom) {
	// 		this.__dom = {
	// 			events: {
	// 				on: function(name, callback) {
	// 					el.addEventListener(name, callback);
	// 				}
	// 			}
	// 		}
	// 	}
	// 	return this.__dom;
	// },


	// get layout() {
	// 	if(!this.__l) {
	// 		var o = this.options;
	// 		if(o.layout) {
 // 			 this.__l = (o.layoutFactory || this.layoutFactory)(o.layout);
	// 		}
	// 		else {
	// 		 this.__l = new Ergo.core.Layout();
	// 		}
	//
 // 			this.__l.attach(this);//this.layout.options._widget || this);
	//
	// 		if( o.dynamic ) {
	// 			this.events.on('diff', function(e) {
	// 				// перестраиваем компоновку
	// 				this._rerender(false, {created: e.created, deleted: e.deleted, updated: e.updated});
	// 			}.bind(this));
	// 		}
	//
	// 	}
	// 	return this.__l;
	// },


	get name() {
		return this._name || this._key || this._index;
	},

	set name(v) {
		this._name = v;
	},



	// set format(v) {
	// 	this.__fmt = (typeof v == 'string') ? $ergo.formatObj.curry(v) : v;
	// },
	//
	// get format() {
	// 	return this.__fmt;
	// },
	//
	// set unformat(v) {
	// 	this.__ufmt = (typeof v == 'string') ? $ergo.unformatObj.curry(v) : v;
	// },
	//
	// get unformat() {
	// 	return this.__ufmt;
	// },

	get value() {
		var val;
		var o = this.options;

		if(this.data)
			val = this.data.get();
//		else if('__val' in this)
		else
			val = this.__val;
		// else
		// 	val = this.opt('text');

//			val = (o.value) ? o.value.call(this) : this.opt('text');

		// если присутствует функция форматирования, то используем ее
		var fmt = this._format || this.options.format;
		if(fmt) {
			if(typeof fmt == 'string') {
				var m = fmt.match(/^#{([^}{]+?)}$/);
				if( m ) {
					val = $ergo.formatValue.call(this, m[1], val);
				}
				else {
					val = $ergo.formatObj.call(this, fmt, val);
				}
			}
			else {
				val = fmt.call(this, val);
			}
//			val = (typeof fmt == 'string') ? $ergo.formatObj.call(this, fmt, val) : fmt.call(this, val);// this.__fmt.call(this, val);
		}

		return val;
	},




	set value(val) {

//		if(this._lock_value_change) return;

		var o = this.options;

		// deprecated
//		if(o.store)
//			val = o.store.call(this, val);

		var ufmt = this._unformat || this.options.unformat;
		if(ufmt) {
			val = (typeof ufmt == 'string') ? $ergo.unformatObj.call(this, ufmt, val) : ufmt.call(this, val);//this.__ufmt.call(this, val);
		}

		var fmt = this._format || this.options.format;
		if( (fmt && !ufmt) || (!fmt && ufmt) ) {
			console.warn('No matching format and unformat');
		}



		if(this.data) {

			// связывание будет обновлено автоматически
			this.data.set(val);

		}
		else {
			this.__val = val;
			// а здесь связывание нужно обновить
			this._dataChanged();
//			o.value ? o.value.call(this, val) : this.opt('text', val);
		}


//		if(o.binding)
//			o.binding.call(this, val);

//		this.events.fire('valueChanged', {'value': val});

	},


/*
	format: function(val) {
		// если присутствует функция форматирования, то используем ее
		if(this.options.format)
			val = this.options.format.call(this, val);
		return val;
	},
*/



	// $valueChanged: function() {
//
	// },






	// $unknown_opt: function(i, v) {
//
		// // проверяем состояния
		// if(i in this.states._states) {
			// this.states.toggle(i, v)
		// }
		// // проверяем группы
		// else if(i in this.states._exclusions) {
			// this.states.set(v);
		// }
//
	// }





	prop: function(i, v, defaultValue) {

		if(arguments.length == 1 || arguments.length == 3) {

			if( this.options.get && (i in this.options.get) ) {
				return this.options.get[i].bind(this)(i);
			}
			else if( (i in this.props) && this.props[i].get ) {
				return this.props[i].get.bind(this)(i);
			}
			else if( i in this.props.get ) {
				return this.props.get[i].bind(this)(i);
			}
			else if( (i in this) && $ergo.hasGetter(this, i) ) {
				return this[i];
			}
			else if((this.__stt) && (i in this.__stt._states)) {
				return this.states.is(i);
			}

			return defaultValue;
		}
		else if(arguments.length == 2) {

			if( this.options.set && (i in this.options.set) ) {
				this.options.set[i].bind(this)(v, i);
			}
			else if( (i in this.props) && this.props[i].set ) {
				this.props[i].set.bind(this)(v, i);
			}
			else if( (i in this.props.set) ) {
				this.props.set[i].bind(this)(v, i);
			}
			else if( (i in this) && $ergo.hasSetter(this, i) ) {
				this[i] = v;
			}
			else if(i in this.states._states) {
				this.states.toggle(i, v);
			}
			//FIXME
			else if(i in this.states._groups) {
				this.states.set(v);
			}
			// else {
			// 	console.warn('Property ['+i+'] not found');
			// }

			return this;
		}

	},






	//  _opt: function(o) {
	//
 // 		for(var i in o) {
 // 			if( !(i in $ergo.rules) ) {
 // 				if( (i in this) && $ergo.setter(this, i) ) {
 // 					this[i] = o[i];
 // 				}
	// 			else if(i in this.states._states) {
	// 				this.states.toggle(i, o[i]);
	// 			}
	// 			else if(i in this.states._exclusives) {
	// 				this.states.set(o[i]);
	// 			}
 // 			}
 // 		}
	//
 // 	},



/*
	_opt: function(o) {

//		var self = this;

		var exclusions = {
			components: true,
			items: true,
			set: true,
			get: true,
			mixins: true,
			defaultItem: true,
			defaultComponent: true,
			nestedItem: true,
			events: true,
			states: true,
			attributes: true,
		};

//		var el = this.el;

		for(var i in o) {

			if( (i in exclusions) || i[0] == '$') continue;

			// проверяем наличие сеттеров опций
			if(this.options.set && this.options.set[i])
				this.options.set[i].call(this, o[i], this.options);
			// если сеттер опций не найден, проверяем наличие java-like сеттера
			else {
				// проверяем наличие Java-like сеттеров
				var java_setter = 'set_'+i;//.capitalize();
				if(this[java_setter])
					this[java_setter](o[i]);
				// // проверяем состояния
				// else if(this.layout._etype == 'layouts:'+i)
				// 	this.layout
				// проверяем состояния
				else if(i in this.states._states)
					this.states.toggle(i, o[i]);
				// проверяем группы состояний
				else if( (i in this) && Ergo.setter(this, i) ) {
					// var desc = Object.getOwnPropertyDescriptor(this, i);
					// if(desc && desc.set)
					this[i] = o[i];
				}
				else if(i in this.states._exclusives)
					this.states.set(o[i]);
				// проверяем атрибуты
				else if(this.attributes.indexOf(i) != -1)
					o[i] ? this.el.attr(i, o[i]) : this.el.removeAttr(i);

			}
		}


//		profiler.tick('opt', 'other');
//
//		profiler.stop('opt');

	},
*/


	/**
	 *
	 */
	layoutFactory: function(layout) {
		if( $.isString(layout) )
			layout = $.ergo({etype: layout}, 'layouts');
		else if(!(layout instanceof Ergo.core.Layout))
			layout = $.ergo(Ergo.merge({etype: 'default'}, layout), 'layouts');
		return layout;
	},




	/**
	 * "Всплытие" события по дереву виджетов
	 *
	 * @see {@link Ergo.core.Observer#fire}
	 */
	rise: function(name, e, baseEvent) {
		if(e == null) {
			e = {};
		}
		else if( e instanceof Ergo.core.Event || e.constructor == Object ) {
			//
		}
		else {
			e = {$data: e}
		}
//		if(!e) e = {};
		e.target = e.target || this;
		e = this.events.fire(name, e, baseEvent);
		if(this.parent && !e.stopped) {
			this.parent.rise(name, e);
		}
	},


	/**
	 * "Погружение" события по дереву виджетов
	 *
	 * @see {@link Ergo.core.Observer#fire}
	 */
	sink: function(name, e, baseEvent) {
		if(!e) e = {};
		e.target = e.target || this;
		e = this.events.fire(name, e, baseEvent);
		if(!e.stopped) {
			this.children.each(function(child){
				child.sink(name, e);
			});
		}
	},




	/**
	 * Обработчик "потерянного" состояния
	 *
	 * Устанавливает класс `vdom`
	 */
	_missedState: function(name, on, data) {
		on ? this.vdom.addClass(name) : this.vdom.removeClass(name);
	},



	// _missedAction: function(name, on, data) {
	// 	on ? this.vdom.addClass(name) : this.vdom.removeClass(name);
	// }








/*
	get __skeleton() {

		var s = {
			components: [],
			items: [],
			states: [],
			events: [],
			options: {}
		};



		var exclusions = {
			components: true,
			items: true,
			set: true,
			get: true,
			mixins: true,
			defaultItem: true,
			defaultComponent: true,
			nestedItem: true,
			events: true,
			states: true,
			attributes: true,
			__skeleton: true,
			include: true,
			children: true
		};

		// simple options
		for(var i in this.options) {
			if( !(i in exclusions) && !/on\S/.test(i) ) {
				s.options[i] = ['get', 'set'];
			}
		}

		// get/set options
		if( this.options.get ) {
			for(var i in get) {
				if( !(i in s.options) ) {
					s.options[i] = ['get'];
				}
			}
		}
		if( this.options.set ) {
			for(var i in set) {
				if( !(i in s.options) ) {
					s.options[i].push('set');
				}
			}
		}

		// state options
		for(var i in this.states._states) {
			s.options[i] = ['get', 'set'];
		}
		for(var i in this.states._exclusives) {
			s.options[i] = ['get', 'set'];
		}

		// property options
		var w = this;
		while(w) {
			for(var i in w) {
				var desc = Object.getOwnPropertyDescriptor(w, i);
				if(desc && !(i in exclusions)) {
					if(desc.get) {
						s.options[i] = s.options[i] ? s.options[i].concat('get') : ['get'];
					}
					if(desc.set) {
						s.options[i] = s.options[i] ? s.options[i].concat('set') : ['set'];
					}
				}
			}
			w = w.constructor.superclass;
		}


		this.components.each(function(c, i) {
			s.components.push(i);
		})


		s.states = Object.keys(this.states._states);

		s.events = Object.keys(this.events.events);

		return s;
	}
*/




	// setTextSelection: function(v) {
		// if(!v) {
      // if($.browser.mozilla){//Firefox
        // this.el.css('MozUserSelect','none');
      // }
      // else if($.browser.msie){//IE
        // this.el.bind('selectstart',function(){return false;});
      // }
      // else{//Opera, etc.
        // this.el.mousedown(function(){return false;});
      // }
		// }
	// }





}, 'widgets:widget');




//Ergo.merge(Ergo.core.Widget.prototype, Ergo.alias('mixins:observable'));

//Ergo.merge(Ergo.core.Widget.prototype, Ergo.alias('mixins:statable'));

//Ergo.merge(Ergo.core.Widget.prototype, Ergo.WidgetOptions);

Ergo.deepMerge(Ergo.core.Widget.prototype, Ergo.WidgetProps);

Ergo.merge(Ergo.core.Widget.prototype, Ergo.WidgetData);

Ergo.merge(Ergo.core.Widget.prototype, Ergo.WidgetRender);

Ergo.merge(Ergo.core.Widget.prototype, Ergo.alias('mixins:jquery'));

/*
Ergo.merge(Ergo.core.Widget.prototype, Ergo.WidgetAttributes);

Ergo.merge(Ergo.core.Widget.prototype, Ergo.WidgetRender);
*/


//Ergo.widget = function(){
//	if(arguments.length == 1) return Ergo.object(arguments[0]);
//	return Ergo.object( Ergo.smart_override.apply(this, arguments) );
//};

Ergo.$widget = Ergo.object;

// Ergo.$widget = function(o, etype) {
	// return Ergo.object(o, 'widget:'+etype);
// };


// Ergo.after_rise = function(e, type, base) {
// 	if(this.parent && !e.stopped) this.parent.events.fire(type, e, base);
// };
//
//
// Ergo.after_sink = function(e, type, base) {
// 	this.children.each(function(child){
// 		child.events.fire(type, e, base);
// 	});
// };
//
//
// Ergo.rise = function(name, e, baseEvent) {
// 	if(!e) e = {};//new Ergo.core.Event();
// 	e.after = Ergo.after_rise;
// 	e.target = e.target || this.target;
// 	this.fire(name, e, baseEvent);
// };
//
// Ergo.sink = function(name, e, baseEvent) {
// 	if(!e) e = {};//new Ergo.core.Event();
// 	e.after = Ergo.after_sink;
// 	e.target = e.target || this.target;
// 	this.fire(name, e, baseEvent);
// };





//------------------------------
// Интегрируемся в jQuery
//------------------------------


$.ergo = $ergo;



$.fn.ergo = function(o) {
	if(this.length > 0){
		var widget = (this[0]._vdom) ? this[0]._vdom._widget : undefined;// this.data('ergo-widget');
		if(widget) return widget;
		if(!o) return undefined;
		o.html = this;
	}
	else if(arguments.length == 0) return null;

	return $.ergo(o);
};









/**
 * Пространство для виджетов
 *
 * @namespace
 */
Ergo.widgets = {};


Ergo.$widgets = $ergo.object.bind(this, 'widgets');
