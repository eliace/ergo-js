

Ergo.defineClass('Ergo.widgets.GridPagination', 'Ergo.widgets.Box', {
	
	defaults: {
		baseCls: 'grid-pagination',
		components: {
			firstButton: {
				etype: 'button',
				state: 'flat tool',
				text: '«',
				weight: -100,
				onClick: function() {
					this.events.rise('index:first');
				}				
			},
			prevButton: {
				etype: 'button',
				state: 'flat tool',
				text: '<',
				weight: -50,
				onClick: function() {
					this.events.rise('index:prev');
				}				
			},
			nextButton: {
				etype: 'button',
				state: 'flat tool',
				text: '>',
				weight: 50,
				onClick: function() {
					this.events.rise('index:next');
				}				
			},
			lastButton: {
				etype: 'button',
				state: 'flat tool',
				text: '»',
				weight: 100,
				onClick: function() {
					this.events.rise('index:last');
				}							
			},
			current: {
				etype: 'line',
				autoBind: false,
				defaultItem: {
					etype: 'text',
				},
				items: [ 
				'Страница ', 
				{
					etype: 'field',
					onChange: function(e) {
						
						var i = parseInt(e.value);
						
						this.states.toggle('invalid', (isNaN(i) || (i).toString().length != e.value.length));
						
						if( !this.states.is('invalid') )
							this.events.rise('index:change', {index: i});							
						
					}
				}, 
				' из ', 
				{
					etype: 'text'
				}]
				
			}
		},
		
		events: {
			'index:first': function(e) {
				this.events.rise('changeIndex', {index: 1});
			},
			'index:last': function(e) {
				this.events.rise('changeIndex', {index: this.data.opt('count')});
			},
			'index:next': function(e) {
				var i = this.data.opt('index')+1;
				if( i <= this.data.opt('count') )
					this.events.rise('changeIndex', {index: i});
			},
			'index:prev': function(e) {
				var i = this.data.opt('index')-1;
				if( i > 0 )
					this.events.rise('changeIndex', {index: i});
			},
			'index:change': function(e) {
				var i = e.index;
				if( !isNaN(i) && i > 0 && i <= this.data.opt('count') )
					this.events.rise('changeIndex', {index: e.index});
//				this.states.set('invalid');
//					this.opt('value', this.opt('value'));
				
			}			
		},

		binding: function(v) {
			
			this.current.item(1).opt('value', this.data.opt('index'));
			this.current.item(3).opt('text', this.data.opt('count'));
			
		}
	
	
	},
	
	
	
	
	setIndex: function(v) {
		
	}
	
	
	// $construct: function(o) {
		// this.$super(o);
// 		
		// this._index = 0;
	// }
	
	
}, 'widgets:grid-pagination');
