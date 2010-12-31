


/**
 * @class
 * @name Dino.containers.Box
 * @extends Dino.Container
 */
Dino.declare('Dino.containers.Box', 'Dino.Container', /** @lends Dino.containers.Box.prototype */ {
	
	defaultOptions: {
		defaultItem: {
			dtype: 'box'
		}
	},
	
	_html: function() { return '<div></div>'; }
	
}, 'box');