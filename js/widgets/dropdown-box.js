
//= require "glass-box"



Dino.declare('Dino.widgets.DropdownBox', 'Dino.widgets.Box', {
	
	dtype: 'dropdown-box',
	
	defaults: {
		position: 'left-bottom',
		offset: [0, 0]
	},
	
	show: function(rel_to, rel_pos) {

		var o = this.options;

		var offset = rel_to.el.offset();
		
		var x = offset.left + o.offset[0];
		var y = offset.top + o.offset[1];
		
		var self = this;
		
		Dino.each(o.position.split('-'), function(p){
			if(p === 'bottom')
				y += self.el.outerHeight();				
			else if(p === 'right')
				x += self.el.outerWidth();
		});
		
		Dino.each(rel_pos.split('-'), function(p){
			if(p === 'bottom')
				y += rel_to.el.outerHeight();				
			else if(p === 'right')
				x += rel_to.el.outerWidth();
		});
		
		self.el.css({'left': x, 'top': y});
		
	},
	
	
	hide: function() {
		
	},
	
	
	$init: function(o) {

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
