
/**
 * @name Dino.layouts
 * @namespace
 */


/**
 * @class
 * @name Dino.Layout
 * @param {Object} opts
 */
Dino.declare('Dino.Layout', Dino.BaseObject, /** @lends Dino.Layout.prototype */ {
	
	defaultOptions: {
		updateMode: 'auto'
	},
	
	initialize: function(opts){
		Dino.Layout.superclass.initialize.call(this);
		
		var o = this.options = {}
		Dino.hierarchy(this.constructor, function(clazz){
			if('defaultOptions' in clazz) Dino.smart_override(o, clazz.defaultOptions);
		});
		Dino.smart_override(o, this.defaultOptions, opts);
//		this.options = Dino.smart_override({}, this.defaultOptions, o);
		
//		this.attach(this.options.container);
		
	},
	
	/**
	 * ассоциация компоновки с виджетом
	 * @param {Object} c виджет
	 */
	attach: function(c) { 
		
		var o = this.options;
		
		this.container = c;
				
		if('name' in o) this.container.el.attr('layout', o.name);

		this.el = this.container.el;
		
		if(o.html){
			var html = $(o.html);
			this.el = (o.htmlSelector) ? $(o.htmlSelector, html) : html;
			this.container.el.append(html);
		}
		
	},
	
	/**
	 * удаление ассоциации компоновки с виджетом
	 */
	detach: function() { 
//		if('containerCls' in this.options) this.container.el.removeClass(this.options.containerCls);
		if('name' in this.options) this.container.el.attr('layout', undefined);
		delete this.container; 
	},
	
//	auto_height: function(enable) {
//		this.options.autoHeight = enable;
//		(enable) ? this.el.attr('autoheight', 'true') : this.el.removeAttr('autoheight');
//	},
	
//	add: function(item) {},
	/**
	 * добавление нового элемента-виджета в компоновку
	 * 
	 * @param {Object} item виджет
	 * @param {Object} i (Optional) ключ
	 */
	insert: function(item, i) {},
	
	/**
	 * удаление элемента-виджета из компоновки
	 * @param {Object} item
	 */
	remove: function(item) {},
	
	/**
	 * обновление компоновки (позиции, размеров элементов)
	 */
	update: function() {},
	
	/**
	 * обновление компоновки (порядка, количества элементов)
	 */
	rebuild: function() {},
	
	/**
	 * очистка компоновки от всех элементов (уничтожения дочерних элементов не происходит)
	 */
	clear: function() {}
});



