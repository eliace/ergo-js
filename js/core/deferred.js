
//= require "object";


Dino.core.Deferred = Dino.core.Object.extend({
	
	initialize: function() {
		Dino.core.Deferred.superclass.initialize.apply(this, arguments);
		
		this.callbacks = [];
		this.used = false;
	},
	
	
	
//	done: function(callback) {
//		this.chain.push(callback);
//	},
	
	success: function(callback) {
		this.callbacks.push({'type': 'success', 'callback': callback});
	},
	
	fail: function(callback) {
		this.callbacks.push({'type': 'fail', 'callback': callback});
	},
	
	then: function(callback) {
		this.callbacks.push({'type': null, 'callback': callback});
	},
	
//	run: function(result) {
//		while(this.chain.length > 0) {
//			this.chain.pop().call(this, result);
//		}		
////		Dino.each(this.chain, function(t){
////			t.call(this, result);
////		})
//		this.used = true;
//	},
	
	
	done: function(data, type) {
		var self = this;
		Dino.each(this.callbacks, function(t){
			if(t.type == type) t.callback.call(self, data);
		});
		
		if(type) {
			Dino.each(this.callbacks, function(t){
				if(!t.type) t.callback.call(self, data);
			});			
		}
		
		this.used = true;
	}
	
	
});
