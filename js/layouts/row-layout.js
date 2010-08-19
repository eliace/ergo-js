


Dino.declare('Dino.layouts.RowLayout', 'Dino.Layout', {
	
	defaultOptions: {
//		containerCls: 'dino-row-layout'
	},

	insert: function(item) {
		
		if(!this.innerEl){
			this.innerEl = $('<div class="dino-row-layout"></div>');
			this.container.el.append(this.innerEl);
		}
		
		var wrapperEl = $('<div></div>');
		wrapperEl.append(item.el);
		this.innerEl.append( wrapperEl );
		
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