

Ergo.defineClass('Bootstrap.widgets.ButtonGroup', 'Ergo.widgets.Box', {
	
	defaults: {
		state: 'horizontal',
		defaultItem: {
			etype: 'bootstrap:button'
		},
		states: {
			'large:size': 'btn-group-lg',
			'small:size': 'btn-group-sm',
			'tiny:size': 'btn-group-xs',
			'horizontal:dir': 'btn-group',
			'vertical:dir': 'btn-group-vertical',
			'justified': 'btn-group-justified'
		}
	}
	
}, 'bootstrap:button-group');

