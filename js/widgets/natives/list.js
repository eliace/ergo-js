
//= require <core/widget>


/**
 * Список
 * 
 * Обертка для тега <ul/>
 * 
 * @class
 * @name Ergo.widgets.List
 * @extends Ergo.core.Widget
 */
Ergo.declare('Ergo.widgets.List', 'Ergo.core.Widget', /** @lends Ergo.widgets.List.prototype */{
	
	defaults: {
		html: '<ul/>',
		defaultItem: {
			etype: 'widget',
			html: '<li/>'
		}
	}
	
}, 'list');
