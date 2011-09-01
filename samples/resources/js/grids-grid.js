

var grid = $.ergo({
  etype: 'table-grid',
  renderTo: '.preview',
  
  data: [],
  
  cls: 'ergo-border-all',
  height: 300,
  width: 800,
  
  components: {
    pager: {
      etype: 'pager',
      count: 200,
      pageSize: 40,
      cls: 'ergo-border-top',
      onIndexChanged: function(e) {
        // генерируем данные и добавляем их в источник данных виджета
        var data_page = Samples.generate_grid_page(e.from, e.to);
        var j = 0;
        for(var i = e.from; i < e.to; i++) {
          grid.data.source[i] = data_page[j++];
        }

        grid.data.options.filter = function(keys, values) {
          var out = [];
          for(var i = 0; i < values.length; i++)
            if(i >= e.from && i < e.to) out.push(i);
          return out;          
        };
          
        grid.data.events.fire('value:changed');
        grid.$layoutChanged();
        
      }      
    }
  },
  
  
  
  headerModel: {
  	cell: {
  		onClick: function() {
  			this.parent.selection.set(this);
  		},
  		content: {
				etype: 'text-item',
				xicon: 'ergo-icon-spinner-down',
				style: {'margin-right': -16},
  		},
			states: {
				'selected': function(on) {
					if(on)
						this.content.xicon.el.css('visibility', 'visible');
					else
						this.content.xicon.el.css('visibility', 'hidden');						
				}
			},
  		extensions: [{
  			setText: function(t) {
  				this.content.opt('text', t);
  			}
  		}],
  		onSelectionChanged: function() {
  			
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
      header: {
        'content!': {
          etype: 'checkbox',
          checked: false        
        }        
      },
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
  }
  
  
});




grid.pager.setIndex(0);


//grid.data.add(['kiwi', 72, 0.3])



