
/**
 * Виджет для <label/>
 *
 * @class
 * @name Ergo.html.Label
 * @extends Ergo.core.Widget
 */
Ergo.defineClass('Ergo.html.A', null, {

	extends: 'Ergo.core.Widget',

	defaults: {
		tag: 'a'
	},

  attributes: ['id', 'tabindex', 'href'],

	props: {
		set: {
			'href': function(v) {
				this.vdom.el.setAttribute('href', v);
			}
		}
	}

}, 'html:a');
