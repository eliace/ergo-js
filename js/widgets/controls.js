

Dino.declare('Dino.widgets.ControlBar', 'Dino.containers.Box', {
	
	defaultOptions: {
		cls: 'dino-control-bar'
	}
	
	
}, 'control-bar');



/**
 * @class
 * @extends Dino.Widget
 */
Dino.widgets.Split = Dino.declare('Dino.widgets.Split', 'Dino.Widget', /** @lends Dino.widgets.Split.prototype */{
	
	_html: function() { return '<div>&nbsp;</div>' },
	
	defaultOptions: {
		cls: 'dino-split'
	}	
	
}, 'split');

