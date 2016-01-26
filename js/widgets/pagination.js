

Ergo.defineClass('Ergo.widgets.Pagination', 'Ergo.widgets.List', {

	defaults: {

		cls: 'pagination',
//		mixins: ['selectable'],
		include: 'selectable',
		dynamic: false,  // отключаем динамическое построение элементов
		components: {
			nextBtn: {
				etype: 'html:li',
				weight: 100,
				$content: {
					etype: 'html:a',
					text: '»',
					binding: false,
					events: {
						'jquery:mousedown': function(e) {
							this.events.rise('index#next');
							e.preventDefault(); // блокируем выделение текста
						}
					}
				}
			},
			prevBtn: {
				etype: 'html:li',
				weight: -100,
				$content: {
					etype: 'html:a',
					text: '«',
					binding: false,
					events: {
						'jquery:mousedown': function(e) {
							this.events.rise('index#prev');
							e.preventDefault(); // блокируем выделение текста
						}
					}
				}
			}
		},
		defaultItem: {
			$content: {
				etype: 'html:a',
				events: {
					'jquery:mousedown': function(e) {
	//				this.parent.parent.opt('index', this.parent);
						var index = parseInt( this.parent.opt('name') );
						if(index)
							this.events.rise('index#change', {index: index});
						e.preventDefault(); // блокируем выделение текста
					}
				}
			},
			autoBind: false
		},
		// выборка происходит только по имени
		// lookup: function(key) {
		// 	return this.item( Ergo.by_opts.curry({name: key}) );
		// },

		selection: {
			lookup: function(key) {
				return this.item( Ergo.by_opts.curry({name: key}) );
			}
		},


		binding: function(v) {
			this.opt('dataIndex', this.data.opt('index'));
		},


		events: {
			'index#next': function(e) {
				var i = this.data.opt('index')+1;
				if( i <= this.data.opt('count') )
					this.events.rise('changeDataIndex', {index: i});
			},
			'index#prev': function(e) {
				var i = this.data.opt('index')-1;
				if( i > 0 )
					this.events.rise('changeDataIndex', {index: i});
			},
			'index#change': function(e) {
				this.events.rise('changeDataIndex', {index: e.index});
			}
		}

	},





	set dataIndex(index) {

		var count = this.data.opt('count');

		var before_pages = 2;
		var after_pages = 2;
		var wrap_pages = 2;

		this.items.apply_all('_destroy');

		var min_float = Math.min(before_pages, count);
		var max_float = Math.max(min_float, count-after_pages);
		var min_block = Math.max(min_float, index-wrap_pages-1);
		var max_block = Math.min(max_float, index+wrap_pages);

		// BEFORE
		for(var i = 0; i < min_float; i++)
			this.items.add({text: i+1, name: i+1});

		if(min_block - min_float > 0)
			this.items.add({text: '...'});

		for(var i = min_block; i < max_block; i++)
			this.items.add({text: i+1, name: i+1});

		if(max_float - max_block > 0)
			this.items.add({text: '...'});

		// AFTER
		for(var i = max_float; i < count; i++)
			this.items.add({text: i+1, name: i+1});

		this.render();

		this.selection.set(index);

//		this.opt('selected', index);

//		data.opt('index', index);
//		data.fetch();

		this.events.fire('dataIndexChanged', {index: index});  //?
	}



}, 'widgets:pagination');
