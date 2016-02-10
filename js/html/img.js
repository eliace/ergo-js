

/**
 * Виджет для <img>
 *
 * etype: html:img
 *
 * опции:
 * 	- src
 *
 * @class
 * @name Ergo.html.Img
 * @extends Ergo.core.Widget
 */
Ergo.defineClass('Ergo.html.Img', {

	extends: 'Ergo.core.Widget',

	defaults: {
		tag: 'img'
	},

	attributes: ['id', 'tabindex', 'src'],

	props: {
		set: {
			src: function(v) {
				this.vdom.el.setAttribute('src', v);
			}
		}
	}



}, 'html:img');
