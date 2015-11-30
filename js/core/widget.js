
//= require data
//= require states
//= require layout
//= require widget-opts
//= require widget-list
//= require widget-data
//= require widget-render




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
 * @param {string} o.html html-тег виджета
 * @param {object} o.components хэш компонентов
 * @param {object} o.defaultComponent опции компонента по умолчанию
 * @param {function} o.componentFactory фабрика компонентов
 * @param {array} o.items массив элементов
 * @param {object} o.defaultItem опции элемента по умолчанию
 * @param {function} o.itemFactory фабрика элементов
 * @param {boolean} o.dynamic флаг динамического связывания
 * @param {object|array|string} o.data связываемые данные
 * @param {string} o.dataId ключ в источнике данных
 * @param {object} o.events хэш событий
 * @param {object} o.states хэш состояний
 * @param {object} o.transitions хэш переходов между состояниями
 * @param {string} o.state предустановленное состояние
 * @param {function} o.rendering функция создания jQuery-элемента
 * @param {string} o.renderTo селектор родительского элемента
 * @param {boolean} o.showOnRender вызов метода show при создании
 * @param {boolean} o.hideOnDestroy вызов метода hide при удалении
 * @param {string|function} o.binding функция связывания данных с виджетом
 * @param {Any} o.value значение виджета
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
 * @fires dataChanged
 * @fires fetch
 * @fires fetched
 * @fires bound
 * @fires afterBuild
 * @fires click
 * @fires doubleClick
 *
 * @property {object} options
 * @property {Ergo.core.Layout} layout
 * @property {jQuery} el
 * @property {Ergo.core.DataSource} data
 * @property {Ergo.core.Observer} events
 * @property {Ergo.core.StateManager} states
 * @property {Ergo.core.WidgetChildren} children
 * @property {Ergo.core.WidgetItems} items
 * @property {Ergo.core.WidgetComponents} components
 * @property {string} text
 * @property {any} name
 * @property {string} width
 * @property {string} height
 *
 *
 */
