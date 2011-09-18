
//= require <extensions/selectable>


/**
 * @class
 * @extends Ergo.containers.ListView
 */
Ergo.declare('Ergo.widgets.ListView', 'Ergo.widgets.Box', {
	
	defaultCls: 'ergo-list-view',
	
	defaults: {
		dynamic: true,
		extensions: ['selectable'],
		defaultItem: {
			etype: 'text-item',
			cls: 'list-item'
		}
	}	
	
}, 'list-view');



