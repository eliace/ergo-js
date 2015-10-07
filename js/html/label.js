
/**
 * Виджет для <label/>
 *
 * @class
 * @name Ergo.html.Label
 * @extends Ergo.core.Widget
 */
Ergo.defineClass('Ergo.html.Label', 'Ergo.core.Widget', {

	defaults: {
		html: '<label/>'
	},


  set _for(v) {
    this.el.prop('for', v);
  }

}, 'html:label');
