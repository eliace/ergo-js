

Ergo.declare('Ergo.widgets.GridPaginator', 'Ergo.widgets.Box', {
	
	defaults: {
		cls: 'e-grid-paginator',
		
		defaultItem: {
			etype: 'icon-button'
		},
		
		items: [{
			icon: 'icon-backward', 
			tag: 'first',
			onClick: function() {
				this.events.bubble('pageChange');
			}
		}, {
			icon: 'icon-caret-left',
			tag: 'previous',
			onClick: function() {
				this.events.bubble('pageChange');
			}
		}, {
			etype: 'text', 
			text: 'Страница',
			autoBind: false
		}, {
			etype: 'text-input',
			tag: 'current',
			onDataChanged: function() {
				var i = parseInt( this.opt('value') );
				if(!isNaN(i))	
					this.events.bubble('pageChange', {index: i});	
			},
			autoBind: false // отключаем авто-биндинг, теперь для хранения значения используется поле _value
		}, {
			etype: 'text',
			tag: 'total',
			format: Ergo.format.curry('из %s'),
			autoBind: false
		}, {
			icon: 'icon-caret-right',
			tag: 'next',
			onClick: function() {
				this.events.bubble('pageChange');
			}
		}, {
			icon: 'icon-forward',
			tag: 'last',
			onClick: function() {
				this.events.bubble('pageChange');
			}
		}],
		
		
		onPageChange: function(e) {
			
			var action = e.target.tag;
			
			var i = this._page_index;
			
			var page_count = this.data.opt('pageCount');// Math.floor(this.data.options.totalCount/this.data.options.pageSize);
			
			if(action == 'current') {
				i = Math.max(1, e.index);
				i = Math.min(page_count, i);
			}
			else if(action == 'first') i = 1;
			else if(action == 'previous') i = Math.max(1, i-1);
			else if(action == 'next') i = Math.min(page_count, i+1);
			else if(action == 'last') i = page_count;
			
			this._page_index = i;
			
			var from = (i-1) * this.data.options.pageSize;
			var to = i * this.data.options.pageSize;
			
			this.data.opt('from', from);
			this.data.opt('to', to);
			
			
			
			this.item({tag: 'current'}).el.val(i);//.opt('value', i);

			var self = this;

			this.data.fetch().then(function(){
//				var page_count = ; //Math.floor(self.data.options.totalCount/self.data.options.pageSize);
				self.item({tag: 'total'}).opt('text', ' из '+self.data.opt('pageCount'));
				self.events.bubble('pageChanged', {index: i});				
			});
			
			
			
			e.stop();
		}
				
		
		
		// setMaxIndex: function(i) {
			// this._max_index = i;
		// },
// 		
// 		
		// setPageSize: function(sz) {
			// this._page_size = sz;
		// },
		
		
		
	},
	
	
	setIndex: function(i) {
		
		this._page_index = i;
					
		this.item({tag: 'current'}).opt('value', i);
		
	}	
	
	
	
}, 'grid-paginator');
