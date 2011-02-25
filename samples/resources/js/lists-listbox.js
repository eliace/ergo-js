


var listBoxData = new Dino.data.ArrayDataSource(Samples.generate_plain_list(30));//['Alice', 'Bob', 'Charlie']);


var listBox = $.dino({
  dtype: 'panel',
  renderTo: '.preview',
  title: 'Список',
  width: 400,
  data: listBoxData,
	cls: 'dino-border-all',
  content: {
    dtype: 'box',
    components: {
      toolbar: {
        dtype: 'control-box',
        cls: 'dino-border-bottom',
        defaultItem: {
          dtype: 'text-button',
          cls: 'plain dino-corner-all',
          onAction: function() {
            var list = listBox.content.list;
            if(this.tag == 'add') {
              var dataItem = this.data.add('New item', 0);
              var item = list.getListItem({'data': dataItem});
              list.el.scrollTop(0);
              item.getColumn(1).startEdit();
            }
            else if(this.tag == 'delete') {
              list.selection.each(function(item){
                item.data.del();
              });
            }
           	else if(this.tag == 'refresh') {
							listBoxData.set( Samples.generate_plain_list(30) );
						}
            list.selection.clear();
          }
        },
        items: [{
          icon: 'led-icon-add',
          text: 'Добавить',
          tag: 'add'
        }, {
          icon: 'led-icon-delete',
          text: 'Удалить',
          tag: 'delete'
        }, {
          icon: 'led-icon-refresh',
          text: false,
          tag: 'refresh'
        }]
      },
      list: {
        dtype: 'list-box',
        listModel: {
          row: {
            states: {
              'selected': function(is_set) {
                this.getItem(0).content.opt('checked', is_set);
              }
            },
          },
          columns: [{
            cls: 'dino-icon-column',
            binding: false,
            content: {
              dtype: 'checkbox',
							events: {
	              'click': function(e) {
									e.preventDefault();
	              }								
							}
            }
          }, {
            binding: 'auto',
            events: {
              'click': function(e, w) {
                w.getParent(Dino.widgets.ListBox).selection.add(w.getRow(), e.ctrlKey, e.shiftKey);
              },
              'mousedown': function(e) {
                if(e.shiftKey || e.ctrlKey) return false;
              },
              'dblclick': function(e, w) {
                w.startEdit();
              }
            }
//            editable: true
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
        extensions: [Dino.Selectable]
      }
    }
  }
  
  
});
    


    
