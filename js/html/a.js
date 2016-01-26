
/**
 * Виджет для <label/>
 *
 * @class
 * @name Ergo.html.Label
 * @extends Ergo.core.Widget
 */
Ergo.defineClass('Ergo.html.A', 'Ergo.core.Widget', {

	defaults: {
		tag: 'a'
	},

  attributes: ['id', 'tabindex', 'href'],

	set href(v) {
		this.vdom.el.setAttribute('href', v);
	}


}, 'html:a');
