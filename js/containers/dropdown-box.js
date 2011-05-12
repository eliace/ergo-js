
//= require "box"
//= require "glass-box"

/**
 * @class
 * @extends Dino.containers.Box
 */
Dino.containers.DropdownBox = Dino.declare('Dino.containers.DropdownBox', 'Dino.containers.Box', /** @lends Dino.containers.DropdownBox.prototype */ {
	
	defaultOptions: {
		html: '<div autoheight="ignore"></div>',
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
		Dino.containers.DropdownBox.superclass.$init.apply(this, arguments);
		  
		var self = this;
		
		this.glass_box = $.dino({
			dtype: 'glass-box',
			events: {
				'click': function(e) {
		      self.hide();
					e.stopPropagation();					
				}
			}						
		});//(o.glassBox instanceof Dino.Widget) ? o.glassBox : $.dino(o.glassBox);
		
//		// создаем прозрачную панель для перехвата событий
//    this.glass_panel =  $('<div class="dino-glass-pane"></div>');
//    this.glass_panel.bind('click', function(e){
//      self.hide();
//			e.stopPropagation();
//    });
		
		this.el.bind('mouseleave', function(){ 
			if(self.options.hideOn == 'hoverOut') self.hide(); 
		});

		this.el.bind('click', function(e){ 
			 e.stopPropagation();
			 e.preventDefault();
		});
		
	},
	
	show: function(x, y, target) {
		
		if(arguments.length == 0) return;
		
		var offset = this.options.offset;
		
		this.el.css({'left': x + offset[0], 'top': y + offset[1]});
				
		if(target) {
			this.renderTarget = $(target);
			this.renderTarget.append(this.el);
		}
				
		var eff = this.options.effects;
		
		switch(eff['show']){
			case 'fade':
				this.el.fadeIn( eff.delay );
				break;
			case 'slideDown':
				this.el.slideDown( eff.delay );
				break;
			default:
				this.el.show();
		}
		
		this.isShown = true;

		if (this.options.hideOn == 'outerClick') {
			// добавляем прозрачную панель в документ
			$('body').append(this.glass_box.el);
		}
		
		this.events.fire('onShow');
	},
	
	hide: function(eff){
		
		if(this.options.hideOn == 'outerClick') {
			// удаляем прозрачную панель
	    this.glass_box.el.detach();
		}
		
		var effects = this.options.effects;
		
		var self = this;
		
		switch(eff || effects['hide']){
			case 'fade':
				this.el.fadeOut( effects.delay, function(){ self.events.fire('onHide'); } );
				break;
			case 'slideUp':
				this.el.slideUp( effects.delay, function(){ self.events.fire('onHide'); } );
				break;
			default:
				this.el.hide();
				this.events.fire('onHide');
		}
		
		this.isShown = false;
		
		if(this.renderTarget) {
			this.el.detach();
			delete this.renderTarget;
		}
//		this.el.remove();
//		$(this.options.target).remove(this.el);
	}
	
	
}, 'dropdown-box');