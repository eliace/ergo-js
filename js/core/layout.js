
//= require "collection"


Dino.declare('Dino.core.Layout', 'Dino.core.Object', {
	
	initialize: function() {
		Dino.core.Layout.superclass.initialize.apply(this, arguments);
		
		this.items = new Dino.core.Array();
	},
	
	
	add: function(w, i) {
		this.items.add(w, i);
	},
	
	print: function() {
		var s = '';
		this.items.each(function(item){
			s += item.layout.print();
		});
		return s;
	}
	
	
	
	
});
