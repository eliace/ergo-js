

test('benchmarks', function(){


var generate_grid_page = function(i0, i1) {
	
	// Типы данных
	// - ID
	// - Строка
	// - Число
	// - Активная иконка
	// - Ссылка
	// - Чекбокс
	// - Денежные единицы
	// - Дата
	
	var list = [];
	for(var i = i0; i < i1; i++) {
		list.push({
			id: i,
			string: 'Item ' + (i+1),
			number: Math.random()*1e3,
			icon: 'exclamation',
			ref: 'http://google.ru',
			flag: false,
			currency: Math.random()*1e2,
			count: (Math.random()*1e2).toFixed(),
			date: Dino.format_date(new Date())//.toLocaleString()
		});
	}
	return list;
}

	


gridData = new Dino.data.ArrayDataSource();


    
    
var grid = $.dino({
  renderTo: 'body',
  dtype: 'grid',
  cls: 'dino-border-all dino-corner-all',
  width: 800,
  content: {
    height: 300,//'auto',
    state: 'scrollable'
//    style: {'padding-right': '18px'}
  },
//  headerCls: 'dino-bg-highlight',
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
    pager: {
      dtype: 'pager',
      count: 200,
      pageSize: 40,
      cls: 'dino-border-top',
      onIndexChanged: function(e) {
        // генерируем данные и добавляем их в источник данных виджета
        var data_page = generate_grid_page(e.from, e.to);
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



	
	
});
