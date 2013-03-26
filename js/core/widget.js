
//= require "data"
//= require "states"
//= require "layout"
//= require "widget-props"
//= require "widget-list"




/**
 * Базовый объект для всех виджетов
 * 
 * @example
 * Get-опции:
 * 	text
 * 	innerText
 * 	innerHtml
 * 	opacity
 *	width
 * 	height
 * 	autoWidth
 * 	autoHeight
 * 	tooltip
 * 	id
 * 	tag
 * 	tabIndex
 * 	format
 * 	binding
 * 	store
 * 	
 * Set-опции
 * 	text
 * 
 * 
 * @class
 * @name Ergo.core.Widget
 * @extends Ergo.core.Object
 * @param {Object} o параметры
 */
Ergo.declare('Ergo.core.Widget', 'Ergo.core.Object', /** @lends Ergo.core.Widget.prototype */{
	
	
	
	/**
	 * @static
	 * @private
	 */
	defaults: {
		layout: 'default',
		states: {
//			'hidden': 'hidden',
			'disabled': 'disabled',
			'invalid': 'invalid'
//			'unselectable': 'unselectable'
		},
		plugins: [Ergo.Observable, Ergo.Statable],
		autoBind: true,
		autoUpdate: true,
		layoutFactory: function(layout) {
			if( $.isString(layout) )
				layout = Ergo.object({etype: 'layouts:'+layout});
			else if(!(layout instanceof Ergo.core.Layout))
				layout = Ergo.object(Ergo.override({etype: 'layouts:default'}, layout));
			return layout;	
		},
		events: {},
//		defaultItem: {},
		// defaultComponent: {},
		// componentFactory: function(o) {
			// if($.isString(o)) {
				// o = this.options.shortcuts[o] || {text: o};
			// }
			// return Ergo.widget( Ergo.smart_override({}, this.options.defaultComponent, o) );
		// },
		shortcuts: {},
		showOnRender: false,
		hideOnRender: false,
		set: {
/*			
//			'text': function(v) {	this.layout.el.text(v); },
			'innerText': function(v) {	this.layout.el.text(v); },
			'innerHtml': function(v) {	this.layout.el.html(v); },
			'opacity': function(v) {
				if($.support.opacity) 
					this.el.css('opacity', v);
				else {
					this.el.css('filter', 'Alpha(opacity:' + (v*100.0) + ')');
					this.el.css('-ms-filter', 'progid:DXImageTransform.Microsoft.Alpha(Opacity=' + (v*100.0).toFixed() + ')');				
				}				
			},
			'width': function(v) { this.el.width(v); },
			'height': function(v) { this.el.height(v); },
			'autoWidth': function(v) { v ? this.el.attr('autoWidth', v) : this.el.removeAttr('autoWidth'); },
			'autoHeight': function(v) { v ? this.el.attr('autoHeight', v) : this.el.removeAttr('autoHeight'); },
			'tooltip': function(v) { this.el.attr('title', v); },
			'id': function(v) { this.el.attr('id', v); },
			'tag': function(v) { this.tag = v; },
//			'name': function(v) { this.name = v; },
			'tabIndex': function(v) { this.el.attr('tabindex', v); },			
//			'role': function(v) { this.el.attr('role', v); },
			'format': function(v) {
				if($.isString(v)) this.options.format = Ergo.format_obj.curry(v);
			},
			'hidden': function(v) {
				this.el.css('display', v ? 'none' : '');
			}
*/			
		},
		get: {
			// 'text': function() { return this.el.text(); }
		}			
	},
	
/*			
	initialize: function(o) {
		this.$super(o);
//		Ergo.core.Widget.superclass.initialize.apply(this, arguments);


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
		this.$construct(o);
		
		// устанавливаем опциональные параметры
		this.$opt(o);
		
		// добавляем обработку событий (deprecated)
//		this.$events(this);

		// добавляем элемент в документ
		this.$render(o.renderTo);
		
		// подключаем данные и обновляем их, если установлен параметр autoUpdate
		this.bind(o.data, o.autoUpdate);
						
		
		this.$afterBuild();
		
//		if(this.options.debug)	console.log('created');		
		
	},
*/	
	
	
	destroy: function(noHide) {
		
		var self = this;
		
		if(this.options.hideOnDestroy && !noHide) {
			this.hide().then(function() { self.destroy(true); });
		}
		else {
		
			// удаляем элемент и все его содержимое (data + event handlers) из документа
			if(this.parent) this.parent.children.remove(this);
			
			if(this.data) this.data.events.unreg(this);
			
			if(this.el) this.el.remove();
			// очищаем регистрацию обработчиков событий
			this.events.unreg_all();
			// очищаем регистрацию обработчиков событий
			Ergo.event_bus.unreg(this);
			// очищаем компоновку
			this.layout.clear();
			
			// вызываем метод destroy для всех дочерних компонентов
			this.children.apply_all('destroy');
		}
//		if(this.options.debug)	console.log('destroyed');
	},
	
	
	
	
	
	$pre_construct: function(o) {
		this.$super(o);
		
		
		var self = this;


		// "сахарное" определение контента виджета
		if('content' in o){
			Ergo.smart_override(o, {
				components: {
					content: o.content
				}
			})
		}


		
		for(var i in o) {
			if(i[0] == '$') {
				var key_a = i.split('_');
				var overrides = {};
				var val = overrides;
				
				while(key_a.length > 0) {
					var k = key_a.shift();
					var v = (key_a.length == 0) ? o[i] : {};
					if(k[0] == '$') {
						k = k.substring(1);
						val.components = {};
						val = val.components[k] = v;
					}
					else {
						val = val[k] = v;
					}					
				}
				
/*				
				val[k] = o[i];
				
				
				var key = key_a.shift();
				while(key_a.length > 0) {
					if(key[0] == '$') {
						key = key.substring(1);
						val.components = {};
						val = val.components[key] = {};
					}
					else {
						val = val[key] = {};						
					}
					key = key_a.shift();
				}
				val[key] = o[i];
*/				
				
				Ergo.smart_override(o, overrides);
			}
		}
		
		

		
		
		
		
		
	},
	
	
	
	/**
	 * Хук, вызываемый для инициализации виджета.
	 * 
	 * Чаще всего используется для модификации параметров.
	 * 
	 * @private
	 */
	
/*	
	$init: function(o) {
		
//		var o = this.options;
		
//		this.components = new Ergo.core.WidgetCollection(this);
		
//		this.components = this.collection; //new Ergo.core.Collection();		
		
		// "сахарное" определение контента виджета
		if('content' in o){
			Ergo.smart_override(o, {
				components: {
					content: o.content
				}
			})
		}
		
		
		
//		if('states' in o) {
//			if($.isString(o.states)) o.states = [o.states];
//		}
		
	},
*/

	
	
	$construct: function(o) {
		this.$super(o);
		
		
		var self = this;
//		var el = this.el;
		
		
		// создаем список дочерних элементов
		/**
		 * @field
		 * 
		 * @description Коллекция элементов виджета
		 * 
		 */
		this.children = new Ergo.core.WidgetChildren(this);

		this.components = new Ergo.core.WidgetComponents(this, {type: 'component'});
		this.items = new Ergo.core.WidgetItems(this, {type: 'item'});
		
		//TODO этап генерации jQuery-элемента можно оптимизировать
		// создаем новый элемент DOM или используем уже существующий
		/**
		 * @field
		 * 
		 * @description jQuery-объект, с которым связан виджет
		 * 
		 */
		this.el = $(o.html);//this.$html());
		this.el.data('ergo-widget', this);
//		if(this.defaultCls) this.el.addClass(this.defaultCls);
		if('style' in o) this.el.css(o.style);
		if('cls' in o) this.el.addClass($.isString(o.cls) ? o.cls : o.cls.join(' '));
		if('baseCls' in o) this.el.addClass(o.baseCls);

		
		// создаем компоновку
		/**
		 * @field
		 * 
		 * @description Компоновка
		 * 
		 */
		this.layout = o.layoutFactory(o.layout);
		//FIXME костыль
//		if(!this.layout.container) this.layout.attach(this);
		this.layout.attach(this.layout.options.container || this);
		
		
		
		
		
		
		
		
		
		if('components' in o) {
			var arr = [];
			// преобразуем набор компонентов в массив
			Ergo.each(o.components, function(c, i){
//				c.weight = ('weight' in c) ? c.weight : 0;//9999;
//				c._cweight = ('weight' in c) ? c.weight : 9999;
//				c._cname = i;

				if(!c.ignore)
					self.children.add(c, i, 'component');
	
//				c.name = i;
//				self[i] = c;
								
//				arr.push(c);
			});
			// сортируем массив по весу компонентов
			// arr.sort(function(c1, c2){
				// var a = c1._cweight;
				// var b = c2._cweight;
				// if(a < b) return -1;
				// else if(a > b) return 1;
				// return 0;
			// });
			// добавляем компоненты
//			Ergo.each(arr, function(c){
//				var i = c._cname;
//				var w = c._cweight;
//				delete c._cweight;
//				delete c._cname;
//				self.addComponent(c, i);
//				c = o.componentFactory.call(self, c);
//				c.opt('tag', i);
//			});
			
			// задаем "ленивые" классы компонентов
			for(var i in o.components){
				var easyCls = ''+i+'Cls';
				if(easyCls in o) this[i].el.addClass(o[easyCls]);//.opt('cls', o[easyCls]);
			}

			// if('baseCls' in o) {
				// // задаем дочерние классы компонентов
				// for(var i in o.components){
					// var cls = o.baseCls + '-' + i;
					// this[i].el.addClass(cls);
				// }				
			// }
			
		}
		
		
		
		if('items' in o){
			for(var i = 0; i < o.items.length; i++)
				this.children.add(o.items[i]);
				
		}		
		
		
		
		if('events' in o){
			for(var i in o.events){				
				var callback_a = o.events[i];
				callback_a = $.isArray(callback_a) ? callback_a : [callback_a]; //FIXME
				for(var j in callback_a) {
					var callback = callback_a[j];
					
					if(i.indexOf('bus:') == 0) {
						// EventBus
						Ergo.event_bus.reg(i, callback, this);
					}
					else {
						// HTML
						self.el.on(i, callback.rcurry(self));						
					}
				}
			}
		}		
		
		
						
		// if('states' in o){
			// for(var i in o.states)
				// this.states.state(i, o.states[i]);
			// // настраиваем особое поведение состояния hover
			// if('hover' in o.states){
				// this.el.hover(function(){ self.states.set('hover') }, function(){ self.states.unset('hover') });
			// }
		// }
// 		
		// if('transitions' in o) {
			// for(var i in o.transitions) {
				// var t = o.transitions[i];
				// if($.isPlainObject(t)) {
					// //TODO
				// }
				// else {
					// var a = i.split('>');
					// if(a.length == 1) a.push('');
					// this.states.transition($.trim(a[0]), $.trim(a[1]), t);					
				// }
			// }
		// }
		
		
		
		
//				this.states.state(i, o.states[i]);
		
		
		// var wrap_func = function(handler, e, type) {
			// var result = handler.call(this, e, type);
			// if(this.parent) this.parent.events.fire(type, e);
		// }
		
		
		// var regexp = /^on\S/;
		// for(var i in o){
			// if(regexp.test(i)){
				// var name = i.charAt(2).toLowerCase() + i.slice(3);
				// var chain = ( !$.isArray(o[i]) ) ? [o[i]] : o[i];
				// for(var j = 0; j < chain.length; j++) {
					// this.events.reg( name, chain[j] );
				// }
			// }
		// }

		
		if('onClick' in o)
			this.el.click(function(e) { if(!self.states.is('disabled')) self.events.fire('click', {button: e.button}, e) });
		if('onDoubleClick' in o)
			this.el.dblclick(function(e) { if(!self.states.is('disabled')) self.events.fire('doubleClick', {button: e.button}, e) });
		
		
		
		
		
		
		// добавляем метод bubble к events
		this.events.bubble = function(name, e) {
			if(!e) e = {}
			e.after = Ergo.bubble;
			e.target = e.target || self;
			this.fire(name, e);
		}				
		
	},
	
//	_theme: function() {
//		if(this.options.ui == 'jquery_ui') this._theme_jquery_ui
//	}
	
	
	
	
	$post_construct: function(o) {
		this.$super(o);
		
		// добавляем элемент в документ
		this.$render(o.renderTo);
		
		// подключаем данные и обновляем их, если установлен параметр autoUpdate
		this.bind(o.data, o.autoUpdate);
						
		
//		this.$afterBuild();
	
		var self = this;
		
		
		// устанавливаем состояния по умолчанию
		if('state' in o) {
			var a = o.state.join(' ').split(' ');			
//			var a = o.state.split(' ');
			Ergo.each(a, function(state) {
				if(state[0] == '-') 
					self.states.unset(state.substr(1));
				else 
					self.states.set(state);
			});
		}
		
		
		this.events.fire('afterBuild');
		
	},
	
	
	
	
	// factory: function(item) {
		// if(!(item instanceof Ergo.core.Widget)) {
			// item = this.options.componentFactory.call(this, item);
		// }
		// return item;
	// },
	
	
	
	
	
	
	
	
	show: function() {
		return $.when( this.el.show() );
	},
	
	
	hide: function() {
		return $.when( this.el.hide() );
	},
	
	
	
	/**
	 * Хук, вызываемый для определения тэга, на основе которого будет построен виджет
	 * 
	 * @private
	 */
	// $html: function() {
		// return this.options.html;
	// },
	
	/**
	 * Хук, вызываемый при добавлении виджета на страницу
	 * 
	 * @param {Element|Ergo.core.Widget} target
	 * @private
	 */
	$render: function(target) {
		if(target){
//			if(target instanceof Ergo.core.Widget) {
//				target.addComponent(this);
//			}
//			else {
				$(target).append(this.el);
//			}
				
//			var parentEl = (target instanceof Ergo.core.Widget) ? target.el : $(target);
//			parentEl.append(this.el);
			
			if(this.el.parents().is('body')){
				this.$afterRender();
				this.$layoutChanged();
			}
			
		}
	},
	
	// _theme: function(name) {
	// },
	
	/**
	 * Хук, вызываемый после построения объекта
	 * 
	 * @private
	 */
	
/*
	$afterBuild: function() {
		
		var o = this.options;
		var self = this;
		
		
//		if(o.showOnRender) this.show();
//		if(o.hideOnRender) this.hide();
		
		
		// устанавливаем состояния по умолчанию
		if('state' in o) {
			var a = o.state.split(' ');
			Ergo.each(a, function(state) {
				if(state[0] == '!') 
					self.states.unset(state.substr(1));
				else 
					self.states.set(state);
			});
		}

		

		this.events.fire('afterBuild');
		
	},
*/	

	/**
	 * Хук, вызываемый при обновлении компоновки
	 * 
	 * @private
	 */
	$layoutChanged: function() {
		
		//FIXME возможно следует поменять эту строку на fire('layoutChanged')
		if(this.layout.options.updateMode == 'auto') this.layout.update();
		
		this.children.apply_all('$layoutChanged');
		
		this.events.fire('layoutChanged');
	},
	
	// $events: function(self){
	// },
	
	
	/**
	 * Хук, вызываемый после отрисовки виджета
	 * 
	 * @private
	 */
	$afterRender: function() {
		
//		if(this.options.showOnRender)	this.show();
//		if(this.options.hideOnRender) this.hide();		
		
//		this.children.each(function(c) { c.$afterRender(); });
		this.events.fire('afterRender');
		this.children.apply_all('$afterRender');
	},

	
	
	
	/**
	 * Рекурсивный обход всех компонентов виджета
	 * 
	 * @param {Object} callback метод, вызываемый для каждого компонента
	 */
	walk: function(callback) {
		if( callback.call(this, this) === false) 
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
		var filter = Ergo.by_widget(i);
		var j = 0;
		return this.children.find(function(item, i){
			if(item._type == 'item'){
				if(filter.call(this, item, j)) return true;
				j++;
			} 
//			return item.type == 'item' && ;
		});
	},
	
	

	component: function(i) {
		var filter = Ergo.by_widget(i);
		return this.children.find(function(item, j){
			return item._type == 'component' && filter.call(this, item, j);
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
	getParents: function(list) {
		if(arguments.length == 0) list = [];
		if(!this.parent) return list;
		list.push(this.parent);
		return this.parent.getParents(list);
	},
	
	/**
	 * Получение родительского виджета
	 * 
	 * Если критерий не указан, то возвращается непосредственный родитель
	 * 
	 * @example
	 * a.getParent();
	 * b.getParent({'data': dataItem});
	 * c.getParent(Ergo.widgets.Box);
	 * d.getParent(function(w) { return w.options.width < 100; });
	 * e.getParent('header');
	 * 
	 * @param {Any} [criteria] критерий 
	 */
	getParent: function(i) {
		
		if(arguments.length == 0) return this.parent;
		
		return Ergo.find(this.getParents(), Ergo.by_widget(i));
	},
	
	
	
	
	
	
	
	
	//---------------------------------------------
	// Методы работы с подсоединенными данными
	//---------------------------------------------
	
	
	
	/**
	 * Подключение данных к виджету
	 * 
	 */
	bind: function(data, update, pivot) {
				
		var o = this.options;
		var self = this;
		

		// если данные не определены или биндинг выключен, то биндинг не выполняем
		if(this.data == data || data === undefined || !o.autoBind) return;
		
		// открепляем источник данных от виджета:
		//   удаляем все обработчики событий старого источника данных, связанные с текущим виджетом
		if(this.data)
			this.data.events.unreg(this);


		// определяем, является ли источник данных опорным
		if(pivot === undefined) pivot = true;
		this._pivot = pivot;
		
//		if(update !== false) update = true;
		


		// если определен параметр dataId, то источником данных будет дочерний элемент, если нет - то сам источник данных 
		if('dataId' in o)
			this.data = (data instanceof Ergo.core.DataSource) ? data.entry(o.dataId) : new Ergo.core.DataSource(data, o.dataId);
		else
			this.data = (data instanceof Ergo.core.DataSource) ? data : new Ergo.core.DataSource(data);


		// Если виджет является динамическим (управляется данными)
		if(o.dynamic) {
			
			// если добавлен новый элемент данных, то добавляем новый виджет
			this.data.events.reg('entry:added', function(e){
				
				self.children.autobinding = false;
				var item = self.items.add({}, e.isLast ? null : e.index);
				self.children.autobinding = true;
				item.bind(e.entry);
				
				item._dynamic = true;
			}, this);
			
			// если элемент данных удален, то удаляем соответствующий виджет
			this.data.events.reg('entry:deleted', function(e){
				self.item({data: e.entry}).destroy();
//				self.children.remove( self.item({data: e.entry}) ).destroy();//e.index) );// {data: self.data.item(e.index)});
			}, this);
			
			// если элемент данных изменен, то создаем новую привязку к данным
			this.data.events.reg('entry:changed', function(e){
				//FIXME странное обновление данных
				var item = self.item({data: e.entry})
				if(!item) {
					self.children.autobinding = false;
					item = self.items.add({});
					self.children.autobinding = true;
					
					item.bind(e.entry);
					item._dynamic = true;
				}
				item.bind(/*self.data.entry(e.entry.id)*/e.entry, false, false);
	//			self.getItem( e.item.id ).$dataChanged(); //<-- при изменении элемента обновляется только элемент
			}, this);
	
			// если изменилось само значение массива, то уничожаем все элементы-виджеты и создаем их заново
			this.data.events.reg('value:changed', function(e){
				
				self.rebind(false);
/*	
				// обновляем вложенные элементы контейнера на основе источника данных 
				self.layout.immediateRebuild = false;
	
				// // уничтожаем все элементы-виджеты
				self.children.filter(function(c){ return c._dynamic; }).apply_all('destroy');
				
	//			var t0 = Ergo.timestamp();
	
				self.data.iterate(function(dataEntry, i){
//					self.items.add({}).bind(dataEntry, true, 2);
					var item = self.children.add({ 'data': dataEntry });
					item._pivot = false;
					item._dynamic = true;
//					item.el.attr('dynamic', true);
//					item.dataPhase = 2;
				});
			
	//			var t1 = Ergo.timestamp();
	//			console.log(t1 - t0);
					
				self.layout.immediateRebuild = true;
				self.layout.rebuild();
*/				
			}, this);
			
	
	
			// создаем вложенные элементы контейнера на основе источника данных 
	
			this.layout.immediateRebuild = false;
					
			this.children.filter(function(c){ return c._dynamic; }).apply_all('destroy', [true]);
	
			this.data.iterate(function(dataEntry, i){
//					self.items.add({}).bind(dataEntry, true, 2);
					self.children.autobinding = false;
					var item = self.items.add({});//{ 'data': dataEntry, 'autoUpdate': false });
					self.children.autobinding = false;
					
					item.bind(dataEntry, false);
					item._pivot = false;
					item._dynamic = true;
//					item.el.attr('dynamic', true);
			});
	
			this.layout.immediateRebuild = true;
			this.layout.rebuild();
			
			
		}
		else {
		
								
			this.data.events.reg('value:changed', function() {
				// при изменении значения обновляем виджет, но только в "ленивом" режиме
				/*if(o.updateOnDataChanged)*/ 
				//self.$dataChanged(true);
				self.rebind();
			}, this);
			
		
			// связываем данные с дочерними компонентами виджета при условии:
			//	1. если дочерний виджет является опорным (логически связан с другим источником данных), то игнорируем его
			// 	2. обновление дочернего виджета не производится (оно будет позже иницировано опорным элементом)
			//	3. дочернtve виджетe явно указывается, что он является опорным
			this.children.each(function(child){
				if(!child._pivot && child.data != self.data) child.bind(self.data, false, false);
			});

		}

		// обновляем виджет (если это не запрещено в явном виде)
		if(update !== false) this.$dataChanged();


		this.data.events.reg('fetch', function(){ self.events.fire('fetch') });

		// если установлен параметр autoFetch, то у источника данных вызывается метод fetch()
		if(o.autoFetch)	this.data.fetch();//.then(function(){ self.events.fire('fetch'); });


		this.events.fire('bound');
	},
	
	
	
	
	rebind: function(update) {
		
		var o = this.options;
		var self = this;
		
		
		if(!this.data) return;

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
		
		
		if(o.dynamic) {
			// TODO
			
			// обновляем вложенные элементы контейнера на основе источника данных 
			this.layout.immediateRebuild = false;

			// // уничтожаем все элементы-виджеты
			this.children.filter(function(c){ return c._dynamic; }).apply_all('destroy', [true]);
			
//			var t0 = Ergo.timestamp();

			this.data.iterate(function(dataEntry, i){
//					self.items.add({}).bind(dataEntry, true, 2);
				self.children.autobinding = false;
				var item = self.items.add({});//{ 'data': dataEntry });
				self.children.autobinding = false;
				
				item.bind(dataEntry);
				item._pivot = false;
				item._dynamic = true;
//					item.el.attr('dynamic', true);
//					item.dataPhase = 2;
			});
		
//			var t1 = Ergo.timestamp();
//			console.log(t1 - t0);
				
			this.layout.immediateRebuild = true;
			this.layout.rebuild();
			
			
		}
		else {
			this.children.each(function(child){
				if(!child._pivot && child.data != self.data) child.rebind(false);
			});			
		}
		
		
		// обновляем виджет (если это не запрещено в явном виде)
		if(update !== false) this.$dataChanged();
		
	},
	
	
	
	
	isBound: function() {
		return (this.data != null);
	},
	
	
	
	
	
	/**
	 * Получение значения, связанного с виджетом.
	 * 
	 * Если задана функция форматирования (format), то она используется для преобразования результата
	 * 
	 * @returns {Any} undefined, если к виджету данные не подключены
	 */
	getValue: function() {
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
	 * Если задана функция хранения (store), то она используется для преобразования значения
	 * 
	 * @param {Any} val значение
	 */
	setValue: function(val/*, reason*/) {
		
//		if(this._lock_value_change) return;
		
		var o = this.options;

		if(o.store)
			val = o.store.call(this, val);
		
		if(this.data){


//			this._lock_data_change = true;
//			o.store ? o.store.call(this, val) : this.data.set(val);
			this.data.set(val);
//			delete this._lock_data_change;
				 
		}
		else {
			this._value = val;
			this.$dataChanged();
//			o.value ? o.value.call(this, val) : this.opt('text', val);
		}		
		
		
		
//		if(o.binding)
//			o.binding.call(this, val);

//		this.events.bubble('valueChanged', {'value': val});				
				
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
	 * Хук, вызываемый при изменении связанных данных
	 * 
	 * @private
	 */
	$dataChanged: function(lazy) {
		
		// если отключено каскадирование, то обновление не производим
//		if(cascade && !this.options.cascading) return;
		
//		if(!this.options.autoBind /*|| this._lock_data_change*/) return;
		
		var binding = this.options.binding;

		if(/*this.data &&*/ binding){
//			var val = this.getValue();
//			this._lock_value_change = true;
			if( binding.call(this, this.opt('value')) === false) return false;
//			delete this._lock_value_change;
			
		}

		// var e = new Ergo.events.CancelEvent({value: this.getValue()});
		this.events.fire('dataChanged');//, e);
		// if(e.isCanceled) return;

		var self = this;

//		if(cascade !== false) {
		this.children.each(function(child){
			// Отменяем обновление дочернего элемента, если:
			//  1. определен источник данных
			//  2. источник данных дочернего элемента совпадает с текущим
			//  3. дочерний элемент имеет свой независимый источник данных
			if(lazy && child.data && child.data == self.data) return;
			if(child._pivot || !child.options.autoBind) return;
			child.$dataChanged(lazy);
		});
//		}
//			this.children.apply_all('$dataChanged', [true]);
		
//		this.children.each(function(child) { child.$dataChanged(); });	
		
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




	
}, 'widget');



Ergo.override(Ergo.core.Widget.prototype, Ergo.core.WidgetProperties);





Ergo.widget = function(){
	if(arguments.length == 1) return Ergo.object(arguments[0]);
	return Ergo.object( Ergo.smart_override.apply(this, arguments) );
};


Ergo.bubble = function(e, type) {
	if(this.parent && !e.stopped) this.parent.events.fire(type, e);
}



//------------------------------
// Интегрируемся в jQuery
//------------------------------

$.ergo = Ergo.widget;

$.fn.ergo = function(o) {
	if(this.length > 0){
		var widget = this.data('ergo-widget');
		if(widget) return widget;
		if(!o) return undefined;
		o.html = this;
	}
	else if(arguments.length == 0) return null;
	return Ergo.widget(o);
};




/**
 * @namespace Пространство для классов, наследуемых от Ergo.core.Widget
 */
Ergo.widgets = {};









