
//= require <core/layout>


Ergo.declare('Ergo.layouts.Float', 'Ergo.core.Layout', {
	
	defaults: {
		name: 'float'
	},
	

	insert: function(item) {
		this.$super.apply(this, arguments);
		
		if(item.options.region) item.el.addClass(item.options.region);
		
	}
	
	
	
}, 'layouts:float');