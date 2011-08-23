
//= require <core/widget>

/**
 * TextArea
 * 
 * @class
 * @name Ergo.widgets.form.TextArea
 * @extends Ergo.widgets.form.TextField
 */
Ergo.declare('Ergo.widgets.TextArea', 'Ergo.widgets.TextInput', /** @lends Ergo.widgets.form.TextArea.prototype */{
	
	defaults: {
		html: '<textarea></textarea>'
	}
	
}, 'textarea');
