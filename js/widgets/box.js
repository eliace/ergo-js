
//= require <core/widget>


/**
 * Бокс
 * 
 * Обертка для тега <div/>
 * 
 * @class
 * @name Ergo.widgets.Box
 * @extends Ergo.core.Widget
 */
Ergo.declare('Ergo.widgets.Box', 'Ergo.core.Widget', {
	
	defaults: {
		html: '<div/>',
		defaultItem: {
			etype: 'box'
		}
	}
	
}, 'box');
