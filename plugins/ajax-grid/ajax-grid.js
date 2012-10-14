


Ergo.declare('Ergo.widgets.IconButton', 'Ergo.widgets.Button', {
	
	defaults: {
		cls: 'e-icon-button',
		
		components: {
			icon: {
				etype: 'icon'
			}
		},
		
		
		set: {
			'text': function(v) {
				this.icon.opt('text', v);
			},
			'icon': function(v) {
				this.icon.states.only(v);
			}
		}
		
	}
	
}, 'icon-button');





Ergo.declare('Ergo.widgets.ToolboxHeader', 'Ergo.widgets.Box', {
	
	defaults: {
		cls: 'e-toolbox-header',
		
		components: {
			title: {
				cls: 'title',
			},
			toolbox: {
				cls: 'toolbox',
				layout: 'hbox',
				defaultItem: {
					etype: 'button-item'
				}
			}			
		}
		
	},
	
	
	$init: function(o) {
		this.$super(o);
		
		if(o.tools) {
			Ergo.smart_override(o.components.toolbox, {items: o.tools});
		}
	}
	
	
	
}, 'toolbox-header');









Ergo.declare('Ergo.widgets.ToolBox', 'Ergo.widgets.Box', {
	
	defaults: {
		cls: 'e-tool-box',
		layout: 'hbox'
	}
	
	
	
}, 'tool-box');	








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
			text: 'Страница'
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
			
			if(action == 'current') {
				i = Math.max(0, e.index);
				i = Math.min(Math.floor(this.data.options.totalCount/this.data.options.pageSize), i);
			}
			else if(action == 'first') i = 0;
			else if(action == 'previous') i = Math.max(0, i-1);
			else if(action == 'next') i = Math.min(Math.floor(this.data.options.totalCount/this.data.options.pageSize), i+1);
			else if(action == 'last') i = Math.floor(this.data.options.totalCount/this.data.options.pageSize);
			
			this._page_index = i;
			
			var from = i * this.data.options.pageSize;
			var to = (i+1) * this.data.options.pageSize;
			
			this.data.opt('from', from);
			this.data.opt('to', to);
			
			
			
			this.item({tag: 'current'}).el.val(i);//.opt('value', i);

			var self = this;

			this.data.fetch().then(function(){
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





/*
Ergo.declare_mixin('Ergo.mixins.Pageable', function(o) {
	
	this._from = 0;
	this._to = 0;
	this._count = 0;
	this._page_size = 0;
	
	
	
	o.parse = function(json) {
		
		
		
		
		return json;
	};
	
	
	this.setPageSize = function(sz) {
		this._page_size = sz;
	};
	
	
	
}, 'pageable');
*/







Ergo.declare('Ergo.plugns.AjaxGridPanel', 'Ergo.widgets.Panel', {
	
	defaults: {
		
		components: {
			
			header: {
				etype: 'toolbox-header',
				autoBind: false
			},
			
			content: {
				etype: 'table-grid',
				
				content: {
					autoHeight: true						
				}
			},
			
			footer: {
				content: {
					etype: 'tool-box',
					items: [{
						etype: 'icon-button',
						icon: 'icon-refresh'
					}, {
						cls: 'e-splitter'
					}, {
						etype: 'grid-paginator',
					}]
				},
				hidden: false						
			}
			
		},
		
		onPageChanged: function(e) {
			
			this.$layoutChanged();
			
			e.stop();
		}
		
	}
	
	
}, 'ajax-grid-panel');

