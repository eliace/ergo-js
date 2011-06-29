



Dino.layouts.PopupLayout = Dino.declare('Dino.layouts.PopupLayout', 'Dino.layouts.PlainLayout', {
	
	defaults: {
//		offset: [0, 0],
//		global: false
//		hideOn: 'outerClick'
		position: {
			to: null, 
			at: 'left top', 
			my: 'left top', 
			offset: [0, 0]
		}
	},
	
	
	
	
	attach: function() {
		Dino.layouts.PopupLayout.superclass.attach.apply(this, arguments);
		
		var self = this;
		var c = this.container;
		
		this.glass_pane = $.dino({
			dtype: 'glass-pane',
			events: {
				'click': function(e) {
		      self.close();
					e.stopPropagation();					
				}
			}						
		});
		
		
		c.el.bind('mouseleave', function(e, w){ 
			if(c.options.hideOn == 'hoverOut') c.hide(); 
		});

		this.container.el.bind('click', function(e){ 
			 e.stopPropagation();
			 e.preventDefault();
		});
		
		
		this.container.show = function() {
			self.open.apply(self, arguments);
		}

		this.container.hide = function() {
			self.close.apply(self, arguments);
		}
		
	},
	
	detach: function() {
		Dino.layouts.PopupLayout.superclass.detach.apply(this, arguments);
		
		
		
	},
	

	open: function(position) {
		
		if(arguments.length == 0) return;
		
		if(arguments.length == 2) {
			position = {offset: [arguments[0], arguments[1]]}
		}
		
		var c = this.container;
		
		var p = Dino.smart_override({}, this.options.position, position);
			
		// получаем целевой элемент, относительно которого отображаем элемент
		var to_el = (p.to) ? $(p.to) : c.el;
		// смещение целевого элемента
		var offset = to_el.offset();
		// итоговое смещение popup-элемента
		x = offset.left + p.offset[0];
		y = offset.top + p.offset[1];
		
		var at = p.at.split(' ');
		
		if(at[0] == 'right') x += to_el.outerWidth();
		else if(at[0] == 'center') x += to_el.outerWidth()/2;

		if(at[1] == 'bottom') y += to_el.outerHeight();
		else if(at[1] == 'center') y += to_el.outerHeight()/2;


		var my = p.my.split(' ');

		if(my[0] == 'right') x -= this.el.outerWidth();
		else if(my[0] == 'center') x -= this.el.outerWidth()/2;

		if(my[1] == 'bottom') y -= this.el.outerHeight();
		else if(my[1] == 'center') y -= this.el.outerHeight()/2;
		
		
		if(p.to)
			to_el.append(c.el);
				
//		var view_w = this.el.parent().outerWidth();
//		var view_h = this.el.parent().outerHeight();
//		
//		var dw = view_w - (dd.el.outerWidth() + x);
//		var dh = view_h - (dd.el.outerHeight() + y);
//		
//		if(dw < 0)	x -= this.el.outerWidth();
//		if(dh < 0)	y -= this.el.outerWidth();
		
		
		c.el.css({'left': x, 'top': y});
		
		
		var effects = c.options.effects || {};
		
		switch(effects['show']){
			case 'fade':
				c.el.fadeIn( effects.delay );
				break;
			case 'slideDown':
				c.el.slideDown( effects.delay );
				break;
			default:
				c.el.show();
		}
		
//		c.el.show();
		
		
		c.isShown = true;

		if (!c.options.hideOn || c.options.hideOn == 'outerClick') {
			// добавляем прозрачную панель в документ
			$('body').append(this.glass_pane.el);
		}
		
		c.events.fire('onShow');
		
	},
	
	
	close: function() {
		
		var c = this.container;
		
		c.isShown = false;
		
		var effects = c.options.effects || {};
		
		switch(effects['hide']){
			case 'fade':
				c.el.fadeOut( effects.delay, function(){ c.events.fire('onHide'); } );
				break;
			case 'slideUp':
				c.el.slideUp( effects.delay, function(){ c.events.fire('onHide'); } );
				break;
			default:
				c.el.hide();
				c.events.fire('onHide');
		}
		
		
//		this.container.el.hide();
		
		this.glass_pane.el.detach();		
		
	}
	
	
}, 'popup-layout');