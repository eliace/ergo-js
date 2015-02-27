
//= require "text"


/**
 * Метка
 * 
 * Обертка для тега <p/>
 * 
 * @class
 * @name Ergo.widgets.Paragraph
 * @extends Ergo.core.Widget
 */
Ergo.declare('Ergo.widgets.Paragraph', 'Ergo.widgets.Text', /** @lends Ergo.widgets.Paragraph.prototype */{

	defaults: {
		html: '<p/>'
	}

}, 'para');
