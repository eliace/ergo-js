
//= require <core/container>


/**
 * @class
 * @extends Ergo.core.Widget
 */
Ergo.widgets.Table = Ergo.declare('Ergo.widgets.Table', 'Ergo.core.Widget', /** @lends Ergo.widgets.Table.prototype */{
	
	defaults: {
		components: {
//			colgroup: {
//				etype: 'box',
//				wrapEl: '<colgroup></colgroup>',
//				defaultItem: {
//					etype: 'box',
//					wrapEl: '<col></col>'
//				}
//			},
			head: {
				etype: 'container',
				html: '<thead></thead>',
				defaultItem: {
					etype: 'container',
					html: '<tr></tr>',
					defaultItem: {
						etype: 'table-header-cell'
//						wrapEl: '<th></th>'
					}
				},
				binding: false
			},
			body: {
				etype: 'container',
				dynamic: true,
				html: '<tbody></tbody>',
				defaultItem: {
					etype: 'table-row'
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
			columns: [],
			rows: [{}]
		}
	},
	
	$html: function() { return '<table cellspacing="0" cellpadding="0" border="0"></table>'; },

	
	$init: function() {
		Ergo.widgets.Table.superclass.$init.apply(this, arguments);
		
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
//		Ergo.smart_override(
//				o.components.colgroup, 
//				{items: g_columns}
//				);
		
		
		Ergo.smart_override(
				o.components.body.defaultItem, 
				o.tableModel.row, 
				{defaultItem: o.tableModel.cell},
				{items: columns}
				);
		
		Ergo.smart_override(
				o.components.head.defaultItem, 
				o.headerModel.row,
				{defaultItem: o.headerModel.cell},
				{items: h_columns}
				);
		
		o.components.head.items = o.headerModel.rows;//[{}];
		
	},
	
	
	eachRow: function(callback) {
		this.body.items.each(callback);
	},
	
	getRow: function(i) {
		return this.body.item(i);
	}
	
	
//	$opt: function(o) {
//		Ergo.containers.Table.superclass.$opt.call(this, o);
//		
//		
//	}
	
	
}, 'table');



/**
 * @class
 * @extends Ergo.core.Container
 */
Ergo.widgets.TableRow = Ergo.declare('Ergo.widgets.TableRow', 'Ergo.core.Container', /** @lends Ergo.widgets.TableRow.prototype */{
	
	defaults: {
		html: '<tr></tr>',
		defaultItem: {
			etype: 'table-cell'
		}
	},
	
	getTable: function() {
		return this.el.parents('table').ergo(); 
		//TODO хотя здесь можно сделать быстрее
//		return this.getParent().getParent();
	},
	
	getColumn: function(i) {
		return this.item(i);
	}
	
}, 'table-row');




/**
 * @class
 * @extends Ergo.core.Widget
 */
Ergo.widgets.TableCell = Ergo.declare('Ergo.widgets.TableCell', 'Ergo.core.Widget', /** @lends Ergo.widgets.TableCell.prototype */{
	
//	$html: function() { return '<td></td>'; },
	
	defaults: {
		html: '<td/>'
//		binding: 'skip'		
	},
		
	$dataChanged: function() {
		
		if(this.options.binding == 'auto')
			this.layout.el.text( this.getValue() );
		
		Ergo.widgets.TableCell.superclass.$dataChanged.apply(this);
	},
	
	getRow: function() {
		return this.parent;
	}
	
//	startEdit: function() {
//		
//		this.layout.el.empty(); //FIXME на соотв. метод компоновки
//		
//		this.addComponent('_editor', this.options.editor);
//		
//		var dw = this._editor.el.outerWidth(true) - this._editor.el.width();
//		var w = this._editor.el.parent().width();
//		this._editor.el.width(w - dw);
//
//		var dh = this._editor.el.outerHeight(true) - this._editor.el.height();
//		var h = this._editor.el.parent().height();
//		this._editor.el.height(h - dh);
//
//		this._editor.bind(this.data);
//		this._editor.$dataChanged(); // явно вызываем обновление данных
//		this._editor.el.focus();
//		this._editor.el.select();
//	},
//	
//	stopEdit: function() {
//		this.removeComponent('_editor').destroy(); // удаляем и уничтожаем компонент
//		this.$dataChanged(); // явно вызываем обновление данных
//		this.events.fire('onEdit');
//	}	
	
	
}, 'table-cell');



/**
 * @class
 * @extends Ergo.core.Widget
 */
Ergo.widgets.TableHeaderCell = Ergo.declare('Ergo.widgets.TableHeaderCell', 'Ergo.core.Widget', /** @lends Ergo.widgets.TableHeaderCell.prototype */{
	
	$html: function() { return '<th></th>'; },
	
	defaults: {
		binding: 'skip'
		// set: {
			// 'text': function(v) {
				// this.layout.el.text(t);
			// }
		// }
	},
	
	
	
	
	// $opt: function(o) {
		// Ergo.widgets.TableHeaderCell.superclass.$opt.apply(this, arguments);
// 		
		// if('text' in o) this.setText(o.text);
// 		
	// },
// 	
	// setText: function(t) {
		// this.layout.el.text(t);
	// },
	
	
	$dataChanged: function() {
		
		if(this.options.binding == 'auto')
			this.layout.el.text( this.getValue() );
		
		Ergo.widgets.TableCell.superclass.$dataChanged.apply(this);
	}
	
}, 'table-header-cell');






