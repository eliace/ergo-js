




/**
 * Виджет - базовый объект для всех виджетов
 * 
 * хуки:
 * 	_default
 * 	_html
 * 	_init
 * 	_events
 * 	_opt
 * 	_render
 * 	_dataChanged
 * 	_theme
 * 
 * параметры:
 * 	width
 * 	height
 * 	x
 * 	y
 * 	tooltip
 * 	id
 * 	tag
 * 	style
 * 	cls
 * 	opacity
 * 	events
 * 	data
 * 	dataId
 * 
 */
Dino.declare('Dino.Widget', Dino.events.Observer, {
	
	defaultOptions: {
		layout: 'plain-layout',
		states: {
			'hidden': 'dino-hidden',
			'visible': ['', 'dino-hidden']
		},
		binding: 'auto'
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
		
		// определяем параметры как смесь пользовательских параметров и параметров по умолчанию
		var o = this.options = {};
		Dino.hierarchy(this.constructor, function(clazz){
			if('defaultOptions' in clazz) Dino.utils.overrideOpts(o, clazz.defaultOptions);
		});
		Dino.utils.overrideOpts(o, opts);
		
		html = o.wrapEl || html; // оставляем возможность указать html через options
		
		// создаем новый элемент DOM или используем уже существующий
		this.el = $(html || this._html());//('wrapEl' in o) ? o.wrapEl : $(this._html());
		this.el.data('dino-widget', this);
		if(this.defaultCls) this.el.addClass(this.defaultCls);
		
		this.children = new Dino.utils.WidgetCollectionManager(this);
		
		this.states = new Dino.utils.WidgetStateManager(this);
				
		// инициализируем компоновку
		var layoutOpts = o.layout;
		if( Dino.isString(layoutOpts) )
			layoutOpts = {dtype: layoutOpts};
		this.layout = Dino.object(layoutOpts);
		this.layout.attach(this);		

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
	},
	
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
		// удаляем элемент и все его содержимое из документа
		if(this.el) this.el.remove();
	},
	
	_html: function() {
		return '<div/>';
	},
	
	_render: function(target) {
		if(target){
			var parentEl = (target instanceof Dino.Widget) ? target.el : $(target);
			parentEl.append(this.el);
			
			if(this.el.parents().is('body')){
				this._afterRender();
			}
		}
	},
	
	_theme: function(name) {
	},
	
	_afterBuild: function() {
	},

	_afterRender: function() {
		this.children.each(function(c) { c._afterRender(); });
		if(this.layout.options.updateMode == 'auto') this.layout.update();
	},
	
	_events: function(self){
	},


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
	
	
	_opt: function(o) {
		
		var self = this;
		var el = this.el;
		
		
		if('width' in o) el.width(o.width);
		if('height' in o) el.height(o.height);
		if('x' in o) el.css('left', o.x);
		if('y' in o) el.css('top', o.y);
		if('tooltip' in o) el.attr('title', o.tooltip);
		if('id' in o) el.attr('id', this.id = o.id);
		if('tag' in o) this.tag = o.tag;
		if('style' in o) el.css(o.style);
		if('cls' in o) el.addClass(o.cls);// Dino.each(o.cls.split(' '), function(cls) {el.addClass(cls);});
		if('baseCls' in o) el.addClass(o.baseCls);
		if('text' in o) el.append(o.text);
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
		if('html' in o) this.el.html(o.html);
		
		
		if('states' in o){
			// настраиваем особое поведение состояния hover
			if('hover' in o.states){
				this.el.hover(function(){ self.states.set('hover') }, function(){ self.states.clear('hover') });
			}
		}
		
		// экспериментальный код
//		if('stateEvents' in o){
//			var events = o.stateEvents;
//			for(var i in events){
//				this.el.bind(i, function(e){ $(this).dino().states.toggle(events[i]); });
//			}
//		}
		
		var regexp = /^on\S/;
		for(var i in o){
			if(regexp.test(i)){
				this.events.reg(i, o[i]);//.curry(self));//function(e) { callback.call(this, e, self); });
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
		
		if('state' in o) {
			var a = Dino.isArray(o.state) ? o.state : [o.state];
			Dino.each(a, function(state) { self.states.set(state) });
		}

		
		if(o.clickable){
			this.el.click(function(e){
				self.events.fire('onClick', {}, e);
			});
		}
		
		if('contextMenu' in o) {
			
			var cm = o.contextMenu;
			
			if(Dino.isFunction(cm)) cm = cm.call(this);
			if(cm && !(cm instanceof Dino.Widget)) cm = Dino.widget(cm);
			
			if(cm) {
			
				this.contextMenu = cm;
	
				//TODO возможно этот код стоит перенести в другое место
				if(!Dino.contextMenuReady){
					$(document).bind('contextmenu', function(e){
						var w = $(e.target).dino();
						if(w){
							var w = (w.contextMenu) ? w : w.getParent(function(item){ return item.contextMenu; });
							if(w){
//								w.contextMenu.events.fire('onBeforeShow', {'widget': w});
//								w.contextMenu.targetWidget = w;
//								w.contextMenu.events.fire('onBeforeShow');
								w.events.fire('onContextMenu', new Dino.events.CancelEvent());
								if(!e.isCanceled)
									w.contextMenu.show(e.pageX, e.pageY);
								e.preventDefault();
							}
						}
					});
					Dino.contextMenuReady = true;
				}
			
			}
		}
		
		
		
/*		
		if('data' in o) {
			if('dataId' in o){
				this.data = (o.data instanceof Dino.data.DataSource) ? o.data._item(o.dataId) : new Dino.data.DataSource(o.data, o.dataId);
			}
			else {
				this.data = (o.data instanceof Dino.data.DataSource) ? o.data : new Dino.data.DataSource(o.data);
			}
			// FIXME
//			this.data.addEvent('onValueChanged', function() {self._dataChanged(); });
//			this.fireEvent('onDataChanged', new Dino.events.Event());
		}
*/		
		
	},
	
	
	_translate_opt: function(key, target) {
		if(key in this.options) target.opt(key, this.options[key]);
	},
	
	
	
	/**
	 * Создание связи виджета с другим виджетом
	 */
//	link: function(obj) {
//		this.link = obj;
//		this.events.fire('onLink', {'target':obj});
//	},
	
	/**
	 * Удаление связи виджета с другим виджетом
	 */
//	unlink: function() {
//		this.events.fire('onUnlink', {'target':this.link});
//		this.link = null;
//	},
	
	
	
	
	//-------------------------------------------
	// Методы для работы с компонентами виджета
	//-------------------------------------------
	
	addComponent: function(key, o){
		// если компонент уже существует, то удаляем его
		this.removeComponent(key);
		
		// если у виджета определен базовый класс, до его компоненты будут иметь класс-декоратор [baseCls]-[имяКомпонента]
		if('baseCls' in this.options)
			Dino.utils.overrideOpts(o, {cls: this.options.baseCls+'-'+key});
		
		this[key] = Dino.widget(o);
		this.children.add( this[key] );
		this.layout.insert(this[key]);
//		this.el.append(this[key].el);
	},
	
	removeComponent: function(key) {
		if(this[key]) {
			this.layout.remove(this[key]);
			this.children.remove( this[key] );
			delete this[key];
		}
	},
	
	
	
	
	getParents: function(list) {
		if(arguments.length == 0) list = [];
		if(!this.parent) return list;
		list.push(this.parent);
		return this.parent.getParents(list);
	},
	
	
	getParent: function(i) {
		
		if(arguments.length == 0) return this.parent;
		
		var parents = this.getParents();
		
		var f = null;
		
		if( _dino.isNumber(i) ) return parents[i]; // упрощаем
		else if( _dino.isString(i) ) f = _dino.filters.by_props.curry({'tag': i});
		else if( _dino.isFunction(i) ) f = i;
		else if( _dino.isPlainObject(i) ) f = _dino.filters.by_props.curry(i);
		else return null;
		
		return Dino.find_one(parents, f);
	},
	
	//---------------------------------------------
	// Методы работы с подсоединенными данными
	//---------------------------------------------
	
	setData: function(data, phase) {
				
		var o = this.options;
		
		if(data == undefined || o.binding == 'none') return;
		
		if(!phase) phase = 1;
		
		this.dataPhase = phase;
		
		
		if('dataId' in o){
			this.data = (data instanceof Dino.data.DataSource) ? data.item(o.dataId) : new Dino.data.DataSource(data, o.dataId);
		}
		else {
			this.data = (data instanceof Dino.data.DataSource) ? data : new Dino.data.DataSource(data);
		}

//		if('stateId' in o){
//			this.stateData = (data instanceof Dino.data.DataSource) ? data.item(o.stateId) : new Dino.data.DataSource(data, o.stateId);
//		}
//		else {
//			this.stateData = this.data;
//		}
		
		
//		if('defaultValue' in o){
//			if(this.data.get() == null) this.data.set(o.defaultValue);
//		}
		var self = this;
	
		//FIXME этот метод закомментирован, потому что виджет начинает обрабатывать свои оповещения
//		this.data.addEvent('onValueChanged', function() {self._dataChanged(); });
	
		this.children.each(function(child){
			if(child.dataPhase != 1) child.setData(self.data, 2);
		});
	},
	
	
	
	getValue: function() {
		var val;
		if(this.data){
			val = this.data.get();
			// если присутствует функция форматирования, то используем ее
			if('format' in this.options) 
				val = this.options.format.call(this, val);
		}
		return val;
	},
	
	setValue: function(val) {
		if(this.data){
//			if('unformat' in this.options) 
//				this.options.unformat.call(this, val);
//			else
			this.data.set(val);
			this.events.fire('onValueChanged');
		}
	},
		
	getRawValue: function() {
		return (this.data) ? this.data.get() : undefined;
	},
	
//	getStateValue: function() {
//		var val;
//		if(this.data){
//			val = this.data.get();
//			// если присутствует функция форматирования, то используем ее
//			if('stateFormat' in this.options) 
//				val = this.options.stateFormat.call(this, val);
//		}
//		return val;
//	},
	
//	setStateValue: function(val) {
//		if(this.stateData){
//			this.stateData.set(val);
//			this.events.fire('onStateValueChanged');
//		}
//	},
	
	
	
	
/*	
	getFormattedValue: function() {
		var val = this.getValue();
		return (this.options.format) ? this.options.format.call(this, val) : val;
	},
*/	
	
	
//	_dataBound: function(){},
//	_dataUnbound: function() {},
	_dataChanged: function() {
//		// если автобиндинг выключен, то прекращаем обновление
//		if(!this.options.autoBinding) return;
		
		if(this.options.optBinding) {
			var o = {};
			this.options.optBinding.call(this, o);
			this.opt(o);
		}
				
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


