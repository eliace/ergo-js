
//= require "object";


Dino.core.Deferred = Dino.core.Object.extend({
	
	initialize: function() {
		Dino.core.Deferred.superclass.initialize.apply(this, arguments);
		
		this.chain = [];
		this.ready = false;
	},
	
	
	
	done: function(callback) {
		this.chain.push(callback);
	},
	
	success: function(callback) {
		
	},
	
	fail: function(callback) {
		
	},
	
	run: function(result) {
		Dino.each(this.chain, function(t){
			t.call(this, result);
		})
		this.ready = true;
	}
	
	
});
