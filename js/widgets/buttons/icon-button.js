

Ergo.declare('Ergo.widgets.IconButton', 'Ergo.widgets.Button', {
	
	defaults: {
		cls: 'e-icon-button',
		
		components: {
			icon: {
				etype: 'icon'
			}
		},
		
		
		set: {
			'text': function(v) {
				this.icon.opt('text', v);
			},
			'icon': function(v) {
				this.icon.states.only(v);
			}
		}
		
	}
	
}, 'icon-button');
