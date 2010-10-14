



Dino.declare('Dino.containers.DropDownBox', 'Dino.containers.Box', {
	
	defaultOptions: {
		effects: {
			'show': 'none',
			'hide': 'none',
			'delay': 200
		},
		baseCls: 'dino-dropdown-box',
		offset: [0, 0]
	},
	
//	defaultCls: ,
	
//	_events: function(self){
//		Dino.containers.DropDownBox.superclass._events.call(this, self);
//		
//		this.el.mouseleave(function(){ self.hide(); });
//	},
	
	
	show: function(x, y, eff) {
		
		if(arguments.length == 0) return;
		
		var offset = this.options.offset;
		
		this.el.css({'left': x + offset[0], 'top': y + offset[1]});
//		$(this.options.target).append(this.el);
				
		var effects = this.options.effects;
		
		switch(eff || effects['show']){
			case 'fade':
				this.el.fadeIn( effects.delay );
				break;
			default:
				this.el.show();
		}
		
		this.isShown = true;
	},
	
	hide: function(eff){
		
		var effects = this.options.effects;
		
		switch(eff || effects['hide']){
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