



Dino.layouts.PopupLayout = Dino.declare('Dino.layouts.PopupLayout', 'Dino.layouts.PlainLayout', {
	
	defaults: {
		offset: [0, 0]
//		hideOn: 'outerClick'
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
		
		
	},
	
	detach: function() {
		Dino.layouts.PopupLayout.superclass.detach.apply(this, arguments);
		
		
		
	},
	

	open: function(a, b, c) {
		
		if(arguments.length == 0) return;
		
		var x = a;
		var y = b;
		var to_el = c;
		
		if(!Dino.isNumber(a)) {
			
			var rel_to = a;
			var at = b;
			
			var o = this.options;
	
			var offset = rel_to.el.offset();
			
			x = offset.left + o.offset[0];
			y = offset.top + o.offset[1];
			
			var self = this;
			
			Dino.each(o.position.split('-'), function(p){
				if(p === 'bottom')
					y -= self.el.outerHeight();				
				else if(p === 'right')
					x -= self.el.outerWidth();
			});
			
			Dino.each(at.split('-'), function(p){
				if(p === 'bottom')
					y += rel_to.el.outerHeight();				
				else if(p === 'right')
					x += rel_to.el.outerWidth();
			});
			
			if(!to_el) to_el = 'body';
		}



		var c = this.container;

		if(to_el)
			$(to_el).append(c.el);
				
//		var view_w = this.el.parent().outerWidth();
//		var view_h = this.el.parent().outerHeight();
//		
//		var dw = view_w - (dd.el.outerWidth() + x);
//		var dh = view_h - (dd.el.outerHeight() + y);
//		
//		if(dw < 0)	x -= this.el.outerWidth();
//		if(dh < 0)	y -= this.el.outerWidth();
		
		
		c.el.css({'left': x, 'top': y});
		
		c.el.show();
		
		
		c.isShown = true;

		if (c.options.hideOn == 'outerClick') {
			// добавляем прозрачную панель в документ
			$('body').append(this.glass_pane.el);
		}
		
		c.events.fire('onShow');
		
	},
	
	
	close: function() {
		
		this.container.isShown = false;
		
		this.container.el.hide();
		
		this.glass_pane.el.detach();		
		
	}
	
	
}, 'popup-layout');