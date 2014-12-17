



Ergo.defineClass('Bootstrap.widgets.EmbedResponsive', 'Ergo.widgets.Box', {
	
	defaults: {
		cls: 'embed-responsive',
		states: {
			'16by9:aspect': 'embed-responsive-16by9',
			'4by3:aspect': 'embed-responsive-4by3'
		},
		defaultComponent: {
			cls: 'embed-responsive-item'
		}
	}
	
}, 'bootstrap:embed-responsive');

