
//= require <extensions/selectable>


/**
 * @class
 * @extends Ergo.containers.ListView
 */
Ergo.declare('Ergo.widgets.ListView', 'Ergo.widgets.Box', {
	
//	defaultCls: 'e-list-view',
	
	defaults: {
		cls: 'e-list-view',
		dynamic: true,
		extensions: ['selectable'],
		defaultItem: {
			etype: 'text-item',
			cls: 'e-list-item'
		}
	}	
	
}, 'list-view');



