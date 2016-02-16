
Ergo.defineClass('Ergo.widgets.Breadcrumbs', {

	extends: 'Ergo.widgets.Box',

	defaults: {
		cls: 'breadcrumbs',
		defaultItem: {
			components: {
				content: {
					etype: 'link'
				}
			}
		},
		components: {
			current: {
				etype: 'html:li',
//				binding: 'text',
				weight: 100
			}
		}
	}

}, 'widgets:breadcrumbs');
