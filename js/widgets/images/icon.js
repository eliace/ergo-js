

//= require <core/widget>

/**
 * @class
 * @extends Dino.core.Widget
 */
Dino.widgets.Icon = Dino.declare('Dino.widgets.Icon', 'Dino.core.Widget', /** @lends Dino.widgets.Icon.prototype */{
	
	defaultCls: 'dino-icon',
	
	$html: function() { return '<div/>'; }
	
	
}, 'icon');

