




Ergo.defineClass('Bootstrap.widgets.NavBar', 'Ergo.widgets.Box', {
	
	defaults: {
		html: '<nav/>',
		layout: {
			etype: 'layout:default',
			html: '<div class="container-fluid"/>'
		},
		cls: 'navbar navbar-default',
		states: {
			'fixed-top:align': 'navbar-fixed-top',
			'fixed-bottom:align': 'navbar-fixed-bottom',
			'static-top:align': 'navbar-static-top',
			'inverted': 'navbar-inverse'
		},
		components: {
			header: {
				cls: 'navbar-header',
				components: {
					toggle: {
						etype: 'bootstrap:button',
						cls: 'navbar-toggle'
					},
					brand: {
						etype: 'link',
//						href: '#',
						cls: 'navbar-brand'
					}
				}
			},
			content: {
				cls: 'collapse navbar-collapse',
				defaultItem: {
					states: {
						'left:align': 'navbar-left',
						'right:align': 'navbar-right'
					}					
				}
			}
		}
	},
	
	setBrand: function(v) {
		this.header.brand.opt('text', v);
	}
	
}, 'bootstrap:navbar');




