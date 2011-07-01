





var gridData = new Dino.core.DataSource([]);

updateBuffer = new Dino.utils.UpdateBuffer();
var newCounter = 0;
    
var panel = $.dino({
  renderTo: '.preview',
  dtype: 'editable-panel',
	title: 'Редактируемая таблица',
	
  cls: 'dino-border-all',// dino-corner-all',
  width: 600,
  height: 400,
  data: gridData,
  
	components: {
		
		header: {
			state: 'hidden'
		},
		toolbar: {
			cls: 'dino-border-bottom',
			defaultItem: {
				cls: 'plain'
			}
		},
		
		
/*		
    controls: {
      dtype: 'control-list',
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
            grid.pager.opt('count', grid.pager.count - grid.selection.count() );
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
    
*/    
    
    
    content: {
      dtype: 'table-grid',

			
//      headerCls: 'dino-bg-highlight',
      tableModel: {
        cell: {
          binding: 'auto',
					onDoubleClick: function(e) {
            if(this.options.editable) this.startEdit();
						e.baseEvent.preventDefault();						
					},
          extensions: [Dino.Editable],
          onEdit: function(e) {
            var val = this.getRow().data.get();
            updateBuffer.upd(val);

            var nextCol = this.getRow().getColumn(this.index+1);
            if(nextCol) nextCol.startEdit();
          },
          editor: {
            dtype: 'text-editor'
//						components: {
//							input: {
//       					style: {'font-size': '12px'}								
//							}
//						}								
          },
					state: 'unselectable'
        },
        row: {
					onClick: function(e) {
						this.getParent(Dino.widgets.TableGrid).body.selection.add(this, e.baseEvent.ctrlKey, e.baseEvent.shiftKey);
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
          format: Dino.format_currency.rcurry('$'),
          editor: {
            store: function(val) {
              return Dino.isString(val) ? parseFloat(val) : val; 
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
					editor: {
						dtype: 'text-editor',
						style: {'text-align': 'center'},
						autoFit: false,
						components: {
							input: {
								dtype: 'checkbox',
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
					extensions: [Dino.Selectable, Dino.Focusable, Dino.ListNavigation]
				},				
        pager: {
          dtype: 'pager',
          count: 200,
          pageSize: 40,
          cls: 'dino-border-top',
          onIndexChanged: function(e) {
                        
            gridData.options.filter = function(keys, values){
              var out = [];
              for(var idx = 0; idx < values.length; idx++)
                if(idx >= e.from && idx < e.to) out.push(idx);                
              return out;
            };
            
            gridData.events.fire('onValueChanged');
						
						panel.content.$layoutChanged();
          }
        }
      },
//      extensions: [Dino.Selectable]
    }
  },
	
	
	onAdd: function() {
		
		var grid = this.content;
		
    var val = {'id': 'temp-'+(++newCounter), 'string': 'New item', 'count': 0, 'currency': 0, 'date': '', flag: false};
    var dataItem = this.data.add(val);
    
    var pager = grid.pager;
    pager.setCount( pager.getCount()+1 );
    pager.setIndex( pager.getMaxIndex() );
    
    var row = grid.content.content.getRow({'data': dataItem});
    grid.content.el.scrollTop( grid.content.content.el.height() );
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

