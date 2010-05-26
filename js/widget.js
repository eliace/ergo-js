


Dino.declare('Dino.Widget', Dino.events.EventDispatcher, {
	
	initialize: function(options) {
		Dino.Widget.superclass.initialize.apply(this, arguments);
		
		options = options || {};
		
		// создаем новый элемент DOM или используем уже существующий
		this.el = ('wrapEl' in options) ? options.wrapEl : $(this.render_html());
		if(this.defaultCls) this.el.addClass(this.defaultCls);
		this.children = [];
		
		// конструируем виджет
		this.build(options);
		// устанавливаем опциональные параметры
		this.options(options);
		// добавляем элемент в документ
		this.render_el(options.renderTo);
	},
	
	destroy: function() {
		Dino.Widget.superclass.destroy.apply(this, arguments);
		
		// удаляем элемент и все его содержимое из документа
		if(this.el) this.el.remove();
	},
	
	render_html: function() {
		return '';
	},
	
	render_el: function(target) {
		if(target)
			$(target).append(this.el);
	},
	
	options: function(o) {
		
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
		
	},
	
	build: function(o) {
	},
	
	
	link: function(obj) {
		this.link = obj;
		this.fireEvent('onLink', {'target':obj});
	},
	
	unlink: function() {
		this.fireEvent('onUnlink', {'target':this.link});
		this.link = null;
	},
	
	// Добавляем дочерний виджет
	addItem: function(item) {
		this.children.push(item);
		item.parent = this;
		return item;
	},
	
	// Удаляем дочерний виджет
	removeItem: function(item) {
		var i = Dino.find(this.children, item);
		if(i != -1){
			delete this.children[i].parent;
			this.children.splice(i, 1);
		}
		
		return (i != -1);
	},
	
	// Удаляем все дочерние виджеты
	removeAllItems: function(o) {
		for(var i in this.children) delete this.children[i].parent;
		this.children.splice(0, this.children.length);
	},
	
	eachItem: function(fn) {
		for(var i = 0; i < this.children.length; i++){
			fn.call(this, this.children[i], i);
		}
	},
	
	getValue: function() {
		return null;
	},
	
	setValue: function(val) {
	}
	
});