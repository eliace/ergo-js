


Dino.declare('Dino.Layout', Dino.BaseObject, {
	
	initialize: function(o){
		Dino.Layout.superclass.initialize.call(this);
		
		this.options = o || {};
	},
	
//	add: function(item) {},
	insert: function(item) {},
	remove: function(item) {},
//	update: function() {},
	clear: function() {}
	
});

