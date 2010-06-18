


Dino.declare('Dino.Widget', Dino.events.Observer, {
	
	initialize: function(opts) {
		Dino.Widget.superclass.initialize.apply(this, arguments);
		
		var o = this.options = {};
		Dino.override(o, this.defaultOptions || {});
		Dino.override(o, opts || {});
		
		// создаем новый элемент DOM или используем уже существующий
		this.el = ('wrapEl' in o) ? o.wrapEl : $(this._html());
		if(this.defaultCls) this.el.addClass(this.defaultCls);
		this.children = [];
		
		// конструируем виджет (передаем параметры конструктора)
		this._init.apply(this, arguments);
		// устанавливаем опциональные параметры
		this._opt(o);
		// добавляем элемент в документ
		this._render(o.renderTo);
		// обновляем виджет, если к нему были подключены данные
		if(this.data) this._dataChanged();
	},
	
	
	_init: function(o) {
	},
	
//	_theme: function() {
//		if(this.options.ui == 'jquery_ui') this._theme_jquery_ui
//	}
	
	destroy: function() {
		// удаляем элемент и все его содержимое из документа
		if(this.el) this.el.remove();
	},
	
	_html: function() {
		return '';
	},
	
	_render: function(target) {
		if(target){
			var parentEl = (target instanceof Dino.Widget) ? target.el : $(target);
			parentEl.append(this.el);
		}
	},
	
	_theme: function(name) {
	},


	opt: function(o) {
		if(arguments.length == 2){
			var i = ''.arguments[0]
			o = {i: arguments[1]};
		}
		this._opt(o);
		return this.options;
	},
	
	
	/**
	 * Устанока параметров.
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
		
		var regexp = /^on\S/;
		for(var i in o){
			if(regexp.test(i)){
				this.addEvent(i, o[i].curry(self));//function(e) { callback.call(this, e, self); });
			}
		}
		
		if('data' in o) {
			if('dataId' in o){
				this.data = (o.data instanceof Dino.data.DataSource) ? o.data.getItem(o.dataId) : new Dino.data.DataSource(o.data, o.dataId);
			}
			else {
				this.data = (o.data instanceof Dino.data.DataSource) ? o.data : new Dino.data.DataSource(o.data);
			}
			// FIXME
			this.data.addEvent('onDataChanged', this._dataChanged);
			this.fireEvent('onDataChanged', new Dino.events.Event());
		}
		
		if('theme' in this.options){
			this._theme(this.options.theme);
		}
		
		
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
	
	// Добавляем дочерний виджет
	addChild: function(item) {
		this.children.push(item);
		item.parent = this;
		return item;
	},
	
	// Удаляем дочерний виджет
	removeChild: function(item) {
		var i = Dino.find(this.children, item);
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
	
	getValue: function() {
		return null;
	},
	
	setValue: function(val) {
		if(this.data) this.data.setValue(val);
	},
	
//	_dataBound: function(){},
//	_dataUnbound: function() {},
	_dataChanged: function() {}
	
});