


Dino.declare('Dino.Layout', Dino.BaseObject, {
	
	initialize: function(o){
		Dino.Layout.superclass.initialize.call(this);
		
		this.options = Dino.merge_r({}, this.defaultOptions, o);
		
	},
	
	attach: function(c) { 
		this.container = c; 
		if('containerCls' in this.options) this.container.el.addClass(this.options.containerCls);

		var self = this;
		if(this.options.updatePolicy == 'resize')
			$(window).bind('resize', function(){ self.update(); });
		if(this.options.updatePolicy == 'added')
			this.container.events.reg('onAdded', function(){ 
				self.update(); 
			});
		
	},
	detach: function() { 
		if('containerCls' in this.options) this.container.el.removeClass(this.options.containerCls);
		delete this.container; 
	},
	
//	add: function(item) {},
	insert: function(item, i) {},
	remove: function(item) {},
	update: function() {},
	clear: function() {}
	
});

