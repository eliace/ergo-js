

Ergo.defineClass('Ergo.widgets.TableGrid', {

	extends: 'Ergo.widgets.Box',

	defaults: {
		cls: 'table-grid',
		components: {
			header: {
				cls: 'grid-header',
				components: {
					content: {
						etype: 'grid-header'
					}
				}
			},
			content: {
				cls: 'grid-content',
				autoHeight: true,
				components: {
					content: {
						etype: 'grid-box'
					}
				}
			}
		}
	},


	_layoutChanged: function() {
		this._super();

//		console.log('grid layout changed');

		var hw = this.$header.$content.el.width();
		var cw = this.$content.$content.el.width();

//		console.log(hw);
//		console.log(cw);


		if(hw > cw) {
			this.$header.el.css('padding-right', hw-cw);
		}
	},



	_preConstruct: function(o) {
		this._super(o);

		if(o.cell) {
			$ergo.mergeOptions(o.components.content.components.content, {components: {body: {components: {rows: {defaultItem: {defaultItem: o.cell}}}}}});
//			Ergo.smart_override(o.components.content.components.content, {components: {body: {components: {rows: {defaultItem: {defaultItem: o.cell}}}}}});
		}

		if(o.row) {
			$ergo.mergeOptions(o.components.content.components.content, {components: {body: {components: {rows: {defaultItem: o.row}}}}});
//			Ergo.smart_override(o.components.content.components.content, {components: {body: {components: {rows: {defaultItem: o.row}}}}});
		}

	},



	_construct: function(o) {
		this._super(o);


		var grid = this;

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


				this._widget.$content.$content.$control.items.add(col);
				this._widget.$content.$content.$body.$rows.options.defaultItem.items.push(col_item);

				this._widget.$header.$content.$control.items.add(col);
				this._widget.$header.$content.$body.item(0).items.add($ergo.mergeOptions({}, [this._widget.options.column, hdr_item]));
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

				this._widget.$header.$content.$control.item(i).unrender();//.el.detach();
				this._widget.$header.$content.$control.item(i).options.autoRender = false;
				this._widget.$header.$content.$body.item(0).item(i).unrender();//.el.detach();
				this._widget.$header.$content.$body.item(0).item(i).options.autoRender = false;

				this._widget.$content.$content.$control.item(i).unrender();//el.detach();
				this._widget.$content.$content.$control.item(i).options.autoRender = false;//el.detach();
				this._widget.$content.$content.$body.$rows.items.each(function(row){
					row.item(i).unrender();//.el.detach();
					// ?
				});
//				this._widget.content.content.control.options.items[i].autoRender = false;

				this._widget.$content.$content.$body.$rows.options.defaultItem.items[i].autoRender = false;

				this.get(i).hidden = true;
			},

			show: function(i) {

				var w = this._widget.$header.$content.$control.item(i);
				w.options.autoRender = true;
				this._widget.$header.$content.$control.render();
//				this._widget.$header.$content.$control.layout.add( w, w._index, w._weight );//.item(i).el.detach();
				w = this._widget.$header.$content.$body.item(0).item(i);
				w.options.autoRender = true;
				this._widget.$header.$content.$body.item(0).render();
//				this._widget.$header.$content.$body.item(0).layout.add( w, w._index, w._weight );

				w = this._widget.$content.$content.$control.item(i);
				w.options.autoRender = true;
				this._widget.$content.$content.$control.render();
//				this._widget.$content.$content.$control.layout.add( w, w._index, w._weight );
				this._widget.$content.$content.$body.$rows.items.each(function(row){
					row.render();
//					var cell = row.item(i);
//					row.layout.add(cell, cell._index, cell._weight);
				});
				delete this._widget.$content.$content.$body.$rows.options.defaultItem.items[i].autoRender;

				this.get(i).hidden = false;

			},


			resize: function(i, width) {

				var self = this;

				var headers = this._widget.headers();
				var hdr_control = this._widget.$header.$content.$control;
				var bdy_control = this._widget.$content.$content.$control;


				this.each(function(col, j){
					if(i == j) col.width = width;
					if(!col.width) {
						// фиксируем ширину плавающей колонки
//						col.width = hdr_control.item(j).el.width();
						col.width = headers.get(j).el.width();
						console.log(col.width);
						hdr_control.item(j).el.width(col.width);
						bdy_control.item(j).el.width(col.width);
					}
				});


				hdr_control.item(i).el.width(width);
				bdy_control.item(i).el.width(width);

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
			grid.columns.add(col);
		});


	},


	rows: function() {
		return this.$content.$content.$body.$rows.items;
	},

	headers: function() {
		return this.$header.$content.$body.item(0).items;
	}



}, 'widgets:table-grid');






Ergo.defineClass('Ergo.widgets.grid.Header', {

	extends: 'Ergo.widgets.Box',

	defaults: {
		tag: 'table',
//		cls: 'grid-header',
		cls: 'grid-box header',
		components: {
			control: {
				tag: 'colgroup',
				defaultItem: {
					etype: 'html:col'
				},
				weight: -1
			},
			body: {
				tag: 'thead',
				defaultItem: {
					etype: 'table-row',
					defaultItem: {
						tag: 'th'
//						etype: 'html:th'
					}
				},
				items: [{}]
			}
		}
	}

}, 'widgets:grid-header');



Ergo.defineClass('Ergo.widgets.grid.Box', {

	extends: 'Ergo.widgets.Box',

	defaults: {
		tag: 'table',
		cls: 'grid-box',
		components: {
			control: {
				tag: 'colgroup',
				defaultItem: {
					tag: 'col'
				},
				weight: -1
			},
			body: {
				tag: 'tbody',
				components: {
					rows: {
						autoRender: false,
						layout: 'inherited',
						dynamic: true,
						defaultItem: {
							etype: 'table-row',
							items: []
						}
					}
				}
			}
		}

	}

}, 'widgets:grid-box');
