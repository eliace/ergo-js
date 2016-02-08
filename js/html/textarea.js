


/**
 * Виджет для <textarea>
 *
 * etype: html:Textarea
 *
 * опции:
 * 	- rows
 *
 * @class
 * @name Ergo.html.Textarea
 * @extends Ergo.core.Widget
 */
Ergo.defineClass('Ergo.html.TextArea', null, {

	extends: 'Ergo.core.Widget',

	defaults: {
		tag: 'textarea',
		binding: function(v) {
			this.el.val(v);
		},
		events: {
			'jquery:change': 'do_change'
		}
	},

	attributes: ['id', 'tabindex', 'placeholder', 'disabled', 'readonly', 'rows'],


	props: {
		set: {
			text: function(v) {
				this.el.val(v);
			},

			hidden: function(v) {
				this.el.prop('hidden', v);
			}

		},
		get: {
			text: function() {
				return this.el.val();
			}
		}
	},


	// set_rows: function(v) {
	// 	this.el.attr('rows', v);
	// },

	// перегружаем параметр name
	set name(v) {
		this._name = v;
		this.vdom.el.setAttribute('name', v);
	},



	do_change: function(e) {
		this.rise('change', {value: this.prop('text')});
	}


}, 'html:textarea');
