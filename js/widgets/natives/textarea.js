
//= require "input"

/**
 * Поле многострочного ввода текста
 * 
 * Обертка для тега <textarea/>
 * 
 * @class
 * @name Ergo.widgets.TextArea
 * @extends Ergo.widgets.TextInput
 */
Ergo.declare('Ergo.widgets.TextArea', 'Ergo.widgets.TextInput', /** @lends Ergo.widgets.TextArea.prototype */{
	
	defaults: {
		html: '<textarea></textarea>'
	}
	
}, 'text-area');
