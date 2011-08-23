
//= require "plain"


/**
 * @class
 * @extends Ergo.core.Layouts.PlainLayout
 */
Ergo.core.Layouts.StackLayout = Ergo.declare('Ergo.core.Layouts.StackLayout', 'Ergo.core.Layouts.PlainLayout', /** @lends Ergo.core.Layouts.StackLayout.prototype */{
	
	defaults: {
//		containerCls: 'dino-stack-layout',
		name: 'stack',
		itemCls: 'hidden'
	},
	
	
	attach: function(){
		Ergo.core.Layouts.StackLayout.superclass.attach.apply(this, arguments);
		
		var self = this;
		
		this.container.setActive = function(i) {
			self.activate(i);
		};
		
	},
	
	detach: function() {
		Ergo.core.Layouts.StackLayout.superclass.detach.apply(this, arguments);
		
		delete this.container.setActive;
	},
	
	
	
	activate: function(i) {
		
		var child = (i instanceof Ergo.core.Widget) ? i : this.container.children.find( Ergo.utils.widget_filter(i) );
		
		this.container.children.each(function(c){
			c.el.toggleClass('hidden', (c != child));
		});
		
		if(child.layout) child.$layoutChanged();
		
		this.active = child;
		
	}
		
}, 'stack-layout');