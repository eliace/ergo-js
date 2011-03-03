    
var tgTreeData = new Dino.data.ArrayDataSource([]);


$.getJSON('ajax/file_system.json', {}, function(data) { tgTreeData.set(data) });

    
$.dino({
  dtype: 'tree-grid',
  renderTo: '.preview',
  cls: 'dino-border-all',
  data: tgTreeData,
  width: 600,
  content: {
    height: 300,//'auto',
    style: {'padding-right': '18px', 'font-size': '9pt'}
  },
  headerCls: 'dino-bg-highlight',
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
      style: {'text-align': 'left'},
//      expandOnShow: true,
      content: {
        content: {
          icon: true,
          components: {
            leftIcon: {
              dataId: 'type',
              binding: function(val) {  this.states.setOnly('led-icon-'+val); }
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


    
