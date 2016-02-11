

Ergo.defineClass('Ergo.widgets.GridPagination', {

	extends: 'Ergo.widgets.Box',

	defaults: {
		as: 'pagination grid-pagination',
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
						as: 'icon move first'
					}
				},
//				text: '«',
				weight: -100,
				onClick: function() {
					this.rise('page#first');
				}
			},
			prevButton: {
//				etype: 'button',
//				state: 'flat tool',
//				text: '<',
				components: {
					content: {
						as: 'icon move prev'
					}
				},
				weight: -50,
				onClick: function() {
					this.rise('page#prev');
				}
			},
			nextButton: {
//				etype: 'button',
//				state: 'flat tool',
//				text: '>',
				components: {
					content: {
						as: 'icon move next'
					}
				},
				weight: 50,
				onClick: function() {
					this.rise('page#next');
				}
			},
			lastButton: {
				components: {
					content: {
						as: 'icon move last'
					}
				},
				// etype: 'button',
				// state: 'flat tool',
//				text: '»',
				weight: 100,
				onClick: function() {
					this.rise('page#last');
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
					as: 'underlined',
					onChange: function(e) {

						var i = parseInt(e.text);

						this.toggle('invalid', (isNaN(i) || (i).toString().length != e.text.length));

						if( !this.is('invalid') )
							this.rise('page#change', {index: i});

					}
				},
				' из ',
				{
					etype: '.'
				}]

			}
		},

		events: {
			'page#first': function(e) {
				this.rise('changeDataIndex', {index: 1});
			},
			'page#last': function(e) {
				this.rise('changeDataIndex', {index: this.data.opt('count')});
			},
			'page#next': function(e) {
				var i = this.data.opt('index')+1;
				if( i <= this.data.opt('count') )
					this.rise('changeDataIndex', {index: i});
			},
			'page#prev': function(e) {
				var i = this.data.opt('index')-1;
				if( i > 0 )
					this.rise('changeDataIndex', {index: i});
			},
			'page#change': function(e) {
				var i = e.index;
				if( !isNaN(i) && i > 0 && i <= this.data.opt('count') )
					this.rise('changeDataIndex', {index: e.index});
//				this.states.set('invalid');
//					this.opt('value', this.opt('value'));

			}
		},

		binding: function(v) {

			this.$current.item(1).opt('value', this.data.opt('index'));
			this.$current.item(3).opt('text', this.data.opt('count'));

		}


	}



}, 'widgets:grid-pagination');
