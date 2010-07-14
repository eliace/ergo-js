


Dino.declare('Dino.layouts.RowLayout', 'Dino.Layout', {
	
	defaultOptions: {
		containerCls: 'dino-row-layout'
	},
	
	insert: function(item) {
		var wrapperEl = $('<div></div>');
		wrapperEl.append(item.el);
		this.container.el.append( wrapperEl );
		
		if('itemCls' in this.options) item.el.addClass(this.options.itemCls);
	},
	
	remove: function(item) {
		item.el.parent().remove();
		if('itemCls' in this.options) item.el.removeClass(this.options.itemCls);
	},
	
	clear: function() {
		this.container.el.empty();
	}
	
	
	
	
}, 'row-layout');