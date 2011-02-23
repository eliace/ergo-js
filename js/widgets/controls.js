

Dino.declare('Dino.widgets.ControlBox', 'Dino.containers.Box', {
	
	defaultOptions: {
		cls: 'dino-control-box'
	}
	
	
}, 'control-box');



/**
 * @class
 * @extends Dino.Widget
 */
Dino.widgets.Split = Dino.declare('Dino.widgets.Split', 'Dino.Widget', /** @lends Dino.widgets.Split.prototype */{
	
	$html: function() { return '<div>&nbsp;</div>' },
	
	defaultOptions: {
		cls: 'dino-split'
	}	
	
}, 'split');

