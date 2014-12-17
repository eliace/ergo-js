



Ergo.defineClass('Bootstrap.widgets.Pager', 'Bootstrap.widgets.List', {
	
	defaults: {
		cls: 'pager',
		components: {
			prevButton: {
				weight: -10,
				etype: 'bootstrap:list-item',
				text: 'Previous'
			},
			nextButton: {
				weight: 10,
				etype: 'bootstrap:list-item',
				text: 'Next'
			}
		}
	}
	
}, 'bootstrap:pager');

