
//= require <core/container>
//= require <widgets/box>

/**
 * @class
 * @name Ergo.containers.List
 * @extends Ergo.core.Container
 */
Ergo.declare('Ergo.containers.List', 'Ergo.core.Container', /** @lends Ergo.containers.List.prototype */ {
	
	defaults: {
		html: '<div/>',
		defaultItem: {
			etype: 'box'
		}
	}
	
}, 'list');

