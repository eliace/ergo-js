
//= require "object";


Dino.core.Deferred = Dino.core.Object.extend({
	
	initialize: function() {
		Dino.core.Deferred.superclass.initialize.apply(this, arguments);
		
		this.chain = [];
		this.used = false;
	},
	
	
	
	done: function(callback) {
		this.chain.push(callback);
	},
	
	success: function(callback) {
		
	},
	
	fail: function(callback) {
		
	},
	
	then: function(callback) {
		this.chain.push(callback);
	},
	
	run: function(result) {
		while(this.chain.length > 0) {
			this.chain.pop().call(this, result);
		}		
//		Dino.each(this.chain, function(t){
//			t.call(this, result);
//		})
		this.used = true;
	}
	
	
});
