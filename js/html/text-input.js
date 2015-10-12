



/**
 * Виджет для <input type="text">
 *
 * etype: html:text-input
 *
 * опции:
 *
 * @class
 * @name Ergo.html.TextInput
 * @extends Ergo.core.Widget
 */
Ergo.defineClass('Ergo.html.TextInput', 'Ergo.html.Input', {

	defaults: {
		type: 'text',
		// binding: function(v) {
		// 	this.el.val(v);
		// },
		// events: {
		// 	'jquery:keydown': 'action:input'
		// },
		onChange: function(e) {
			this.opt('value', e.value);//this.el.val());
		}
		// events: {
		// 	'jquery:change': function() {
		// 		this.opt('value', this.el.val());
		// 	}
		// }
	},


}, 'html:text-input');
