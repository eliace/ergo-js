

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
Ergo.defineClass('Ergo.html.Input', {

	extends: 'Ergo.core.Widget',

	defaults: {
		tag: 'input',
		binding: function(v) {
			this.el.val(v);
//			this.dom.el.value = v;
		},
		events: {
			'jquery:change': 'change',
//			'jquery:input': 'input'
			// 'dom:input': function(e) {
			// 	this.prop('value', this.dom.el.value);
			// }
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

//	attributes: ['id', 'tabindex', 'type', 'placeholder', 'disabled', 'readonly', 'size'],


	props: {
		set: {

			text: function(v) {
				this.el.val(v);
			},

			hidden: function(v) {
				this.el.prop('hidden', true);
			},

			type: function(v) {
				this.dom.el.setAttribute('type', v);
			},

			placeholder: function(v) {
				this.dom.el.setAttribute('placeholder', v);
			}

		},
		get: {

			text: function() {
				return this.el.val();
			}

		}
	},

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
	set name(v) {
		this._name = v;
		this.dom.el.setAttribute('name', v);
	},


	// set text(v) {
	// 	this.el.val(v);
	// },


	// set hidden(v) {
	// 	this.el.prop('hidden', true);
	// },
	//
	// set type(v) {
	// 	this.dom.el.setAttribute('type', v);
	// },
	//
	// set placeholder(v) {
	// 	this.dom.el.setAttribute('placeholder', v);
	// },

	// _change: function(e) {
	// 	this.events.rise('change', {value: this.el.val()});
	// },

	change: function(e) {
		this.prop('value', this.dom.el.value);
		this.rise('change', this.dom.el.value);
	},

	input: function(e) {
		this.prop('value', this.dom.el.value);
		this.emit('input', this.dom.el.value);//this.el.val());//this.prop('val'));
	},


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
