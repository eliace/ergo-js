

//= require <core/widget>

/**
 * @class
 * @extends Ergo.core.Widget
 */
Ergo.widgets.Icon = Ergo.declare('Ergo.widgets.Icon', 'Ergo.core.Widget', /** @lends Ergo.widgets.Icon.prototype */{
	
	defaultCls: 'dino-icon',
	
	$html: function() { return '<div/>'; }
	
	
}, 'icon');

