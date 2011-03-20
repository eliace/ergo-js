


/**
 * @class
 * @extends Dino.containers.Box
 */
Dino.containers.DropDownBox = Dino.declare('Dino.containers.DropDownBox', 'Dino.containers.Box', /** @lends Dino.containers.DropDownBox.prototype */ {
	
	defaultOptions: {
		effects: {
			'show': 'none',
			'hide': 'none',
			'delay': 200
		},
		baseCls: 'dino-dropdown-box',
		offset: [0, 0],
		hideOn: 'outerClick'
	},
	
	
	$init: function() {
		Dino.containers.DropDownBox.superclass.$init.apply(this, arguments);
		  
		var self = this;
		// создаем прозрачную панель для перехвата событий
    this.glass_panel = $('<div class="glass-panel"></div>');
    this.glass_panel.bind('click', function(){
      self.hide();
    });
		
		this.el.bind('mouseleave', function(){ 
			if(self.options.hideOn == 'hoverOut') self.hide(); 
		});
		
	},
	
	
	show: function(x, y) {
		
		if(arguments.length == 0) return;
		
		var offset = this.options.offset;
		
		this.el.css({'left': x + offset[0], 'top': y + offset[1]});
//		$(this.options.target).append(this.el);
				
		var eff = this.options.effects;
		
		switch(eff['show']){
			case 'fade':
				this.el.fadeIn( eff.delay );
				break;
			default:
				this.el.show();
		}
		
		this.isShown = true;

		if (this.options.hideOn == 'outerClick') {
						
			// добавляем прозрачную панель в документ
			$('body').append(this.glass_panel);
		}
		
		this.events.fire('onShow');
	},
	
	hide: function(eff){
		
		if(this.options.hideOn == 'outerClick') {
			// удаляем прозрачную панель
	    this.glass_panel.detach();
		}
		
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