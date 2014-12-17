
//= require "text"


/**
 * Время
 * 
 * Обертка для тега <time/>
 * 
 * @class
 * @name Ergo.widgets.Quote
 * @extends Ergo.core.Widget
 */
Ergo.declare('Ergo.widgets.html5.Time', 'Ergo.widgets.Text', /** @lends Ergo.widgets.Quote.prototype */{

	defaults: {
		html: '<time/>'
	}

}, 'time');
