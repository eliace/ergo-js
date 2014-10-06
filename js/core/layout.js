
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
	
	initialize: function(o){
		this.$super(o);
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
		
		this._widget = c;
				
		if('name' in o) this._widget.el.attr('layout', o.name);
		if('cls' in o) this._widget.el.addClass(o.cls.join(' '));

		this.el = this._widget.el;
		
		if(o.html){
			var html = $(o.html);
			this.el = (o.htmlSelector) ? $(o.htmlSelector, html) : html;
			this._widget.el.append(html);
		}
		
	},
	
	/**
	 * удаление ассоциации компоновки с виджетом
	 */
	detach: function() { 
//		if('containerCls' in this.options) this.container.el.removeClass(this.options.containerCls);
		if('name' in this.options) this._widget.el.attr('layout', undefined);
		if('cls' in o) this._widget.el.removeClass(o.cls.join(' '));
		delete this._widget; 
	},
	
	
	
	/**
	 * Оборачивание элемента.
	 * 
	 * @param {Ergo.core.Widget} item виджет
	 * @return {jQuery} jQuery-объект, содержащий обертку и элемент виджета
	 * 
	 */
	wrap: function(item) {
		return item.el;
	},
	
	
	/**
	 * jQuery-элемент, куда будут добавляться виджеты
	 *  
	 */
	select: function(item) {
		return this.el;
//		var o = this.options;
//		return (o.elementSelector) ? o.elementSelector.call(this, item) : this.el; 
	},






	/**
	 * добавление нового элемента-виджета в компоновку
	 * 
	 * @param {Ergo.core.Widget} item виджет
	 * @param {int} index порядковый номер (может быть не определен)
	 * @param {int} weight вес группы
	 */
	add: function(item, index, weight) {
		
//		var selector = item.options.layoutSelector;
		
//		var el = this.el;

		var o = this.options;

		// выбираем элемент, куда будет добавляться элемент-виджет
		var el = (o.selector) ? o.selector.call(this, item) : this.select(item);

		// если вес не указан, то вес считается равным 0
		var weight = item.options.weight || 0;
		
		item._weight = weight;

		// создаем обертку (если она необходима) для элемента-виджета
		var item_el = (o.wrapper) ? o.wrapper.call(this, item) : this.wrap(item);
		
		if(item_el != item.el) {
			item._wrapper = item_el;
			
			// экспериментальный код
			if(item.options.wrapper) {
				item.wrapper = $.ergo( Ergo.deep_override({etype: 'widget:widget', html: item._wrapper, autoRender: false}, item.options.wrapper) );
				item.wrapper._weight = weight;
			}
		}
		
		
//		item_el.data('weight', weight);
		item_el[0]._index = index;

		item_el[0]._weight = weight;

		item_el[0]._group = item.options.group;
		
		
		var elements = el.contents();
		
		// фильтруем список элементов
		if(item.options.group) {
			elements = elements.filter(function(i, elem){
				return (elem._ergo) ? (elem._ergo.options.group == item.options.group) : false;
			});
		}
		
		
		
		
		
		
		// если индекс не определен, то элемент должен быть добавлен последним в свою группу
		if(index == null) {
			// обходим все элементы контейнера в поисках первого с большим весом
			var after_el = null;
			elements.each(function(i, elem){
				var w = elem._weight;// $(elem).data('weight');
				if(w > weight) {
					after_el = $(elem);
					return false;
				}
			});

			if(after_el)
				after_el.before( item_el );
			else if(elements.length)
				elements.last().after( item_el );
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
		// else if(index === 0) {
			// var before_a = [];
			// for(var i = elements.length-1; i >= 0; i--) {
				// var w = $(elements[i]).ergo();
				// if(w && w._weight < weight) before_a.push($(elements[i]));				
			// }
// 
			// if(before_a.length > 0)
				// before_a[before_a.length-1].after( item_el );
			// else if(elements.length)
				// elements.first().before( item_el );
			// else
				// el.prepend( item_el );
		// }
		else {

			// немножко эвристики
			var last = elements.last();
			
			if(elements.length == 0) {
				el.append( item_el );				
			}
			else if(last[0]._weight == weight && last[0]._index < index){
				last.after(item_el);
			}
			else {	
			
				var arr = [];
				var before_el = null;
				var after_el = null;
	//			this.container.children.each(function(it){
				elements.each(function(k, child){
					it = $(child).ergo();
					if(!it || it == item) return; //если элемент еще не отрисован, это вызовет ошибку
					if(it._weight == weight) arr.push(it);//.el);
					else if(it._weight <= weight) before_el = it.el;
					else if(!after_el /* || it._weight > after_el._weight*/) after_el = it.el;
				});
	
	
				for(var i = 0; i < arr.length; i++) {
					(arr[i]._index > index) ? after_el = arr[i].el : before_el = arr[i].el;
				}
	
	//			if( !arr[index] ) {
	//				before_el = arr[index-1] | before_el;
				if(before_el)
					before_el.after( item_el );
				else if(after_el)
					after_el.before( item_el );
				else if(elements.length)
					elements.last().after( item_el );
				else
					el.append( item_el ); //FIXME это уже не нужно				
						
				// }
				// else {
					// arr[index].before(item_el);
				// }
			}
		}
		// else if(index == 0)
			// el.prepend( item.el );
		// else if($.isNumber(index))
			// el.children().eq(index-1).before(item.el);
		// else
			// index.el.before(item.el);
		
		item._rendered = true;
		
		// deprecated
		if('itemCls' in this.options) item.el.addClass(this.options.itemCls);
		if('itemStyle' in this.options) item.el.css(this.options.itemStyle);
	},
	
	
	/**
	 * удаление элемента-виджета из компоновки
	 * @param {Object} item
	 */
	remove: function(item) {
		
		if(item._wrapper) {
			item._wrapper.remove(); //?
			
			if(item.wrapper)
				item.wrapper.destroy();
		}
		else
			item.el.remove(); //TODO опасный момент: все дочерние DOM-элементы уничтожаются
		
		item._rendered = false;
		
		if('itemCls' in this.options) item.el.removeClass(this.options.itemCls);
	},
	
	
	/**
	 * очистка компоновки от всех элементов (уничтожения дочерних элементов не происходит)
	 */
	clear: function() {
		this.el.empty(); //WARN еще опасный момент все дочерние DOM-элементы уничтожаются		
	},
	
	
	/**
	 * обновление компоновки (позиции, размеров элементов)
	 */
	update: function() {
		
		// AUTO WIDTH
		if(this._widget.options.autoWidth === true){

			// если элемент не отображается - его не надо выравнивать
			if(!this.el.not(':hidden')) return;
			
			// рассчитываем отступы
			var dw = 0;
			if(this.el.is(':button')) dw = this.el.outerWidth(true) - this.el.outerWidth();
			else dw = this.el.outerWidth(true) - this.el.width();
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
		if(this._widget.options.autoHeight) {//} &&  this.container.options.autoHeight != 'ignore'){

			if(!this.el.is(":visible")) return;
			if(this.el.attr('autoHeight') == 'ignore') return;

			var debug = (this._widget.debug == 'autoheight');
			
			this.el.height(0);
			
			
//			this.el.hide();
			
			var dh = 0;
			var h = 0;
			this.el.parents().each(function(i, el){
				el = $(el);
				var w = el.ergo();
				if((w && w.options.height) || el.attr('autoHeight') == 'true' || el.attr('autoHeight') == 'stop' || el.is('body')){
					h = el.height();
//					h = el[0].scrollHeight;
					return false;
				}
				else {
//					if(dh == 0) dh = el.height();
					if(el.attr('autoheight') != 'ignore-siblings') {
						dh += (el.outerHeight(true) - el.height());
						el.siblings().not('td, :hidden').each(function(i, sibling){
							sibling = $(sibling);
							if(sibling.attr('autoHeight') != 'ignore') 
								dh += sibling.outerHeight(true);
						});
					}
				}
			});
			
			
			if(Ergo.context.debug) console.log({h: h, dh: dh});
			
			dh += (this.el.outerHeight(true) - this.el.height());

			if(Ergo.context.debug) console.log({h: h, dh: dh});
			
			
			var self = this;
			
			// обходим все соседние элементы
			var h_ratio = 1;
			this.el.siblings().not('td').each(function(i, sibling){
				sibling = $(sibling);
				var ah = sibling.attr('autoHeight');
				// элемент видимый
				if(!ah) {
					if(sibling.is(':visible'))
						dh += sibling.outerHeight(true);
				}
				else if(ah != 'ignore-siblings' && ah != 'ignore') {
					h_ratio++;
					dh += sibling.outerHeight(true) - sibling.height();					
				}
			});

			// var h_ratio = 1;
// 
			// if(this.container.parent) {
// 
			// this.container.parent.children.each(function(sibling){
				// if(sibling == self.container) return;
				// var ah = sibling.options.autoHeight;
				// if(!ah) {
					// dh += sibling.el.outerHeight(true);
				// }
				// else if(ah != 'ignore-siblings') {
					// h_ratio++;
					// dh += sibling.el.outerHeight(true) - sibling.el.height();
				// }
			// });
// 
			// }

			// if(this.el.attr('autoheight') != 'ignore-siblings') {
				// this.el.siblings().not('td, :hidden').each(function(i, sibling){
					// sibling = $(sibling);
					// if(sibling.attr('autoHeight') != 'ignore') {
						// dh += sibling.outerHeight(true);
						// if(debug)	console.log({type: 'sibling', el: sibling, h: sibling.outerHeight(true)});
					// }
				// });
			// }




			if(Ergo.context.debug) console.log({h: h, dh: dh});
			
//			dh -= this.el.height()
			this.el.height((h - dh)/h_ratio);

//			this.el.show();
			
		}
		
		// AUTO FIT
		if(this._widget.options.autoFit === true){
			
			var dw = this.el.outerWidth() - this.el.width();
			var dh = this.el.outerHeight() - this.el.height();
			
			this.el.hide();
			
			var h = this._widget.options.height || 0;
			var w = this._widget.options.width || 0;
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
	
	
	
	build: function() {
		
//		var render_list = [];
		
		// this._widget.children.each(function(item){
// 			
// 			
// 			
		// });
		
		
	}
	
	
	
}, 'layouts:default');






// Ergo.$layout = function(o, etype) {
	// return Ergo.object(o, 'layout:'+etype);
// };



/**
 * @namespace Пространство для классов, наследуемых от Ergo.core.Layout
 */
Ergo.layouts = {};


Ergo.$layouts = Ergo.object;

