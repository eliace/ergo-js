
//= require <containers/list>
//= require <extensions/selectable>


/**
 * @class
 * @extends Dino.containers.ListView
 */
Dino.declare('Dino.containers.ListView', 'Dino.containers.List', {
	
	defaultCls: 'dino-list-view',
	
	defaults: {
		dynamic: true,
		extensions: [Dino.Selectable],
		defaultItem: {
			dtype: 'text-item',
			cls: 'list-item'
		}
	}	
	
}, 'list-view');



