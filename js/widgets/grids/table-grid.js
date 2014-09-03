

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
				components: {
					content: {
						etype: 'grid-box'				
					}
				}
			}
		}		
	},
	
	
	$layoutChanged: function() {
		
		var hw = this.header.content.el.width();
		var cw = this.content.content.el.width();
		
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
			
			add: function(column) {
				
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
			}
			
			
		};
		
		
		
		for(var i in o.columns) {
			this.columns.add(o.columns[i]);
		}

		
		
		
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
