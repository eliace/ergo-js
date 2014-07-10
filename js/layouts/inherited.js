//= require <core/layout>

Ergo.declare('Ergo.layouts.Inherited', 'Ergo.core.Layout', {
	
	// select: function(item) {
		// return this.container.parent.el;
	// }
	
	add: function(item, index, weight) {
		
		this.container.parent.layout.add(item, index, weight);
		
	}
	
	
}, 'layouts:inherited');
