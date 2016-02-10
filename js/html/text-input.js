



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
Ergo.defineClass('Ergo.html.TextInput', {

	extends: 'Ergo.html.Input',

	defaults: {
		type: 'text',
		// binding: function(v) {
		// 	this.el.val(v);
		// },
		events: {
			// jquery
			'jquery:keyup': function(e) {
				this.rise('keyUp', {text: this.el.val()}, e);
			},
			'jquery:keydown': function(e) {
				this.rise('keyDown', {text: this.el.val()}, e);
			},
			// widget
			'change': function(e) {
				this.prop('value', e.value);
			},
			'keyUp': function(e) {
				var keyCode = e.base.keyCode;

				if(keyCode == Ergo.KeyCode.ESC
					|| keyCode == Ergo.KeyCode.DOWN
					|| keyCode == Ergo.KeyCode.ENTER
					|| keyCode == Ergo.KeyCode.ESC) {
					// TODO обработка служебных символов
				}
				else {
					this.rise('input', {text: e.text, keyCode: keyCode});
				}

			}
		}

		// onChange: function(e) {
		// 	this.opt('value', e.value);
		// },
		//
		// onKeyUp: function(e) {
		//
		// }

		// events: {
		// 	'jquery:change': function() {
		// 		this.opt('value', this.el.val());
		// 	}
		// }
	}


}, 'html:text-input');
