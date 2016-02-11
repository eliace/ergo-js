


Ergo.defineClass('Ergo.widgets.Item', {

	extends: 'Ergo.widgets.Box',

	defaults: {
		cls: 'item',
		components: {
			content: {
				etype: 'text',
//				cls: 'content',
				components: {
					content: {
						etype: '.'
					}
				}
			}
		}
	}

}, 'widgets:item');
