


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
				}
			},
			body: {
				dtype: 'list',
				wrapEl: '<tbody></tbody>',
				defaultItem: {
					dtype: 'box',
					wrapEl: '<tr></tr>',
					defaultItem: {
						wrapEl: '<td></td>'
					}
				}
			}
		}
	},
	
	_html: function() { return '<table cellspacing="0" cellpadding="0" border="0"></table>'; },

	
	_init: function() {
		Dino.widgets.Table.superclass._init.apply(this, arguments);
		
		var columns = this.options.columns;
		
		var headRow = {items: []};
		var cells = [];
		var cols = [];
		
		for(var i = 0; i < columns.length; i++){
			var c = columns[i];
			
			var col = Dino.utils.overrideOpts({text: columns[i].label}, c.header);
			if('width' in c) col.width = c.width;
			headRow.items.push(col);
			
//			var col = {};
//			if('width' in columns[i]) col.width = columns[i].width;
//			cols.push(col);
			
			cells.push(c);
		}
		
//		this.options.components.colgroup.items = cols;
		this.options.components.head.items = [headRow];
		this.options.components.body.defaultItem.items = cells;
	}
	
	
//	_opt: function(o) {
//		Dino.containers.Table.superclass._opt.call(this, o);
//		
//		
//	}
	
	
}, 'table');




Dino.declare('Dino.widgets.Table.Body', 'Dino.Container', {
	
	defaultOptions: {
//		itemFactory
	},
	
	_html: function() { return '<tbody></tbody>'; }
	
	
	
}, 'table-body');



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