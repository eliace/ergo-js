
Ergo.defineClass('Ergo.widgets.Breadcrumbs', 'Ergo.widgets.List', {

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
				binding: 'text',
				weight: 100
			}
		}
	}

}, 'widgets:breadcrumbs');
