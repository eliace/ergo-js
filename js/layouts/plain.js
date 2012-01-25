
//= require <core/layout>


/**
 * Эта компоновка сразу добавляет элемент в контейнер.
 * 
 * @class
 * @name Ergo.layouts.PlainLayout
 * @extends Ergo.core.Layout
 * 
 */
Ergo.declare('Ergo.layouts.PlainLayout', Ergo.core.Layout, /** @lends Ergo.layouts.PlainLayout.prototype */{
	
	
	defaults: {
//		autoHeight: false
	},
	
	
	wrap: function(item) {
		return item.el;
	},
	
	/**
	 * Вставка элемента
	 * 
	 * @param {jQuery} itemEl элемент
	 * @param {int} index порядковый номер элемента (может быть не определен)
	 * @param {int} weight вес элемента 
	 * 
	 */
	insert: function(item, index, group) {
		
		var selector = item.options.layoutSelector;
		
		var el = this.el;
		
		var item_el = this.wrap(item);
		
		if(selector) {
			el = $.isFunction(selector) ? selector.call(this) : $(selector, el);
		}
		
		// если вес не указан, то вес считается равным 0
		var weight = item.options.weight || 0;
		
		
		item._weight = weight;
		
		item_el.data('weight', weight);
		
		// если индекс не определен, то элемент должен быть добавлен последним в свою группу
		if(index == null) {
			// обходим все элементы контейнера в поисках первого с большим весом
			var after_el = null;
			el.children().each(function(i, elem){
				var w = $(elem).data('weight');
				if(w > weight) {
					after_el = $(elem);
					return false;
				}
			});

			if(after_el)
				after_el.before( item_el );
			else
				el.append( item_el );
				
			
			// var after_el = null;
			// el.children().each(function(i, elem){
				// var w = $(elem).ergo();
				// if(w && w._weight > weight) {
					// after_el = $(elem);
					// return false;
				// }
			// });
// 
			// if(after_el)
				// after_el.before( item_el );
			// else
				// el.append( item_el );
		}
		else if(index === 0) {
			var before_el = [];
			var children = el.children();
			for(var i = children.length-1; i >= 0; i--) {
				var w = $(children[i]).ergo();
				if(w && w._weight < weight) before_a.push(children[i]);				
			}
			// el.children().each(function(i, elem){
				// var w = $(elem).ergo();
				// if(w && w._weight < weight) before_a.push(elem);
			// });

			if(before_el)
				before_el.after( item_el );
			else
				el.prepend( item_el );
		}
		else {
			
			var arr = [];
			var before_el = null;
			this.container.items.each(function(it){
				if(it._weight == weight) arr.push(it.el);
				else if(it._weight < weight) before_el = it.el;
			});

			if(arr.length == 0) {
				if(before_el)
					before_el.after( item_el );
				else
					el.prepend( item_el );
			}
			else {
				item_el.before(arr[index-1]);
			}
			
		}
		// else if(index == 0)
			// el.prepend( item.el );
		// else if($.isNumber(index))
			// el.children().eq(index-1).before(item.el);
		// else
			// index.el.before(item.el);
		
		if('itemCls' in this.options) item.el.addClass(this.options.itemCls);
	},
	
	
//	after: function(item, afterItem) {
//		
//		if(afterItem)
//			afterItem.el.after(item.el);
//		else
//			this.el.append(item.el);
//		
//		if('itemCls' in this.options) item.el.addClass(this.options.itemCls);
//	},
	
	
	remove: function(item) {
		item.el.remove(); //TODO опасный момент: все дочерние DOM-элементы уничтожаются
		if('itemCls' in this.options) item.el.removeClass(this.options.itemCls);
	},
	
	clear: function() {
		this.el.empty(); //WARN еще опасный момент все дочерние DOM-элементы уничтожаются
	}
	
/*	
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
				this.el.width(w - dw - 1);
				
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
				var w = el.ergo();
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
			this.el.height(Math.floor(h - dh));		

			this.el.show();			
		}

	}
*/

		
}, 'plain-layout');