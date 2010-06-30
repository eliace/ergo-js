



Dino.declare('Dino.containers.DropDown', 'Dino.containers.Box', {
	
	defaultOptions: {
		effects: {
			'show': 'none',
			'hide': 'none',
			'delay': 200
		}
	},
	
	defaultCls: 'dino-dropdown',
	
	_events: function(self){
		Dino.containers.DropDown.superclass._events.call(this, self);
		
//		this.el.mouseleave(function(){ self.hide(); });
	},
	
	
	show: function(x, y) {		
		this.el.css({'left': x, 'top': y});
//		$(this.options.target).append(this.el);
		
		var effect = this.options.effect;
		
		switch(effect['show']){
			case 'fade':
				this.el.fadeIn( effect.delay );
			default:
				this.el.show();
		}
		
		this.isShown = true;
	},
	
	hide: function(){
		
		var effect = this.options.effect;
		
		switch(effect['hide']){
			case 'fade':
				this.el.fadeOut( effect.delay );
			default:
				this.el.hide();
		}
		
		this.isShown = false;
//		this.el.remove();
//		$(this.options.target).remove(this.el);
	}
	
	
}, 'dropdown');