
//= require <core/object>


Ergo.declare_mixin('Ergo.mixins.Popup', function(o) {
	
	this.open = function(position) {
		
//		if(arguments.length == 0) return;
		
		if(arguments.length == 2) {
			position = {offset: [arguments[0], arguments[1]]}
		}
		
//		var c = this.container;
		
		var p = Ergo.smart_override({}, this.options.position, position);
		
		var x = p.offset[0];
		var y = p.offset[1];

		// получаем целевой элемент, относительно которого отображаем элемент
		var to_el = null;
		
		if(this.parent) 
			to_el = this.parent.el;
		if(p.to) 
			to_el = $(p.to);
			
		if(to_el) {
			
			var at = p.at.split(' ');
		
			if(at[0] == 'right') x += to_el.outerWidth();
			else if(at[0] == 'center') x += to_el.outerWidth()/2;
	
			if(at[1] == 'bottom') y += to_el.outerHeight();
			else if(at[1] == 'center') y += to_el.outerHeight()/2;
			
			if(this.options.adjustWidth)
				this.el.width(to_el.outerWidth());
			
		}	
			
			
		var my = p.my.split(' ');

		if(my[0] == 'right') x -= this.el.outerWidth();
		else if(my[0] == 'center') x -= this.el.outerWidth()/2;

		if(my[1] == 'bottom') y -= this.el.outerHeight();
		else if(my[1] == 'center') y -= this.el.outerHeight()/2;
		
		
		if(p.global) {
			
			if(to_el) {
				// смещение целевого элемента
				var offset = to_el.offset();
			
				x += offset.left;
				y += offset.top;
			}
			
			this.el.css('position', 'absolute');
			
			$('body').append(this.el);
		}
				
//		var view_w = this.el.parent().outerWidth();
//		var view_h = this.el.parent().outerHeight();
//		
//		var dw = view_w - (dd.el.outerWidth() + x);
//		var dh = view_h - (dd.el.outerHeight() + y);
//		
//		if(dw < 0)	x -= this.el.outerWidth();
//		if(dh < 0)	y -= this.el.outerWidth();
		
		var self = this;
		
		this.el.css({'left': x, 'top': y});
		
		
		
		
		// Усечение размера выпадающего элемента
		
		this.el.height('auto');
		
		var max_h = $(document).scrollTop() + $(window).height();
		var pop_h = this.el.height();
		var dh = (y + pop_h) - max_h;
		
		if(dh > 0) {
			this.el.height(pop_h - dh);
			this.el.css({'overflow-y': 'auto'});
		}
		
		
		
		
		
		this.show().then(function(){
			self.events.fire('opened');
		});
		
/*		
		var effects = this.options.effects || {};
		
		switch(effects['show']){
			case 'fade':
				this.el.fadeIn( effects.delay );
				break;
			case 'slideDown':
				this.el.slideDown( effects.delay );
				break;
			default:
				this.el.show();
		}
*/		
//		c.el.show();
				
		
		
		
		this.isShown = true;

		if (!this.options.hideOn || this.options.hideOn == 'outerClick') {
			// добавляем прозрачную панель в документ
			$('body').append(this.glass_pane);
		}
		
	};
	
	
	this.close = function() {
		
		this.isShown = false;
		
		this.hide();
		
/*		
		var effects = this.options.effects || {};
		
		var self= this;
		
		switch(effects['hide']){
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
*/		
		
//		this.container.el.hide();
		
		this.glass_pane.detach();		
		
	};
	
	
	
	
	
	var self = this;
	
	this.glass_pane = Ergo.glass_pane()
		.on('click', function(e){
			self.close();
			e.stopPropagation();
		});
	
	
	// this.glass_pane = $.ergo({
		// etype: 'glass-pane',
		// onClick: function(e) {
      // self.close();
			// e.baseEvent.stopPropagation();								
		// }
	// });
	
	
	Ergo.smart_override(o, {
		events: {
			'mouseleave': function(e, w){ 
				if(w.options.hideOn == 'hoverOut') w.close(); 
			},
			'click': function(e){ 
				 e.stopPropagation();
				 e.preventDefault();
			}
		}
	})
	
	o.position = Ergo.smart_override({
		to: null, 
		at: 'left top', 
		my: 'left top', 
		offset: [0, 0],
		global: false
	}, o.position);
	
	
}, 'popup');
