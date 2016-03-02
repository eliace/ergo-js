

/**
 * Виджет для <iframe>
 *
 * etype: html:iframe
 *
 * опции:
 * 	- src
 *
 * @class
 * @name Ergo.html.Iframe
 * @extends Ergo.core.Widget
 */
Ergo.defineClass('Ergo.html.Iframe', {

	extends: 'Ergo.core.Widget',

	defaults: {
		tag: 'iframe'
	},

	props: {
		set: {
			'src': function(v) {
				this.dom.el.setAttribute('src', v);
			}
		}
	}

}, 'html:iframe');
