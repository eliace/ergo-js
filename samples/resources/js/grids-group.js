    
var gridData = [{
  name: 'Группа 1',
  items: [
    {id: '1', name: 'Alice', value: '123', cb: false},
    {id: '2', name: 'Bob', value: '456', cb: true},
  ]
}, {
  name: 'Группа 2',
  items: [
    {id: '3', name: 'Charlie', value: '789', cb: false},
  ]
}, {
  name: 'Группа 3',
  items: [
    {id: '4', name: 'Dean', value: '31545', cb: false},
    {id: '5', name: 'Eva', value: '987', cb: false},
  ]
}];
    
    
$.dino({
  dtype: 'box',
  renderTo: '.preview',
  width: 500,
  cls: 'dino-border-all dino-corner-all',
  components: {
    header: {
      dtype: 'table',
      cls: 'dino-bg-highlight',
      width: '100%',
      headerModel: {
        cell: {
          cls: 'grid-header-cell'
        },
        columns: [{width: 60, innerText: '#'}, {innerText: 'Имя'}, {width: 100, innerText: 'Значение'}]
      }
    },
    scrollableContent: {
      dtype: 'box',
      data: gridData,
      dynamic: true,
      height: 300,//'auto',
      defaultItem: {
        components: {
          title: {
            dtype: 'box',
            cls: 'group-title',
            content: {
              dtype: 'text',
              dataId: 'name'
            }
          },
          table: {
            dtype: 'table',
            dataId: 'items',
            width: '100%',
//            style: {'border-left': '1px solid #ccc'},
            tableModel: {
              row: {
                cls: 'group-row'
              },
              cell: {
                binding: 'auto',
                style: {'border-bottom': '1px solid #ccc'},
              },
              columns: [{
                dataId: 'id',
                cls: 'dino-default-column',
                width: 60
              }, {
                dataId: 'name',
                cls: 'dino-text-column',
              }, {
                dataId: 'value',
                cls: 'dino-numeric-column',
                width: 100
              }]
            }
          }
        }
      }
      
    }
  }
});


    