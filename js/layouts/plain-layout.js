

Dino.declare('Dino.layouts.PlainLayout', Dino.Layout, {
	
	insert: function(item) {
		this.container.el.append( item.el );
		if('itemCls' in this.options) item.el.addClass(this.options.itemCls);
	},
	
	remove: function(item) {
		item.el.remove();
		if('itemCls' in this.options) item.el.removeClass(this.options.itemCls);
	},
	
	clear: function() {
		this.container.el.empty();
	}
	
}, 'plain-layout');