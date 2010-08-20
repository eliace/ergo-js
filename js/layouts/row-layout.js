


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



Dino.declare('Dino.layouts.ColumnLayout', 'Dino.layouts.RowLayout', {
	
	defaultOptions: {
		name: 'column'
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