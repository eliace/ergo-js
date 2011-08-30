    
var tgTreeData = new Ergo.core.DataSource([]);


$.getJSON('ajax/file_system.json', {}, function(data) { tgTreeData.set(data) });

    
$.ergo({
  etype: 'tree-grid',
  renderTo: '.preview',
  cls: 'ergo-border-all',
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
      etype: 'tree-table-cell',
      header: 'Файл',
      content: {
        content: {
          icon: true,
          components: {
            icon: {
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


    
