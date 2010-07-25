


Dino.declare('Dino.Layout', Dino.BaseObject, {
	
	initialize: function(o){
		Dino.Layout.superclass.initialize.call(this);
		
		this.options = Dino.merge_r({}, this.defaultOptions, o);
	},
	
	attach: function(c) { 
		this.container = c; 
		if('containerCls' in this.options) this.container.el.addClass(this.options.containerCls);
	},
	detach: function() { 
		if('containerCls' in this.options) this.container.el.removeClass(this.options.containerCls);
		delete this.container; 
	},
	
//	add: function(item) {},
	insert: function(item, i) {},
	remove: function(item) {},
//	update: function() {},
	clear: function() {}
	
});

