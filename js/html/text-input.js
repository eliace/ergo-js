



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
		events: {
			'jquery:keyup': function(e) {
				this.events.rise('keyUp', {text: this.el.val()}, e);
			},
			'jquery:keydown': function(e) {
				this.events.rise('keyDown', {text: this.el.val()}, e);
			}
		},

		onChange: function(e) {
			this.opt('value', e.value);
		},

		onKeyUp: function(e) {

			var keyCode = e.base.keyCode;

			if(keyCode == Ergo.KeyCode.ESC
				|| keyCode == Ergo.KeyCode.DOWN
				|| keyCode == Ergo.KeyCode.ENTER
				|| keyCode == Ergo.KeyCode.ESC) {
				// TODO обработка служебных символов
			}
			else {
				this.events.rise('input', {text: e.text, keyCode: keyCode});
			}
		}


		// events: {
		// 	'jquery:change': function() {
		// 		this.opt('value', this.el.val());
		// 	}
		// }
	},


}, 'html:text-input');
