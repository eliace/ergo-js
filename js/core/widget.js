
//Dino.droppable = [];

/**
 * @name Dino.widgets
 * @namespace
 */




/**
 * Базовый объект для всех виджетов
 * 
 * @class
 * @extends Dino.events.Observer
 * @param {Object} o параметры
 */
Dino.Widget = Dino.declare('Dino.Widget', 'Dino.events.Observer', /** @lends Dino.Widget.prototype */{
	
	/**
	 * @static
	 * @private
	 */
	defaultOptions: {
		layout: 'plain-layout',
		states: {
			'hidden': 'dino-hidden',
			'visible': ['', 'dino-hidden']
		},
		binding: 'auto'
	},
	
	defaultHandlers: {
//		'clickable.click': function(e) {
//			$(this).dino().events.fire('onClick', {}, e);
//		},
//		'clickable.dblclick': function(e) {
//			$(this).dino().events.fire('onDblClick', {}, e);
//		},
//		'selectable': function(e) {
//			e.preventDefault();
//		},
		'draggable_mousedown': function(e) {
			if(!Dino.drag) {
				Dino.drag = {
					started: false,
					source: $(this).dino(),
//					x: e.clientX,
//					y: e.clientY,
					offset: [5, 5]
				}
			}			
		},
		'draggable_mousemove': function(e) {
			
			var drag = Dino.drag;
			
			if(drag) {
				
				var element = $(this);
				
				if(!drag.started) {
					drag.started = true;
					
					var event = new Dino.events.CancelEvent({dragData: drag});
					drag.source.events.fire('onDrag', event);
					
					if(event.isCanceled){
						if(drag.proxy) drag.proxy.destroy();
						Dino.drag = null;
						return;
					}
					
					if(drag.proxy){
//						var offset = element.offset();
//						drag.x = e.pageX;
//						drag.y = e.pageY;
						drag.proxy.el.css({'position': 'absolute'});//, 'left': offset.left, 'top': offset.top});
						$('body').append(drag.proxy.el);
						
//						drag.proxy.el.mousemove(function(e){
//							var el = $(this);
//							
//							var dx = e.pageX - drag.x;
//							var dy = e.pageY - drag.y;
//							
//							var x = parseInt(el.css('left')) + dx;  
//							var y = parseInt(el.css('top')) + dy;  
//
//							el.css('left', x);  
//							el.css('top', y);  
//							
//							drag.x = e.pageX;
//							drag.y = e.pageY;
//							
//						});
//						
//						drag.proxy.el.mouseout(function(e){
//							var el = $(this);
//							
//							var dx = e.pageX - drag.x;
//							var dy = e.pageY - drag.y;
//							 состояний 
//							var x = parseInt(el.css('left')) + dx;  
//							var y = parseInt(el.css('top')) + dy;  
//
//							el.css('left', x);  
//							el.css('top', y);  
//							
//							drag.x = e.pageX;
//							drag.y = e.pageY;
//						});
					}
					
				}
/*				
*/				
			}
			
			
/*			
			if(drag && drag.source == $(this).dino() && !drag.started){
				drag.started = true;
				
				var event = new Dino.events.CancelEvent({dragData: drag});
				drag.source.events.fire('onDrag', event); состояний 
				
				if(event.isCanceled){
					if(drag.proxy) drag.proxy.destroy();
					Dino.drag = null;
					return;
				}
				
				if(drag.proxy){
					drag.proxy.el.css({'position': 'absolute'});
					$('body').append(drag.proxy.el);
				}
			}	
*/			
					
		}
//		'editable': function(e) {
//			var w = $(this).dino();
//			if('startEdit' in w) w.startEdit();
//		}
	},
			
			
	initialize: function() {
		Dino.Widget.superclass.initialize.apply(this, arguments);
		
		var html = arguments[0];
		var opts = arguments[1];
		
		// new Dino.Widget('<div/>') или new Dino.Widget({...})
		if(arguments.length == 1){ 
			if(Dino.isString(arguments[0])){
				html = arguments[0];
				opts = undefined;
			}
			else{
				html = undefined;
				opts = arguments[0];
			}
		}
		
		var self = this;
		
		/** 
		 * Параметры
		 * @type Object
		 */
		this.options = {};
		// определяем параметры как смесь пользовательских параметров и параметров по умолчанию
		var o = this.options;
		Dino.hierarchy(this.constructor, function(clazz){
			if('defaultOptions' in clazz) Dino.utils.overrideOpts(o, clazz.defaultOptions);
		});
		Dino.utils.overrideOpts(o, opts);
		
		html = o.wrapEl || o.html || html; // оставляем возможность указать html через options
		
		// создаем новый элемент DOM или используем уже существующий
		/** 
		 * Элемент 
		 * @type Element
		 */
		this.el = $(html || this._html());//('wrapEl' in o) ? o.wrapEl : $(this._html());
		this.el.data('dino-widget', this);
		if(this.defaultCls) this.el.addClass(this.defaultCls);
		
		/** 
		 * Коллекция дочерних компонентов 
		 * @type Dino.WidgetCollectionManager
		 */
		this.children = new Dino.WidgetCollectionManager(this);
		
		/** 
		 * Набор состояний
		 * @type Dino.StateManager
		 */
		this.states = new Dino.StateManager(this);
		
		this.handlers = {};
		
//		this.el.remove = function() {
//			console.log('Removed from DOM: '+self.dtype);
//		}
				
		// инициализируем компоновку
		var layoutOpts = o.layout;
		if( Dino.isString(layoutOpts) )
			layoutOpts = {dtype: layoutOpts};
		if(!(layoutOpts instanceof Dino.Layout))
			layoutOpts = Dino.object( layoutOpts );//Dino.utils.overrideOpts({container: this}, layoutOpts));
		/** 
		 * Компоновка 
		 * @type Dino.Layout
		 */
		this.layout = layoutOpts;
		//FIXME костыль
//		if(!this.layout.container) this.layout.attach(this);
		this.layout.attach(this.layout.options.container || this);

		// конструируем виджет
		this._init(o);//this, arguments);		
		// устанавливаем опциональные параметры
		this._opt(o);
		// добавляем обработку событий
		this._events(this);
		// добавляем элемент в документ
		this._render(o.renderTo);
		
		// сначала подключаем данные, чтобы при конструировании виджета эти данне были доступны
		this.setData(o.data);		
		
		// обновляем виджет, если к нему были подключены данные
		if(this.data) this._dataChanged();
		// выполняем темизацию ?
		this._theme(o.theme);
//		//
		this._afterBuild();
		
		this.events.fire('onCreated');
		
		if(this.options.debug)	console.log('created');		
	},
	
	
	/**
	 * Хук, вызываемый для инициализации виджета.
	 * 
	 * Чаще всего используется для модификации параметров.
	 * 
	 * @private
	 */
	_init: function() {
		
		var o = this.options;
		
		// "сахарное" определение контента виджета
		if('content' in o){
			Dino.utils.overrideOpts(o, {
				components: {
					content: o.content
				}
			})
//			this.addComponent('content', o.content);
		}
				
	},
	
//	_theme: function() {
//		if(this.options.ui == 'jquery_ui') this._theme_jquery_ui
//	}
	
	destroy: function() {
		// удаляем элемент и все его содержимое (data + event handlers) из документа
		if(this.el) this.el.remove();
		// очищаем регистрацию обработчиков событий
		this.events.unreg_all();
		//
		this.layout.clear();
		// вызываем метод destroy для всех дочерних компонентов
		this.children.each(function(child) { child.destroy(); });
		
		if(this.options.debug)	console.log('destroyed');
	},
	
	/**
	 * Хук, вызываемый для определения тэга, на основе которого будет построен виджет
	 * 
	 * @private
	 */
	_html: function() {
		return '';//'<div/>';
	},
	
	/**
	 * Хук, вызываемый при добавлении виджета на страницу
	 * 
	 * @param {Element|Dino.Widget} target
	 * @private
	 */
	_render: function(target) {
		if(target){
			var parentEl = (target instanceof Dino.Widget) ? target.el : $(target);
			parentEl.append(this.el);
			
			if(this.el.parents().is('body')){
				this._afterRender();
				this._layoutChanged();
			}
		}
	},
	
	_theme: function(name) {
	},
	
	/**
	 * Хук, вызываемый после построения объекта
	 * 
	 * @private
	 */
	_afterBuild: function() {
		
		var o = this.options;
		var self = this;
		
		if('state' in o) {
			var a = Dino.isArray(o.state) ? o.state : [o.state];
			Dino.each(a, function(state) { self.states.set(state); });
		}
		
	},

	/**
	 * Хук, вызываемый при обновлении компоновки
	 * 
	 * @private
	 */
	_layoutChanged: function() {
		if(this.layout.options.updateMode == 'auto') this.layout.update();
		this.children.each(function(c) { c._layoutChanged(); });
	},
	
	_events: function(self){
	},
	
	/**
	 * Хук, вызываемый после отрисовки виджета
	 * 
	 * @private
	 */
	_afterRender: function() {
		this.children.each(function(c) { c._afterRender(); });
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
		
		Dino.utils.overrideOpts(this.options, opts);
		
		this._opt(opts);
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
	_opt: function(o) {
		
		var self = this;
		var el = this.el;
		
		
		if('width' in o) el.width(o.width);
		if('height' in o) {
			if(o.height == 'auto' || o.height == 'ignore'){ 
				el.attr('autoheight', o.height);
			}
			else {
				el.removeAttr('autoheight');
				el.height(o.height);
			}
		}
//		if('autoHeight' in o) el.attr('autoheight', o.autoHeight);
		if('x' in o) el.css('left', o.x);
		if('y' in o) el.css('top', o.y);
		if('tooltip' in o) el.attr('title', o.tooltip);
		if('id' in o) el.attr('id', this.id = o.id);
		if('tag' in o) this.tag = o.tag;
		if('style' in o) el.css(o.style);
		if('cls' in o) el.addClass(o.cls);// Dino.each(o.cls.split(' '), function(cls) {el.addClass(cls);});
		if('baseCls' in o) el.addClass(o.baseCls);
		if('innerText' in o) el.text(o.innerText);
		if('innerHtml' in o) this.el.html(o.innerHtml);
		if('role' in o) el.attr('role', o.role);
		if('opacity' in o){
			if($.support.opacity) 
				el.css('opacity', o.opacity);
			else 
				el.css('filter', 'Alpha(opacity:' + (o.opacity/100.0) + ')');
		}

		
		if('events' in o){
			for(var i in o.events){
				var callback = o.events[i];
//				// Dino события или jQuery события?
//				if(regexp.test(i)){
//					// Dino-события могут быть массивом
//					if( Dino.isArray(callback) ){
//						Dino.each(callback, function(fn){
//							self.events.reg(i, fn);
//						});
//					}
//					else {	
//						this.events.reg(i, callback);
//					}
//				}
//				else{
				el.bind(i, callback.rcurry(self));
//				}
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
				var chain = ( !Dino.isArray(o[i]) ) ? [o[i]] : o[i];
				for(var j = 0; j < chain.length; j++)
					this.events.reg(i, chain[j]);
			}
		}

		if('components' in o) {
			var arr = [];
			// преобразуем набор компонентов в массив
			for(var i in o.components){
				var c = o.components[i];
				c._cweight = ('weight' in c) ? c.weight : 9999;
				c._cname = i;
				arr.push(c);
			}
			// сортируем массив по весу компонентов
			arr.sort(function(c1, c2){
				var a = c1._cweight;
				var b = c2._cweight;
				if(a < b) return -1;
				else if(a > b) return 1;
				return 0;
			});
			// добавляем компоненты
			Dino.each(arr, function(c){
				self.addComponent(c._cname, c);				
				delete c._cweight;
				delete c._cname;
			});
			
			// задаем "ленивые" классы компонентов
			for(var i in o.components){
				var easyCls = ''+i+'Cls';
				if(easyCls in o) this[i].opt('cls', o[easyCls]);
			}
			
		}
		
		
		//TODO обработчики событий должны быть выключаемыми, поэтому нужно запоминать их, чтобы потом удалить
/*		
		if('clickable' in o) {
			this._toggle_handler('clickable.click', 'click', o.clickable);
			this._toggle_handler('clickable.dblclick', 'dblclick', o.clickable);
		}
		
		if('selectable' in o)
			this._toggle_handler('selectable', 'mousedown', !o.selectable); //<-- инверсия флага, поскольку обработчик нужен для отключения выделения

		if('editable' in o) {
			this._toggle_handler('editable', 'dblclick', o.editable);			
		}
*/		
		
		if('draggable' in o){
			this._toggle_handler('draggable_mousedown', 'mousedown', o.draggable);
			this._toggle_handler('draggable_mousemove', 'mousemove', o.draggable);
		}
		
		if('contextMenu' in o) {
			
			var cm = o.contextMenu;
			
			if(Dino.isFunction(cm)) cm = cm.call(this);
			if(cm && !(cm instanceof Dino.Widget)) cm = Dino.widget(cm);
			
			if(cm) {
			
				this.contextMenu = cm;
	
			
			}
		}

		
		
		if('format' in o) {
			if(Dino.isString(o.format)) o.format = Dino.format_obj.curry(o.format);
		}
				
		
//		if('droppable' in o) {
//			if(o.droppbale) {
//				Dino.droppable.push(this);
//				
//			}
//		}
		
		
		//TODO экспериментальная опция
		if('overrides' in o) {
			Dino.override(this, o.overrides);
		}
		
	},
	
	/**
	 * @ignore
	 * 
	 * @param {Object} key
	 * @param {Object} target
	 */
	_translate_opt: function(key, target) {
		if(key in this.options) target.opt(key, this.options[key]);
	},
	
	
	/**
	 * @ignore
	 * 
	 * @param {Object} key
	 * @param {Object} event
	 * @param {Object} sw
	 */
	_toggle_handler: function(key, event, sw) {
		// получаем дескриптор обработчика
		var h = (key in this.handlers);
		if(sw && !h) {
			this.handlers[key] = true;
			this.el.bind(event, this.defaultHandlers[key]);
		}
		else if(!sw && h){
			this.el.unbind(event, this.defaultHandlers[key]);
			delete handlers[key]
		}		
	},
	
	
	/**
	 * Рекурсивный обход всех компонентов виджета
	 * 
	 * @param {Object} callback метод, вызываемый для каждого компонента
	 */
	walk: function(callback) {		
		callback.call(this);
		this.children.each(function(item){
			item.walk(callback);
		});
	},	
	
	//-------------------------------------------
	// Методы для работы с компонентами виджета
	//-------------------------------------------
	
	/**
	 * Добавление компонента
	 * 
	 * Ключ должен соотвествовать требованиям для свойств объектов JavaScript и не должен пересекаться с именами
	 * методов/свойств виджета.
	 * 
	 * @param {String} key ключ (имя) компонента. Если компонент с таким именем уже существует, то он будет удален из компоновки
	 * @param {Object|Dino.Widget} o виджет или параметры виджета
	 */
	addComponent: function(key, o){
		// если компонент уже существует, то удаляем его
		this.removeComponent(key);
		
		// если у виджета определен базовый класс, до его компоненты будут иметь класс-декоратор [baseCls]-[имяКомпонента]
		if('baseCls' in this.options)
			Dino.utils.overrideOpts(o, {cls: this.options.baseCls+'-'+key});
		
		this[key] = (o instanceof Dino.Widget) ? o : Dino.widget(o);
		this.children.add( this[key] );
		this.layout.insert(this[key]);
//		this.el.append(this[key].el);
	},
	
	/**
	 * Удаление компонента
	 * 
	 * @param {Object} key ключ (имя) компонента
	 */
	removeComponent: function(key) {
		if(this[key]) {
			this.layout.remove(this[key]);
			this.children.remove( this[key] );
			delete this[key];
		}
	},
	
	
	
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
	 * c.getParent(Dino.widgets.Box);
	 * d.getParent(function(w) { return w.options.width < 100; });
	 * e.getParent('header');
	 * 
	 * @param {Any} [criteria] критерий 
	 */
	getParent: function(i) {
		
		if(arguments.length == 0) return this.parent;
		
		var parents = this.getParents();
		
		return Dino.find(parents, Dino.utils.create_widget_filter(i));
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
	 * @param {Dino.data.DataSource|Any} data данные
	 * @param {Integer} phase
	 */
	setData: function(data, phase) {
				
		var o = this.options;
		
		if(data == undefined || !o.binding) return;
		
		if(!phase) phase = 1;
		
		this.dataPhase = phase;
		
//		if(this.data) data.destroy(); //<-- экспериментальный код
		
		
		if('dataId' in o){
			this.data = (data instanceof Dino.data.DataSource) ? data.item(o.dataId) : new Dino.data.DataSource(data, o.dataId);
		}
		else {
			this.data = (data instanceof Dino.data.DataSource) ? data : new Dino.data.DataSource(data);
		}

		
		
//		if('defaultValue' in o){
//			if(this.data.get() == null) this.data.set(o.defaultValue);
//		}
		var self = this;
	
//		//FIXME этот метод закомментирован, потому что виджет начинает обрабатывать свои оповещения
		this.data.events.reg('onValueChanged', function() { 
			if(self.options.updateOnValueChange) self._dataChanged();
//			console.log(self.data.val());
		});
		
		//FIXME пока непонятный механизм для обработки события onDirty
		if('onDirty' in this.options){
			this.data.events.reg('onDirty', function(e){
				self.events.fire('onDirty', e);
			});
		}
		if('onClean' in this.options){
			this.data.events.reg('onClean', function(e){
				self.events.fire('onClean', e);
			});
		}
	
		this.children.each(function(child){
			if(child.dataPhase != 1) child.setData(self.data, 2);
		});
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
			if('format' in this.options)
				val = o.format.call(this, val);
		}
		return val;
	},
	
	/**
	 * Установка значения, связанного с виджетом
	 * 
	 * Если задана функция хранения (store_format), то она используется для преобразования значения
	 * 
	 * @param {Any} val значение
	 */
	setValue: function(val) {
		if(this.data){
			if('store_format' in this.options) 
				val = this.options.store_format.call(this, val);
			
			this.data.set(val);
			this.events.fire('onValueChanged');
		}
	},
	
	/**
	 * Получение значения, связанного с виджетом без применения форматирования.
	 * 
	 * @returns {Any} undefined, если к виджету данные не подключены
	 */
	getRawValue: function() {
		return (this.data) ? this.data.get() : undefined;
	},
	
	
	
	
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
	_dataChanged: function() {
//		// если автобиндинг выключен, то прекращаем обновление
//		if(!this.options.autoBinding) return;
//		if(this.suppressDataChange) return;
		
		var binding = this.options.binding;
		
		if(Dino.isFunction(binding)){
			var o = {};
			binding.call(this, this.getValue(), o);
			this.opt(o);
		}
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
		
		this.children.each(function(child) { child._dataChanged(); });		
	}
	
});



Dino.widget = function(){
	if(arguments.length == 1) return Dino.object(arguments[0]);
	return Dino.object( Dino.utils.overrideOpts.apply(this, arguments) ); //FIXME непонятно зачем вызов через apply
};





//------------------------------
// Интегрируемся в jQuery
//------------------------------

$.dino = Dino.widget;

$.fn.dino = function(o) {
	if(this.length > 0){
		var widget = this.data('dino-widget');
		if(widget) return widget;
		if(!o) return undefined;
		o.wrapEl = this;
	}
	else if(arguments.length == 0) return null;
	return Dino.widget(o);
};









var abilityHandlers = {
	'clickable.click': function(e) {
			$(this).dino().events.fire('onClick', {}, e);		
	},
	'clickable.dblclick': function(e) {
			$(this).dino().events.fire('onDblClick', {}, e);		
	},
	'nonselectable.mousedown': function(e) {
		e.preventDefault();
	},
	'editable.dblclick': function(e) {
		var w = $(this).dino();
		if('startEdit' in w) w.startEdit();		
	}
}


Dino.override(Dino.Widget.prototype.defaultOptions.states, {
	'clickable': function(sw) {
		if(sw) {
			this.el.bind('click', abilityHandlers['clickable.click']);		
			this.el.bind('dblclick', abilityHandlers['clickable.dblclick']);					
		}
		else {
			this.el.unbind('click', abilityHandlers['clickable.click']);		
			this.el.unbind('dblclick', abilityHandlers['clickable.dblclick']);					
		}
	},
	'editable': function(enabled) {
		if(enabled) this.el.bind('dblclick', abilityHandlers['editable.dblclick']);
		else this.el.unbind('dblclick', abilityHandlers['editable.dblclick']);
	},
	'nonselectable': function(enabled) {
		if(enabled) this.el.bind('mousedown', abilityHandlers['nonselectable.mousedown']);
		else this.el.unbind('mousedown', abilityHandlers['nonselectable.mousedown']);		
	}
});









$(document).ready(function(){
	
//	var drag = null;
	
	
	//TODO возможно этот код стоит перенести в другое место
//	if(!Dino.contextMenuReady){
		$(document).bind('contextmenu', function(e){
			var w = $(e.target).dino();
			if(!w || !w.contextMenu) {
				w = undefined;
				$(e.target).parents().each(function(i, el){
					var parent = $(el).dino();
					if(parent && parent.contextMenu){
						w = parent;
						return false;
					}
				});
			}
			
//			if(w){
//				var w = (w.contextMenu) ? w : w.getParent(function(item){ return item.contextMenu; });
				if(w){
					var cancel_event = new Dino.events.CancelEvent();
					w.events.fire('onContextMenu', cancel_event);
					if(!cancel_event.isCanceled){
						w.contextMenu.sourceWidget = w;
						w.contextMenu.show(e.pageX, e.pageY);
					}
					e.preventDefault();
				}
//			}
		});
//		Dino.contextMenuReady = true;
//	}
	
	

	$('body').mousemove(function(e){
		var drag = Dino.drag;

		if(!drag) return;
		
		if(drag && drag.started && drag.proxy) {
			drag.proxy.el.css({'left': e.pageX+drag.offset[0], 'top': e.pageY+drag.offset[1]});
			
//			Dino.each(Dino.droppable, function(item) { item.events.fire('onDrag'); })
		}
		
	});
				
	$('body').mouseup(function(e){
		
		var drag = Dino.drag;		
		
		if(drag && drag.started) {
			// уничтожаем прокси-объект
			if(drag.proxy) drag.proxy.destroy();
			
			// ищем цель переноса под курсором (если виджет имеет опцию dropTarget)
			var target = $(document.elementFromPoint(e.clientX, e.clientY));//e.originalTarget);
			var w = target.dino();
			if(!w || !w.options.droppable){
				target.parents().each(function(i, el){
					w = $(el).dino();
					if(w && w.options.droppable) return false;
				});
			}
			
			if(w) w.events.fire('onDrop', {source: drag.source});			
		}
		
		Dino.drag = null;		
		
	});	
	
		
});
