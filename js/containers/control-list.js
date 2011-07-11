
//= require "list"
//= require <widgets/split>



Dino.declare('Dino.containers.ControlList', 'Dino.containers.List', {
	
	defaults: {
		cls: 'dino-control-list'
	}
	
//	$itemFactory: function(o) {
//		
//		if(o === '-')	o = {dtype: 'split'}
//		
//		return Dino.widgets.ControlList.superclass.$itemFactory.call(this, o);
//	}
	
	
}, 'control-list');



