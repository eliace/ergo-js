


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
				cls: 'dino-grid-header',
				style: {'overflow-x': 'hidden', 'padding-right': 17},
				content: {
					dtype: 'table',
					style: {'table-layout': 'fixed', 'padding-right': 18, 'table-layout': 'fixed', 'border-collapse': 'collapse'},
					width: '100%',
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
				style: {'overflow-y': 'auto', 'overflow-x': 'hidden'},
				height: 'auto',
				content: {
					dtype: 'grid-x',
					style: {'padding-right': 18},
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
	
	
	
}, 'table-grid-x');









var grid = $.dino({
	dtype: 'table-grid-x',
	renderTo: '.preview',
	
	//data: [['apple', 10, 1.4], ['orange', 23, 2.4]],
	data: Samples.generate_grid_page(0, 40),
	
	cls: 'dino-border-all',
	height: 300,
	width: 800,
	
	components: {
		body: {
			style: {'background-color': '#fff'},
		}
	},
	
//	tableModel: {
//		columns: [{
//			dataId: 0,
//			header: 'fruit',
//			width: 150
//		}, {
//			dataId: 1,
//			header: 'count',
//			width: 60
//		}, {
//			header: 'weight',
//			dataId: 2
//		}]
//	}							

  tableModel: {
    columns: [{
      dataId: 'id',
      header: 'ID',
      width: 50,
    }, {
      dataId: 'string',
      header: 'Строка'
    }, {
      dataId: 'number',
      header: 'Число',
      format: function(v) { return v.toFixed(2) },
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
      format: Dino.format_currency.rcurry('$')
    }, {
      dataId: 'date',
      header: 'Дата',
//      format: Dino.format_date
    }]
  }
	
	
});



//grid.data.add(['kiwi', 72, 0.3])



