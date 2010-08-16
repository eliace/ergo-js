


Dino.declare('Dino.layouts.DockLayout', 'Dino.Layout', {
	
	defaultOptions: {
		containerCls: 'dino-dock-layout',
		updatePolicy: 'manual'
	},
	
	insert: function(item) {
		var el = item.el;
		
		if(Dino.in_array(['top', 'left-top', 'left-center', 'left-bottom', 'bottom', 'right-top', 'right-center', 'right-bottom'], item.options.dock))
			el.addClass('dock-'+item.options.dock);
		
		this.container.el.append(el);
	},
	
	
	update: function(){
		var margin_left = 0;
		$('.dock-left', this.container.el).each(function(i, el){ 
			margin_left += $(el).outerWidth(); 
		});
		
		var content_el = this.container.el.children(':not(.dock-left, .dock-top)');
		
		if(margin_left > 0)
			content_el.css('margin-left', margin_left);
	}
	
}, 'dock-layout');