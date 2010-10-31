


Dino.declare('Dino.Layout', Dino.BaseObject, {
	
	defaultOptions: {
		updateMode: 'auto'	
	},
	
	initialize: function(o){
		Dino.Layout.superclass.initialize.call(this);
		
		this.options = Dino.utils.overrideOpts({}, this.defaultOptions, o);
		
		this.attach(this.options.container);
	},
	
	attach: function(c) { 
		
		var o = this.options;
		
		this.container = c; 
		if('name' in o) this.container.el.attr('layout', o.name);

	},
	detach: function() { 
//		if('containerCls' in this.options) this.container.el.removeClass(this.options.containerCls);
		if('name' in this.options) this.container.el.attr('layout', undefined);
		delete this.container; 
	},
	
//	add: function(item) {},
	insert: function(item, i) {},
	remove: function(item) {},
	update: function() {},
	clear: function() {}
	
});

