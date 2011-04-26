
gridData = new Dino.data.ArrayDataSource();

updateBuffer = new Dino.utils.UpdateBuffer();
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
            
            var pager = grid.pager;
            pager.setCount( pager.getCount()+1 );
            pager.setIndex( pager.getMaxIndex() );
            
            var row = grid.content.content.getRow({'data': dataItem});
            grid.content.el.scrollTop( grid.content.content.el.height() );
            row.getColumn(0).startEdit();
            
            updateBuffer.add(val);
          }
          else if(this.tag == 'delete') {
            grid.selection.each(function(item){
              var val = item.data.val();
              updateBuffer.del(val);
              item.data.del();
            });
            grid.pager.opt('count', grid.pager.count - grid.selection.size() );
          }
          else if(this.tag == 'refresh') {
            gridData.source = Samples.generate_grid_page(0, 120);
            gridData.filter_chain = null;
            grid.pager.setCount(120);
            grid.pager.setIndex(0);
            updateBuffer.clear();
          }
          else if(this.tag == 'save') {
            
            var s = [];
            updateBuffer.flush(function(val, action){
              s.push('<div><span>'+val.string+'</span><span class="update-status '+action+'">'+action+'</span></div>');
            });
            growl.info(s.join(''), true);
          }
          grid.selection.clear();
          
        }
      },
      items: [{
        icon: 'silk-icon-add',
        text: 'Добавить',
        tag: 'add'
      }, {
        icon: 'silk-icon-delete',
        text: 'Удалить',
        tag: 'delete'
      }, {
        icon: 'silk-icon-arrow-refresh',
        text: 'Обновить',
        tag: 'refresh'
      }, {
        icon: 'silk-icon-disk',
        text: 'Сохранить',
        tag: 'save'
      }]
    },
    grid: {
      dtype: 'grid',
      content: {
        cls: 'scrollable',
//        style: {'padding-right': '18px', 'font-size': '9pt'},
        height: 'auto',
        extensions: [Dino.Focusable],
        onKeyDown: function(e) {
          var catched = false;
          var selected_row = this.parent.selection.get();
          if(selected_row) {
            if(e.keyCode == 38) {
              var prev_row = this.content.getRow(selected_row.index-1);
              if(prev_row) {
                this.parent.selection.add( prev_row );
                var pos = prev_row.el.offset().top - this.el.offset().top;
                if(pos < 0) {
                  this.el.scrollTop(this.el.scrollTop() - prev_row.el.outerHeight());
                }
//                console.log(Dino.format('%s, %s, %s', this.el.scrollTop(), this.parent.el.height(), offset));
              }
              catched = true;
            }
            if(e.keyCode == 40) {
              var next_row = this.content.getRow(selected_row.index+1);
              if(next_row) {
                this.parent.selection.add( next_row );
                var pos = next_row.el.offset().top - this.el.offset().top;
                if(this.el.height() - next_row.el.outerHeight() < pos) {
                  this.el.scrollTop(this.el.scrollTop() + next_row.el.outerHeight());
                }
//                console.log(Dino.format('%s, %s, %s', this.el.scrollTop(), this.parent.el.height(), next_row.el.position().top));                
              }
              catched = true;
            }
          }              
          
          if(catched) e.baseEvent.preventDefault();
        }
      },
//      headerCls: 'dino-bg-highlight',
      tableModel: {
        cell: {
          binding: 'auto',
          events: {
            'dblclick': function(e, w) {
              if(w.options.editable) w.startEdit();
            }
          },
          extensions: [Dino.Editable],
          onEdit: function(e) {
            var val = this.getRow().data.val();
            updateBuffer.upd(val);
            if(e.reason == 'enterKey') {
              var nextCol = this.getRow().getColumn(this.index+1);
              if(nextCol && nextCol.options.editable) nextCol.startEdit();
            }
          },
          editor: {
            dtype: 'text-editor',
            style: {'font-size': '9pt'}
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
          format: Dino.format_currency.rcurry('$'),
          editor: {
            components: {
              input: {
                parser: function(val) {
                  return Dino.isString(val) ? parseFloat(val) : val; 
                }                
              }
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
            dtype: 'checkbox',
            onAction: function() {
              var val = this.data.source.val();
              updateBuffer.upd(val);
            }
          },
          editable: false,
          binding: 'skip'
        }]
      },
      components: {
        pager: {
          dtype: 'pager',
          count: 200,
          pageSize: 40,
          cls: 'dino-border-top',
          onIndexChanged: function(e) {
                        
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
widget.grid.pager.setIndex(0);

