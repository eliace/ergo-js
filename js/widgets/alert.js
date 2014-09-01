
//= require <widgets/basic/box>

Ergo.defineClass('Ergo.widgets.Alert', 'Ergo.widgets.Box', {
	
	defaults: {
		cls: 'alert',
		layout: 'column',
		components: {
			icon: {
				etype: 'icon'
			},
			content: {
				components: {
					title: {
						cls: 'alert-title',
						etype: 'html:strong'
					},
					message: {
						cls: 'alert-message',
						etype: 'box'
					}					
				}
			},
			xicon: {
				etype: 'icon',
				autoRender: false
			}
		}
	},
	
	
	setTitle: function(v) {
		this.content.title.opt('text', v);
	},
	
	setIcon: function(v) {
		this.icon.states.set(v);
	},
	
	setText: function(v) {
		this.content.message.opt('text', v);
	}
	
	
}, 'widgets:alert');
