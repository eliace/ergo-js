
//= require <core/container>

/**
 * @class
 * @name Dino.containers.Box
 * @extends Dino.core.Container
 */
Dino.declare('Dino.containers.Box', 'Dino.core.Container', /** @lends Dino.containers.Box.prototype */ {
	
	defaults: {
		defaultItem: {
			dtype: 'box'
		}
	},
	
	$html: function() { return '<div></div>'; }
	
}, 'box');

