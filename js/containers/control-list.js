
//= require "list"
//= require <widgets/split>



Ergo.declare('Ergo.containers.ControlList', 'Ergo.containers.List', {
	
	defaults: {
		cls: 'ergo-control-list'
	}
	
//	$itemFactory: function(o) {
//		
//		if(o === '-')	o = {etype: 'split'}
//		
//		return Ergo.widgets.ControlList.superclass.$itemFactory.call(this, o);
//	}
	
	
}, 'control-list');



