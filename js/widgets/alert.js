
//= require <widgets/natives/box>

Ergo.declare('Ergo.widgets.Alert', 'Ergo.widgets.Box', {
	
	defaults: {
		cls: 'e-notification',
		components: {
			closeButton: {
				etype: 'icon',
				cls: 'e-notification-close',
				onClick: function() {
					var self = this;
					this.parent.hide().then(function() { self.parent.destroy(); });
				}
			},
			content: {
				etype: 'text'
			}
		},
		extensions: ['effects'],
		effects: {
			hide: 'fadeOut',
			delay: 400
		},
		set: {
			'messageHtml': function(s) { this.content.opt('innerHtml', s); }
		}		
	}
	
	
	
}, 'alert');
