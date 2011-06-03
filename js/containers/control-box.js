
//= require "list-box"
//= require <widgets/split>



Dino.declare('Dino.widgets.ControlBox', 'Dino.containers.ListBox', {
	
	defaults: {
		cls: 'dino-control-box'
	},
	
	$itemFactory: function(o) {
		
		if(o === '-')	o = {dtype: 'split'}
		
		return Dino.widgets.ControlBox.superclass.$itemFactory.call(this, o);
	}
	
	
}, 'control-box');



