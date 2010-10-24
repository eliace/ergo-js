

Dino.declare('Dino.layouts.PlainLayout', Dino.Layout, {
	
//	initialize: function(){
//		Dino.layouts.PlainLayout.superclass.initialize.apply(this, arguments);
//		
//		this.deferred = [];
//	},	
	
	insert: function(item) {
//		if(this.options.deferred)
//			this.deferred.push(item);
//		else
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
	
//	update: function(){
//		while(this.deferred.length > 0) {
//			this.container.el.append( this.deferred.pop().el );
//		}
//	}

}, 'plain-layout');