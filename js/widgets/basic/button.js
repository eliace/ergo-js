

/**
 * Кнопка
 *
 * :`button`
 *
 * Состояния:
 * 	`type` [default, primary, success, info, warning, danger, tool]
 * 	`size` [large, small, tiny]
 * 	`disabled`
 *
 * @class
 * @name Ergo.widgets.Button
 * @extends Ergo.core.Widget
 */
Ergo.defineClass('Ergo.widgets.Button', 'Ergo.core.Widget', /** @lends Ergo.widgets.Button.prototype */{

	defaults: {
		tag: 'button',
		as: 'button',
//		type: 'default',
		states: {
			'default:type': 'default',
			'primary:type': 'primary',
			'success:type': 'success',
			'info:type': 'info',
			'warning:type': 'warning',
			'danger:type': 'danger',
			'tool:type': 'tool',

			'small:size': 'small',
			'large:size': 'large',
			'tiny:size': 'tiny',

			'outline': 'outline',
			'flat': 'flat',
			'line': 'line',

			'block': 'block',
			'round': 'round',

			'disabled': function(on) { on ? this.vdom.el.setAttribute('disabled', '') : this.vdom.el.removeAttribute('disabled'); return false; }
		}
	}


	// _construct: function(o) {
	// 	Ergo.widgets.Button.superclass._construct.call(this, o);

	// 	var self = this;

	// 	if(o.action) {
	// 		this.el.on('click', function(e) {
	// 			self.events.rise(o.action, null, e);
	// 		});
	// 	}

	// }


}, 'widgets:button');
