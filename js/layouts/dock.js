
//= require "../core/layout"


/**
 * @class
 * @name Dino.core.Layouts.DockLayout
 * @extends Dino.core.Layout
 */
Dino.declare('Dino.core.Layouts.DockLayout', 'Dino.core.Layout', /** @lends Dino.core.Layouts.DockLayout.prototype */{
	
	defaults: {
//		containerCls: 'dino-dock-layout',
		name: 'dock',
		updateMode: 'none'
	},
	
	insert: function(item) {
		var el = item.el;
		
		if('dock' in item.options){
			if(item.options.dock) {
				var dock_a = item.options.dock.split('-');
				if(dock_a.length == 1) dock_a.push('center');
				
				el.attr('dock', dock_a.join('-'));				
			}
//			el.addClass('dock-'+dock_a.join('-'));
			this.container.el.append(el);
		}
		else {
			if(!this.content){
//				this.content = $('<div class="dino-dock-content"></div>');
				this.content = el;
//				this.content.append(el);
			}
			this.container.el.append(el);//this.content);
		}
		
//		if(Dino.in_array(['top', 'left-top', 'left-center', 'left-bottom', 'bottom', 'right-top', 'right-center', 'right-bottom'], item.options.dock))
//			el.addClass('dock-'+item.options.dock);
		
//		this.container.el.append(el);
	},
	
	remove: function(item) {
		item.el.remove();
	},	
	
	update: function(){
		var margin_left = margin_right = 0;
		$('[dock|=left]', this.container.el).each(function(i, el){
			margin_left = Math.max(margin_left, $(el).outerWidth());
		});
		$('[dock|=right]', this.container.el).each(function(i, el){
			margin_right = Math.max(margin_right, $(el).outerWidth());
		});
//		$('.dock-left-center', this.container.el).each(function(i, el){
//			$(el).css('margin-top', -$(el).outerHeight()/2);
//		});


		var h = this.el.height();
		
		$('[dock$=center]', this.el).each(function(i, el){
			el = $(el);
			el.css('margin-top', -el.outerHeight()/2);//-Math.min(h, el.outerHeight(true))/2);
		});
				
		if(this.content){
			if(margin_left > 0)	this.content.css('margin-left', margin_left);
			if(margin_right > 0)	this.content.css('margin-right', margin_right);
		}
		
/*		
		var margin_left = 0;
		$('.dock-left', this.container.el).each(function(i, el){ 
			margin_left += $(el).outerWidth(); 
		});
		
		var content_el = this.container.el.children(':not(.dock-left, .dock-top)');
		
		if(margin_left > 0)
			content_el.css('margin-left', margin_left);
*/			
	}
	
}, 'dock-layout');