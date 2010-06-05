

Dino.declare('Dino.layouts.PlainLayout', Dino.Layout, {
	
	insert: function(item) {
		this.container.el.append( item.el );
	},
	
	remove: function(item) {
		item.el.remove();
	},
	
	clear: function() {
		this.container.el.empty();
	}
	
}, 'plain-layout');