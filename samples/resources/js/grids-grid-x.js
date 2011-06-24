


Dino.declare('Dino.widgets.GridX', 'Dino.core.Container', {
	
	defaults: {
		html: '<table cellspacing="0"></table>',
		style: {'border-collapse': 'collapse', 'table-layout': 'fixed'},
		width: '100%',
		dynamic: true,
		defaultItem: {
			dtype: 'list',
			html: '<tr/>',
//			dynamic: true,
			defaultItem: {
				dtype: 'box',
				html: '<td/>',	
				binding: function(val) { this.opt('innerText', val);  },
//				cls: 'dino-border-all'
			}
		},
		components: {
			cols: {
				dtype: 'list',
				html: '<tr/>',
				height: 0,
				defaultItem: {
					dtype: 'box',
					html: '<td/>',
//					style: {'border-color': 'transparent'}
				}
			}
		},
		gridModel: {
			row: {},
			cell: {},
			columns: []
		}
	},
	
	
	$init: function(o) {
		Dino.widgets.GridX.superclass.$init.apply(this, arguments);
		
		var cols = [];
		Dino.each(o.gridModel.columns, function(col){
			var w = ('width' in col) ? {width: col.width} : {};
			delete col.width;
			cols.push(w);
		});
		
		Dino.smart_override(o.defaultItem, o.gridModel.row, {defaultItem: o.gridModel.cell, items: o.gridModel.columns});
		Dino.smart_override(o.components.cols, {items: cols});		
		
	}
	
	
	
}, 'grid-x');




Dino.declare('Dino.widgets.TableGridX', 'Dino.widgets.Box', {
	
	
	defaults: {
		
		components: {
			header: {
				dtype: 'box',
				weight: 10,
				cls: 'dino-grid-header',
				layout: {
					dtype: 'plain-layout',
					html: '<div style="overflow-x: hidden"/>'
				},
//				style: {'overflow-x': 'hidden'},//, 'padding-right': 17},
				content: {
					dtype: 'table',
					style: {'table-layout': 'fixed'/*, 'padding-right': 17*/, 'table-layout': 'fixed', 'border-collapse': 'collapse'},
					width: '100%',
//					width: null,
					binding: false,
					headerModel: {
						cell: {
							cls: 'dino-grid-h-cell',
							layout: {
								dtype: 'plain-layout',
								html: '<div class="nowrap"></div>'
							}
						}						
					}
				}
			},
			body: {
				// скроллируемый контейнер
				dtype: 'box',
				weight: 20,
				style: {'overflow': 'auto'},
				height: 'auto',
				content: {
					dtype: 'grid-x',
//					style: {'padding-right': 17},
//					width: 'auto',
//					width: null,
					gridModel: {
						row: {
							cls: 'dino-grid-row'
						},
						cell: {
							cls: 'dino-grid-cell',
							layout: {
								dtype: 'plain-layout',
								html: '<div class="nowrap"></div>'
							}
						}
					},
					components: {
						cols: {
							defaultItem: {
								cls: 'dino-grid-cell'
							}
						}
					}					
				}
			}
		}
		
	},
	
	
	$init: function() {
		Dino.widgets.TableGridX.superclass.$init.apply(this, arguments);
		
		var o = this.options;
		
		// переносим параметр width из колонок в заголовки
		var h_columns = [];
		Dino.each(o.tableModel.columns, function(column, i){
			h_col = {};
			if('width' in column) h_col.width = column.width;
			if('header' in column) {
				if(Dino.isString(column.header)) h_col.text = column.header;
				else Dino.smart_override(h_col, column.header);
			}
			h_columns[i] = h_col;
		})
		
		Dino.smart_override(o.components.body.content, {'gridModel': o.tableModel});
		Dino.smart_override(o.components.header.content, {'headerModel': o.headerModel || {}}, {headerModel: {columns: h_columns}});
		
	},
	
	
	
	$layoutChanged: function() {
		Dino.widgets.TableGridX.superclass.$layoutChanged.apply(this, arguments);
		
		
		if(this.body.el[0].scrollHeight != this.body.el.height()) {
			this.header.layout.el.width(this.body.el.width() - 17);
		}
		
//		var dw = this.body.el.width() - this.body.content.el.width();
//		this.header.layout.el.width(this.body.content.el.width());
//		this.body.content.el.width(this.body.content.el.width());
		
	},
	
//	$dataChanged: function() {
//		Dino.widgets.TableGridX.superclass.$dataChanged.apply(this, arguments);
//		
//	}
	
	
}, 'table-grid-x');







var depressed = null;



