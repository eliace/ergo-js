
//= require <core/container>


/**
 * @class
 * @extends Dino.core.Widget
 */
Dino.widgets.Table = Dino.declare('Dino.widgets.Table', 'Dino.core.Widget', /** @lends Dino.widgets.Table.prototype */{
	
	defaults: {
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
				dtype: 'container',
				html: '<thead></thead>',
				defaultItem: {
					dtype: 'container',
					html: '<tr></tr>',
					defaultItem: {
						dtype: 'table-header-cell'
//						wrapEl: '<th></th>'
					}
				},
				binding: false
			},
			body: {
				dtype: 'container',
				dynamic: true,
				html: '<tbody></tbody>',
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
	
	$html: function() { return '<table cellspacing="0" cellpadding="0" border="0"></table>'; },

	
	$init: function() {
		Dino.widgets.Table.superclass.$init.apply(this, arguments);
		
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
//		Dino.smart_override(
//				o.components.colgroup, 
//				{items: g_columns}
//				);
		
		
		Dino.smart_override(
				o.components.body.defaultItem, 
				o.tableModel.row, 
				{defaultItem: o.tableModel.cell},
				{items: columns}
				);
		
		Dino.smart_override(
				o.components.head.defaultItem, 
				o.headerModel.row,
				{defaultItem: o.headerModel.cell},
				{items: h_columns}
				);
		
		o.components.head.items = [{}];
		
	},
	
	
	eachRow: function(callback) {
		this.body.eachItem(callback);
	},
	
	getRow: function(i) {
		return this.body.getItem(i);
	}
	
	
//	$opt: function(o) {
//		Dino.containers.Table.superclass.$opt.call(this, o);
//		
//		
//	}
	
	
}, 'table');



/**
 * @class
 * @extends Dino.Container
 */
Dino.widgets.TableRow = Dino.declare('Dino.widgets.TableRow', 'Dino.Container', /** @lends Dino.widgets.TableRow.prototype */{
	
	$html: function() { return '<tr></tr>'; },
	
	defaults: {
		defaultItem: {
			dtype: 'table-cell'
		}
	},
	
	getTable: function() {
		return this.el.parents('table').dino(); 
		//TODO хотя здесь можно сделать быстрее
//		return this.getParent().getParent();
	},
	
	getColumn: function(i) {
		return this.getItem(i);
	}
	
	
}, 'table-row');




/**
 * @class
 * @extends Dino.core.Widget
 */
Dino.widgets.TableCell = Dino.declare('Dino.widgets.TableCell', 'Dino.core.Widget', /** @lends Dino.widgets.TableCell.prototype */{
	
	$html: function() { return '<td></td>'; },
	
//	defaults: {
//		binding: 'skip'		
//	},
		
	$dataChanged: function() {
		
		if(this.options.binding == 'auto')
			this.layout.el.text( this.getValue() );
		
		Dino.widgets.TableCell.superclass.$dataChanged.apply(this);
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
//		this._editor.$bind(this.data);
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
 * @extends Dino.core.Widget
 */
Dino.widgets.TableHeaderCell = Dino.declare('Dino.widgets.TableHeaderCell', 'Dino.core.Widget', /** @lends Dino.widgets.TableHeaderCell.prototype */{
	
	$html: function() { return '<th></th>'; },
	
	defaults: {
		binding: 'skip'
	},
	
	$opt: function(o) {
		Dino.widgets.TableHeaderCell.superclass.$opt.apply(this, arguments);
		
		if('text' in o) this.layout.el.text(o.text);
		
	},
	
	
	$dataChanged: function() {
		
		if(this.options.binding == 'auto')
			this.layout.el.text( this.getValue() );
		
		Dino.widgets.TableCell.superclass.$dataChanged.apply(this);
	}
	
}, 'table-header-cell');






