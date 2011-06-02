
//= require <core/widget>

/**
 * TextArea
 * 
 * @class
 * @name Dino.widgets.form.TextArea
 * @extends Dino.widgets.form.TextField
 */
Dino.declare('Dino.widgets.TextArea', 'Dino.widgets.TextInput', /** @lends Dino.widgets.form.TextArea.prototype */{
	
	defaults: {
		html: '<textarea></textarea>'
	}
	
}, 'text-area');
