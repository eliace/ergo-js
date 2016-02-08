

/**
 * Общие опции виджетов
 *
 * Опции:
 * 	`text` текстовое содержимое виджета
 * 	`innerText` текстовое соержимое тега
 * 	`innerHtml` html-содержимое тега
 * 	`opacity` непрозрачность 0..1
 * 	`width` ширина
 * 	`height` высота
 * 	`autoWidth` авто-ширина {@link Ergo.core.Layout}
 * 	`autoHeight` авто-высота {@link Ergo.core.Layout}
 * 	`autoBind` авто-связывание данных
 * 	`autoUpdate` авто-обновление данных
 * 	`tooltip` всплывающая подсказка
 * 	`id` HTML id (используется в поиске)
 * 	`name` имя виджета (используется в поиске)
 * 	`tabindex` HTML tabindex
 * 	`format` форматирование связанных данных
 * 	`store` преобразование вводимых данных к формату связанных данных
 * 	`hidden` скрытие элемента
 *
 *
 * @mixin
 */
Ergo.WidgetOptions = {


	// get text() {
	// 	if(this.$content) {
	// 		return this.$content.opt('text');
	// 	}
	// 	else {
	// 		return this.vdom.innerEl.textContent;
	// 	}
	// },
//	getText: function() {	return this.layout.el.text();	},
	// get width() {	return this.el.outerWidth();	},
	// get height() { return this.el.outerHeight();	},
	// get name() {
	// 	return this._name || this._key || this._index;
	// },



// 	set text(v) {
// 		if(this.$content) {
// 			this.$content.opt('text', v == null ? '': v);
// 		}
// 		else {
// 			this.vdom.innerEl.textContent = ( v == null ? '': v );
// 		}
//
// 		this.__txt = v;
//
// // 		if(!this.__c)
// // 			this.dom.el.textContent = ( v == null ? '': v );
// // 		else if(this.children.size() == 0)
// // //			this.layout.el.text( v == null ? '': v );
// // 			this.layout.el.textContent = ( v == null ? '': v );
// // 		else if(this.$content)
// // 			this.$content.opt('text', v == null ? '': v);
// // 		else
// // //			this.layout.el.text( v == null ? '': v );
// //  			this.layout.el.textContent = ( v == null ? '': v );
//
// 	},
	// set_innerText: function(v) {	this.layout.el.text(v); },
//	set innerHtml(v) {	this.vdom.innerEl.innerHTML = (v || ''); },
	// set_opacity: function(v) {
	// 	if($.support.opacity)
	// 		this.el.css('opacity', v);
	// 	else {
	// 		this.el.css('filter', 'Alpha(opacity:' + (v*100.0) + ')');
	// 		this.el.css('-ms-filter', 'progid:DXImageTransform.Microsoft.Alpha(Opacity=' + (v*100.0).toFixed() + ')');
	// 	}
	// },
	// set width(v) { this.el.outerWidth(v); },
	// set height(v) { this.el.outerHeight(v); },



// 	set autoWidth(v) {
// 		v ? this.vdom.el.setAttribute('autoWidth', v) : this.vdom.el.removeAttribute('autoWidth');
// 	},
// 	set autoHeight(v) {
// 		if(v) {
// 			this.vdom.el.setAttribute('autoHeight', v);
// 			if(v === true || v == 'ignore-siblings')
// 				this.vdom.setStyle('overflow-y', 'auto');//.el.style['overflow-y'] = 'auto';//('overflow-y', 'auto');
// 		}
// 		else {
// 			this.vdom.el.removeAttribute('autoHeight');
// 			this.vdom.setStyle('overflow-y', '');
// //			this.el.css('overflow-y', '');
// //			this.el.style['overflow-y'] = '';
// 		}
// 	},




//	set name(v) { this._name = v; },


// 	set format(v) {
// 		if($.isString(v)) this.options.format = Ergo.format_obj.curry(v);
// 	},
// 	set unformat(v) {
// 		if($.isString(v)) this.options.unformat = Ergo.unformat_obj.curry(v);
// 	},

	//FIXME для совместимости
// 	set hidden(v) {
// 		this.vdom.outerEl.style.display = (v ? 'none' : '');//.css('display', v ? 'none' : '');
// //		this.el.css('display', v ? 'none' : '');
// 	},




	//TODO placeholder?



};





Ergo.WidgetAttributes = {
	attributes: ['id', 'tabindex']
};
