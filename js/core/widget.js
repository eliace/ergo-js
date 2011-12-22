
//= require "data-source"
//= require "states"
//= require <layouts/plain>
//= require "widget-list"




// Ergo.formats = {};
// Ergo.parsers = {};
// Ergo.validators = {};




/**
 * Базовый объект для всех виджетов
 * 
 * @class
 * @extends Ergo.core.Object
 * @param {Object} o параметры
 */
Ergo.core.Widget = Ergo.declare('Ergo.core.Widget', 'Ergo.core.Object', /** @lends Ergo.core.Widget.prototype */{
	
	
	
	/**
	 * @static
	 * @private
	 */
	defaults: {
		layout: 'plain',
		states: {
			'hidden': 'hidden',
			'disabled': 'disabled',
			'invalid': 'invalid',
			'unselectable': 'unselectable'
		},
		extensions: [Ergo.Observable, Ergo.Statable],
		autoBind: true,
		autoUpdate: true,
//		skipBind: false,
//		binding: 'auto',
		layoutFactory: function(layout) {
			if( $.isString(layout) )
				layout = Ergo.object({etype: layout+'-layout'});
			else if(!(layout instanceof Ergo.core.Layout))
				layout = Ergo.object(layout);
			return layout;	
		},
		events: {},
		defaultItem: {},
		defaultItemShortcuts: {},
		itemFactory: function(o) {
			if($.isString(o)) o = this.options.defaultItemShortcuts[o];
			return Ergo.widget( Ergo.smart_override({}, this.options.defaultItem, o) );			
		},
		showOnRender: false,
		set: {
			'text': function(v) {	this.layout.el.text(v); },
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
			'tooltip': function(v) { this.el.attr('title', v); },
			'id': function(v) { this.el.attr('id', v); },
			'tag': function(v) { this.tag = v; },
			'tabIndex': function(v) { this.el.attr('tabindex', v); },			
			'role': function(v) { this.el.attr('role', v); },
			'format': function(v) {
				if($.isString(v)) this.options.format = Ergo.format_obj.curry(v);
			},
			'validate': function(v) {
				if($.isArray(v)) this.options.validate = Ergo.filter_list.rcurry(v); //FIXME
			}
		},
		get: {
			'text': function() { return this.el.text(); }
		}			
	},
	
			
	initialize: function(o) {
		this.$super(o);
//		Ergo.core.Widget.superclass.initialize.apply(this, arguments);


		var o = this.options;
		var self = this;


		// инициализируем виджет
		this.$init(o);
				

		
		// создаем список дочерних элементов
		this.items = new Ergo.core.WidgetList(this);
//		this.components = new Ergo.core.Collection(this);

		
		// создаем новый элемент DOM или используем уже существующий
		this.el = $(o.html);//this.$html());
		this.el.data('ergo-widget', this);
		if(this.defaultCls) this.el.addClass(this.defaultCls);

		
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
	
	
	/**
	 * Хук, вызываемый для инициализации виджета.
	 * 
	 * Чаще всего используется для модификации параметров.
	 * 
	 * @private
	 */
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
	
	
	$construct: function(o) {
		
		var self = this;
//		var el = this.el;
				
		
		if('components' in o) {
			var arr = [];
			// преобразуем набор компонентов в массив
			Ergo.each(o.components, function(c, i){
				c.weight = ('weight' in c) ? c.weight : 9999;
				c._cweight = ('weight' in c) ? c.weight : 9999;
				c._cname = i;
				
				arr.push(c);
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
			Ergo.each(arr, function(c){
				var i = c._cname;
				var w = c._cweight;
				delete c._cweight;
				delete c._cname;
//				self.addComponent(c, i);
				c = self.items.add(c, i, w);
//				c.opt('tag', i);
//				self[i] = c;
			});
			
			// задаем "ленивые" классы компонентов
			for(var i in o.components){
				var easyCls = ''+i+'Cls';
				if(easyCls in o) this[i].opt('cls', o[easyCls]);
			}

			if('baseCls' in o) {
				// задаем дочерние классы компонентов
				for(var i in o.components){
					var cls = o.baseCls + '-' + i;
					this[i].el.addClass(cls);
				}				
			}
			
		}
		
		
		
		if('items' in o){
			for(var i = 0; i < o.items.length; i++)
				this.items.add(o.items[i]);
				
		}		
		
		
		
		if('events' in o){
			for(var i in o.events){
				var callback_a = o.events[i];
				callback_a = $.isArray(callback_a) ? callback_a : [callback_a]; //FIXME
				for(var j in callback_a) {
					var callback = callback_a[j];
					self.el.bind(i, callback.rcurry(self));
				}
			}
		}		
		
		
						
		if('states' in o){
			// настраиваем особое поведение состояния hover
			if('hover' in o.states){
				this.el.hover(function(){ self.states.set('hover') }, function(){ self.states.clear('hover') });
			}
		}
		
		
		
		var regexp = /^on\S/;
		for(var i in o){
			if(regexp.test(i)){
				var chain = ( !$.isArray(o[i]) ) ? [o[i]] : o[i];
				for(var j = 0; j < chain.length; j++)
					this.events.reg(i, chain[j]);
			}
		}

		
		if('onClick' in o)
			this.el.click(function(e) { self.events.fire('onClick', {button: e.button}, e) });
		if('onDoubleClick' in o)
			this.el.dblclick(function(e) { self.events.fire('onDoubleClick', {button: e.button}, e) });
		
		
	},
	
//	_theme: function() {
//		if(this.options.ui == 'jquery_ui') this._theme_jquery_ui
//	}
	
	destroy: function() {

		
		// удаляем элемент и все его содержимое (data + event handlers) из документа
//		if(this.parent) this.parent.layout.remove(this);
		if(this.el) this.el.remove();
		// очищаем регистрацию обработчиков событий
		this.events.unreg_all();
		// очищаем компоновку
		this.layout.clear();		
		
		// вызываем метод destroy для всех дочерних компонентов
		this.items.apply_all('destroy');
		
//		if(this.options.debug)	console.log('destroyed');
	},
	
	
	
	// factory: function(item) {
		// if(!(item instanceof Ergo.core.Widget)) {
			// item = this.options.componentFactory.call(this, item);
		// }
		// return item;
	// },
	
	
	
	
	
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
	

	$afterBuild: function() {
		
		var o = this.options;
		var self = this;
		
		// устанавливаем состояния по умолчанию
		if('state' in o) {
			var a = o.state.split(' ');
			Ergo.each(a, function(state) { self.states.set(state); });
		}


		// если установлен параметр autoFetch, то у источника данных вызывается метод fetch()
		if(o.autoFetch) this.data.fetch();		
		

		this.events.fire('onAfterBuild');
		
	},
	

	/**
	 * Хук, вызываемый при обновлении компоновки
	 * 
	 * @private
	 */
	$layoutChanged: function() {
		
		//FIXME возможно следует поменять эту строку на fire('onLayoutChanged')
		if(this.layout.options.updateMode == 'auto') this.layout.update();
		
		this.items.apply_all('$layoutChanged');
	},
	
	// $events: function(self){
	// },
	
	/**
	 * Хук, вызываемый после отрисовки виджета
	 * 
	 * @private
	 */
	$afterRender: function() {
//		this.children.each(function(c) { c.$afterRender(); });
		this.events.fire('onAfterRender');
		this.items.apply_all('$afterRender');
	},

	/**
	 * Установка параметров (options) виджета.
	 * 
	 * Передаваемые параметры применяются и сохраняются в this.options
	 * 
	 * @param {Object} o параметры
	 */
	opt: function(o) {
		var opts = o;
		if(arguments.length == 2){
			opts = {}
			opts[arguments[0]] = arguments[1];
		}
		else if($.isString(o)){
			return this.options[o];
		}
		
		Ergo.smart_override(this.options, opts);

		this.$opt(opts);
		
		return this.options;
	},
	
	
	/**
	 * Хук, вызываемый для установки параметров.
	 * 
	 * Передаваемые параметры только применяются
	 * 
	 * @private
	 * @param {Object} o параметры
	 */
	$opt: function(o) {
		
		var self = this;
		
		
		
		var el = this.el;
		
//		profiler.start('opt');
		
		if('width' in o) {
//			if(o.width != 'auto') el.width(o.width);
			el.width(o.width);
		}
		if('height' in o) {
			el.height(o.height);
			// if(o.height == 'auto' || o.height == 'ignore'){ 
				// el.attr('autoheight', o.height);
			// }
			// else {
				// el.removeAttr('autoheight');
				// el.height(o.height);
			// }
		}
		if('autoHeight' in o) {
			(o.autoHeight) ? el.attr('autoHeight', o.autoHeight) : el.removeAttr('autoHeight');
		}
		if('autoWidth' in o) {
			(o.autoWidth) ? el.attr('autoWidth', o.autoWidth) : el.removeAttr('autoWidth');
		}
		// if('x' in o) el.css('left', o.x); //?
		// if('y' in o) el.css('top', o.y);  //?
		// if('tooltip' in o) el.attr('title', o.tooltip);
		// if('id' in o) el.attr('id', this.id = o.id);
		// if('tag' in o) this.tag = o.tag;
		// if('tabIndex' in o) el.attr('tabindex', o.tabIndex);
		
		// эти три параметра должны задаваться статически
		if('style' in o) el.css(o.style);
		if('cls' in o) el.addClass(o.cls);
		if('baseCls' in o) el.addClass(o.baseCls);
		
//			profiler.tick('opt', 'style');		
		
//		if('innerText' in o) this.layout.el.text(o.innerText);
//		if('innerHtml' in o) this.layout.el.html(o.innerHtml);
//		if('role' in o) el.attr('role', o.role);
		// if('opacity' in o){
			// if($.support.opacity) 
				// el.css('opacity', o.opacity);
			// else {
				// el.css('filter', 'Alpha(opacity:' + (o.opacity*100.0) + ')');
				// el.css('-ms-filter', 'progid:DXImageTransform.Microsoft.Alpha(Opacity=' + (o.opacity*100.0).toFixed() + ')');				
			// }
		// }
		
//		if('unselectable' in o) {
//			el.css('unselectable');
//			el.attr('unselectable');
//		}

//		profiler.tick('opt', 'ifs');
		
				
		
		
/*		
		if('contextMenu' in o) {
			
			var cm = o.contextMenu;
			
			if($.isFunction(cm)) cm = cm.call(this);
			if(cm && !(cm instanceof Ergo.core.Widget)) cm = Ergo.widget(cm);
			
			if(cm) {
			
				this.contextMenu = cm;
	
			
			}
		}
*/
		
		
		// if('format' in o) {
			// if($.isString(o.format)) this.options.format = Ergo.format_obj.curry(o.format);
		// }
// 
		// if('validate' in o) {
			// if($.isArray(o.validate)) this.options.validate = Ergo.filter_list.rcurry(o.validate);
		// }
						
		
		
		
		for(var i in o) {
			// проверяем наличие Java-like сеттеров
			var java_setter = 'set'+i.capitalize();
			if(this.java_setter)
				this[java_setter](o[i]);
			// если java-like сеттер не найден, проверяем наличие сеттеров опций
			else if(this.options.set[i])
				this.options.set[i].call(this, o[i], this.options);
		}


//		profiler.tick('opt', 'other');
//
//		profiler.stop('opt');
		
	},
	
	
	
	/**
	 * Рекурсивный обход всех компонентов виджета
	 * 
	 * @param {Object} callback метод, вызываемый для каждого компонента
	 */
	walk: function(callback) {
		callback.call(this);
		this.items.each(function(item){
			item.walk(callback);
		});
	},	
	
	
	next: function() {
		if(!this.parent) return null;
		return this.parent.items.get(this.index+1);
	},
	
	prev: function() {
		if(!this.parent) return null;
		return this.parent.items.get(this.index-1);
	},
	
	
	item: function(i) {
		return this.items.find(Ergo.filters.by_widget(i));		
	},
	
	
	
/*	
	$componentFactory: function(item) {
		if( $.isPlainObject(item) ) {
			item = Ergo.widget(item);
		}
		return item;		
	},
*/	
	
	
	
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
		
		var parents = this.getParents();
		
		return Ergo.find(parents, Ergo.filters.by_widget(i));
	},
	
	
	
	
	//---------------------------------------------
	// Методы работы с подсоединенными данными
	//---------------------------------------------
	
//	isBound: function() {
//		return (this.data != null);
//	},
	
	
	/**
	 * Подключение данных к виджету
	 * 
	 * @param {Ergo.data.DataSource|Any} data данные
	 * @param {Integer} phase
	 */
	bind: function(data, update, root) {
				
		var o = this.options;
		var self = this;
		

		// если данные не определены или биндинг выключен, то биндинг не выполняем
		if(data == undefined || !o.autoBind) return;
		
		// удаляем все обработчики событий строго источника данных, связанные с текущим виджетом
		if(this.data)
			this.data.events.unreg(this);


		// если фаза автобиндинга не определена, то присваем ей начальное значение
		if(root === undefined) root = true;
		
//		if(update !== false) update = true;
		
		this.bindRoot = root;


		// если определен параметр dataId, то источником данных будет дочерний элемент, если нет - то сам источник данных 
		if('dataId' in o)
			this.data = (data instanceof Ergo.core.DataSource) ? data.entry(o.dataId) : new Ergo.core.DataSource(data, o.dataId);
		else
			this.data = (data instanceof Ergo.core.DataSource) ? data : new Ergo.core.DataSource(data);



		if(o.dynamic) {
			
			// если добавлен новый элемент данных, то добавляем новый виджет
			this.data.events.reg('entry:added', function(e){
				self.items.add({'data': e.entry}, e.isLast ? null : e.index);
			}, this);
			
			// если элемент данных удален, то удаляем соответствующий виджет
			this.data.events.reg('entry:deleted', function(e){
				self.items.remove( self.item({data: e.entry}) ).destroy();//e.index) );// {data: self.data.item(e.index)});
			}, this);
			
			// если элемент данных изменен, то создаем новую привязку к данным
			this.data.events.reg('entry:changed', function(e){
				//FIXME странное обновление данных
				self.item({data: e.entry}).bind(/*self.data.entry(e.entry.id)*/e.entry, false, false);
	//			self.getItem( e.item.id ).$dataChanged(); //<-- при изменении элемента обновляется только элемент
			}, this);
	
			// если изменилось само значение массива, то уничожаем все элементы-виджеты и создаем их заново
			this.data.events.reg('value:changed', function(e){
	
				// обновляем вложенные элементы контейнера на основе источника данных 
				
				self.layout.immediateRebuild = false;
	
				// уничтожаем все элементы-виджеты
				self.items.apply_all('destroy');
				
	//			var t0 = Ergo.timestamp();
	
				self.data.iterate(function(dataEntry, i){
//					self.items.add({}).bind(dataEntry, true, 2);
					var item = self.items.add({ 'data': dataEntry });//.bindRoot = false;
					item.bindRoot = false;
//					item.el.attr('dynamic', true);
//					item.dataPhase = 2;
				});
			
	//			var t1 = Ergo.timestamp();
	//			console.log(t1 - t0);
					
				self.layout.immediateRebuild = true;
				self.layout.rebuild();
				
			}, this);
			
	
	
			// создаем вложенные элементы контейнера на основе источника данных 
	
			this.layout.immediateRebuild = false;
					
			this.items.apply_all('destroy');
	
			this.data.iterate(function(dataEntry, i){
//					self.items.add({}).bind(dataEntry, true, 2);
					var item = self.items.add({ 'data': dataEntry, 'autoUpdate': false });
					item.bindRoot = false;
//					item.el.attr('dynamic', true);
			});
	
			this.layout.immediateRebuild = true;
			this.layout.rebuild();
			
			
		}
		else {
		
								
			// если установлен параметр updateOnValueChanged, то при изменении связанных данных, будет вызван метод $dataChanged
			this.data.events.reg('value:changed', function() { 
				if(o.updateOnValueChanged && !self.lock_data_change) self.$dataChanged();
			}, this);
			
		
			// связываем данные с дочерними компонентами виджета
			this.items.each(function(child){
				if(!child.bindRoot) child.bind(self.data, false, false);
			});

		}

		
		if(update !== false) this.$dataChanged();

		this.events.fire('onBind');
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
		if(this.data){
			val = this.data.get();
			// если присутствует функция форматирования, то используем ее
			if(this.options.format)
				val = o.format.call(this, val);
		}
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
		var o = this.options;
		if(this.data){
			if(o.store) 
				val = o.store.call(this, val);
			
			var valid = true;
			var context = {};
							
			if(o.validate) {				
				valid = o.validate.call(this, val, context);
			}
			
			if(valid) {
				try{
					this.lock_data_change = true;
					this.data.set(val);
					delete this.lock_data_change;
				}
				catch(err) {
					context.message = err.message;
					valid = false;
				}
			}
				 
			
			if(valid) {
				this.states.clear('invalid');
				this.events.fire('onValueChanged', {'value': val/*, 'reason': reason*/});				
			}
			else {
				context.value = val;
				this.states.set('invalid');
				this.events.fire('onValueInvalid', context);
			}
		}
	},
	
	/**
	 * Получение значения, связанного с виджетом без применения форматирования.
	 * 
	 * @returns {Any} undefined, если к виджету данные не подключены
	 */
	// getRawValue: function() {
		// return (this.data) ? this.data.get() : undefined;
	// },
	
	
	
	
/*	
	getFormattedValue: function() {
		var val = this.getValue();
		return (this.options.format) ? this.options.format.call(this, val) : val;
	},
*/	
	
	
//	_dataBound: function(){},
//	_dataUnbound: function() {},

	/**
	 * Хук, вызываемый при изменении связанных данных
	 * 
	 * @private
	 */
	$dataChanged: function() {
//		// если автобиндинг выключен, то прекращаем обновление
//		if(!this.options.autoBinding) return;
//		if(this.suppressDataChange) return;

/*		
		var binding = this.options.binding;
		
		if($.isFunction(binding)){
//			var o = {};
			var val = this.getValue();
//			if(val !== undefined)	
			if( binding.call(this, val) === false) return;
//			this.opt(o);
		}
*/		
/*		
		if(binding.options){
			var o = {};
			binding.options.call(this, o);
			this.opt(o);
		}
		if(binding.states)
			binding.states.call(this, this.states);
*/		
		
//		if(this.options.optBinding) {
//			var o = {};
//			this.options.optBinding.call(this, o);
//			this.opt(o);
//		}
				
//		if(this.options.stateBinding){
//			this.states.set( this.getStateValue() );
//		}
		
		
		
		if(!this.options.autoBind) return;
		
		var binding = this.options.binding;

		if(binding){
			var val = this.getValue();
			if( binding.call(this, val) === false) return;
			
			// var e = new Ergo.events.CancelEvent({value: this.getValue()});
			// this.events.fire('onDataChanged', e);
			// if(e.isCanceled) return;
		}

		this.items.apply_all('$dataChanged');
		
//		this.children.each(function(child) { child.$dataChanged(); });	
		
	}

	
}, 'widget');



Ergo.widget = function(){
	if(arguments.length == 1) return Ergo.object(arguments[0]);
	return Ergo.object( Ergo.smart_override.apply(this, arguments) ); //FIXME непонятно зачем вызов через apply
};





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














/*
$(document).ready(function(){
	
//	var drag = null;
	
	
	//TODO возможно этот код стоит перенести в другое место
//	if(!Ergo.contextMenuReady){
		$(document).bind('contextmenu', function(e){
			var w = $(e.target).ergo();
			if(!w || !w.contextMenu) {
				w = undefined;
				$(e.target).parents().each(function(i, el){
					var parent = $(el).ergo();
					if(parent && parent.contextMenu){
						w = parent;
						return false;
					}
				});
			}
			
//			if(w){
//				var w = (w.contextMenu) ? w : w.getParent(function(item){ return item.contextMenu; });
				if(w){
					var cancel_event = new Ergo.events.CancelEvent({'contextMenu': w.contextMenu});
					w.events.fire('onContextMenu', cancel_event);
					if(!cancel_event.isCanceled){
						w.contextMenu.sourceWidget = w;
						w.contextMenu.open(e.pageX-2, e.pageY-2);
					}
					e.preventDefault();
				}
//			}
		});
//		Ergo.contextMenuReady = true;
//	}
	
	
		
});
*/
