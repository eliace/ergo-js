
//= require <core/container>
//= require <widgets/box>

/**
 * @class
 * @name Dino.containers.List
 * @extends Dino.core.Container
 */
Dino.declare('Dino.containers.List', 'Dino.core.Container', /** @lends Dino.containers.List.prototype */ {
	
	defaults: {
		html: '<div/>',
		defaultItem: {
			dtype: 'box'
		}
	}
	
}, 'list');

