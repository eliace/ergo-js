
//= require <core/container>
//= require <widgets/box>

/**
 * @class
 * @name Dino.containers.Box
 * @extends Dino.core.Container
 */
Dino.declare('Dino.containers.ListBox', 'Dino.core.Container', /** @lends Dino.containers.Box.prototype */ {
	
	defaults: {
		html: '<div/>',
		defaultItem: {
			dtype: 'box'
		}
	}
	
}, 'list-box');

