

Ergo.defineClass('Ergo.widgets.ButtonBox', 'Ergo.widgets.Box', {

	defaults: {
		as: 'buttons',
		layout: 'hbox',
		defaultItem: {
			etype: 'button',
			name: 'button',
			onClick: 'action'
		}
	}

}, 'widgets:buttons');
