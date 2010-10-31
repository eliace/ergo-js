


Dino.declare('Dino.layouts.RowLayout', 'Dino.Layout', {
	
	defaultOptions: {
		name: 'row'
	},

	insert: function(item) {
		
//		if(!this.innerEl){
//			this.innerEl = $('<div layout="row"></div>');
//			this.container.el.append(this.innerEl);
//		}
		
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



Dino.declare('Dino.layouts.ColumnLayout', 'Dino.Layout', {
	
	defaultOptions: {
		name: 'column'
	},
	
	attach: function() {
		Dino.layouts.ColumnLayout.superclass.attach.apply(this, arguments);
		
		this.el = $('<div></div>');
		
		this.container.el.append(this.el);
	},
	
	detach: function() {
		Dino.layouts.ColumnLayout.superclass.detach.apply(this, arguments);
		this.el.remove();
	},
	
	insert: function(item, key) {
		this.el.append( item.el );		
	},
	
	remove: function(item) {
		item.el.remove();
	},
	
	clear: function() {
		this.el.empty();
	}
	
/*
	insert: function(item) {
		
//		if(!this.innerEl){
//			this.innerEl = $('<div layout="row"></div>');
//			this.container.el.append(this.innerEl);
//		}
		
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
*/	
	
	
}, 'column-layout'); 