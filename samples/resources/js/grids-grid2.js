


Ergo.layouts.Grid2Layout = Ergo.declare('Ergo.layouts.Grid2Layout', 'Ergo.layouts.PlainLayout', {
	
	
	attach: function(c) {
		this.$super(c);
		
		var row = $('<tr class="control-row"/>');
		for(var i = 0; i < c.options.columns.length; i++) {
			var col = c.options.columns[i];
			var el = $('<td/>');
			console.log(col);
			if('width' in col) el.width(col.width);
			row.append(el);
		}
		
		this.columns_el = row;
		
		this.el.append(this.columns_el);
	},
	
	
	
	clear: function() {
		this.columns_el.detach();
		this.$super();
		this.el.append(this.columns_el);
	}
	
	
	
	
}, 'grid2-layout');







Ergo.widgets.Grid2 = Ergo.declare('Ergo.widgets.Grid2', 'Ergo.core.Container', {
	
	defaults: {
		html: '<table cellspacing="0"></table>',
		style: {'border-collapse': 'collapse', 'table-layout': 'fixed'},
		width: '100%',
		layout: 'grid2',
		defaultItem: {
			etype: 'table-row'
		},
		columns: []
	},
	
	
	$init: function(o) {
		this.$super(o);
//		Ergo.widgets.Grid.superclass.$init.apply(this, arguments);
		
		// var cols = [];
		// Ergo.each(o.columns, function(col){
			// var w = ('width' in col) ? {width: col.width} : {};
			// delete col.width;
			// cols.push(w);
		// });
		
		Ergo.smart_override(o.defaultItem, o.row, {defaultItem: o.cell, items: o.columns});
//		Ergo.smart_override(o.components.cols, {items: cols});
		
	}
	
	// row: function(i) {
		// return this.item(i);
	// }
	
	
	
}, 'grid2');







var grid = $.ergo({
	etype: 'grid2',
	renderTo: '.preview',
	
	cls: 'e-grid e-border-all',
	
	data: Samples.generate_grid_page(0, 100),
	
	dynamic: true,
	
	columns: [{
		dataId: 'id',
		width: 60
	}, {
		dataId: 'string'
	}, {
		dataId: 'number'
	}],
	
	row: {
		cls: 'e-grid-row'
	},
	
	cell: {
		cls: 'e-grid-cell'
	}
	
	
});


