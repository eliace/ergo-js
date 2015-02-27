


/**
 * Текст
 *
 * Обертка для тега <span/>
 * 
 * @class
 * @name Ergo.widgets.Text
 * @extends Ergo.core.Widget
 */
Ergo.declare('Ergo.widgets.Text', 'Ergo.core.Widget', /** @lends Ergo.widgets.Text.prototype */{
	
	defaults: {
		html: '<span/>',
		set: {
			'text': function(v) {
				(v) ? this.el.text(v) : this.el.html('&nbsp;');
			}
		},
		binding: function(v) {
//			if(!this.options.text)
			this.opt('text', v);
		}
	}
	
}, 'text');
