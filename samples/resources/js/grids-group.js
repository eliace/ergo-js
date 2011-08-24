

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

var groupData = {
	'1': {
		name: 'Группа 1'
	},
	'2': {
		name: 'Группа 2'
	},
	'3': {
		name: 'Группа 3'
	}
};

var gridData = [
    {id: '1', name: 'Alice', value: '123', cb: false, group: '1'},
    {id: '2', name: 'Bob', value: '456', cb: true, group: '1'},
    {id: '3', name: 'Charlie', value: '789', cb: false, group: '2'},
    {id: '4', name: 'Dean', value: '31545', cb: false, group: '3'},
    {id: '5', name: 'Eva', value: '987', cb: false, group: '3'},
];



var customLayout = Ergo.layouts.PlainLayout.extend({
	
	
/*	
	insert: function(item) {
		
		if(!item.options.group)
			return customLayout.superclass.insert.apply(this, arguments);

		var c = this.container;
		
		var g = item.options.group;
		
		if(!c.components.has_key(g)) {
			
			c.components.add({
				etype: 'table-row',
				html: '<tr/>',
				cls: 'group',
				tag: 'group',
				items: [{
					data: groupData,
					dataId: g,
					html: '<td colspan="3" />',
					content: {
						etype: 'text',
						dataId: 'name'
					}
				}]
			}, g);
			
		}
		
		c.components.get(g).el.after(item.el);

//		if(!item.data || item.tag == 'group') {
//		}
		
		// var g = item.data.get('group');
		// var c = this.container;
// 		
		// if(!c.components.has_key(g)) {
// 			
			// c.components.add({
				// etype: 'table-row',
				// html: '<tr/>',
				// cls: 'group',
				// tag: 'group',
				// items: [{
					// data: groupData,
					// dataId: g,
					// html: '<td colspan="3" />',
					// content: {
						// etype: 'text',
						// dataId: 'name'
					// }
				// }]
			// }, g);
// 			
		// }
// 		
		// c.components.get(g).el.after(item.el);		
		
	},
*/	
	
	
	
	rebuild: function() {
		
//		console.log('rebuild');
		
		var self = this;
		var c = this.container;
		
		var group = null;
		
		// создаем по необходимости группы
		c.items.each(function(item){
			var g = item.data.get('group');
			
			if(!c.components.has_key(g)) {
				
				c.components.add({
					etype: 'table-row',
					html: '<tr/>',
					cls: 'group',
					items: [{
						data: groupData,
						dataId: g,
						html: '<td colspan="3" />',
						content: {
							etype: 'text',
							dataId: 'name',
							style: {'margin-left': 3}
						}
					}]
				}, g);
				
//				console.log('component created');
				
			}
			
		});
		
		
		var items = [];
		
		c.items.each(function(item){
			items.push(item);
		});
		
		// сотировка по полю "id"
		items.sort(function(w1, w2){
			var a = w1.data.get('id');
			var b = w2.data.get('id');
			if(a < b) return -1;
			else if(a > b) return 1;
			return 0;
		});

		// // сортировка по полю "group"
		// items.sort(function(w1, w2){
			// var a = w1.data.get('group');
			// var b = w2.data.get('group');
			// if(a < b) return -1;
			// else if(a > b) return 1;
			// return 0;
		// });
		
		items.reverse();
		
		Ergo.each(items, function(item){
			var g = item.data.get('group');
			
			c.components.get(g).el.after(item.el);
						
//			self.el.append( item.el );
			
		});
		
//		if(this.container.components.has_key())
		
		
		
	}

	
	
});



$.ergo({
	etype: 'editable-panel',
	title: 'Group',
	renderTo: '.preview',
	
	cls: 'dino-border-all',
	
	
  components: {
    // header: {
      // state: 'hidden'
    // },
    toolbar: {
      cls: 'dino-border-bottom',
      defaultItem: {
        cls: 'plain'
      }
    }
  },
	
	
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
        cls: 'group-row',
        binding: function(val) {
        	this.options.group = val.group;
        }
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
	},
	
  toolbarButtons: ['add'],
  
  toolbarButtonSet: {
    'add': {icon: 'silk-icon-add'}
  },
  
  
  onAdd: function() {
  	
  	this.content.data.add({
  		id: '6', 
  		name: 'Xavier', 
  		value: '789', 
  		cb: false, 
  		group: '2'
  	})
  	
  	this.content.body.content.layout.rebuild();
  	
//  	growl.info('Add');
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

    
