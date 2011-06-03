

/**
 * @class
 * @extends Dino.core.Widget
 */
Dino.widgets.Split = Dino.declare('Dino.widgets.Split', 'Dino.widgets.Box', /** @lends Dino.widgets.Split.prototype */{
	
	$html: function() { return '<div>&nbsp;</div>' },
	
	defaults: {
		cls: 'dino-split'
	}	
	
}, 'split');

