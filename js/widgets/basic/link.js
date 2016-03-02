


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
Ergo.defineClass('Ergo.widgets.Link', /** @lends Ergo.widgets.Link.prototype */{

	extends: 'Ergo.core.Widget',

	defaults: {
		as: 'link',
		tag: 'a',
		href: '#',
//		html: '<a href="#"/>',
		binding: 'prop:text'
	},

	set href(v) {
		this.dom.el.setAttribute('href', v);
	}

}, 'widgets:link');
