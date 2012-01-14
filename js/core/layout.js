
//= require "object"


/**
 * @class
 * @name Ergo.core.Layout
 * @param {Object} opts
 */
Ergo.core.Layout = Ergo.declare('Ergo.core.Layout', 'Ergo.core.Object', /** @lends Ergo.core.Layout.prototype */ {
	
	defaults: {
		updateMode: 'auto'
	},
	
	initialize: function(opts){
		this.$super(opts);
//		Ergo.core.Layout.superclass.initialize.apply(this, arguments);
		
//		var o = this.options = {};
//		
//		Ergo.hierarchy(this.constructor, function(clazz){
//			if('defaults' in clazz) Ergo.smart_override(o, clazz.defaults);
//		});
//		Ergo.smart_override(o, this.defaults, opts);
		
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
	update: function() {
		
		// AUTO WIDTH
		if(this.container.options.autoWidth === true){

			// если элемент не отображается - его не надо выравнивать
			if(!this.el.not(':hidden')) return;
			
			// расчитываем отступы
			var dw = this.el.outerWidth(true) - this.el.width();
			// скрываем элемент
			this.el.hide();
			
			// ищем родителя, у которого определена ширина
			var w = 0;
			this.el.parents().each(function(i, el){
				if(!w) w = $(el).width();
				if(w) return false;
			});
			
			// обходим всех видимых соседей и получаем их ширину
			this.el.siblings().not(':hidden').each(function(i, sibling){
				var sibling = $(sibling);
				if(sibling.attr('autoWidth') != 'ignore') 
					w -= sibling.outerWidth(true);
			});

			// задаем ширину элемента (с учетом отступов), если она не нулевая
			if(w - dw) 
				this.el.width(w - dw);
				
			// отображаем элемент
			this.el.show();
		}
		
		// AUTO HEIGHT
		if(this.container.options.autoHeight === true){

			if(!this.el.is(":visible")) return;
			
			this.el.height(0);
			
//			this.el.hide();
			
			var dh = 0;
			var h = 0;
			this.el.parents().each(function(i, el){
				el = $(el);
				var w = el.ergo();
				if((w && w.options.height) || el.attr('autoHeight') == 'true' || el.is('body')){
					h = el.height();
//					h = el[0].scrollHeight;
					return false;
				}
				else {
//					if(dh == 0) dh = el.height();
					dh += (el.outerHeight(true) - el.height());
					el.siblings().not('td, :hidden').each(function(i, sibling){
						sibling = $(sibling);
						if(sibling.attr('autoHeight') != 'ignore') 
							dh += sibling.outerHeight(true)
					});
				}
			});

			dh += (this.el.outerHeight(true) - this.el.height());
			this.el.siblings().not('td, :hidden').each(function(i, sibling){
				sibling = $(sibling);
				if(sibling.attr('autoHeight') != 'ignore') 
					dh += sibling.outerHeight(true)
			});
			
//			dh -= this.el.height()
			this.el.height(h - dh);

//			this.el.show();
			
		}
		
		// AUTO FIT
		if(this.container.options.autoFit === true){
			
			var dw = this.el.outerWidth() - this.el.width();
			var dh = this.el.outerHeight() - this.el.height();
			
			this.el.hide();
			
			var h = this.container.options.height || 0;
			var w = this.container.options.width || 0;
			this.el.parents().each(function(i, el){
				if(!h) h = $(el).height();
				if(!w) w = $(el).width();
				if(w && h) return false;
			});
			
			this.el.siblings().not(':hidden').each(function(i, el){
				w -= $(el).outerWidth(true);
			});

			this.el.width(w - dw);
			this.el.height(Math.floor(h - dh));		

			this.el.show();			
		}
		
	},
	
	/**
	 * обновление компоновки (порядка, количества элементов)
	 */
	rebuild: function() {},
	
	/**
	 * очистка компоновки от всех элементов (уничтожения дочерних элементов не происходит)
	 */
	clear: function() {}
});










/**
 * @namespace Пространство для классов, наследуемых от Ergo.core.Layout
 */
Ergo.layouts = {};



