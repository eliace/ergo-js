
//= require "events"
//= require "data"
//= require "collection"
//= require "states"
//= require <layouts/plain>
//= require "utils"
//= require "component-collection"



/**
 * @name Dino.widgets
 * @namespace
 */


Dino.formats = {};
Dino.parsers = {};
Dino.validators = {};




/**
 * Базовый объект для всех виджетов
 * 
 * @class
 * @extends Dino.events.Observer
 * @param {Object} o параметры
 */
Dino.core.Widget = Dino.declare('Dino.core.Widget', 'Dino.core.Object', /** @lends Dino.core.Widget.prototype */{
	
	
	
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
		extensions: [Dino.Observable, Dino.Statable],
		binding: 'auto',
		layoutFactory: function(layout) {
			if( Dino.isString(layout) )
				layout = Dino.object({dtype: layout+'-layout'});
			else if(!(layout instanceof Dino.Layout))
				layout = Dino.object(layout);
			return layout;	
		},
		defaultComponent: {
		}
	},
	
	
//	customOptions: {
//	},

			
	initialize: function(o) {
		Dino.core.Widget.superclass.initialize.apply(this, arguments);


		var o = this.options;
		var self = this;

		
		this.children = new Dino.core.Array();

//		html = o.wrapEl || o.html || html; // оставляем возможность указать html через options
//		var html = o.html;
		
		
		// создаем новый элемент DOM или используем уже существующий
		/** 
		 * Элемент 
		 * @type Element
		 */
		this.el = $(this.$html());
		this.el.data('dino-widget', this);
		if(this.defaultCls) this.el.addClass(this.defaultCls);

		
		this.layout = o.layoutFactory(o.layout);
		
		//FIXME костыль
//		if(!this.layout.container) this.layout.attach(this);
		this.layout.attach(this.layout.options.container || this);


		/*
		 * Этапы, которые должны быть:
		 * - Подготовка параметров
		 * - Создание компоновки
		 * - Создание дочерних элементов
		 * - Связывание с данными (+ динамическое создание дочерних элементов)
		 * - Отрисовка
		 * - Инициализация
		 */		

//		this.$init(o);//this, arguments);
		
		
		// конструируем виджет
		this.$construct(o);
		
		// устанавливаем опциональные параметры
		this.$opt(o);
		
		// добавляем обработку событий (deprecated)
		this.$events(this);
		// добавляем элемент в документ
		this.$render(o.renderTo);
		
		// сначала подключаем данные, чтобы при конструировании виджета эти данные были доступны
		this.$bind(o.data);	
		
		this.$afterBuild();
		
		this.events.fire('onCreated');
		
//		if(this.options.debug)	console.log('created');		
		
	},
	
	
	/**
	 * Хук, вызываемый для инициализации виджета.
	 * 
	 * Чаще всего используется для модификации параметров.
	 * 
	 * @private
	 */
	$init: function() {
		
		var o = this.options;
		
		this.components = new Dino.core.ComponentCollection(this);
		
//		this.components = this.collection; //new Dino.core.Collection();		
		
		// "сахарное" определение контента виджета
		if('content' in o){
			Dino.smart_override(o, {
				components: {
					content: o.content
				}
			})
		}
		
//		if('states' in o) {
//			if(Dino.isString(o.states)) o.states = [o.states];
//		}
		
	},
	
	
	$construct: function(o) {
		
		var self = this;
		
		if('components' in o) {
			var arr = [];
			// преобразуем набор компонентов в массив
			Dino.each(o.components, function(c, i){
				c._cweight = ('weight' in c) ? c.weight : 9999;
				c._cname = i;
				arr.push(c);				
			});
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
				var i = c._cname;
				delete c._cweight;
				delete c._cname;
//				self.addComponent(c, i);
				self.components.add(c, i);
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
//		this.children.each(function(child) { child.destroy(); });
		this.components.apply_all('destroy');
		
//		if(this.options.debug)	console.log('destroyed');
	},
	
	/**
	 * Хук, вызываемый для определения тэга, на основе которого будет построен виджет
	 * 
	 * @private
	 */
	$html: function() {
		return this.options.html;
	},
	
	/**
	 * Хук, вызываемый при добавлении виджета на страницу
	 * 
	 * @param {Element|Dino.core.Widget} target
	 * @private
	 */
	$render: function(target) {
		if(target){
			if(target instanceof Dino.core.Widget) {
				target.addComponent(this);
			}
			else {
				$(target).append(this.el);
			}
			
//			var parentEl = (target instanceof Dino.core.Widget) ? target.el : $(target);
//			parentEl.append(this.el);
			
			if(this.el.parents().is('body')){
				this.$afterRender();
				this.$layoutChanged();
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
	$afterBuild: function() {
		
		var o = this.options;
		var self = this;
		
		// устанавливаем состояния по умолчанию
		if('state' in o) {
			var a = o.state.split(' ');
			Dino.each(a, function(state) { self.states.set(state); });
		}
		
	},

	/**
	 * Хук, вызываемый при обновлении компоновки
	 * 
	 * @private
	 */
	$layoutChanged: function() {
		if(this.layout.options.updateMode == 'auto') this.layout.update();
		this.children.apply_all('$layoutChanged');
	},
	
	$events: function(self){
	},
	
	/**
	 * Хук, вызываемый после отрисовки виджета
	 * 
	 * @private
	 */
	$afterRender: function() {
//		this.children.each(function(c) { c.$afterRender(); });
		this.children.apply_all('$afterRender');
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
		else if(Dino.isString(o)){
			return this.options[o];
		}
		
		Dino.smart_override(this.options, opts);

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
			if(o.width != 'auto') el.width(o.width);
		}
		if('height' in o) {
			if(o.height == 'auto' || o.height == 'ignore'){ 
				el.attr('autoheight', o.height);
			}
			else {
				el.removeAttr('autoheight');
				el.height(o.height);
			}
		}
		if('x' in o) el.css('left', o.x);
		if('y' in o) el.css('top', o.y);
		if('tooltip' in o) el.attr('title', o.tooltip);
		if('id' in o) el.attr('id', this.id = o.id);
		if('tag' in o) this.tag = o.tag;
		if('tabIndex' in o) el.attr('tabindex', o.tabIndex);
		
		// эти три параметра должны задаваться статически
		if('style' in o) el.css(o.style);
		if('cls' in o) el.addClass(o.cls);
		if('baseCls' in o) el.addClass(o.baseCls);
		
//			profiler.tick('opt', 'style');		
		
		if('innerText' in o) this.layout.el.text(o.innerText);
		if('innerHtml' in o) this.layout.el.html(o.innerHtml);
		if('role' in o) el.attr('role', o.role);
		if('opacity' in o){
			if($.support.opacity) 
				el.css('opacity', o.opacity);
			else {
				el.css('filter', 'Alpha(opacity:' + (o.opacity*100.0) + ')');
				el.css('-ms-filter', 'progid:DXImageTransform.Microsoft.Alpha(Opacity=' + (o.opacity*100.0).toFixed() + ')');				
			}
		}
//		if('unselectable' in o) {
//			el.css('unselectable');
//			el.attr('unselectable');
//		}

//		profiler.tick('opt', 'ifs');
		
		if('events' in o){
			for(var i in o.events){
				var callback = o.events[i];
				el.bind(i, callback.rcurry(self));
			}
		}
		
		
		if('states' in o){
			// настраиваем особое поведение состояния hover
			if('hover' in o.states){
				this.el.hover(function(){ self.states.set('hover') }, function(){ self.states.clear('hover') });
			}
		}
						
						
						
		
		//
		// Опции, устанавливаемые независимо от режима
		//
		
		var regexp = /^on\S/;
		for(var i in o){
			if(regexp.test(i)){
				var chain = ( !Dino.isArray(o[i]) ) ? [o[i]] : o[i];
				for(var j = 0; j < chain.length; j++)
					this.events.reg(i, chain[j]);
			}
		}

		
		if('onClick' in o)
			el.click(function(e) { self.events.fire('onClick', {button: e.button}, e) });
		if('onDoubleClick' in o)
			el.dblclick(function(e) { self.events.fire('onDoubleClick', {button: e.button}, e) });
		
		
		
		
		if('contextMenu' in o) {
			
			var cm = o.contextMenu;
			
			if(Dino.isFunction(cm)) cm = cm.call(this);
			if(cm && !(cm instanceof Dino.core.Widget)) cm = Dino.widget(cm);
			
			if(cm) {
			
				this.contextMenu = cm;
	
			
			}
		}

		
		
		if('format' in o) {
			if(Dino.isString(o.format)) this.options.format = Dino.format_obj.curry(o.format);
		}

		if('validate' in o) {
			if(Dino.isArray(o.validate)) this.options.validate = Dino.filter_list.rcurry(o.validate);
		}
						
		
//		//TODO экспериментальная опция
//		if('overrides' in o) {
//			Dino.override(this, o.overrides);
//		}
//		
//		
//		//TODO экспериментальная опция
//		for(i in o) {
//			if(i in this.customOptions) this.customOptions[i].call(this, o[i]);
//		}
		
		
		


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
		this.children.each(function(item){
			item.walk(callback);
		});
	},	
	
	
	
/*	
	$componentFactory: function(item) {
		if( Dino.isPlainObject(item) ) {
			item = Dino.widget(item);
		}
		return item;		
	},
*/	
	
	
	
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
	 * @param {Object|Dino.core.Widget} o виджет или параметры виджета
	 */
	
	
/*	
	addComponent: function(o, key){
		
		// если компонент уже существует, то удаляем его
		this.removeComponent(key);
		
		// если у виджета определен базовый класс, до его компоненты будут иметь класс-декоратор [baseCls]-[имяКомпонента]
		if('baseCls' in this.options)
			Dino.smart_override(o, {cls: this.options.baseCls+'-'+key});			
				
		var c = this.$componentFactory(o);
		
		this.children.add(c);
				
		this[key] = c;
		
		c.parent = this;	
		
		// выполняем автобиндинг
		if(this.data && !c.data)
			c.$bind(this.data, false, 2);
		
		
//		// В компоновку добавляем элемент только в том случае, если цель рендеринга не определена
//		if(!('renderTo' in o))
		this.layout.insert(c);
		
		return c;
	},
*/	
	
	
	/**
	 * Удаление компонента
	 * 
	 * @param {Object} key ключ (имя) компонента
	 */
	
/*	
	removeComponent: function(key) {
		var c = this[key];
		if(c) {
			this.layout.remove(c);
			this.children.remove(c);
			delete c.parent;
			delete this[key];
		}
		return c;
	},
*/	
	
	
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
		
		return Dino.find(parents, Dino.utils.widget_filter(i));
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
	$bind: function(data, update, phase) {
				
		var o = this.options;
		
		// если данные не определены или биндинг выключен, то биндинг не выполняем
		if(data == undefined || !o.binding) return;
		
		if(this.data)
			this.data.events.unreg(this);
		
		// если фаза автобиндинга не определена, то присваем ей начальное значение
		if(!phase) phase = 1;
		
		if(update !== false) update = true;
		
		this.dataPhase = phase;
		
//		if(this.data) data.destroy(); //<-- экспериментальный код
		
		// если определен параметр dataId, то источником данных будет дочерний элемент, если нет - то сам источник данных 
		if('dataId' in o){
			this.data = (data instanceof Dino.data.DataSource) ? data.item(o.dataId) : new Dino.data.ObjectDataSource(data, o.dataId);
		}
		else {
			this.data = (data instanceof Dino.data.DataSource) ? data : new Dino.data.ObjectDataSource(data);
		}

		
		
//		if('defaultValue' in o){
//			if(this.data.get() == null) this.data.set(o.defaultValue);
//		}
		var self = this;
	
		// если установлен параметр updateOnValueChange, то при изменении связанных данных, будет вызван метод $dataChanged
		this.data.events.reg('onValueChanged', function() { 
			if(self.options.updateOnValueChange) self.$dataChanged();
//			console.log(self.data.val());
//			// связываем данные с дочерними компонентами виджета
//			self.children.each(function(child){
//				if(child.dataPhase != 1) child.$bind(self.data, 2);
//			});
		}, this);
		
		//FIXME пока непонятный механизм для обработки события onDirty
//		if('onDirty' in this.options){
//			this.data.events.reg('onDirty', function(e){
//				self.events.fire('onDirty', e);
//			}, this);
//		}
//		if('onClean' in this.options){
//			this.data.events.reg('onClean', function(e){
//				self.events.fire('onClean', e);
//			}, this);
//		}
	
		// связываем данные с дочерними компонентами виджета
		this.children.each(function(child){
			if(child.dataPhase != 1) child.$bind(self.data, false, 2);
		});
		
		if(update) this.$dataChanged();
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
	 * Если задана функция хранения (store_format), то она используется для преобразования значения
	 * 
	 * @param {Any} val значение
	 */
	setValue: function(val, reason) {
		var o = this.options;
		if(this.data){
			if(o.store) 
				val = o.store.call(this, val);
			
			var valid = true;
			var context = {};				
			if(o.validate) {				
				valid = o.validate.call(this, val, context);
/*				
				var self = this;
				var validator = this.options.validator;
				
				if(Dino.isFunction(validator))
					valid = validator.call(this, val, results);
				else if(Dino.isArray(validator)) 
					valid = Dino.find(validator, function(v){ return v.call(self, val, results); })
*/					
			}
				 
			
			if(valid) {
				this.data.set(val);
				this.states.clear('invalid');
				this.events.fire('onValueChanged', {'value': val, 'reason': reason});				
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
	$dataChanged: function() {
//		// если автобиндинг выключен, то прекращаем обновление
//		if(!this.options.autoBinding) return;
//		if(this.suppressDataChange) return;
		
		var binding = this.options.binding;
		
		if(Dino.isFunction(binding)){
//			var o = {};
			var val = this.getValue();
//			if(val !== undefined)	
			if( binding.call(this, val) === false) return;
//			this.opt(o);
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
		
		this.children.each(function(child) { child.$dataChanged(); });	
		
//		this.events.fire('onDataChanged');
	}
	
}, 'widget');



Dino.widget = function(){
	if(arguments.length == 1) return Dino.object(arguments[0]);
	return Dino.object( Dino.smart_override.apply(this, arguments) ); //FIXME непонятно зачем вызов через apply
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
		o.html = this;
	}
	else if(arguments.length == 0) return null;
	return Dino.widget(o);
};















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
					var cancel_event = new Dino.events.CancelEvent({'contextMenu': w.contextMenu});
					w.events.fire('onContextMenu', cancel_event);
					if(!cancel_event.isCanceled){
						w.contextMenu.sourceWidget = w;
						w.contextMenu.show(e.pageX-2, e.pageY-2);
					}
					e.preventDefault();
				}
//			}
		});
//		Dino.contextMenuReady = true;
//	}
	
	
		
});

