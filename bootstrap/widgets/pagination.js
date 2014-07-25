



Ergo.defineClass('Bootstrap.widgets.Pagination', 'Bootstrap.widgets.List', {
	
	defaults: {
		cls: 'pagination',
		states: {
			'large:size': 'pagination-lg',
			'small:size': 'pagination-sm'
		},
		components: {
			prevButton: {
				weight: -1,
				etype: 'bootstrap:list-item',
				text: '«'
			},
			nextButton: {
				weight: 1,
				etype: 'bootstrap:list-item',
				text: '»'				
			}
		}
	}
	
}, 'bootstrap:pagination');


