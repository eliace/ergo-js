


/**
 * Ссылка
 *
 * :`link`
 *
 * Опции:
 * 	`href`
 *
 * @class
 * @name Ergo.widgets.Link
 * @extends Ergo.core.Widget
 */
Ergo.defineClass('Ergo.widgets.Link', 'Ergo.core.Widget', /** @lends Ergo.widgets.Link.prototype */{

	defaults: {
		as: 'link',
		tag: 'a',
		href: '#',
//		html: '<a href="#"/>',
		binding: 'text'
	},

	set href(v) {
		this.el.setAttribute('href', v);
	}

}, 'widgets:link');
