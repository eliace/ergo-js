
//= require data
//= require states
//= require layout
//= require widget-props
//= require widget-list




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
		return ($context || Ergo.context); //FIXME костыль
	},


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
					this.layout.clear();
				}

				if(this.el)
					this.el.remove();

//			}


			// вызываем метод _destroy для всех дочерних компонентов
			// while( !this.children.is_empty() ) {
			// 	this.children.first()._destroy(true);
			// }

//			this.children.apply_all('_destroy');

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

		if( !v || $.isNumeric(v) )
			throw Error('Invalid action name ['+v+"]");

		this.events.rise(v, event);

		if(event.stop)
			event.stop();
	},






	/**
	 * Отображение виджета
	 *
	 * В том случае, если он уже включен в DOM-дерево
	 */
	show: function() {
		return $.when( (this._wrapper || this.el).show() );
	},


	/**
	 * Скрытие виджета
	 *
	 * В том случае, если он уже включен в DOM-дерево
	 */
	hide: function() {
		return $.when( (this._wrapper || this.el).hide() );
	},




	/**
	 * Отрисовка (рендеринг) виджета, т.е. добавление его в DOM-дерево
	 *
	 * Если метод вызывается без параметров, а виджет входит в виртуальное дерево
	 * виджетов, то он будет добавлен в компоновку родителя
	 *
	 * Отрисовка выполняется для всех дочерних виджетов
	 *
	 * После отрисовки вызывается обработчик _layoutChanged
	 *
	 */
	render: function(target, cascade) {


		var self = this;


		if(target === true)
			this.options.autoRender = true; //?


		// только если проиниализирован .children
		if( this.__c ) {

			for(var i = 0; i < this.children.src.length; i++) {

				var item = this.children.src[i];

//			this.children.each(function(item){
				if(!item._rendered && item.options.autoRender !== false && !(item.options.autoRender == 'non-empty' && item.children.src.length == 0 && !item.options.text)) {

					if(this.children.src.length == 1) {
							// если элемент один, то компоновка ему еще не нужна
						if(item._type == 'item') {
							item.el[0]._index = item._index;
							self.el.append(item.el);
						}
						else {
							item.el[0]._weight = item._weight;
							self.el.append(item.el);
						}
					}
					else {
						item._type == 'item' ? self.layout.add(item, item._index) : self.layout.add(item);
					}

				}

//			});
			}
			// this.children.each(function(item){
				// item._layoutChanged();
			// });


			for(var i = 0; i < this.children.src.length; i++) {
				var item = this.children.src[i];
//			this.children.each(function(item){
				if( !(item.options.dynamic && item.data) )  //FIXME
					item.render(false, false);
//			});
			}

		}


		if( (target !== false || (this.options.autoRender == 'non-empty' && (!this.__c || !this.children.src.length == 0 || this.options.text))) && this.parent) {

			if(!this._rendered && this.options.autoRender !== false) {

//				console.log(this);

				if(this.parent.children.src.length == 1) {
						// если элемент один, то компоновка ему еще не нужна
					if(this._type == 'item') {
						this.el[0]._index = this._index;
						this.parent.el.append(this.el);
					}
					else {
						this.el[0]._weight = this._weight;
						this.parent.el.append(this.el);
					}
				}
				else {
					this._type == 'item' ? this.parent.layout.add(this, this._index) : this.parent.layout.add(this);
				}



//				if(this.options.showOnRender) this.show();
//				if(this.options.hideOnRender) this.hide();
			}

		}
		else if(target) {
			$(target).append(this.el);
			this._rendered = true;
//			target.layout.add(this, this._index);
		}




/*
		this.components.each(function(item){
//			if(!item._dynamic)
				item.render();
		});

		this.items.each(function(item){
			// содержимое динамических элементов отрисовывается через bind
			if(!item.options.dynamic)  //FIXME
				item.render();
		});
*/

/*
		if(cascade !== false) {

			this.children.each(function(item) {
				if(!item.options.dynamic)  //FIXME
					item.render(null, false);
			});

			this.components.each(function(item){
					item.render();
			});

			this.items.each(function(item){
				// содержимое динамических элементов отрисовывается через bind
				if(!item.options.dynamic)  //FIXME
					item.render();
			});

		}
*/

		if(cascade !== false)
			this._layoutChanged();


		return $.when( (this.options.showOnRender || this.options.renderEffects) ? this.show() : true );
	},



	/**
	 * Удаление виджета из DOM-дерева
	 *
	 */
	unrender: function() {

		this._rendered = false;

		return $.when( (this.options.hideOnUnrender || this.options.renderEffects) ? this.hide() : true )
			.then(function() {
				this.el.detach();
			}.bind(this));

	},




	/**
	 * Перерисовка виджета
	 *
	 * @protected
	 *
	 */
	_rerender: function() {

		var w = this;

		// если .children не проинициализирован, значит перерисовывать нечего
		if(!this.__c) return;

		this.children.each(function(item){
			if(item._rendered)
				item.unrender();
		});


		this.children.each(function(item, i){
			if(!item._rendered && item.options.autoRender !== false && !(item.options.autoRender == 'non-empty' && item.children.src.length == 0 && !item.options.text)) {

				item._type == 'item' ? w.layout.add(item, i /*item._index*/) : w.layout.add(item, undefined, i);

			}

		}, this.options.renderFilter, this.options.renderSorter);


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
	 * Обработчик, вызываемый когда необходимо обновить компоновку
	 *
	 * @protected
	 */
	_layoutChanged: function(cascade) {

		if(this.__l || this.options.autoHeight || this.options.autoWidth || this.options.autoFit) {
//			console.log(this.el);
			this.layout.update();
		}
		//FIXME возможно следует поменять эту строку на fire('layoutChanged')
//		if(this.layout.options.updateMode == 'auto') this.layout.update();

		if(cascade !== false && this.__c)
			this.children.apply_all('_layoutChanged');

//		this.events.fire('layoutChanged');
	},




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
	 * Подключение данных к виджету
	 *
	 * Если опция autoBind = false, то связывание осуществлено не будет.
	 *
	 * @param {Object|Array|string} data подключаемые данные
	 */
	bind: function(data, update, pivot) {

		var o = this.options;
		var self = this;
		var w = this;

		var data_id = o.dataId;

		// if(data_id != null && data_id[0] == '@') {
		// 	data = this._context.data( data_id.substr(1) );//[data_id];//[data_id.substr(1)];
		// 	data_id = undefined;
		// }

		// если данные не определены или биндинг выключен, то биндинг не выполняем
		if(this.data == data || data === undefined || o.autoBind === false) return;

		// открепляем источник данных от виджета:
		//   удаляем все обработчики событий старого источника данных, связанные с текущим виджетом
		if(this.data)
			this.data.events.off(this);


		// определяем, является ли источник данных опорным
		if(pivot === undefined) pivot = true;
		this._pivot = pivot;

//		if(update !== false) update = true;

		//TODO custom data injector
		if( $.isString(data) ) {
			var w = this;
			while(!w._scope) {
				w = w.parent;
			}
			if(w._scope) {
				data = w._scope[data];
			}
			else {
				throw new Error('Can not inject scope datasource into detached widget');
			}
			// var name_a = data.split(':');
			// var src = (name_a.length == 1) ? this : this[name_a[0]];
			// data = src[name_a[1]];
		}


		// если определен параметр dataId, то источником данных будет дочерний элемент, если нет - то сам источник данных
		if(data_id) //'dataId' in o)
			this.data = (data instanceof Ergo.core.DataSource) ? data.entry(data_id) : new Ergo.core.DataSource(data, data_id);
		else
			this.data = (data instanceof Ergo.core.DataSource) ? data : new Ergo.core.DataSource(data);


		// Если виджет является динамическим (управляется данными)
		if(o.dynamic) {

			// если добавлен новый элемент данных, то добавляем новый виджет
			this.data.events.on('entry:added', function(e){

//				console.log(e);

				self.children.autobinding = false;
				var item = self.items.add({}, e.isLast ? null : e.index);
				self.children.autobinding = true;
				item.bind(e.entry);

				item._dynamic = true;

				item.render();
			}, this);

			// если элемент данных удален, то удаляем соответствующий виджет
			this.data.events.on('entry:deleted', function(e){
				var item = self.item({data: e.entry});
				if(item)
					item._destroy();
//				self.children.remove( self.item({data: e.entry}) )._destroy();//e.index) );// {data: self.data.item(e.index)});
			}, this);

			// если элемент данных изменен, то создаем новую привязку к данным
			this.data.events.on('entry:changed', function(e){
				//FIXME странное обновление данных
				var item = self.item({data: e.entry});
				if(!item) {
					self.children.autobinding = false;
					item = self.items.add({});
					self.children.autobinding = true;

					item.bind(e.entry);
					item._dynamic = true;
				}

				//FIXME _rebind ?
				item.bind(/*self.data.entry(e.entry.id)*/e.entry, false, false);
	//			self.getItem( e.item.id )._dataChanged(); //<-- при изменении элемента обновляется только элемент
			}, this);


			this.data.events.on('entryDirty', function(e){
				if( self.options.dynamicFilter )
					self._rebind(false);
			});



			// если изменилось само значение массива, то уничожаем все элементы-виджеты и создаем их заново
			this.data.events.on('value:changed', function(e){

				self._rebind(false);

			}, this);


			this.data.events.on('value:sync', function(e){

				self._dataChanged();

			}, this);



			// создаем вложенные элементы контейнера на основе источника данных

//			this.layout.immediateRebuild = false;

			this.children.filter(function(c){ return c._dynamic; }).apply_all('_destroy');

			this.data.each(function(dataEntry, i){
//					self.items.add({}).bind(dataEntry, true, 2);
					self.children.autobinding = false;
					var item = self.items.add({});//{ 'data': dataEntry, 'autoUpdate': false });
					self.children.autobinding = false;

					item.bind(dataEntry, false);
					item._pivot = false;
					item._dynamic = true;
//					item.el.attr('dynamic', true);
			}, this.options.dynamicFilter, this.options.dynamicSorter);

			// this.layout.immediateRebuild = true;
			// this.layout.rebuild();

			this.render(false);
		}
		else {


			this.data.events.on('value:changed', function(e) {
				// при изменении значения обновляем виджет, но только в "ленивом" режиме
				/*if(o.updateOnDataChanged)*/
				//self._dataChanged(true);
				self._rebind();
			}, this);

			this.data.events.on('entryDirty', function(e) {
				self._dataChanged(false, false); // ленивое обновление данных без каскадирования
			}, this);


			this.data.events.on('value:sync', function(e){

				self._dataChanged();

			}, this);


//			this.data.events.on('value:changed', this._rebind.bind(this), this);

			// связываем данные с дочерними компонентами виджета при условии:
			//	1. если дочерний виджет является опорным (логически связан с другим источником данных), то игнорируем его
			// 	2. обновление дочернего виджета не производится (оно будет позже иницировано опорным элементом)
			//	3. дочернtve виджетe явно указывается, что он является опорным
			if(this.__c) {

				this.children.each(function(child){
					if(!child._pivot && child.data != self.data) child.bind(self.data, false, false);
				});
			}

		}

		// обновляем виджет (если это не запрещено в явном виде)
		if(update !== false && !this.data.options.fetchable) this._dataChanged();


//		if( this.data.options.fetchable ) {

		this.data.events.on('fetch:before', function(){
			w.events.fire('fetch');
		}, this);
		this.data.events.on('fetch:after', function(){
			w._layoutChanged();
			w.events.fire('fetched');
		}, this);

		// если установлен параметр autoFetch, то у источника данных вызывается метод fetch()
		if(o.autoFetch)	this.data.fetch();//.then(function(){ self.events.fire('fetch'); });
//		}


		this.events.fire('bound');
	},



	unbind: function() {
		//
	},



	/**
	 *
	 * @protected
	 */
	_rebind: function(update) {

		var o = this.options;
		var self = this;


		if(!this.data) return;

//		console.log('rebind');

		// // если определен параметр dataId, то источником данных будет дочерний элемент, если нет - то сам источник данных
		// if('dataId' in o)
			// data = (data instanceof Ergo.core.DataSource) ? data.entry(o.dataId) : new Ergo.core.DataSource(data, o.dataId);
		// else
			// data = (data instanceof Ergo.core.DataSource) ? data : new Ergo.core.DataSource(data);
//
		// // если источник данных отличается от уже привязанного, то выполняем новое связвание
		// if(data != this.data) {
			// this.bind(data, update, pivot);
			// return
		// }


		// console.log('rebind ('+self.options.dynamic+')');
		// console.log(''+self.options.html + ' ' + self.getValue());



		if(o.dynamic) {
			// TODO

//		console.log('rebind (dynamic)');

			// обновляем вложенные элементы контейнера на основе источника данных
//			this.layout.immediateRebuild = false;

			// // уничтожаем все динамические элементы
			this.children.filter(function(c){ return c._dynamic; }).apply_all('_destroy');

//			var t0 = Ergo.timestamp();

			this.data.each(function(dataEntry, i){
//					self.items.add({}).bind(dataEntry, true, 2);
				self.children.autobinding = false;
				var item = self.items.add({});//{ 'data': dataEntry });
				self.children.autobinding = false;

				item.bind(dataEntry);
				item._pivot = false;
				item._dynamic = true;
//					item.el.attr('dynamic', true);
//					item.dataPhase = 2;
//				item.render();
			}, this.options.dynamicFilter, this.options.dynamicSorter);

//			var t1 = Ergo.timestamp();
//			console.log(t1 - t0);

			// this.layout.immediateRebuild = true;
			// this.layout.rebuild();

//			if(!Ergo.noDynamicRender)
			this.render();


			// обновляем виджет (если это не запрещено в явном виде)
//			if(update !== false) this._dataChanged(true);

		}
		else {

//		console.log('rebind (static)');

			if(this.__c) {

				this.children.each(function(child){
	//				if(!child._pivot) child.rebind(false);
					// 1. rebind не вызывается у дочерних элементов со своим dataSource
					// 2. rebind не вызывается у дочерних элементов с общим dataSource
					//      (работает некорректно, если rebind вызывается не событием)
					if(!child._pivot && (child.data != self.data || update === false)) {
							child._rebind(false);
					}
				});

			}

			//TODO возможно, здесь нужно вызвать render() с выключенным каскадированием

//			this._layoutChanged();

			// обновляем виджет (если это не запрещено в явном виде)
			// динамические элементы пропустим
			if(update !== false) this._dataChanged(undefined, undefined, true);
		}





	},




	is_bound: function() {
		return (this.data != null);
	},





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



	/**
	 * Каскадное обновление связывания
	 *
	 * Если указана функция связывания (`options.binding`), то она используется для обновления виджета
	 *
 	 * @param {Boolean} lazy если true, то не будут обновляться дочерние виджеты, имеющие тот же источник данных
 	 * @param {Boolean} cascade если равно false, то все дочерние виджеты не будут обновляться
 	 * @param {Boolean} noDynamic если равно true, то не будут обновляться дочерние виджеты, имеющие динамическое связывание
 	 *
	 * @protected
	 */
	_dataChanged: function(lazy, cascade, no_dynamic) {

		// если отключено каскадирование, то обновление не производим
//		if(cascade && !this.options.cascading) return;

//		if(!this.options.autoBind /*|| this._lock_data_change*/) return;

		var binding = this.options.binding;

		if(/*this.data &&*/ binding){
			if( $.isString(binding) ) {
				this.opt(binding, this.opt('value'));
			}
			else {
				if( binding.call(this, this.opt('value')) === false) return false;
			}
//			var val = this.getValue();
//			this._lock_value_change = true;
//			delete this._lock_value_change;

			/**
			 *
			 *
			 */
			this.events.fire('dataChanged');//, e);
		}

		// var e = new Ergo.events.CancelEvent({value: this.getValue()});
		// if(e.isCanceled) return;


		if(cascade === false)
			return;

		var self = this;

//		if(cascade !== false) {
		this.children.each(function(child){

			if(no_dynamic && child.options.dynamic) return;

			// Отменяем обновление дочернего элемента, если:
			//  1. определен источник данных
			//  2. источник данных дочернего элемента совпадает с текущим
			//  3. дочерний элемент имеет свой независимый источник данных
			if(lazy && child.data && child.data == self.data) return;
			if(child._pivot || child.options.autoBind === false) return; //FIXME динамические элементы являются опорными => это условие всегда срабатывает
//			if(lazy && child.options.dynamic) return;
			child._dataChanged(lazy, cascade, no_dynamic);
		});
//		}
//			this.children.apply_all('_dataChanged', [true]);

//		this.children.each(function(child) { child._dataChanged(); });

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

	return Ergo['$'+ns](o, ns+':'+etype, scope);
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
