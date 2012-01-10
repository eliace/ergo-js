
//= require <extensions/selectable>


/**
 * Список
 * 
 * @class
 * @name Ergo.widgets.ListBox
 * @extends Ergo.widgets.Box
 */
Ergo.declare('Ergo.widgets.ListBox', 'Ergo.widgets.Box', {
	
	defaults: {
		baseCls: 'e-list-box',
		dynamic: true,
		extensions: ['selectable'],
		defaultItem: {
			etype: 'text-item',
			cls: 'e-list-item'
		}
	}	
	
}, 'list-box');



