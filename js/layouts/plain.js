
//= require <core/layout>


/**
 * Эта компоновка сразу добавляет элемент в контейнер.
 * 
 * @class
 * @name Dino.layouts.PlainLayout
 * @extends Dino.Layout
 * 
 */
Dino.declare('Dino.layouts.PlainLayout', Dino.Layout, /** @lends Dino.layouts.PlainLayout.prototype */{
	
	
	defaults: {
		autoHeight: false
	},
	
	insert: function(item, index) {
		
		var selector = item.options.layoutSelector;
		
		var el = this.el;
		
		if(selector) {
			el = Dino.isFunction(selector) ? selector.call(this) : $(selector, this.el);
		}
		
		if(index == null)
			el.append( item.el );
		else if(index == 0)
			el.prepend( item.el );
		else
			el.children().eq(index-1).after(item.el);
		
		if('itemCls' in this.options) item.el.addClass(this.options.itemCls);
	},
	
	remove: function(item) {
		item.el.remove(); //TODO опасный момент: все дочерние DOM-элементы уничтожаются
		if('itemCls' in this.options) item.el.removeClass(this.options.itemCls);
	},
	
	clear: function() {
		this.el.empty(); //WARN еще опасный момент все дочерние DOM-элементы уничтожаются
	},
	
	update: function() {
		
		// AUTO WIDTH
		if(this.container.options.width == 'auto'){

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
				if(sibling.attr('autowidth') != 'ignore') 
					w -= sibling.outerWidth(true);
			});

			// задаем ширину элемента (с учетом отступов), если она не нулевая
			if(w - dw) 
				this.el.width(w - dw);
				
			// отображаем элемент
			this.el.show();
		}
		
		// AUTO HEIGHT
		if(this.container.options.height == 'auto'){

			if(!this.el.is(":visible")) return;
			
			this.el.height(0);
			
//			this.el.hide();
			
			var dh = 0;
			var h = 0;
			this.el.parents().each(function(i, el){
				el = $(el);
				var w = el.dino();
				if((w && w.options.height) || el.attr('autoheight') == 'true' || el.is('body')){
					h = el.height();
//					h = el[0].scrollHeight;
					return false;
				}
				else {
//					if(dh == 0) dh = el.height();
					dh += (el.outerHeight(true) - el.height());
					el.siblings().not('td, :hidden').each(function(i, sibling){
						sibling = $(sibling);
						if(sibling.attr('autoheight') != 'ignore') 
							dh += sibling.outerHeight(true)
					});
				}
			});

			dh += (this.el.outerHeight(true) - this.el.height());
			this.el.siblings().not('td, :hidden').each(function(i, sibling){
				sibling = $(sibling);
				if(sibling.attr('autoheight') != 'ignore') 
					dh += sibling.outerHeight(true)
			});
			
//			dh -= this.el.height()
			this.el.height(h - dh);

//			this.el.show();
			
		}
		
		// AUTO FIT
		if(this.container.options.autoFit){
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
			this.el.height(h - dh);		

			this.el.show();			
		}

	}
		
}, 'plain-layout');