
/**
 * Виджет для <label/>
 *
 * @class
 * @name Ergo.html.Label
 * @extends Ergo.core.Widget
 */
Ergo.defineClass('Ergo.html.Label', {

	extends: 'Ergo.core.Widget',

	defaults: {
		tag: 'label'
	},

	props: {
		set: {
			_for: function(v) {
		    this.dom.el.setAttribute('for', v);
		  }
		}
	}



}, 'html:label');
