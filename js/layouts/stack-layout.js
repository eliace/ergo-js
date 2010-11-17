

Dino.declare('Dino.layouts.StackLayout', 'Dino.layouts.PlainLayout', {
	
	defaultOptions: {
//		containerCls: 'dino-stack-layout',
		name: 'stack',
		itemCls: 'dino-hidden'
	},
	
	activate: function(i) {
		
		var child = (i instanceof _dino.Widget) ? i : this.container.children.get(i);
		
		this.container.children.each(function(c){
			c.el.toggleClass('dino-hidden', (c != child));
		});
		
		if(child.layout) child._layoutChanged();
		
	}
	
}, 'stack-layout');