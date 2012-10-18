










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
				etype: 'header-box',
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
						etype: 'grid-paginator'
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

