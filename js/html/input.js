

/**
 * Виджет для <input>
 *
 * etype: html:input
 *
 * опции:
 * 	- type
 * 	- placeholder
 * 	- disabled
 * 	- name
 * 	- readonly
 *
 * @class
 * @name Ergo.html.Input
 * @extends Ergo.core.Widget
 */
Ergo.defineClass('Ergo.html.Input', 'Ergo.core.Widget', {

	defaults: {
		html: '<input/>',
		binding: function(v) {
			this.el.val(v);
		},
		events: {
			'jquery:change': '_change'
		}
		// onChange: function(e) {
		// 	this.opt('value', this.el.val());
		// }
		// events: {
			// 'jquery:change': function() {
				// this.events.rise('change', {value: this.el.val()});
// //				this.opt('value', this.el.val());
			// }
		// }
	},

	attributes: ['id', 'tabindex', 'type', 'placeholder', 'disabled', 'readonly', 'size'],

	// set_type: function(v) {
	// 	this.el.attr('type', v);
	// },

	// set_placeholder: function(v) {
	// 	this.el.attr('placeholder', v);
	// },

	// set_disabled: function(v) {
	// 	(v) ? this.el.attr('disabled', '') : this.el.removeAttr('disabled');
	// },

	// перегружаем параметр name
	set_name: function(v) {
		this._name = v;
		this.el.attr('name', v);
	},


	set text(v) {
		this.el.val(v);
	},


	set hidden(v) {
		this.el.prop('hidden', true);
	},

	_change: function(e) {
		this.events.rise('change', {value: this.el.val()});
	}



	// set_readonly: function(v) {
	// 	this.el.attr('readonly', v);
	// }




	// get_value: function() {
		// return this.el.val();
	// },
//
	// set_value: function(v) {
		// this.el.val(v);
	// }



}, 'html:input');
