

/**
 * Радио
 *  
 * :`html:radio`
 * 
 * 
 * @class
 * @name Ergo.html.Radio
 * @extends Ergo.core.Widget
 */
Ergo.defineClass('Ergo.html.Radio', 'Ergo.html.Input', /** @lends Ergo.html.Radio.prototype */{
	
	defaults: {
		type: 'radio',
		binding: function(v) {
			this.el.prop('checked', v);
		},
		events: {
			'jquery:change': function(e) {
//				w.opt('value', w.el.prop('checked'));
				this.events.rise('change', {value: this.el.prop('checked')});
			}
		}
	}
	
}, 'html:radio');
