


/**
 * Таблица
 *
 * :`table`
 * 	\s control:`box`
 * 	\s\s [...]:`html:col`
 * 	\s head:`html:thead`
 * 	\s\s [...]:`table-row`
 * 	\s\s\s [...]:`html:th`
 * 	\s body:`html:tbody`
 * 	\s\s [~]:`table-row`
 *
 *
 * Опции:
 * 	`row`
 * 	`cell`
 * 	`columns`
 * 	`rows`
 *
 *
 * @class
 * @name Ergo.widgets.Table
 * @extends Ergo.core.Widget
 */
Ergo.defineClass('Ergo.widgets.Table', 'Ergo.widgets.Box', /** @lends Ergo.widgets.Table.prototype */{

	defaults: {
		tag: 'table',
		components: {
			control: {
				tag: 'colgroup',
				defaultItem: {
					etype: 'html:col'
				},
				weight: -10
			},
			head: {
				etype: 'html:thead',
				defaultItem: {
					etype: 'table-row',
					defaultItem: {
						etype: 'html:th'
					}
				},
				items: [{}],
				weight: -5,
			},
			body: {
				etype: 'html:tbody',
				defaultItem: {
					etype: 'table-row',
					items: []
				},
				dynamic: true
			}
		},
		row: {},
		cell: {},
		columns: []
	},




/*
	_preConstruct: function(o) {


		this._super(o);

	},
*/



	_construct: function(o) {
		this._super(o);


		var w = this;

		/**
		 * @field
		 */
		this.columns = {

			_widget: this,

			add: function(column, key) {

				var col_item = Ergo.deep_copy(column);
				var col = {};
				var hdr_item = {};

				if('width' in col_item) {
					col.width = col_item.width;
					delete col_item.width;
				}

				if('header' in col_item) {
					if($.isString(col_item.header)) {
						hdr_item.text = col_item.header;
					}
					else {
						hdr_item = col_item.header;
					}
					delete col_item.header;
				}


				this._widget.$control.items.add(col);
				this._widget.$head.item(0).items.add( $ergo.mergeOptions({}, [this._widget.options.column, hdr_item]) );
				this._widget.$body.options.defaultItem.items.push(col_item);
			},


			size: function() {
				return this._widget.options.columns.length;
			},


			get: function(i) {
				return this._widget.options.columns[i];
			},


			each: function(callback) {
				this._widget.options.columns.forEach(callback);
			},


			hide: function(i) {

				this._widget.$control.item(i).el.detach();
				this._widget.$head.item(0).item(i).el.detach();
				this._widget.$body.items.each(function(row){
					row.item(i).el.detach();
				});
//				this._widget.content.content.control.options.items[i].autoRender = false;
				this._widget.$body.options.defaultItem.items[i].autoRender = false;

				this.get(i).hidden = true;
			},

			show: function(i) {

				var w = this._widget.$control.item(i);
				this._widget.$control.layout.add( w, w._index, w._weight );//.item(i).el.detach();
				w = this._widget.$head.item(0).item(i);
				this._widget.$head.item(0).layout.add( w, w._index, w._weight );

				this._widget.$body.items.each(function(row){
					var cell = row.item(i);
					row.layout.add(cell, cell._index, cell._weight);
				});
				delete this._widget.$body.options.defaultItem.items[i].autoRender;

				this.get(i).hidden = false;

			},


			resize: function(i, width) {

				var self = this;

				var headers = this._widget.headers();
				var control = this._widget.$control;


				this.each(function(col, j){
					if(i == j) col.width = width;
					if(!col.width) {
						// фиксируем ширину плавающей колонки
//						col.width = hdr_control.item(j).el.width();
						col.width = headers.get(j).el.width();
//						console.log(col.width);
						control.item(j).el.width(col.width);
					}
				});


				control.item(i).el.width(width);
//				bdy_control.item(i).el.width(width);

				// var w = this._widget.header.content.control;//.item(i);
				// w.items.each(function(item){
				// });
				// w.el.width(width);
//
				// w = this._widget.content.content.control.item(i);
				// w.el.width(width);

			}



		};



		o.columns.forEach(function(col) {
			w.columns.add(col);
		});

		// for(var i in o.columns) {
		// 	this.columns.add(o.columns[i]);
		// }


		if('rows' in o) {
			o.rows.forEach(function(row) {
				w.$body.items.add(row);
			});
			// for(var i in o.rows) {
			// 	this.body.items.add(o.rows[i]);
			// }
		}

	},


	rows: function() {
		return this.$body.items;
	},

	headers: function() {
		return this.$head.item(0).items;
	}




}, 'widgets:table');





/*
Ergo.defineClass('Ergo.controllers.Columns', 'Ergo.core.Object', {


	_initialize: function(widget) {
		this._widget = widget;
	},



	add: function(o) {
		// 1. добавляем опции в заголовок
		// 2. добавляем опции в строки
		// 3. добавляем ячейку в заголовок
		// 4. добавляем ячейку во все строки
	},


	get: function(i) {
		// получение чего-то
	},


	remove_at: function(i) {

	}



});
*/




/**
 * Строка таблицы
 *
 * :`table-row`
 * \s	[...]:`box`
 *
 *
 * @class
 * @name Ergo.widgets.TableRow
 * @extends Ergo.core.Widget
 */
Ergo.defineClass('Ergo.widgets.TableRow', 'Ergo.widgets.Box', {

	defaults: {
		tag: 'tr',
		defaultItem: {
			etype: 'html:td'
//			html: '<td/>'
			// set: {
				// 'text': function(v) {
				// }
			// }
//			etype: 'html:td'
		}
	}

}, 'widgets:table-row');
