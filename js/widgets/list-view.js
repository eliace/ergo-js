
//= require <containers/list>
//= require <extensions/selectable>


/**
 * @class
 * @extends Ergo.containers.ListView
 */
Ergo.declare('Ergo.containers.ListView', 'Ergo.containers.List', {
	
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



