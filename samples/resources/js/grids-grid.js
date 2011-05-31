
gridData = new Dino.data.ArrayDataSource();


    
    
var grid = $.dino({
  renderTo: '.preview',
  dtype: 'grid',
  cls: 'dino-border-all dino-corner-all',
  width: 800,
  content: {
    height: 300,//'auto',
    state: 'scrollable',		
//    style: {'padding-right': '18px'}
  },
//  headerCls: 'dino-bg-highlight',

//	components: {
//	},


	headerModel: {
		cell: {
			events: {
				'mousemove': function(e, w) {
					var offset = w.el.offset();
					var width = w.el.width();
					var x = e.pageX - offset.left;
//					var y = e.pageY - offset.top;
						w.states.toggle('x-resizable', (width - x < 5));
					
//					console.log(x+', '+y);
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
  },
  data: gridData,
  components: {
		splitter: {
			dtype: 'box',
			width: 1,
			style: {'position': 'absolute', 'top': 0, 'bottom': 0, 'background-color': '#f00'}
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
    
grid.pager.setIndex(0);

