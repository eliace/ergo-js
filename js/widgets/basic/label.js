

Ergo.defineClass('Ergo.widgets.Label', 'Ergo.core.Widget', {

	defaults: {
		html: '<label/>',
		cls: 'label',
		binding: 'text',
		components: {
			content: {
				etype: '.',
				binding: false
			}
		}
	}

}, 'widgets:label');
