



Dino.declare('Dino.widgets.GrowlBox', 'Dino.containers.Box', {
	
	defaultCls: 'dino-growl-box',
	
	defaultOptions: {
		delay: 500
	},
	
	_events: function(self){
		Dino.widgets.GrowlBox.superclass._events.apply(this, arguments);
		
		this.el.click(function(){ 
			self.hide();
		});
	},
	
	
	show: function(html){
		this.el.html(html);
		this.el.fadeIn(this.options.delay);
		
		var self = this;
		if('timeout' in this.options)
			setTimeout(function(){ self.hide(); }, this.options.timeout);		
	},
	
	hide: function(){
		this.el.fadeOut(this.options.delay);
	}
	
	
}, 'growl-box');