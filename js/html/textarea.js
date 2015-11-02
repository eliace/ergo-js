


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
Ergo.defineClass('Ergo.html.TextArea', 'Ergo.core.Widget', {

	defaults: {
		html: '<textarea/>',
		binding: function(v) {
			this.el.val(v);
		},
		events: {
			'jquery:change': 'do_change'
		}
	},

	attributes: ['id', 'tabindex', 'placeholder', 'disabled', 'readonly', 'rows'],


	// set_rows: function(v) {
	// 	this.el.attr('rows', v);
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


	do_change: function(e) {
		this.events.rise('change', {value: this.el.val()});
	}


}, 'html:textarea');
