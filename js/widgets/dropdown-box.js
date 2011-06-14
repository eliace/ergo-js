
//= require "glass-pane"



Dino.declare('Dino.widgets.DropdownBox', 'Dino.widgets.Box', {
	
	dtype: 'dropdown-box',
	
	defaults: {
		position: '',
		offset: [0, 0],
		cls: 'dino-dropdown-box',
		hideOn: 'outerClick'
	},
	
	show: function(rel_to, rel_pos) {

		if(arguments.length == 0) return;

		var o = this.options;

		var offset = rel_to.el.offset();
		
		var x = offset.left + o.offset[0];
		var y = offset.top + o.offset[1];
		
		var self = this;
		
		Dino.each(o.position.split('-'), function(p){
			if(p === 'bottom')
				y -= self.el.outerHeight();				
			else if(p === 'right')
				x -= self.el.outerWidth();
		});
		
		Dino.each(rel_pos.split('-'), function(p){
			if(p === 'bottom')
				y += rel_to.el.outerHeight();				
			else if(p === 'right')
				x += rel_to.el.outerWidth();
		});
		
		$('body').append(this.el);
				
//		var view_w = this.el.parent().outerWidth();
//		var view_h = this.el.parent().outerHeight();
//		
//		var dw = view_w - (dd.el.outerWidth() + x);
//		var dh = view_h - (dd.el.outerHeight() + y);
//		
//		if(dw < 0)	x -= this.el.outerWidth();
//		if(dh < 0)	y -= this.el.outerWidth();
		
		
		this.el.css({'left': x, 'top': y});
		
		this.el.show();
	},
	
	
	hide: function() {
		
		
		
		
		this.el.hide();
	},
	
	
	$init: function(o) {
		Dino.widgets.DropdownBox.superclass.$init.apply(this, arguments);

		var self = this;
	
		this.glass_pane = $.dino({
			dtype: 'glass-pane',
			events: {
				'click': function(e) {
		      self.hide();
					e.stopPropagation();					
				}
			}						
		});
		
		this.el.bind('mouseleave', function(){ 
			if(self.options.hideOn == 'hoverOut') self.hide(); 
		});

		this.el.bind('click', function(e){ 
			 e.stopPropagation();
			 e.preventDefault();
		});
		
	}
	
});
