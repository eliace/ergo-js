



Ergo.defineClass('Bootstrap.widgets.Alert', 'Ergo.widgets.Box', {
	
	defaults: {
		cls: 'alert',
		states: {
			'success:appearance': 'alert-success',
			'info:appearance': 'alert-info',
			'warning:appearance': 'alert-warning',
			'danger:appearance': 'alert-danger',
			'dismissible': function() {
				this.layout.add(this.closeButton);
				return 'alert-dismissible';
			}
		},
		components: {
			title: {
				etype: 'html:strong',
				autoRender: true,
//				html: '<strong/>'
			},
			closeButton: {
				etype: 'html:button',
				autoRender: 'ignore',
				cls: 'close',
				content: {
					etype: 'html:text',
					text: '×'
				}
			}
		}
	},
	
	setTitle: function(v) {
		this.title.opt('text', v);
	}
	
	
}, 'bootstrap:alert');


