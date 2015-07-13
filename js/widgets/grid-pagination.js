

Ergo.defineClass('Ergo.widgets.GridPagination', 'Ergo.widgets.Box', {
	
	defaults: {
		baseCls: 'grid-pagination',
		cls: 'pagination',
		defaultComponent: {
			etype: 'menu-item',
			// components: {
			// 	content: {
			// 		etype: 'html:a'
			// 	}
			// }
		},
		components: {
			firstButton: {
				// etype: 'button',
				// state: 'flat tool',
				components: {
					content: {
						cls: 'icon move first'
					}
				},
//				text: '«',
				weight: -100,
				onClick: function() {
					this.events.rise('index:first');
				}				
			},
			prevButton: {
//				etype: 'button',
//				state: 'flat tool',
//				text: '<',
				components: {
					content: {
						cls: 'icon move prev'
					}
				},
				weight: -50,
				onClick: function() {
					this.events.rise('index:prev');
				}				
			},
			nextButton: {
//				etype: 'button',
//				state: 'flat tool',
//				text: '>',
				components: {
					content: {
						cls: 'icon move next'
					}
				},
				weight: 50,
				onClick: function() {
					this.events.rise('index:next');
				}				
			},
			lastButton: {
				components: {
					content: {
						cls: 'icon move last'
					}
				},
				// etype: 'button',
				// state: 'flat tool',
//				text: '»',
				weight: 100,
				onClick: function() {
					this.events.rise('index:last');
				}							
			},
			current: {
				etype: 'html:li',
				cls: 'text muted',
				autoBind: false,
				defaultItem: {
					etype: '.',
				},
				items: [ 
				'Стр. ', 
				{
					etype: 'input',
					cls: 'underlined',
					onChange: function(e) {
						
						var i = parseInt(e.text);
						
						this.states.toggle('invalid', (isNaN(i) || (i).toString().length != e.text.length));
						
						if( !this.states.is('invalid') )
							this.events.rise('index:change', {index: i});							
						
					}
				}, 
				' из ', 
				{
					etype: '.'
				}]
				
			}
		},
		
		events: {
			'index:first': function(e) {
				this.events.rise('changeDataIndex', {index: 1});
			},
			'index:last': function(e) {
				this.events.rise('changeDataIndex', {index: this.data.opt('count')});
			},
			'index:next': function(e) {
				var i = this.data.opt('index')+1;
				if( i <= this.data.opt('count') )
					this.events.rise('changeDataIndex', {index: i});
			},
			'index:prev': function(e) {
				var i = this.data.opt('index')-1;
				if( i > 0 )
					this.events.rise('changeDataIndex', {index: i});
			},
			'index:change': function(e) {
				var i = e.index;
				if( !isNaN(i) && i > 0 && i <= this.data.opt('count') )
					this.events.rise('changeDataIndex', {index: e.index});
//				this.states.set('invalid');
//					this.opt('value', this.opt('value'));
				
			}			
		},

		binding: function(v) {
			
			this.current.item(1).opt('value', this.data.opt('index'));
			this.current.item(3).opt('text', this.data.opt('count'));
			
		}
	
	
	},
	
	
	
	
	set_dataIndex: function(v) {
		
	}
	
	
	// _construct: function(o) {
		// this._super(o);
// 		
		// this._index = 0;
	// }
	
	
}, 'widgets:grid-pagination');
