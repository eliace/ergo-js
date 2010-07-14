

Dino.declare('Dino.layouts.StackLayout', 'Dino.layouts.PlainLayout', {
	
	defaultOptions: {
		containerCls: 'dino-stack-layout',
		itemCls: 'dino-stack-item dino-hidden'
	},
	
	activate: function(item) {
		var prop = (Dino.isString(item)) ? 'tag' : null;
		this.container.eachItem(function(it){
			var comp = (prop) ? it[prop] : it;
			it.el.toggleClass('dino-hidden', (comp != item));
		});			
	}
	
}, 'stack-layout');