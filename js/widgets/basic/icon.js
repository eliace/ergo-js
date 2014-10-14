




Ergo.defineClass('Ergo.widgets.Icon', 'Ergo.core.Widget', {
	
	defaults: {
		html: '<i/>',
		cls: 'icon',
		binding: 'text'
	},
	
	set_icon: function(v) {
		this.states.set(v);		
	},
	
	set_text: function(v) {
		this.states.set(v);		
	}
	
}, 'widgets:icon');
