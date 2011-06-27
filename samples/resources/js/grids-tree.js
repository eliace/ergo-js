    
var tgTreeData = new Dino.data.ArrayDataSource([]);


$.getJSON('ajax/file_system.json', {}, function(data) { tgTreeData.set(data) });

    
$.dino({
  dtype: 'tree-grid',
  renderTo: '.preview',
  cls: 'dino-border-all',
  data: tgTreeData,
  width: 600,
	height: 300,
//  content: {
//    height: 300,//'auto',
//    state: 'scrollable'
////    style: {'padding-right': '18px'/*, 'font-size': '9pt'*/}
//  },
  tableModel: {
    cell: {
      cls: 'tg-cell'
    },
    row: {
      state: 'expanded'
    },
    columns: [{
      dataId: 'id',
      header: '#',
      width: 40,
      binding: 'auto'
    }, {
      dtype: 'tree-table-cell',
      header: 'Файл',
      content: {
        content: {
          icon: true,
          components: {
            leftIcon: {
              dataId: 'type',
              binding: function(val) {  this.states.setOnly('silk-icon-'+val); }
            },
            content: {
              dataId: 'name'
            }
          }
        }        
      },
      binding: function(val) {
        this.opt('isLeaf', (val.type == 'film'));
      }
    }, {
      header: 'Размер',
      width: 100,
      dataId: 'value',
      binding: 'auto'
    }]
  }
});  


    
