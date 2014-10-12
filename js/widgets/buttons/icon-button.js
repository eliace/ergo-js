
Ergo.defineClass('Ergo.widgets.IconButton', 'Ergo.widgets.Button', {
	
	defaults: {
		cls: 'icon-btn',
		components: {
			content: {
				etype: 'icon'			
			}
		}
	},
	
	
	setIcon: function(v) {
		this.content.states.set(v);
	}
	
}, 'widgets:icon-button');
