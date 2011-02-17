
/*
 * Экспериментальный код
 */
Dino.merge_r(Dino.widgets.ListBox.prototype, {

  defaultOptions: {
    components: {
      content: {
        tableModel: {
          row: {
            state: 'nonselectable',
            events: {
              'click': function(e, w) {
                var list = w.getParent(Dino.widgets.ListBox);
                
                if(e.shiftKey && list.selected_a) {
                  // создаем выборку
                  var i0 = Math.min(list.selected_a[0].index, list.selected_a[list.selected_a.length-1].index);
                  i0 = Math.min(i0, w.index);
                  var i1 = Math.max(list.selected_a[0].index, list.selected_a[list.selected_a.length-1].index);
                  i1 = Math.max(i1, w.index);
                  
                  list.selected_a = [];
                  
                  w.parent.eachItem(function(item, i){
                    if(i >= i0 && i <= i1) {
                      item.states.set('selected');
                      list.selected_a.push(item);
                    }
                  });
                }
                else if(e.ctrlKey) {
                  ( w.states.toggle('selected') ) ? list.selected_a.push(w) : Dino.remove_from_array(list.selected_a, w);
                }
                else {
                  if(list.selected_a)
                    Dino.each(list.selected_a, function(item){ item.states.clear('selected'); });
                  w.states.set('selected');
                  list.selected_a = [w];                  
                }
                
              }
            }
          }
        }
      }
    }
  }
  
    
});



var listBoxData = new Dino.data.ArrayDataSource(Samples.generate_plain_list(30));//['Alice', 'Bob', 'Charlie']);


var listBox = $.dino({
  dtype: 'panel',
  renderTo: '.preview',
  title: 'Список',
  width: 400,
  components: {
    content: {
      dtype: 'list-box',
      listModel: {
        row: {
          states: {
            'selected': function(is_set) {
              this.getItem(0).content.opt('checked', is_set);
            }
          }
        },
        columns: [{
          cls: 'dino-icon-column',
          binding: false,
          content: {
            dtype: 'checkbox'
          }
        }, {
          binding: 'auto',
          editable: true
        }, {
          cls: 'dino-icon-column',
          content: {
            dtype: 'icon',
            cls: 'ui-icon-gray ui-icon-arrowthick-1-n dino-clickable'
          }
        }, {
          cls: 'dino-icon-column',        
          content: {
            dtype: 'icon',
            cls: 'ui-icon-gray ui-icon-arrowthick-1-s dino-clickable'
          }
        }]        
      },
      height: 300,
      data: listBoxData,        
    },
    footer: {
      cls: 'dino-widget-footer dino-border-top',
      defaultItem: {
        dtype: 'icon-button',
        cls: 'dino-corner-all',// dino-bg-4 dino-border-none dino-clickable',
        states: {
          'hover': []
        },
        clickable: true,
        onClick: function() {
          
          var selectedItem = listBox.content.getSelectedItem();
          
          if(this.tag == 'add') {
            if(selectedItem) {
              var data = listBoxData.add('Новая строка', selectedItem.index+1);
              listBox.content.getListItem({'data': data}).getColumn(0).startEdit();
            }
            else {
              var data = listBoxData.add('Новая строка');
              listBox.content.getListItem({'data': data}).getColumn(0).startEdit();              
            }            
          }
          else if(this.tag == 'delete') {
            if(selectedItem) selectedItem.data.del();
            listBox.content.setSelectedItem(null);
          }
          else if(this.tag == 'refresh') {
            listBoxData.set( Samples.generate_plain_list(30) );//['Alice', 'Bob', 'Charlie']);
          }
        }
      },
      items: [{
        icon: 'led-icon-add',
        tag: 'add'
      }, {
        icon: 'led-icon-delete',
        tag: 'delete'
      }, {
        icon: 'led-icon-refresh',
        tag: 'refresh'
      }]
    }
  }
});
    



//listBox.content.merge({
  
  
//});


    