Ergo.defineClass('Ergo.core.Widget', 'Ergo.core.Object', /** @lends Ergo.core.Widget.prototype */{


	defaults: {
//		layout: 'default',
		// states: {
// //			'hidden': 'hidden',
			// 'disabled': 'disabled',
			// 'invalid': 'invalid'
// //			'unselectable': 'unselectable'
		// },
//		plugins: [Ergo.Observable, Ergo.Statable],
//		autoBind: true,
//		autoUpdate: true,
		include: ['observable', 'statable'],

		// layoutFactory: function(layout) {
		// 	if( $.isString(layout) )
		// 		layout = $.ergo({etype: layout}, 'layouts');
		// 	else if(!(layout instanceof Ergo.core.Layout))
		// 		layout = $.ergo(Ergo.override({etype: 'default'}, layout), 'layouts');
		// 	return layout;
		// },
//		events: {},
//		defaultItem: {},
		// defaultComponent: {},
		// componentFactory: function(o) {
			// if($.isString(o)) {
				// o = this.options.shortcuts[o] || {text: o};
			// }
			// return Ergo.widget( Ergo.smart_override({}, this.options.defaultComponent, o) );
		// },
//		shortcuts: {},
//		showOnRender: false,
//		hideOnRender: false,
		// set: {
		// },
		// get: {
		// }
	},

	attributes: [],

	// FIXME
	jquery: {
		events: {
			on: function(name, callback, w) {
				w.el.on(name, callback.rcurry('jquery').bind(w));  //FIXME it could be simpler
			}
		}
	},




	// FIXME
	get ctx() {
		// var scope = this.scope;
		// return scope ? scope._context : Ergo.context;
		return $context || Ergo.context; //FIXME костыль
	},

	get scope() {
		var w = this;
		while(w) {
			if(w._scope)
				return w._scope;
			w = w.parent;
		}
	},

	set scope(v) {
		this._scope = v;
		this._bindNsEvents('scope');
	},

	// set scope(scope) {
	// 	this
	// }


	// ctx: {
	// 	events: {
	// 		on: function(name, callback, w) {
	// 			(w._context || Ergo.context).events.on(name, callback, w);
	// 		}
	// 	}
	// },

/*
	_initialize: function(o) {
		this._super(o);
//		Ergo.core.Widget.superclass._initialize.apply(this, arguments);


		var o = this.options;
		var self = this;


		// this.events.on_fire = function(type, e, base_event) {
			// if(e.bubble && self.parent) self.parent.events.fire(type, e, base_event);
		// };


		// инициализируем виджет
		this.$init(o);


		// добавляем метод bubble к events
		this.events.bubble = function(name, e) {
			if(!e) e = {}
			e.after = Ergo.bubble;
			e.target = self;
			this.fire(name, e);
		}


		// создаем список дочерних элементов
		this.children = new Ergo.core.WidgetChildren(this);

		this.components = new Ergo.core.WidgetComponents(this, {type: 'component'});
		this.items = new Ergo.core.WidgetItems(this, {type: 'item'});

		//TODO этап генерации jQuery-элемента можно оптимизировать
		// создаем новый элемент DOM или используем уже существующий
		this.el = $(o.html);//this.$html());
		this.el.data('ergo-widget', this);
//		if(this.defaultCls) this.el.addClass(this.defaultCls);
		if('style' in o) this.el.css(o.style);
		if('cls' in o) this.el.addClass(o.cls);
		if('baseCls' in o) this.el.addClass(o.baseCls);


		// создаем компоновку
		this.layout = o.layoutFactory(o.layout);
		//FIXME костыль
//		if(!this.layout.container) this.layout.attach(this);
		this.layout.attach(this.layout.options.container || this);




		// конструируем виджет
		this._construct(o);

		// устанавливаем опциональные параметры
		this._opt(o);

		// добавляем обработку событий (deprecated)
//		this.$events(this);

		// добавляем элемент в документ
		this.render(o.renderTo);

		// подключаем данные и обновляем их, если установлен параметр autoUpdate
		this.bind(o.data, o.autoUpdate);


		this.$afterBuild();

//		if(this.options.debug)	console.log('created');

	},
*/



	/**
	 * Уничтожение виджета
	 *
	 * Удаляются связи в виртуальном дереве виджетов, отключается связь с данными,
	 * удаляется элемент из DOM-дерева, уничтожаются все дочерние виджеты.
	 *
	 * @protected
	 */
	_destroy: function(root) {

		var self = this;

		// if(this.options.hideOnDestroy && !noHide) {
			// return this.hide().then(function() { self._destroy(true); });
		// }
		// else {

		var destroy = function(){

			if(this.data)
				this.data.events.off(this);

			// очищаем регистрацию обработчиков событий
			($context || Ergo.context).events.off(this);

			if(this.scope)
				this.scope.events.off(this); //FIXME события могут быть прикреплены не только к скоупуs

			// очищаем регистрацию обработчиков событий
			this.events.off();

			if(this.__c) {

				// удаление в обратном порядке быстрее
				for(var i = this.children.src.length-1; i >=0 ; i--) {
					this.children.src[i]._destroy(false);
				}

			}

//			if(!eventsOnly) {

			// удаляем элемент и все его содержимое (data + event handlers) из документа
			if(this.parent && root !== false)
				this.parent.children.remove(this);

			if(this.__c) {

				this.children.remove_all();

				// очищаем компоновку
				this.layout.clear();  //?
			}

			if(this.el) {
				this.el.remove();
			}

//			}


			// вызываем метод _destroy для всех дочерних компонентов
			// while( !this.children.is_empty() ) {
			// 	this.children.first()._destroy(true);
			// }

//			this.children.apply_all('_destroy');

			this._destroyed = true;

		};

		if( root !== false )
			this.unrender().then( destroy.bind(this) );
		else
			destroy.call(this);

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
	_pre_construct: function(o) {
		Ergo.core.Widget.superclass._pre_construct.call(this, o);
//		this._super(o);



		var self = this;


		// // "сахарное" определение контента виджета
		// if('content' in o){
		// 	Ergo.smart_override(o, {
		// 		components: {
		// 			content: o.content
		// 		}
		// 	});
		// }


		// "сахарное" определение компонентов
		for(var i in o) {
			if(i[0] == '$') {
				var key_a = i.split('_');
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

				Ergo.smart_override(o, overrides);
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


		// создаем список дочерних элементов
		/**
		 * @field
		 *
		 * @description Коллекция дочерних виджетов
		 *
		 */
//		this.children = new Ergo.core.WidgetChildren(this);

		/**
		 * Коллекция компонентов
		 * @field
		 */
//		this.components = new Ergo.core.WidgetComponents(this, {type: 'component'});
		/**
		 * Коллекция элементов
		 * @field
/		 */
//		this.items = new Ergo.core.WidgetItems(this, {type: 'item'});

		//TODO этап генерации jQuery-элемента можно оптимизировать
		// создаем новый элемент DOM или используем уже существующий
		/**
		 * @field
		 *
		 * @description jQuery-объект, с которым связан виджет
		 *
		 */

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


		/**
		 * Компоновка
		 */
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



// 		if('events' in o){
// 			for(var i in o.events){
// 				var callback_a = o.events[i];
// 				callback_a = Array.isArray(callback_a) ? callback_a : [callback_a]; //FIXME
// 				for(var j in callback_a) {
// 					var callback = callback_a[j];
//
// 					if( $.isString(callback) ) {
// 						var a = callback.split(':');
// 						callback = (a.length == 1) ? this[callback] : this[a[0]].rcurry(a[1]).bind(this);
// //						callback = this[callback];
// 					}
// 					// if( $.isString(callback) ) {
// 						// var action = callback;
// 						// callback = function(e, scope) {
// 							// if(scope == 'jquery') e = {base: e};
// 							// this.events.rise(action, e);
// 						// };
// 					// }
//
// 					if(i.indexOf('ctx:') == 0) {
// 						// Context
// 						(this._context || Ergo.context).events.on(i.substr(4), callback, this);
// 					}
// 					else if(i.indexOf('jquery:') == 0) {
// 						// jQuery
// 						self.el.on(i.substr(7), callback.rcurry('jquery').bind(this));
// 					}
// 					else {
// 						// Widget
// 						self.events.on(i, callback, this);
// 					}
// 				}
// 			}
// 		}




		if('onClick' in o)
			this.el[0].addEventListener('click', function(e) { if(!self.states.is('disabled')) self.events.fire('click', {button: e.button}, e); })
//			this.el.click(function(e) { if(!self.states.is('disabled')) self.events.fire('click', {button: e.button}, e); });
		if('onDoubleClick' in o)
			this.el.dblclick(function(e) { if(!self.states.is('disabled')) self.events.fire('doubleClick', {button: e.button}, e); });

//		if(o.fastclick)
//			this.el.mousedown(function(e) { if(!self.states.is('disabled') && e.button === 0) self.events.fire('click', {button: e.button}, e); });



		this.events.rise = Ergo.rise;
		this.events.sink = Ergo.sink;


	},


	get children() {
		if(!this.__c) {
			this.__c = new Ergo.core.WidgetChildren(this);
		}
		return this.__c;
	},

	get components() {
		if(!this.__cmp) {
			this.__cmp = new Ergo.core.WidgetComponents(this, {type: 'component'});
		}
		return this.__cmp;
	},

	get items() {
		if(!this.__itm) {
			this.__itm = new Ergo.core.WidgetItems(this, {type: 'item'});
		}
		return this.__itm;
	},

	get layout() {
		if(!this.__l) {
			var o = this.options;
			if(o.layout) {
 			 this.__l = (o.layoutFactory || this.layoutFactory)(o.layout);
			}
			else {
			 this.__l = new Ergo.core.Layout();
			}

 			this.__l.attach(this);//this.layout.options._widget || this);
		}
		return this.__l;
	},




//	_theme: function() {
//		if(this.options.ui == 'jquery_ui') this._theme_jquery_ui
//	}



	/**
	 * Фаза постконструирования виджета:
	 * 1. рендеринг (renderTo)
	 * 2. подключение данных (data)
	 * 3. установка состояний (state)
	 *
	 * @protected
	 */
	_post_construct: function(o) {
//		this._super(o);
		Ergo.core.Widget.superclass._post_construct.call(this, o);


		// добавляем элемент в документ
		if('renderTo' in o)
			this.render(o.renderTo);

		// подключаем данные и обновляем их, если установлен параметр autoUpdate
		if('data' in o)
			this.bind(o.data, o.autoUpdate);


//		this.$afterBuild();

		var self = this;


		// устанавливаем состояния по умолчанию
		if('state' in o) {
			o.state.join(' ').split(' ').forEach(function(state) {
				if(state[0] == '-')
					self.states.unset(state.substr(1));
				else
					self.states.set(state);
			});
		}

		if(o.as) {
			var as = o.as.join(' ').split(' ');
			for(var i = 0; i < as.length; i++) {
				if(as[i][0] == '+')
					this.states.set(as[i].substr(1));
				else if(as[i][0] == '-')
					this.states.unset(as[i].substr(1));
			}
		}



		this.events.fire('afterBuild');

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
	 */
	action: function(event, eventType, v) {

		v = v || this.opt('name');
		// if(arguments.length == 1) {
		// 	e = v;
		// 	v = this.opt('name');
		// }

		// if( v == null /*|| $.isNumeric(v)*/ )
		// 	throw new Error('Invalid action name ['+v+"]");

		this.events.rise(''+v, {}, event);

		if(event.stop)
			event.stop();
	},






	/**
	 * Отображение виджета
	 *
	 * В том случае, если он уже включен в DOM-дерево
	 */
	show: function(wrapperAware) {
		return $.when( wrapperAware !== false ? (this._wrapper_el || this.el).show() : this.el.show() );
	},


	/**
	 * Скрытие виджета
	 *
	 * В том случае, если он уже включен в DOM-дерево
	 */
	hide: function(wrapperAware) {
		return $.when( wrapperAware !== false ? (this._wrapper_el || this.el).hide() : this.el.hide() );
	},








	filter: function(type, criteria) {

		if(type == 'render') {
//			if(criteria)
			this.options.renderFilter = criteria;
			this._rerender();
		}

		if(type == 'compose') {
			if(this.options.dynamic) {
//				if(criteria)
				this.options.dynamicFilter = criteria;
				this._rebind();
			}
		}

	},




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

	/*
	 * Получение родительского виджета
	 *
	 * Если критерий не указан, то возвращается непосредственный родитель
	 *
	 * @example
	 * a.parent();
	 * b.parent({'data': dataItem});
	 * c.parent(Ergo.widgets.Box);
	 * d.parent(function(w) { return w.options.width < 100; });
	 * e.parent('header');
	 *
	 * @param {Any} [criteria] критерий
	 *
	 * @deprecated
	 */
	// parent: function(i) {
//
		// if(arguments.length == 0) return this.parent;
//
		// return Ergo.find(this.parents(), Ergo.by_widget(i));
	// },
//







	//---------------------------------------------
	// Методы работы с подсоединенными данными
	//---------------------------------------------








	/**
	 * Получение значения, связанного с виджетом.
	 *
	 * Если задана функция форматирования (`options.format`), то она используется для преобразования результата
	 *
	 * @returns {Any} undefined, если к виджету данные не подключены
	 */
	get value() {
		var val;
		var o = this.options;

		if(this.data)
			val = this.data.get();
		else if('_value' in this)
			val = this._value;
		else
			val = this.opt('text');

//			val = (o.value) ? o.value.call(this) : this.opt('text');

		// если присутствует функция форматирования, то используем ее
		if(this.options.format)
			val = o.format.call(this, val);

		return val;
	},

	/**
	 * Установка значения, связанного с виджетом
	 *
	 * Если задана функция хранения (`options.unformat`), то она используется для преобразования значения
	 *
	 * @param {Any} val значение
	 */
	set value(val) {

//		if(this._lock_value_change) return;

		var o = this.options;

		// deprecated
		if(o.store)
			val = o.store.call(this, val);

		if(o.unformat)
			val = o.unformat.call(this, val);

		if(this.data){

//			this._lock_data_change = true;
//			o.store ? o.store.call(this, val) : this.data.set(val);
			this.data.set(val);
//			delete this._lock_data_change;

		}
		else {
			this._value = val;
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






	_bindNsEvents: function(ns) {

		var o = this.options;

		//FIXME bind data events
		if('events' in o) {
			for(var i in o.events){

				var name_a = i.split(':');

				if( name_a.length == 2 && name_a[0] == ns ) {

					var callback_a = o.events[i];
					callback_a = Array.isArray(callback_a) ? callback_a : [callback_a]; //FIXME
					for(var j in callback_a) {
						var callback = callback_a[j];

						if( $.isString(callback) ) {
							var a = callback.split(':');
							callback = (a.length == 1) ? this[callback] : this[a[0]].rcurry(a[1]).bind(this);
						}

						if( this[name_a[0]].events ) {
							this[name_a[0]].events.on(name_a[1], callback, this);
						}

					}
				}
			}
		}


	},


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


	/**
	 * Установка значения опций
	 *
	 * Порядок поиска опций:
	 * 1. обработчик в `options.set`
	 * 2. сеттер set_*
	 * 3. состояния
	 * 4. ES5-сеттер
	 * 5. группа эксклюзивных состояний
	 * 6. список атрибутов
	 *
	 * @param {object} o опции
	 */
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




	layoutFactory: function(layout) {
		if( $.isString(layout) )
			layout = $.ergo({etype: layout}, 'layouts');
		else if(!(layout instanceof Ergo.core.Layout))
			layout = $.ergo(Ergo.override({etype: 'default'}, layout), 'layouts');
		return layout;
	},




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



Ergo.override(Ergo.core.Widget.prototype, Ergo.WidgetOptions);

Ergo.override(Ergo.core.Widget.prototype, Ergo.WidgetAttributes);

Ergo.override(Ergo.core.Widget.prototype, Ergo.WidgetData);

Ergo.override(Ergo.core.Widget.prototype, Ergo.WidgetRender);

//Ergo.widget = function(){
//	if(arguments.length == 1) return Ergo.object(arguments[0]);
//	return Ergo.object( Ergo.smart_override.apply(this, arguments) );
//};

Ergo.$widget = Ergo.object;

// Ergo.$widget = function(o, etype) {
	// return Ergo.object(o, 'widget:'+etype);
// };


Ergo.after_rise = function(e, type, base) {
	if(this.parent && !e.stopped) this.parent.events.fire(type, e, base);
};


Ergo.after_sink = function(e, type, base) {
	this.children.each(function(child){
		child.events.fire(type, e, base);
	});
};


Ergo.rise = function(name, e, baseEvent) {
	if(!e) e = {};//new Ergo.core.Event();
	e.after = Ergo.after_rise;
	e.target = e.target || this.target;
	this.fire(name, e, baseEvent);
};

Ergo.sink = function(name, e, baseEvent) {
	if(!e) e = {};//new Ergo.core.Event();
	e.after = Ergo.after_sink;
	e.target = e.target || this.target;
	this.fire(name, e, baseEvent);
};





//------------------------------
// Интегрируемся в jQuery
//------------------------------

$.ergo = function(o, ns, scope) {

//	var o = Ergo.smart_override.apply(this, arguments);

	var etype = null;

	if( Array.isArray(o) ) {
		for(var i = o.length-1; i >= 0; i--) {
			if(o[i])
				etype = o[i].etype;
			if(etype) break;
		}
	}
	else {
		etype = o.etype;
		o = [o];
	}

	// var ns = null;
	// var scope = null;
	//
	// if( $.isString(ns_or_scope) ) {
	// 	ns = ns_or_scope;
	// }
	// else {
	// 	scope = ns_or_scope;
	// }

//	var etype = o.etype;
	ns = ns || 'widgets';
	var i = etype.indexOf(':');
	if(i > 0) {
		ns = etype.substr(0, i);
		etype = etype.substr(i+1);
	}

	if( !Ergo['$'+ns] )
		throw new Error('Namespace "'+ns+'" not defined');

	o.etype = ns+':'+etype;

	var w = Ergo['$'+ns](o, ns+':'+etype);//, scope);

	scope = scope || Ergo._scope;

	if(scope && w.opt('scopeKey')) {
		scope.widget( w.opt('scopeKey'), w );
	}

	return w;
}; //Ergo.widget;



$.fn.ergo = function(o) {
	if(this.length > 0){
		var widget = this[0]._ergo;// this.data('ergo-widget');
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


Ergo.$widgets = Ergo.object;
