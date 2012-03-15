
//= require <core/layout>


/**
 * @class
 * @extends Ergo.core.Layout
 */
Ergo.layouts.StackLayout = Ergo.declare('Ergo.layouts.StackLayout', 'Ergo.core.Layout', /** @lends Ergo.layouts.StackLayout.prototype */{
	
	defaults: {
//		containerCls: 'e-stack-layout',
		name: 'stack',
		itemCls: 'hidden'
	},
	
	
	attach: function(c){
		this.$super(c);
//		Ergo.layouts.StackLayout.superclass.attach.apply(this, arguments);
		
		var self = this;
		
		this.container.setActive = function(i) {
			self.activate(i);
		};
		
	},
	
	detach: function() {
		this.$super();
//		Ergo.layouts.StackLayout.superclass.detach.apply(this, arguments);
		
		delete this.container.setActive;
	},
	
	
	
	activate: function(i) {
		
		var child = (i instanceof Ergo.core.Widget) ? i : this.container.items.find( Ergo.filters.by_widget(i) );
		
		this.container.items.each(function(c){
//			(c != child) ? c.hide() : c.show();
			c.el.toggleClass('hidden', (c != child));
		});
		
		if(child.layout) child.$layoutChanged();
		
		this.active = child;
		
	}
		
}, 'stack-layout');