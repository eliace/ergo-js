
//= require <widgets/natives/box>


Ergo.declare('Ergo.widgets.grid.Header', 'Ergo.widgets.Box', {
	
	defaults: {
		html: '<table cellspacing="0" cellpadding="0"/>',
		
		layout: {
			etype: 'layouts:default',
			html: '<thead/>'
		},
		
		cls: 'e-grid-header',
		
		defaultItem: {
			etype: 'grid-header-row'
		},
		
		components: {
			control: {
				etype: 'grid-row',
				cls: 'e-grid-control-row',
				weight: -1,
				defaultItem: {
					etype: 'grid-header-cell'
				}				
			}
		},
		
		autoBind: false,
		
		columns: [],
		row: {},
		cell: {},
		
		items: [{}]
	},
	
	
	$pre_construct: function(o) {
		this.$super(o);
		
		var control_cols = [];
		for(var i = 0; i < o.columns.length; i++) {
			var c = o.columns[i];
			var col = {};
			if(c.width) {
				col.width = c.width;
				delete c.width;
			}
			if(c.hidden) {
				col.hidden = c.hidden;
			}
			control_cols.push(col);
		}
		
		
		Ergo.smart_override(o.defaultItem, o.row, {items: o.columns, defaultItem: o.cell});
		Ergo.smart_override(o.components.control, {items: control_cols});
		
	}
	
	
	
}, 'grid-header');



Ergo.declare('Ergo.widgets.grid.HeaderRow','Ergo.widgets.Box', {
	
	defaults: {
		html: '<tr/>',
		
		defaultItem: {
			etype: 'grid-header-cell'
		}
	},
	
	column: function(i) {
		return this.item(i);
	}
	
}, 'grid-header-row');



Ergo.declare('Ergo.widgets.grid.HeaderCell','Ergo.widgets.Box', {
	
	defaults: {
		html: '<th/>',
		layout: {
			html: '<span/>'
		},
		binding: function(v) { this.opt('text', v); }
	}
	
	
}, 'grid-header-cell');









