




Ergo.defineClass('Ergo.widgets.Icon', 'Ergo.core.Widget', {
	
	defaults: {
		html: '<i/>',
		cls: 'icon',
		binding: 'text'
	},
	
	setIcon: function(v) {
		this.states.set(v);		
	},
	
	setText: function(v) {
		this.states.set(v);		
	}
	
}, 'widgets:icon');
