



Ergo.defineClass('Bootstrap.widgets.TableRow', 'Ergo.widgets.Box', {
	
	defaults: {
		html: '<tr/>',
		states: {
			'active': 'active',
			'success:context': 'success',
			'warning:context': 'warning',
			'info:context': 'info',
			'danger:context': 'danger'
		},
		defaultItem: {
			html: '<td/>',
			states: {
				'active': 'active',
				'success:context': 'success',
				'warning:context': 'warning',
				'info:context': 'info',
				'danger:context': 'danger'
			},
			set: {
				'rowspan': function(v) { this.el.attr('rowspan', v); },
				'colspan': function(v) { this.el.attr('colspan', v); }
			}
		}
	}
	
}, 'bootstrap:table-row');



Ergo.defineClass('Bootstrap.widgets.Table', 'Ergo.widgets.Box', {
	
	defaults: {
		html: '<table/>',
		cls: 'table',
		states: {
			'striped': 'table-striped',
			'bordered': 'table-bordered',
			'hovered': 'table-hover',
			'condensed': 'table-condensed'
		},
		components: {
			head: {
				html: '<thead/>',
				defaultItem: {
					etype: 'bootstrap:table-row',
					defaultItem: {
						html: '<th/>'
					}
				}
			},
			body: {
				html: '<tbody/>',
				defaultItem: {
					etype: 'bootstrap:table-row'
				}
			}
		}
	},
	
	
	
	
	$pre_construct: function(o) {
		this.$super(o);
		
		if('columns' in o) {
			
			var hcols = [];
			Ergo.each(o.columns, function(c){
				hcols.push(c);
			});
			
			Ergo.smart_override(o.components.head, {items: [{items: hcols}]});
			
		}
		
		if('rows' in o) {

			Ergo.smart_override(o.components.body, {items: o.rows});
			
		}
		
	},
	
	
	
	
	$construct: function(o) {
		this.$super(o);
		
		var self = this;
		
		this._columns = new Bootstrap.table.Columns(this);
		
		if('columns' in o) {
			// Ergo.each(o.columns, function(c, i){
				// self._columns.add(o.columns);			
			// });
			
			
			
		}
		
	}
	
}, 'bootstrap:table');



// mixin?
Ergo.defineClass('Bootstrap.table.Columns', 'Ergo.core.Object', {
	
	initialize: function(w, o) {
		this.$super(null, o);
		
		this._widget = w;
	},
	
	
	add: function(o) {
		this.head.items.add();
	}
	
	
	
});

