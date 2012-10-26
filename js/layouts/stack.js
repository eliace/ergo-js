
//= require <core/layout>


/**
 * @class
 * @extends Ergo.core.Layout
 */
Ergo.declare('Ergo.layouts.StackLayout', 'Ergo.core.Layout', /** @lends Ergo.layouts.StackLayout.prototype */{
	
	defaults: {
//		containerCls: 'e-stack-layout',
		name: 'stack',
		itemStyle: {'display': 'none'}
//		itemCls: 'hidden'
	},
	
	
	attach: function(c){
		this.$super(c);
//		Ergo.layouts.StackLayout.superclass.attach.apply(this, arguments);
		
		var self = this;
		
		this.container.setActive = function(i) {
			return self.activate(i);
		};
		
	},
	
	detach: function() {
		this.$super();
//		Ergo.layouts.StackLayout.superclass.detach.apply(this, arguments);
		
		delete this.container.setActive;
	},
	
	
	
	activate: function(i) {
		
		var child = (i instanceof Ergo.core.Widget) ? i : this.container.children.find( Ergo.by_widget(i) );
		
		this.container.children.each(function(c){
			(c != child) ? c.hide() : c.show();
//			c.el.toggleClass('hidden', (c != child));
		});
		
		if(child.layout) child.$layoutChanged();
		
		this.active = child;
		
		return child;
	}
		
}, 'layouts:stack');
