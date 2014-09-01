

Ergo.defineClass('Ergo.widgets.TextBox', 'Ergo.widgets.Box', {
	
	defaults: {
		baseCls: 'text-box',
		components: {
			content: {
				etype: 'html:input'
			}
		}
	}
	
}, 'widgets:text-box');
