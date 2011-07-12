

Dino.declare('Dino.core.Chain', 'Dino.core.Object', {
	
	initialize: function() {
		Dino.core.Chain.superclass.initialize.apply(this, arguments);
		
		this.callbacks = [];
		this.used = false;
	},
	
	then: function(callback) {
		if(this.used)
			callback();
		else
			this.callbacks.push(callback);
	},
	
	
	done: function() {
		
		var callbacks = this.callbacks;
		
		var f = function() {
			if(callbacks.length == 0) return;
			
			var callback = callbacks.shift();
			
			
			
		};		
		
	}
	
});
