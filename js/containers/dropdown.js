



Dino.declare('Dino.containers.DropDownBox', 'Dino.containers.Box', {
	
	defaultOptions: {
		effects: {
			'show': 'none',
			'hide': 'none',
			'delay': 200
		}
	},
	
	defaultCls: 'dino-dropdown-box',
	
	_events: function(self){
		Dino.containers.DropDownBox.superclass._events.call(this, self);
		
//		this.el.mouseleave(function(){ self.hide(); });
	},
	
	
	show: function(x, y) {		
		this.el.css({'left': x, 'top': y});
//		$(this.options.target).append(this.el);
		
		var effects = this.options.effects;
		
		switch(effects['show']){
			case 'fade':
				this.el.fadeIn( effects.delay );
				break;
			default:
				this.el.show();
		}
		
		this.isShown = true;
	},
	
	hide: function(){
		
		var effects = this.options.effects;
		
		switch(effects['hide']){
			case 'fade':
				this.el.fadeOut( effects.delay );
				break;
			default:
				this.el.hide();
		}
		
		this.isShown = false;
//		this.el.remove();
//		$(this.options.target).remove(this.el);
	}
	
	
}, 'dropdown-box');