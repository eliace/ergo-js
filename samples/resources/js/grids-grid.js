
gridData = new Dino.data.ArrayDataSource();


		
		
var grid = $.dino({
//  id: 'table-1',
	renderTo: '.preview',
  dtype: 'grid',
  cls: 'dino-border-all dino-corner-all',
	content: {
//		autoHeight: true,
		height: 'auto',
//		height: 'auto',
		style: {'padding-right': '3px', 'font-size': '9pt'}
	},
	headerCls: 'dino-bg-highlight',
	headerModel: {
		cell: {
			cls: 'grid-header-cell',
		},
		columns: [{
			text: 'ID'
		}, {
			text: 'Строка'
		}, {
			text: 'Число'
		}, {
//			innerHtml: '&nbsp;'
		}, {
			text: 'Ссылка'
		}, {
			content: {
      	dtype: 'checkbox',
				checked: false				
			}
		}, {
			text: 'Цена'
		}, {
			text: 'Дата'
		}]
	},
  tableModel: {
		cell: {
			cls: 'grid-cell',
			binding: 'auto'
		},
    columns: [{
      dataId: 'id',
      width: 50
    }, {
      dataId: 'string'
    }, {
      dataId: 'number',
			format: function(v) { return v.toFixed(2) },
//      width: 100
    }, {
      dataId: 'icon',
			cls: 'led-icon dino-clickable',
			width: 30,
			binding: function(val) { this.states.set('led-icon-'+val); },
    }, {
			content: {
				dtype: 'anchor',
				text: 'ссылка',
      	dataId: 'ref'
			},
			binding: 'skip'
    }, {
      dataId: 'flag',
      width: 50,
			content: {
      	dtype: 'checkbox'
			},
			binding: 'skip'
    }, {
      dataId: 'currency',
			format: function(v) { return "$"+v.toFixed(2); }
    }, {
      dataId: 'date'
    }]
  },
  data: gridData,
	components: {
		pager: {
			dtype: 'pager',
			count: 100,
			pageSize: 40,
			cls: 'dino-border-top',
			onCurrentChanged: function(e) {
				// генерируем данные и добавляем их в источник данных виджета
				var data_page = Samples.generate_grid_page(e.from, e.to);
				var j = 0;
				for(var i = e.from; i < e.to; i++) {
					gridData.source[i] = data_page[j++];
				}
				gridData.range = [e.from, e.to];
				gridData.events.fire('onValueChanged');
			}
		}
	}
});
		
grid.pager.setCurrentIndex(0);

