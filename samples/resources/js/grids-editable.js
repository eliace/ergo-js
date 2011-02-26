
gridData = new Dino.data.ArrayDataSource();

updateBuffer = {};
var newCounter = 0;
    
var widget = $.dino({
  renderTo: '.preview',
  dtype: 'box',
  cls: 'dino-border-all',// dino-corner-all',
  width: 600,
  height: 400,
  data: gridData,
  components: {
    controls: {
      dtype: 'control-box',
      cls: 'dino-border-bottom',
      defaultItem: {
        dtype: 'text-button',
        cls: 'plain',
        onAction: function() {
          var grid = widget.grid;
          if(this.tag == 'add') {            
            var val = {'id': 'temp-'+(++newCounter), 'string': 'New item', 'count': 0, 'currency': 0, 'date': '', flag: false};
            var dataItem = this.data.add(val);
            
						grid.pager.opt('count', grid.pager.count+1);
            grid.pager.setCurrentIndex( grid.pager.getMaxIndex() );
            
						var item = grid.content.content.getRow({'data': dataItem});
            grid.content.el.scrollTop( grid.content.content.el.height() );
            item.getColumn(0).startEdit();
            
            updateBuffer[val.id] = val;
            val.action = 'new';
          }
          else if(this.tag == 'delete') {
            grid.selection.each(function(item){
              var val = item.data.val();
              updateBuffer[val.id] = val;
              val.action = 'deleted';
              
              item.data.del();
            });
            grid.pager.opt('count', grid.pager.count - grid.selection.size() );
          }
           else if(this.tag == 'refresh') {
            gridData.source = [];
						gridData.filter_chain = null;
            grid.pager.opt('count', 120);
            grid.pager.setCurrentIndex(0);
            updateBuffer = {};
          }
           else if(this.tag == 'save') {
            
            var s = [];
            Dino.each(updateBuffer, function(val, i){
              s.push('<div><span>'+val.string+'</span><span class="update-status '+val.action+'">'+val.action+'</span></div>');
            });
            
            growl.info(s.join(''), true);
            updateBuffer = {};
          }
          grid.selection.clear();
          
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
        text: 'Обновить',
        tag: 'refresh'
      }, {
        icon: 'led-icon-disk',
        text: 'Сохранить',
        tag: 'save'
      }]
    },
    grid: {
      dtype: 'grid',
      content: {
        style: {'padding-right': '18px', 'font-size': '9pt'},
        height: 'auto'
      },
      headerCls: 'dino-bg-highlight',
      headerModel: {
        cell: {
          cls: 'grid-header-cell',
        },
      },
      tableModel: {
        cell: {
          cls: 'grid-cell',
          binding: 'auto',
          events: {
            'dblclick': function(e, w) {
              if(!w.options.noEdit) w.startEdit();
            }
          },
          extensions: [Dino.Editable],
          onEdit: function() {
            var val = this.getRow().data.val();
            updateBuffer[val.id] = val;
            if(!('action' in val)) val.action = 'edit';
          }
        },
        row: {
          events: {
            'click': function(e, w) {
              w.getParent(Dino.widgets.Grid).selection.add(w, e.ctrlKey, e.shiftKey);
            },
            'mousedown': function(e) {
              if(e.shiftKey || e.ctrlKey) return false;
            }
          }
        },
        columns: [{
          dataId: 'string',
          header: 'Нименование'
        }, {
          dataId: 'count',
          header: 'Количество',
          format: function(v) { return '' + v + ' шт' },
        }, {
          dataId: 'currency',
          header: 'Цена',
          format: function(v) { return "$"+v.toFixed(2); },
          editor: {
            store_format: function(val) {
              return Dino.isString(val) ? parseFloat(val) : val; 
            }
          }
        }, {
          dataId: 'date',
          header: 'Дата',
          style: {'text-align': 'right'}
        }, {
          dataId: 'flag',
          header: '',
          width: 50,
          style: {'text-align': 'center'},
          content: {
            dtype: 'checkbox',
						onAction: function() {
	            var val = this.data.source.val();
	            updateBuffer[val.id] = val;
	            if(!('action' in val)) val.action = 'edit';							
						}
          },
          noEdit: true,
          binding: 'skip'
        }]
      },
      components: {
        pager: {
          dtype: 'pager',
          count: 120,
          pageSize: 40,
          cls: 'dino-border-top',
          onCurrentChanged: function(e) {
                        
            gridData.filter_chain = function(data){
              var out = [];
							for(var idx = 0; idx < data.length; idx++)
                if(idx >= e.from && idx < e.to) out.push(idx);								
              return out;
            };
            
            gridData.events.fire('onValueChanged');
          }
        }
      },
      extensions: [Dino.Selectable]
    }
  }
});


gridData.source = Samples.generate_grid_page(0, 120);    
widget.grid.pager.setCurrentIndex(0);

