
//= require "plain"


/**
 * @class
 * @extends Dino.layouts.PlainLayout
 */
Dino.layouts.StackLayout = Dino.declare('Dino.layouts.StackLayout', 'Dino.layouts.PlainLayout', /** @lends Dino.layouts.StackLayout.prototype */{
	
	defaultOptions: {
//		containerCls: 'dino-stack-layout',
		name: 'stack',
		itemCls: 'hidden'
	},
	
	activate: function(i) {
		
		var child = (i instanceof Dino.Widget) ? i : this.container.children.get(i);
		
		this.container.children.each(function(c){
			c.el.toggleClass('hidden', (c != child));
		});
		
		if(child.layout) child.$layoutChanged();
		
		this.active = child;
		
	}
		
}, 'stack-layout');