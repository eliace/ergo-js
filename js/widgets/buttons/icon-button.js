
Ergo.defineClass('Ergo.widgets.IconButton', 'Ergo.widgets.Button', {
	
	defaults: {
		cls: 'icon-button',
		components: {
			content: {
				etype: 'icon'			
			}
		}
	},
	
	
	set_icon: function(v) {
		this.content.states.set(v);
	}
	
}, 'widgets:icon-button');
