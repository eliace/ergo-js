




Ergo.defineClass('Ergo.widgets.Icon', 'Ergo.core.Widget', {
	
	defaults: {
		html: '<i/>',
		cls: 'icon',
		binding: 'icon'
	},
	
	setIcon: function(v) {
		this.states.set(v);		
	}
	
}, 'widgets:icon');
