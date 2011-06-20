
var gridData = new Dino.data.ArrayDataSource();

var depressed = null;


var glassPane = $.dino({
	dtype: 'glass-pane', 
	renderTo: 'body', 
	style: {'display': 'none', 'cursor': 'col-resize'},
	events: {
		'mousemove': function(e, w) {
			var grid = gridPanel.content;
			
			var origin = depressed.origin;						
			var left = e.pageX - origin.left;
			grid.splitter.el.css('left', left);
			
		},
		'mouseup': function(e, w) {
			var grid = gridPanel.content;
			
			grid.splitter.el.hide();
			
			glassPane.el.hide();
			
			var origin = depressed.origin;

			var new_width = e.pageX - depressed.column.el.offset().left;
			
			depressed.column.el.width(new_width);
			depressed.column.layout.el.width(new_width);
			
			var i = depressed.column.index;
			
			grid.eachRow(function(row){
				var col = row.getColumn(i);
				col.el.width(new_width);
				col.layout.el.width(new_width);
			});
			
			depressed = null;			
		}
	}
});


var gridPanel = $.dino({
	dtype: 'box',
	renderTo: '.preview',
	
  cls: 'dino-border-all dino-corner-all',
	
  width: 800,
  height: 400,
	
	content: {
		weight: 10,
	  dtype: 'grid',

  	data: gridData,	
	
		style: {'position': 'relative'},
	
		components: {
			splitter: {
				dtype: 'box',
				width: 3,
				height: 'ignore',
				style: {'position': 'absolute', 'top': 0, 'bottom': 0, 'background-color': '#aaa', 'display': 'none'}
			}			
		},

		content: {
			style: {'padding-right': '17px', 'overflow': 'auto'},
			
			events: {
				'scroll': function(e, w) {
					var scroll_x = w.el.scrollLeft();
					w.parent.header.layout.el.scrollLeft(scroll_x);//.css('margin-left', -scroll_x);
				}
			}
		},
	
		headerModel: {
			cell: {
				events: {
					'mousedown': function(e, w) {
						if(w.states.is('x-resizable')) {
							var grid = w.getParent(Dino.widgets.Grid);							

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
		
	},
	
	
	components: {
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
          gridData.source[i] = data_page[j++];
        }

        gridData.filter_chain = function(data){
          var out = [];
          for(var i = 0; i < data.length; i++)
            if(i >= e.from && i < e.to) out.push(i);
          return out;
        };
					
        gridData.events.fire('onValueChanged');
        
//        console.log(profiler.print_result('widget'));
//        profiler.clear('widget');
      }			
		}
	}
	
	
	
});



    
gridPanel.pager.setIndex(0);
gridPanel.content.el.width(gridPanel.content.el.width());

