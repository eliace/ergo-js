



/**
 * Чекбокс
 *
 * :`html:checkbox`
 *
 * Опции:
 * 	`indeterminate`
 *
 * События
 * 	`action` пользователь изменил значение чекбокса
 *
 * @class
 * @name Ergo.html.Checkbox
 * @extends Ergo.core.Widget
 */
Ergo.defineClass('Ergo.html.Checkbox', 'Ergo.html.Input', /** @lends Ergo.html.Checkbox.prototype */{

	defaults: {
//		html: '<input type="checkbox"/>',
		type: 'checkbox',
		binding: function(v) {
			this.el.prop('checked', v);
		},
		onChange: function(e) {
			this.opt('value', e.value);//this.el.prop('checked'));
		}
// 		events: {
// 			'jquery:change': function(e) {
// 				this.opt('value', this.el.prop('checked'));
// //				w.events.fire('action');
// 			}
// 		}
	},


	set_indeterminate: function(v) {
		this.el.prop('indeterminate', v);
	},


	// _change: function() {
	// 	this.events.rise('change', {value: this.el.prop('checked')});
	// },

	do_change: function() {
		this.events.rise('change', {value: this.el.prop('checked')});
	}



}, 'html:checkbox');
