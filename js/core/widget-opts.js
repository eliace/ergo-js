

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


	get text() {
		if(!this.__c)
			return this.el.textContent;
		else if(this.children.size() == 0)
			return this.layout.el.textContent;
		else if(this.$content)
			return this.$content.opt('text');
		else
 			return this.layout.el.textContent;
	},
//	getText: function() {	return this.layout.el.text();	},
	get width() {	return this.el.outerWidth();	},
	get height() { return this.el.outerHeight();	},
	get name() { return this._name || this._key || this._index; },





	set text(v) {
		if(!this.__c)
			this.el.textContent = ( v == null ? '': v );
		else if(this.children.size() == 0)
//			this.layout.el.text( v == null ? '': v );
			this.layout.el.textContent = ( v == null ? '': v );
		else if(this.$content)
			this.$content.opt('text', v == null ? '': v);
		else
//			this.layout.el.text( v == null ? '': v );
 			this.layout.el.textContent = ( v == null ? '': v );

	},
	// set_innerText: function(v) {	this.layout.el.text(v); },
	set innerHtml(v) {	this.layout.el.html(v); },
	// set_opacity: function(v) {
	// 	if($.support.opacity)
	// 		this.el.css('opacity', v);
	// 	else {
	// 		this.el.css('filter', 'Alpha(opacity:' + (v*100.0) + ')');
	// 		this.el.css('-ms-filter', 'progid:DXImageTransform.Microsoft.Alpha(Opacity=' + (v*100.0).toFixed() + ')');
	// 	}
	// },
	set width(v) { this.el.outerWidth(v); },
	set height(v) { this.el.outerHeight(v); },
	set autoWidth(v) { v ? this.el.setAttribut('autoWidth', v) : this.el.removeAttribute('autoWidth'); },
	set autoHeight(v) {
		if(v) {
			this.el.setAttribute('autoHeight', v);
			if(v === true || v == 'ignore-siblings')
				this.el.css('overflow-y', 'auto');
		}
		else {
			this.el.removeAttribute('autoHeight');
			this.el.css('overflow-y', '');
		}
	},
	set tooltip(v) { this.el.attr('title', v); },
//	set_id: function(v) { this.el.attr('id', v); },
//	set_tag: function(v) { this.tag = v; },
	set name(v) { this._name = v; },
//			'name': function(v) { this.name = v; },
//	set_tabindex: function(v) { this.el.attr('tabindex', v); },
	set format(v) {
		if($.isString(v)) this.options.format = Ergo.format_obj.curry(v);
	},
	set unformat(v) {
		if($.isString(v)) this.options.unformat = Ergo.unformat_obj.curry(v);
	},
	set hidden(v) {
		(this._wrapper_el || this.el).css('display', v ? 'none' : '');
//		this.el.css('display', v ? 'none' : '');
	},
	// setLead: function(v) { this.layout.el.prepend(v); },
	// setTrail: function(v) { this.layout.el.append(v); }

	//TODO placeholder?


	set id(v) {
		this.el.setAttribute('id', v);
	},

	set tabindex(v) {
		this.el.setAttribute('tabindex', v);
	}


};





Ergo.WidgetAttributes = {
	attributes: ['id', 'tabindex']
};
