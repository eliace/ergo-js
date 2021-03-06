
/**
 * Виджет для <label/>
 *
 * @class
 * @name Ergo.html.Label
 * @extends Ergo.core.Widget
 */
Ergo.defineClass('Ergo.html.A', {

	extends: 'Ergo.core.Widget',

	defaults: {
		tag: 'a'
	},

  attributes: ['id', 'tabindex', 'href'],

	props: {
		set: {
			'href': function(v) {
				this.dom.el.setAttribute('href', v);
			}
		}
	}

}, 'html:a');
