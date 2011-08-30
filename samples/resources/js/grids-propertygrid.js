
var gridData = new Ergo.core.DataSource();


    
    
var propertyGrid = $.ergo({
  renderTo: '.preview',
  etype: 'table-grid',
  cls: 'dino-border-all dino-corner-all',
  width: 400,
  height: 200,
//  content: {
//    style: {'font-size': '9pt'}
//  },
//  headerCls: 'dino-bg-highlight',
//  headerModel: {
//    cell: {
//      cls: 'grid-header-cell'
//    }
//  },
  tableModel: {
    cell: {
      cls: 'grid-cell',
      binding: 'auto',
      extensions: [Ergo.Editable]
    },
    columns: [{
      dataId: 'name',
      header: 'Наименование'
    }, {
      dataId: 'value',
      header: 'Значение',
      width: 100,
      extensions: [Ergo.Clickable],
//      state: 'clickable',
      onDoubleClick: function(){
        if( this.opt('editable') ) this.startEdit();
      },
      binding: function() {
        var val = this.data.source.get();

        if(val.type == 'boolean') {
          this.components.add({etype: 'checkbox'}, 'content');
          this.opt('editable', false);
        }
        else if(val.type == 'select') {

          this.opt('editor', {
            etype: 'dropdown-editor',
            components: {
              button: {
                cls: 'ui-icon ui-icon-triangle-1-s'
              },
              input: {
                format: function(val) { 
                  return (val === '' || val === undefined) ? '' : this.data.source.get('value_list')[val]; 
                }
              }
            },
            binding: function(val) {
              this.dropdown.bind(this.data.source.entry('value_list'));
            },
            dropdownOnFocus: true
          });
                    
          this.opt('format', function() {
            var val = this.data.source.get();
            return val.value_list[val.value]; 
          });          
        }
        else if(val.type == 'date') {
          
          this.opt('editor', {
            etype: 'dropdown-editor',
            components: {
              button: {
                cls: 'silk-icon-date'
              },
              input: {
                format: function(val){ return val; }
              }
            },
            onCreated: function() {
              var self = this;
              
              this.input.el.datepick({
                dateFormat: $.datepick.ISO_8601, 
                showOnFocus: false, 
                onSelect: function(dates){
                  var date = dates[0];
                  self.setValue($.datepick.formatDate($.datepick.ISO_8601, date));
                }, 
                onClose: function(){
                  if(self.parent) self.parent.stopEdit();
                }
              });              
            },
            store: function(val) {
              return val;
            },
            extensions: [{
              showDropdown: function() {
                this.input.el.datepick('show');                
              }
            }]
          });
        }
        else if(val.type == 'numeric') {
          
          this.opt('editor', {
            etype: 'spinner-editor'
          });
          
        }
        else {

          this.opt('editor!', {
            etype: 'text-editor'
          });
          
        }
        
        if(val.type != 'boolean')
          this.layout.el.text( this.getValue() );
      }
    }]
  },
  data: gridData,
});
    
$.getJSON('ajax/properties.json', function(json){ gridData.set(json); });
    