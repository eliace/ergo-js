





var gridData = new Ergo.core.DataSource([]);

updateBuffer = new Ergo.utils.UpdateBuffer();
var newCounter = 0;
    
var panel = $.ergo({
  renderTo: '.preview',
  etype: 'editable-panel',
  title: 'Редактируемая таблица',
  
  cls: 'ergo-border-all',// ergo-corner-all',
  width: 600,
  height: 400,
  data: gridData,
  
  components: {
    
    header: {
      state: 'hidden'
    },
    toolbar: {
      cls: 'ergo-border-bottom',
      defaultItem: {
        cls: 'plain'
      }
    },
    
        
    
    content: {
      etype: 'table-grid',

      
//      headerCls: 'ergo-bg-highlight',
      tableModel: {
        cell: {
          binding: 'auto',
          onDoubleClick: function(e) {
            if(this.options.editable) this.startEdit();
            e.baseEvent.preventDefault();            
          },
          extensions: ['editable'],
          onEdit: function(e) {
            var val = this.getRow().data.get();
            updateBuffer.upd(val);

            var nextCol = this.getRow().getColumn(this.index+1);
            if(nextCol) nextCol.startEdit();
          },
          editor: {
            etype: 'text-editor'
//            components: {
//              input: {
//                 style: {'font-size': '12px'}                
//              }
//            }                
          },
          state: 'unselectable'
        },
        row: {
          onClick: function(e) {
            this.getParent(Ergo.widgets.TableGrid).body.selection.add(this, e.baseEvent.ctrlKey, e.baseEvent.shiftKey);
          },
          events: {
            'mousedown': function(e) {
              if(e.shiftKey || e.ctrlKey) return false;
            }
          }
        },
        columns: [{
          dataId: 'string',
          header: 'Наименование'
        }, {
          dataId: 'count',
          header: 'Количество',
          format: function(v) { return '' + v + ' шт' },
          style: {'text-align': 'right'},
          editor: 'spinner-editor'
        }, {
          dataId: 'currency',
          header: 'Цена',
          format: Ergo.format_currency.rcurry('$'),
          editor: {
            store: function(val) {
              return $.isString(val) ? parseFloat(val) : val; 
            }                
          }
        }, {
          dataId: 'date',
          header: 'Дата',
//          style: {'text-align': 'right'}
        }, {
          dataId: 'flag',
          header: '',
          width: 50,
          style: {'text-align': 'center'},
          content: {
            etype: 'checkbox',
            onAction: function() {
              var val = this.data.source.val();
              updateBuffer.upd(val);
            }
          },
          editor: {
            etype: 'text-editor',
            style: {'text-align': 'center'},
            autoFit: false,
            components: {
              input: {
                etype: 'checkbox',
              }
            },
            keepContent: true,
            changeOnEnter: false
          },
//          editable: false,
          binding: 'skip'
        }]
      },
      components: {
        body: {
          extensions: ['selectable', 'focusable', 'listnavigation']
        },        
        pager: {
          etype: 'pager',
          count: 200,
          pageSize: 40,
          cls: 'ergo-border-top',
          onIndexChanged: function(e) {
                        
            gridData.options.filter = function(v, i){//keys, values){
            	return (i >= e.from && i < e.to)
              // var out = [];
              // for(var idx = 0; idx < values.length; idx++)
                // if(idx >= e.from && idx < e.to) out.push(idx);                
              // return out;
            };
            
            //FIXME здесь должен быть метод $dataChanged()
            gridData.events.fire('value:changed');
            
            panel.content.$layoutChanged();
          }
        }
      },
//      extensions: [Ergo.Selectable]
    }
  },
  
  
  onAdd: function() {
    
    var grid = this.content;
    
    var val = {'id': 'temp-'+(++newCounter), 'string': 'New item', 'count': 0, 'currency': 0, 'date': '', flag: false};
    var dataItem = this.data.add(val);
    
    var pager = grid.pager;
    pager.setCount( pager.getCount()+1 );
    pager.setIndex( pager.getMaxIndex() );
    
    var row = grid.getRow({'data': dataItem});
    grid.body.el.scrollTop( grid.body.content.el.height() );
    row.getColumn(0).startEdit();
    
    updateBuffer.add(val);    
    
  },
  
  onDelete: function() {
    
  },
  
  onRefresh: function() {
    
  },
  
  onSave: function() {
    
  },
  
  
  toolbarButtons: ['add', 'delete', 'save', 'refresh'],
  
  toolbarButtonSet: {
    'add': {icon: 'silk-icon-add'},
    'delete': {icon: 'silk-icon-delete'},
    'refresh': {icon: 'silk-icon-arrow-refresh'},
    'save': {icon: 'silk-icon-disk'},
  }  
  
});


gridData.source = Samples.generate_grid_page(0, 200);    
panel.content.pager.setIndex(0);

