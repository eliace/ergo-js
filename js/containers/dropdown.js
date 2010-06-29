



Dino.declare('Dino.containers.DropDown', 'Dino.containers.Box', {
	
	defaultOptions: {
		delay: 200
	},
	
	defaultCls: 'dino-dropdown',
	
	_events: function(self){
		Dino.containers.DropDown.superclass._events.call(this, self);
		
		this.el.mouseleave(function(){ self.hide(); });
	},
	
	
	show: function(x, y) {		
		this.el.css({'left': x, 'top': y});
//		$(this.options.target).append(this.el);
		this.el.fadeIn(this.options.delay);
		this.isShown = true;
	},
	
	hide: function(){
		this.el.fadeOut(this.options.delay);
		this.isShown = false;
//		this.el.remove();
//		$(this.options.target).remove(this.el);
	}
	
	
}, 'dropdown');