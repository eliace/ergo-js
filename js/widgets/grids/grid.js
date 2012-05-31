



Ergo.declare('Ergo.widgets.grid.Grid', 'Ergo.widgets.Box', {
	
	defaults: {
		html: '<table cellspacing="0" cellpadding="0"/>',
		
		layout: {
			etype: 'layouts:default',
			html: '<tbody/>'
		},
		
		cls: 'e-grid',
		
		components: {
			control: {
				etype: 'grid-row',
				cls: 'e-grid-control-row',
				weight: -1
			}
		},
		
		defaultItem: {
			etype: 'grid-row'
		},
		
		dynamic: true,
		
		columns: [],
		row: {},
		cell: {}		
		
	},
	
	
	$init: function(o) {
		this.$super(o);
		
		var control_cols = [];
		for(var i = 0; i < o.columns.length; i++) {
			var c = o.columns[i];
			var col = {};
			if(c.width) {
				col.width = c.width;
				delete c.width;
			}
			control_cols.push(col);
		}
		
		
		Ergo.smart_override(o.defaultItem, o.row, {items: o.columns, defaultItem: o.cell});
		Ergo.smart_override(o.components.control, {items: control_cols});
		
	}
	
}, 'grid');




Ergo.declare('Ergo.widgets.grid.Row','Ergo.widgets.Box', {
	
	defaults: {
		html: '<tr/>',
		
		defaultItem: {
			etype: 'grid-cell'
		}
	},
	
	column: function(i) {
		return this.item(i);
	}
	
	
}, 'grid-row');



Ergo.declare('Ergo.widgets.grid.Cell','Ergo.widgets.Box', {
	
	defaults: {
		html: '<td/>',
		binding: function(v) { this.layout.el.text(v); }		
	}
	
	
}, 'grid-cell');

