var glassPane = $.dino({
	dtype: 'glass-pane', 
	renderTo: 'body', 
	style: {'display': 'none', 'cursor': 'col-resize'},
	events: {
		'mousemove': function(e, w) {
			
			var origin = depressed.origin;
			var left = e.pageX - origin.left;
			grid.splitter.el.css('left', left);
			
		},
		'mouseup': function(e, w) {
			
			grid.splitter.el.hide();
			
			glassPane.el.hide();
			
			var origin = depressed.origin;

			var new_width = e.pageX - depressed.column.el.offset().left;
			var old_width = depressed.column.el.width();

			var width = grid.header.content.el.width() + new_width - old_width;
			
			depressed.column.el.width(new_width);
			depressed.column.layout.el.width(new_width);
			
			var i = depressed.column.index;
			
			
			grid.body.content.cols.items.get(i).el.width(new_width);
			
			grid.header.content.el.width(width);
			grid.body.content.el.width(width);
			
//			grid.eachRow(function(row){
//				var col = row.getColumn(i);
//				col.el.width(new_width);
//				col.layout.el.width(new_width);
//			});
			
			depressed = null;			
		}
	}
});






var grid = $.dino({
	dtype: 'table-grid-x',
	renderTo: '.preview',
	
	//data: [['apple', 10, 1.4], ['orange', 23, 2.4]],
	data: [],//Samples.generate_grid_page(0, 40),
	
	cls: 'dino-border-all',
	height: 300,
	width: 800,
	
	style: {'position': 'relative'},
	
	components: {
		body: {
			style: {'background-color': '#fff'},
			
			events: {
				'scroll': function(e, w) {
					var scroll_x = w.el.scrollLeft();
					console.log(scroll_x);
					w.parent.header.layout.el.scrollLeft(scroll_x);//.css('margin-left', -scroll_x);
				}
			}
			
		},
		pager: {
			dtype: 'pager',
      count: 200,
      pageSize: 40,
      cls: 'dino-border-top',
      onIndexChanged: function(e) {
        // генерируем данные и добавляем их в источник данных виджета
        var data_page = Samples.generate_grid_page(e.from, e.to);
        var j = 0;
        for(var i = e.from; i < e.to; i++) {
          grid.data.source[i] = data_page[j++];
        }

        grid.data.filter_chain = function(data){
          var out = [];
          for(var i = 0; i < data.length; i++)
            if(i >= e.from && i < e.to) out.push(i);
          return out;
        };
					
        grid.data.events.fire('onValueChanged');
				grid.$layoutChanged();
        
      }			
		},
		splitter: {
			dtype: 'box',
			width: 3,
			height: 'ignore',
			style: {'position': 'absolute', 'top': 0, 'bottom': 0, 'background-color': '#aaa', 'display': 'none'}
		}			
	},
	
	
	headerModel: {
		cell: {
			events: {
				'mousedown': function(e, w) {
					if(w.states.is('x-resizable')) {
						var grid = w.getParent(Dino.widgets.TableGridX);							

						var grid_offset = grid.el.offset();						
						var left = e.pageX - grid_offset.left;
						grid.splitter.el.css('left', left);
						
						grid.splitter.el.show();
						
						depressed = {
							column: w,
							origin: grid_offset
						};
						glassPane.el.show();
						
						e.stopPropagation();
						e.preventDefault();
					}
					
				},
				'mousemove': function(e, w) {
					
					var offset = w.el.offset();
					var width = w.el.width();
					var x = e.pageX - offset.left;
					
//					var y = e.pageY - offset.top;
					w.states.toggle('x-resizable', (width - x < 5));
					
				},
				'mouseleave': function(e, w) {
						w.states.clear('x-resizable');					
				}
			}
		}
	},
	
	
  tableModel: {
    columns: [{
      dataId: 'id',
      header: 'ID',
      width: 50,
    }, {
      dataId: 'string',
      header: 'Строка',
//			width: 60
    }, {
      dataId: 'number',
      header: 'Число',
      format: function(v) { return v.toFixed(2) },
//			width: 60
    }, {
      dataId: 'icon',
      cls: 'silk-icon dino-clickable',
      width: 30,
      binding: function(val) { this.states.set('silk-icon-'+val); },
    }/*, {
      header: 'Ссылка',
      content: {
        dtype: 'anchor',
        text: 'ссылка',
        dataId: 'ref'
      },
      binding: 'skip'
    }*/, {
      dataId: 'flag',
      width: 50,
      content: {
        dtype: 'checkbox'
      },
      header: {
        content: {
          dtype: 'checkbox',
          checked: false        
        }        
      },
      binding: 'skip'
    }, {
      dataId: 'currency',
      header: 'Цена',
      format: Dino.format_currency.rcurry('$'),
//			width: 60
    }, {
      dataId: 'date',
      header: 'Дата',
//			width: 60
//      format: Dino.format_date
    }]
  }
	
	
});


/*
$.dino({
	dtype: 'button',
	innerText: 'Click me',
	renderTo: '.preview',
	onAction: function() {
		var arr = Samples.generate_grid_page(10, 40);
		
		var src = grid.data.val();
		
		for(var i = 0; i < arr.length; i++) {
			src[10+i] = arr[i];
		}
		
		grid.data.events.fire('onValueChanged');
//		grid.


		
	}
});
*/


grid.pager.setIndex(0);


//grid.data.add(['kiwi', 72, 0.3])



