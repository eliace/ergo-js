

/*
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
*/

var gridData = [
    {id: '1', name: 'Alice', value: '123', cb: false, group: '1'},
    {id: '2', name: 'Bob', value: '456', cb: true, group: '1'},
    {id: '3', name: 'Charlie', value: '789', cb: false, group: '2'},
    {id: '4', name: 'Dean', value: '31545', cb: false, group: '3'},
    {id: '5', name: 'Eva', value: '987', cb: false, group: '3'},
];



var customLayout = Ergo.layouts.PlainLayout.extend({
	
	rebuild: function() {
		
		var self = this;
		
		var group = null;
		
		this.container.items.each(function(item){
			var g = item.data.get('group');
			
			if(g != group) {
				self.container.components.add({
					etype: 'table-row',
					html: '<tr/>',
					cls: 'group',
					items: [{
						innerText: g,
						html: '<td colspan="3" />'
					}]
				}, g);
				
				group = g;
				
//				self.el.append( self.container.components.get(group) );
			}
			
			self.el.append( item.el );
// 			
			// if(!self.container.components.has_key(group)) {
			// }
			
		});
		
//		if(this.container.components.has_key())
		
		
		
	}
	
});



$.ergo({
	etype: 'panel',
	title: 'Group',
	renderTo: '.preview',
	
	cls: 'dino-border-all',
	style: {'background-color': '#fff'},
	
	content: {
		etype: 'table-grid',
		data: gridData,
		dynamic: true,
		height: 300,
		
		components: {
			body: {
				content: {
					layout: new customLayout()
				}
			}
		},
		
		tableModel: {
      row: {
        cls: 'group-row'
      },
      cell: {
        style: {'border-bottom': '1px solid #ccc'},
      },
      columns: [{
        dataId: 'id',
        header: 'ID',
        cls: 'dino-default-column',
        width: 60
      }, {
        dataId: 'name',
        header: 'Name',
        cls: 'dino-text-column',
      }, {
        dataId: 'value',
        header: 'Value',
        cls: 'dino-numeric-column',
        width: 100
      }]			
		}
		
		
		// defaultItem: {
			// etype: 'box',
			// components: {
				// title: {
          // etype: 'box',
          // cls: 'group-title',
          // content: {
            // etype: 'text',
            // dataId: 'name'
          // }					
				// },
				// grid: {
					// etype: 'grid',
					// dataId: 'items',
					// gridModel: {
            // row: {
              // cls: 'group-row'
            // },
            // cell: {
              // style: {'border-bottom': '1px solid #ccc'},
            // },
            // columns: [{
              // dataId: 'id',
              // cls: 'dino-default-column',
              // width: 60
            // }, {
              // dataId: 'name',
              // cls: 'dino-text-column',
            // }, {
              // dataId: 'value',
              // cls: 'dino-numeric-column',
              // width: 100
            // }]						
					// }
				// }
// 				
			// }
		// }
	}
	
});


    
/*    
$.ergo({
  etype: 'box',
  renderTo: '.preview',
  width: 500,
  cls: 'dino-border-all dino-corner-all',
  components: {
    header: {
      etype: 'table',
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
      etype: 'box',
      data: gridData,
      dynamic: true,
      height: 300,//'auto',
      cls: 'dino-grid-content',
      defaultItem: {
        components: {
          title: {
            etype: 'box',
            cls: 'group-title',
            content: {
              etype: 'text',
              dataId: 'name'
            }
          },
          table: {
            etype: 'table',
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
*/

    
