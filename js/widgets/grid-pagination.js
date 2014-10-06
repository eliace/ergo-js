

Ergo.defineClass('Ergo.widgets.GridPagination', 'Ergo.widgets.Box', {
	
	defaults: {
		baseCls: 'grid-pagination',
		defaultItem: {
			etype: 'text',
			autoBind: false
		},
		components: {
			firstButton: {
				etype: 'button',
				text: '«',
				weight: -100,
				onClick: function() {
					this.events.rise('first');
				}				
			},
			prevButton: {
				etype: 'button',
				text: '<',
				weight: -50,
				onClick: function() {
					this.events.rise('previous');
				}				
			},
			nextButton: {
				etype: 'button',
				text: '>',
				weight: 50,
				onClick: function() {
					this.events.rise('next');
				}				
			},
			lastButton: {
				etype: 'button',
				text: '»',
				weight: 100,
				onClick: function() {
					this.events.rise('last');
				}							
			}
		},
		items: [ 
		'Страница ', 
		{
			etype: 'field'
		}, 
		' из ', 
		{
			etype: 'text'
		}]
	},
	
	$construct: function(o) {
		this.$super(o);
		
		this._index = 0;
	}
	
	
}, 'widgets:grid-pagination');
