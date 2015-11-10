

Ergo.defineClass('Ergo.widgets.Buttons', 'Ergo.widgets.Box', {

	defaults: {
		as: 'buttons',
//		layout: 'hbox',
		defaultItem: {
			etype: 'button',
//			name: 'action',
			onClick: 'action:action'
		}
	}

}, 'widgets:buttons');
