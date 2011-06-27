






var grid = $.dino({
	dtype: 'table-grid',
	renderTo: '.preview',
	
	data: [],
	
	cls: 'dino-border-all',
	height: 300,
	width: 800,
	
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




grid.pager.setIndex(0);


//grid.data.add(['kiwi', 72, 0.3])



