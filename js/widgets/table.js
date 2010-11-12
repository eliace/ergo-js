


Dino.declare('Dino.widgets.Table', 'Dino.Widget', {
	
	defaultOptions: {
		components: {
//			colgroup: {
//				dtype: 'box',
//				wrapEl: '<colgroup></colgroup>',
//				defaultItem: {
//					dtype: 'box',
//					wrapEl: '<col></col>'
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
		var g_columns = [];
		
		
//		for(var i = 0; i < h_columns.length; i++) {
//			var col = {}
//			if('width' in h_columns[i]) col.width = h_columns[i].width;
//			g_columns[i] = col;
//		}
//		
//		
//		for(var i = 0; i < columns.length; i++) {
//			var col = {}
//			if('width' in columns[i]) col.width = columns[i].width;
//			g_columns[i] = col;
//		}
//		
//		
//		
//		Dino.utils.overrideOpts(
//				o.components.colgroup, 
//				{items: g_columns}
//				);
		
		
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
		binding: 'skip',
		editor: {
			dtype: 'textfield',
			events: {
				'blur': function(e, w) { w.parent.stopEdit(); }
			},
			onValueChanged: function() {
				this.parent.stopEdit();
			}		
		}
//		cls: 'dino-table-cell'
	},
	
	_dataChanged: function() {
		
		if(this.options.binding != 'skip')
			this.el.text( this.getValue() );
		
		Dino.widgets.TableCell.superclass._dataChanged.apply(this);
	},
	
	getRow: function() {
		return this.parent;
	},
	
	startEdit: function() {
		
		this.el.empty();
		
		this.addComponent('_editor', this.options.editor);
		
		this._editor.setData(this.data);
		this._editor._dataChanged(); // явно вызываем обновление данных
		this._editor.el.focus();
		this._editor.el.select();
	},
	
	stopEdit: function() {
		this.removeComponent('_editor');
		this._dataChanged(); // явно вызываем обновление данных
		this.events.fire('onEdit');
	}	
	
	
}, 'table-cell');




