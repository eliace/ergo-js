

Ergo.defineClass('Ergo.widgets.GridPagination', 'Ergo.widgets.Box', {
	
	defaults: {
		baseCls: 'grid-pagination',
		defaultItem: {
			etype: 'text',
			autoBind: false
		},
		items: [{
			etype: 'button',
			text: '<<',
			onClick: function() {
				this.events.rise('first');
			}
		}, {
			etype: 'button',
			text: '<',
			onClick: function() {
				this.events.rise('previous');
			}
		}, 
		'Страница ', 
		{
			etype: 'field'
		}, 
		' из ', 
		{
			etype: 'text'
		}, {
			etype: 'button',
			text: '>',
			onClick: function() {
				this.events.rise('next');
			}
		}, {
			etype: 'button',
			text: '>>',
			onClick: function() {
				this.events.rise('last');
			}			
		}]
	},
	
	$construct: function(o) {
		this.$super(o);
		
		this._index = 0;
	}
	
	
}, 'widgets:grid-pagination');
