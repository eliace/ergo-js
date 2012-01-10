
//= require <widgets/table>


/**
 * 
 * @class
 */

/*
Ergo.layouts.GridLayout = Ergo.declare('Ergo.layouts.GridLayout', 'Ergo.layouts.PlainLayout', {
	
	
	attach: function(c) {
		this.$super(c);
		
		var row = $('<tr/>');
		for(var i = 0; i < c.options.columns.length; i++) {
			var col = Ergo.smart_override({}, c.options.cell, c.options.columns[i]);
			var el = $('<td class="e-grid-cell"/>');
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
	
	
	
	
}, 'grid-layout');
*/






Ergo.widgets.Grid = Ergo.declare('Ergo.widgets.Grid', 'Ergo.core.Widget', {
	
	defaults: {
		html: '<table cellspacing="0"></table>',
		style: {'border-collapse': 'collapse', 'table-layout': 'fixed'},
		width: '100%',
//		layout: 'grid',
		defaultItem: {
			etype: 'table-row'
		},
		components: {
			cols: {
				etype: 'table-row',
				baseCls: 'control',
				height: 0,
				weight: -10
			}			
		},
		columns: []
	},
	
	
	$init: function(o) {
		this.$super(o);
//		Ergo.widgets.Grid.superclass.$init.apply(this, arguments);
		
		var cols = [];
		Ergo.each(o.columns, function(col){
			var w = ('width' in col) ? {width: col.width} : {};
			delete col.width;
			cols.push(w);
		});
		
		Ergo.smart_override(o.defaultItem, o.row, {defaultItem: o.cell, items: o.columns});
		Ergo.smart_override(o.components.cols, {items: cols});
		
	}
	
	// row: function(i) {
		// return this.item(i);
	// }
	
	
	
}, 'grid');





/*
Ergo.widgets.Grid = Ergo.declare('Ergo.widgets.Grid', 'Ergo.core.Container', {
	
	defaults: {
		html: '<table cellspacing="0"></table>',
		style: {'border-collapse': 'collapse', 'table-layout': 'fixed'},
		width: '100%',
		dynamic: true,
		defaultItem: {
			etype: 'table-row'
		},
		components: {
			cols: {
				etype: 'table-row'
			}
		},
		gridModel: {
			row: {},
			cell: {},
			columns: []
		}
	},
	
	
	$init: function(o) {
		this.$super(o);
//		Ergo.widgets.Grid.superclass.$init.apply(this, arguments);
		
		var cols = [];
		Ergo.each(o.gridModel.columns, function(col){
			var w = ('width' in col) ? {width: col.width} : {};
			delete col.width;
			cols.push(w);
		});
		
		Ergo.smart_override(o.defaultItem, o.gridModel.row, {defaultItem: o.gridModel.cell, items: o.gridModel.columns});
		Ergo.smart_override(o.components.cols, {items: cols});		
		
	}
	
	// row: function(i) {
		// return this.item(i);
	// }
	
	
	
}, 'grid');

*/








