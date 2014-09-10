
Ergo.defineClass('Ergo.widgets.IconButton', 'Ergo.widgets.Button', {
	
	defaults: {
		components: {
			icon: {
				etype: 'icon'			
			}
		},
		state: 'default'
	},
	
	
	setIcon: function(v) {
		this.icon.states.set(v);
	}
	
}, 'widgets:icon-button');
