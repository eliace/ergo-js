
//= require "text"


/**
 * Цитата
 * 
 * Обертка для тега <blockquote/>
 * 
 * @class
 * @name Ergo.widgets.Quote
 * @extends Ergo.core.Widget
 */
Ergo.declare('Ergo.widgets.Quote', 'Ergo.widgets.Text', /** @lends Ergo.widgets.Quote.prototype */{

	defaults: {
		html: '<blockquote/>'
	}

}, 'quote');
