
//= require "box"

Dino.declare('Dino.widgets.ControlBox', 'Dino.containers.Box', {
	
	defaultOptions: {
		cls: 'dino-control-box'
	},
	
	$itemFactory: function(o) {
		
		if(o === '-')	o = {dtype: 'split'}
		
		return Dino.widgets.ControlBox.superclass.$itemFactory.call(this, o);
	}
	
	
}, 'control-box');



/**
 * @class
 * @extends Dino.core.Widget
 */
Dino.widgets.Split = Dino.declare('Dino.widgets.Split', 'Dino.core.Widget', /** @lends Dino.widgets.Split.prototype */{
	
	$html: function() { return '<div>&nbsp;</div>' },
	
	defaultOptions: {
		cls: 'dino-split'
	}	
	
}, 'split');

