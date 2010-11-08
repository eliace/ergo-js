


Dino.declare('Dino.widgets.Table', 'Dino.Widget', {
	
	defaultOptions: {
		components: {
//			colgroup: {
//				dtype: 'box',
//				wrapEl: '<colgroup></colgroup>',
//				defaultItem: {
//					wrapEl: '<col>'
//				}
//			},
			head: {
				dtype: 'box',
				wrapEl: '<thead></thead>',
				defaultItem: {
					dtype: 'box',
					wrapEl: '<tr></tr>',
					defaultItem: {
						wrapEl: '<th></th>'
					}
				},
				binding: false
			},
			body: {
				dtype: 'box',
				dynamic: true,
				wrapEl: '<tbody></tbody>',
				defaultItem: {
					dtype: 'table-row'
				}
			}
		},
		tableModel: {
			row: {},
			cell: {},
//			header: {},
			columns: []
		},
		headerModel: {
			row: {},
			cell: {},
			columns: []
		}
	},
	
	_html: function() { return '<table cellspacing="0" cellpadding="0" border="0"></table>'; },

	
	_init: function() {
		Dino.widgets.Table.superclass._init.apply(this, arguments);
		
		var o = this.options;
		
		var h_columns = o.headerModel.columns;
		var columns = o.tableModel.columns;
		
//		var headRow = {items: []};
//		var h_cells = [];
//		var cells = [];
//		var cols = [];
		
//		for(var i = 0; i < columns.length; i++){
//			var h_c = h_columns[i];
//			var c = columns[i];
			
//			var col = Dino.utils.overrideOpts({text: columns[i].title}, o.tableModel.header, c.header);
//			if('width' in c) col.width = c.width;
//			headRow.items.push(col);
			
//			var col = {};
//			if('width' in columns[i]) col.width = columns[i].width;
//			cols.push(col);
			
//			h_cells.push(h_c);
//			cells.push(c);
//		}
				
//		this.options.components.colgroup.items = cols;
//		this.options.components.head.items = [headRow];
		
		Dino.utils.overrideOpts(
				o.components.body.defaultItem, 
				o.tableModel.row, 
				{defaultItem: o.tableModel.cell},
				{items: columns}
				);
		
		Dino.utils.overrideOpts(
				o.components.head.defaultItem, 
				o.headerModel.row,
				{defaultItem: o.headerModel.cell},
				{items: h_columns}
				);
		
		o.components.head.items = [{}];
		
	},
	
	
	_updateEvenOdd: function() {
		var i = 0;
		$('tr:visible', this.body.el).each(function(i, el){
			if(i%2)
				$(el).removeClass('even').addClass('odd');
			else
				$(el).addClass('even').removeClass('odd');
		});
	},
	
	eachRow: function(callback) {
		this.body.eachItem(callback);
	}
	
	
//	_opt: function(o) {
//		Dino.containers.Table.superclass._opt.call(this, o);
//		
//		
//	}
	
	
}, 'table');




Dino.declare('Dino.widgets.TableRow', 'Dino.Container', {
	
	_html: function() { return '<tr></tr>'; },
	
	defaultOptions: {
		defaultItem: {
			dtype: 'table-cell'
		}
	},
	
	getTable: function() {
		return this.el.parents('table').dino(); 
		//TODO хотя здесь можно сделать быстрее
//		return this.getParent().getParent();
	}
	
	
}, 'table-row');




Dino.declare('Dino.widgets.TableCell', 'Dino.Widget', {
	
	_html: function() { return '<td></td>'; },
	
	defaultOptions: {
		binding: 'skip'
//		cls: 'dino-table-cell'
	},
	
	_dataChanged: function() {
		
		if(this.options.binding != 'skip')
			this.el.text( this.getValue() );
		
		Dino.widgets.TableCell.superclass._dataChanged.apply(this);
	},
	
	getRow: function() {
		return this.parent;
	}
	
}, 'table-cell');





/*
Dino.declare('Dino.widgets.TreeTableRow', 'Dino.Container', {
	
	_html: function() { return '<tr></tr>'; },
	
	defaultOptions: {
		defaultItem: {
			dtype: 'table-cell'
		}
	}
	
	
}, 'table-row');
*/




//Dino.declare






/*
Dino.declare('Dino.widgets.Table.Body', 'Dino.Container', {
	
	defaultOptions: {
//		itemFactory
	},
	
	_html: function() { return '<tbody></tbody>'; }
	
	
	
}, 'table-body');
*/


/*
Dino.declare('Dino.containers.TableRow', 'Dino.Container', {
	
	defaultOptions: {
		itemFactory: function(o) {
			return new Dino.Widget('<td></td>', o);
		}
	},
	
	_html: function() { return '<tr></tr>'; },
	
	_opt: function(o) {
		Dino.containers.TableRow.superclass._opt.call(this, o);
		
		for(var i in o.columns) {
			var col = o.columns[i];
			thia.addItem(o.columns);
		}
		
	}
	
}, 'table-row');
*/