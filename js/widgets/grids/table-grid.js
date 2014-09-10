

Ergo.defineClass('Ergo.widgets.TableGrid', 'Ergo.widgets.Box', {
	
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
	
	
	$layoutChanged: function() {
		this.$super();
		
//		console.log('grid layout changed');
		
		var hw = this.header.content.el.width();
		var cw = this.content.content.el.width();

//		console.log(hw);
//		console.log(cw);

		
		if(hw > cw) {
			this.header.el.css('padding-right', hw-cw);
		}
	},
	
	
	$construct: function(o) {
		this.$super(o);
		
		
//		var cols = [];
//		var control_items = [];
		
//		for(var i in o.columns) {
			// var col = Ergo.deep_copy(o.columns[i]);
// 			
			// if('width' in col) {
				// control_items.push({width: col.width});
				// delete col.width;
			// }
			// else {
				// control_items.push({});				
			// }
// 			
// 			
			// cols.push(col);
//		}
		
		// Ergo.smart_override(this.content.body.options.defaultItem, {items: cols});
// 		
// 		
		// for(var i in control_items) {
			// this.content.control.items.add(control_items[i]);
		// }
		
		
		var w = this;
		
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

				
				this._widget.content.content.control.items.add(col);
				this._widget.content.content.body.options.defaultItem.items.push(col_item);

				this._widget.header.content.control.items.add(col);
				this._widget.header.content.body.item(0).items.add(Ergo.smart_override({}, this._widget.options.column, hdr_item));
			},
			
			
			size: function() {
				return this._widget.options.columns.length;
			},
			
			
			get: function(i) {
				return this._widget.options.columns[i];				
			},
			
			
			hide: function(i) {
				
				this._widget.header.content.control.item(i).el.detach();
				this._widget.header.content.body.item(0).item(i).el.detach();
				
				this._widget.content.content.control.item(i).el.detach();
				this._widget.content.content.body.items.each(function(row){
					row.item(i).el.detach();
				});
//				this._widget.content.content.control.options.items[i].autoRender = false;
				this._widget.content.content.body.options.defaultItem.items[i].autoRender = false;
				
				this.get(i).hidden = true;
			},
			
			show: function(i) {
				
				var w = this._widget.header.content.control.item(i);
				this._widget.header.content.control.layout.add( w, w._index, w._weight );//.item(i).el.detach();
				w = this._widget.header.content.body.item(0).item(i);
				this._widget.header.content.body.item(0).layout.add( w, w._index, w._weight );
				
				w = this._widget.content.content.control.item(i);
				this._widget.content.content.control.layout.add( w, w._index, w._weight );
				this._widget.content.content.body.items.each(function(row){
					var cell = row.item(i);
					row.layout.add(cell, cell._index, cell._weight);
				});
				delete this._widget.content.content.body.options.defaultItem.items[i].autoRender;

				this.get(i).hidden = false;
				
			}
			
			
			
		};
		
		
		
		for(var i in o.columns) {
			this.columns.add(o.columns[i]);
		}

		
		
		
	},
	
	
	rows: function() {
		return this.content.content.body.items;
	},
	
	headers: function() {
		return this.header.content.body.item(0).items;
	}
	
	
	
}, 'widgets:table-grid');






Ergo.defineClass('Ergo.widgets.grid.Header', 'Ergo.widgets.Box', {
	
	defaults: {
		html: '<table/>',
//		cls: 'grid-header',
		cls: 'grid-box header',
		components: {
			control: {
				html: '<colgroup/>',
				defaultItem: {
					etype: 'html:col'
				},
				weight: -1
			},
			body: {
				html: '<thead/>',
				defaultItem: {
					etype: 'table-row',
					defaultItem: {
						html: '<th/>'
//						etype: 'html:th'
					}
				},
				items: [{}]
			}
		}		
	}
	
}, 'widgets:grid-header');



Ergo.defineClass('Ergo.widgets.grid.Box', 'Ergo.widgets.Box', {
	
	defaults: {
		html: '<table/>',
		cls: 'grid-box',
		components: {
			control: {
				html: '<colgroup/>',
				defaultItem: {
					html: '<col/>'
				},
				weight: -1
			},
			body: {
				html: '<tbody/>',
				defaultItem: {
					etype: 'table-row',
					items: []
				},
				
				dynamic: true
			}
		}		
		
	}
	
}, 'widgets:grid-box');
