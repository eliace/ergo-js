
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
		states: {}
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
		
		// определяем параметры как смесь пользовательских параметров и параметров по умолчанию
		var o = this.options = {};
		Dino.hierarchy(this.constructor, function(clazz){
			if('defaultOptions' in clazz) Dino.utils.override_opts(o, clazz.defaultOptions);
		});
		Dino.utils.override_opts(o, opts);
		
		html = o.wrapEl || html; // оставляем возможность указать html через options
		
		// создаем новый элемент DOM или используем уже существующий
		this.el = $(html || this._html());//('wrapEl' in o) ? o.wrapEl : $(this._html());
		this.el.data('dino-widget', this);
		if(this.defaultCls) this.el.addClass(this.defaultCls);
		this.children = [];
		
		// сначала подключаем данные, чтобы при конструировании виджета эти данне были доступны
		this.setData(o.data);
		// конструируем виджет
		this._init(o);//this, arguments);
		// добавляем обработку событий
		this._events(this);
		// устанавливаем опциональные параметры
		this._opt(o);
		// добавляем элемент в документ
		this._render(o.renderTo);
		// обновляем виджет, если к нему были подключены данные
		if(this.data) this._dataChanged();
		// выполняем темизацию
		this._theme(o.theme);
				
	},
	
	_init: function() {
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
		}
	},
	
	_theme: function(name) {
	},
	
	_events: function(self){
	},


	opt: function(o) {
		var opts = o;
		if(arguments.length == 2){
			opts = {}
			opts[arguments[0]] = arguments[1];
		}
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
		if('id' in o) el.attr("id", this.id = o.id);
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
				el.bind(i, callback.curry(self));
			}
		}
		if('html' in o) this.el.html(o.html);
		
		
		var regexp = /^on\S/;
		for(var i in o){
			if(regexp.test(i)){
				this.addEvent(i, o[i].curry(self));//function(e) { callback.call(this, e, self); });
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
		
	/**
	 * Создание связи виджета с другим виджетом
	 */
	link: function(obj) {
		this.link = obj;
		this.fireEvent('onLink', new Dino.events.Event({'target':obj}));
	},
	
	/**
	 * Удаление связи виджета с другим виджетом
	 */
	unlink: function() {
		this.fireEvent('onUnlink', new Dino.events.Event({'target':this.link}));
		this.link = null;
	},
	
	
	//---------------------------------------
	// Методы работы с деревом виджетов
	//---------------------------------------
	
	/**
	 * Получаем дочерний виджет
	 * 
	 * параметром может быть:
	 *  a) число - порядковый номер
	 *  b) строка - значение свойства "tag"
	 *  c) функция - фильтр
	 *  d) объект - набор свойств
	 *  
	 *  В принципе все эти параметры могут быть реализованы с помощью одного только фильтра и карринга
	 */
	getChild: function(i){
		var f = null;
		
		if( _dino.isNumber(i) ) return this.children[i]; // упрощаем
		else if( _dino.isString(i) ) f = _dino.filters.by_props.curry({'tag': i});
		else if( _dino.isFunction(i) ) f = i;
		else if( _dino.isPlainObject(i) ) f = _dino.filters.by_props.curry(i);
		else return null;
		
		return Dino.find_one(this.children, f);
	},
	
	// Добавляем дочерний виджет
	addChild: function(item) {
		this.children.push(item);
		item.parent = this;	
		
		if(this.data && !item.data) item.setData(this.data);
		
		return item;
	},
	
	// Удаляем дочерний виджет
	removeChild: function(item) {
		var i = Dino.find_one(this.children, item);
		if(i != -1){
			delete this.children[i].parent;
			this.children.splice(i, 1);
		}
		
		return (i != -1);
	},
	
	// Удаляем все дочерние виджеты
	removeAllChildren: function(o) {
		for(var i in this.children) delete this.children[i].parent;
		this.children.splice(0, this.children.length);
	},
	
	eachChild: function(callback) {
//		Dino.each(this.children, callback);
		//WARN здесь используется цикл вместо метода each, т.к. each поменяет this
		for(var i = 0; i < this.children.length; i++){
			callback.call(this, this.children[i], i);
		}
	},
	
	
	//---------------------------------------------
	// Методы работы с подсоединенными данными
	//---------------------------------------------
	
	setData: function(data) {
		
		if(data == undefined) return;
		
		var o = this.options;
		
		if('dataId' in o){
			this.data = (data instanceof Dino.data.DataSource) ? data._item(o.dataId) : new Dino.data.DataSource(data, o.dataId);
		}
		else {
			this.data = (data instanceof Dino.data.DataSource) ? data : new Dino.data.DataSource(data);
		}
		
		for(var i in this.children)
			this.children[i].setData(this.data);
	},
	
	
	
	getValue: function() {
		return (this.data) ? this.data.get() : undefined;
	},
	
	setValue: function(val) {
		if(this.data){
			this.data.set(val);
			this.fireEvent('onValueChanged', new Dino.events.Event());
		}
	},
	
	
	
	//------------------------------------------
	// Методы управления состояниями виджета
	//------------------------------------------
	
	setState: function(name) {
		var stateCls = (name in this.options.states) ? this.options.states[name] : this.options.baseCls+'-'+name;
		this.el.addClass( stateCls );
		this.fireEvent('onStateChanged');
	},
	
	clearState: function(name){
		var stateCls = (name in this.options.states) ? this.options.states[name] : this.options.baseCls+'-'+name;
		this.el.removeClass( stateCls );
		this.fireEvent('onStateChanged');
	},
	
	toggleState: function(name, sw) {
		var stateCls = (name in this.options.states) ? this.options.states[name] : this.options.baseCls+'-'+name;
		this.el.toggleClass( stateCls, sw );
		this.fireEvent('onStateChanged');
	},
	
	checkState: function(name) {
		var stateCls = (name in this.options.states) ? this.options.states[name] : this.options.baseCls+'-'+name;
		return this.el.hasClass( stateCls );
	},
	
	
	
//	_dataBound: function(){},
//	_dataUnbound: function() {},
	_dataChanged: function() {}
	
});


$.fn.dino = function(o) {
	if(this.length > 0){
		var widget = this.data('dino-widget');
		if(widget) return widget;
		o.wrapEl = this;
	}
	return Dino.widget(o);
};


