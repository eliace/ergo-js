

var grid = $.ergo({
  etype: 'table-grid',
  renderTo: '.preview',
  
  data: [],
  
  cls: 'ergo-border-all',
  height: 300,
  width: 800,
  
  components: {
  	// sorter: {
  		// etype: 'list',
  		// weight: 5,
  		// defaultItem: {
  			// etype: 'input'
  		// },
  		// items: [{}, {}, {}, {}, {}, {}, {}]
  	// },
    pager: {
      etype: 'pager',
      count: 205,
      pageSize: 50,
      cls: 'ergo-border-top',
      onIndexChanged: function(e) {
        // генерируем данные и добавляем их в источник данных виджета
        var data_page = Samples.generate_grid_page(e.from, e.to);
        var j = 0;
        for(var i = e.from; i < e.to; i++) {
          grid.data.source[i] = data_page[j++];
        }

        grid.data.options.filter = function(v, i) {//keys, values) {
        	return (i >= e.from && i < e.to);
          // var out = [];
          // for(var i = 0; i < values.length; i++)
            // if(i >= e.from && i < e.to) out.push(i);
          // return out;          
        };

//				grid.data.set(arr);          
        grid.data.events.fire('value:changed');
        grid.$layoutChanged();
        
      }      
    }
  },
  
  
  
  headerModel: {
    cell: {
      onClick: function() {
        this.parent.selection.set(this);
        this.states.toggle('sorting');
        var sorting = this.states.is('asc') ? 'asc': 'desc';
        
        grid.events.fire('onSortChanged', {column: this.index, 'sorting': sorting});
                
      },
      content: {
        etype: 'text-item',
        xicon: 'ergo-icon-sort',
        style: {'margin-right': -16},
        components: {
          xicon: {
            style: {'visibility': 'hidden'}
          }
        }
      },
      states: {
        'selected': function(on) {
          if(on)
            this.content.xicon.el.css('visibility', 'visible');
          else
            this.content.xicon.el.css('visibility', 'hidden');
        },
        'sorting': ['asc', 'desc']
      },
      set: {
        'text': function(t) {
          this.content.opt('text', t);
        }            
      }    	
    },
    row: {
      extensions: [Ergo.Selectable]
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
//      width: 60
    }, {
      dataId: 'number',
      header: 'Число',
      format: function(v) { return v.toFixed(2) },
//      width: 60
    }, {
      dataId: 'icon',
      cls: 'silk-icon ergo-clickable',
      width: 30,
      binding: function(val) { this.states.set('silk-icon-'+val); },
    }/*, {
      header: 'Ссылка',
      content: {
        etype: 'anchor',
        text: 'ссылка',
        dataId: 'ref'
      },
      binding: 'skip'
    }*/, {
      dataId: 'flag',
      width: 50,
      content: {
        etype: 'checkbox'
      },
      // header: {
        // content: {
          // content: {
            // etype: 'checkbox',
            // checked: false        
          // }
        // }
      // },
      binding: 'skip'
    }, {
      dataId: 'currency',
      header: 'Цена',
      format: Ergo.format_currency.rcurry('$'),
//      width: 60
    }, {
      dataId: 'date',
      header: 'Дата',
//      width: 60
//      format: Ergo.format_date
    }]
  },
  
  
  
  // onLayoutChanged: function() {
//   	
  	// var self = this;
//   	
  	// this.header.content.head.item(0).items.each(function(w, i){
  		// var input = self.sorter.item(i);
  		// var dw = input.el.outerWidth() - input.el.innerWidth();
  		// self.sorter.item(i).el.width(w.el.width() - dw);
// //  		console.log(w.el.width());
  	// });
//   	
//   	
  // },
  
  
  
  onColumnResize: {
  	
  },
  
  
  onSortChanged: function(e) {
    
    var val = this.data.get();
    var sort_id = this.options.tableModel.columns[e.column].dataId;
    
    val.sort(function(a, b){
      var c1 = a[sort_id];
      var c2 = b[sort_id];
      if(e.sorting == 'asc') {
        if(c1 < c2) return -1;
        if(c1 > c2) return 1;            
      }
      else {
        if(c1 > c2) return -1;
        if(c1 < c2) return 1;
      }
      return 0;
    });
    
    // Финт ушами
    // Поскольку количество элементов контейнера (строк таблицы) не изменяется, а меняется только их порядок - 
    // не будем перестраивать виджет, а просто обновим связь с данными. Это позволит значительно увеличить
    // скорость обновления
    this.$dataChanged();
//    this.data.events.fire('value:changed');
  }
  
  
});




grid.pager.setIndex(0);


//grid.data.add(['kiwi', 72, 0.3])



