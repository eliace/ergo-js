
//= require "menu-item"




/**
 * @class
 * @extends Ergo.containers.DropdownList
 */
Ergo.widgets.ContextMenu = Ergo.declare('Ergo.widgets.ContextMenu', 'Ergo.widgets.MenuDropdownList', /** @lends Ergo.widgets.ContextMenu.prototype */{
	
	defaults: {
//		hideOn: 'hoverOut',
		baseCls: 'ergo-context-menu',
//		renderTo: 'body',
		menuModel: {
			item: {
				onAction: function() {
					this.getParent(Ergo.widgets.ContextMenu).events.fire('onSelect', {target: this});
				}
			}
		},
		
		position: {
			global: true
		}
//		defaultItem: {
//			etype: 'menu-item',
//			onAction: function(e) {
//				this.parent.events.fire('onAction', {target: e.target});
//				this.parent.hide();
//			}			
//		},
//		offset: [-2, -2]
	}
	
/*	
	$events: function(self){
		Ergo.widgets.ContextMenu.superclass.$events.call(this, self);
		
		this.el.bind('mouseleave', function(){ 
			if(self.options.hideOn == 'hoverOut') self.hide(); 
		});
	}
*/	

/*		
	show: function(x, y) {

		
		$('body').append(this.el);
				
		var view_w = this.el.parent().outerWidth();
		var view_h = this.el.parent().outerHeight();
		
		var dw = view_w - (this.el.outerWidth() + x);
		var dh = view_h - (this.el.outerHeight() + y);
		
		if(dw < 0)	x -= this.el.outerWidth();
		if(dh < 0)	y -= this.el.outerWidth();
		
		
		this.el.css({'left': x, 'top': y});
		
		this.el.show();
		
		
		
	}
*/	
	
	
}, 'context-menu');




