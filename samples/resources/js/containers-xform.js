    

var xformData = {
  text: 11,
  text2: '16.12.2010',
  number: 4,
  number2: 2,
  continent: '',
  continent2: ''
};



var listData = ['Africa', 'Eurasia', 'America', 'Australia', 'Antarctica'];
var hashData = {
  'af': 'Africa', 
  'eu': 'Eurasia', 
  'am': 'America', 
  'au': 'Australia', 
  'an': 'Antarctica'
};



  
$.dino({
  dtype: 'box',
  renderTo: '.preview',
  layout: 'simple-form-layout',
  data: xformData,
  defaultItem: {
  },
  items: [{
    label: 'Поле с кнопкой (форма)',
    dataId: 'text',
    dtype: 'combo-field',
    cls: 'dino-form-field',
    components: {
      button: {
        dtype: 'icon-button',
        role: 'actor',
        icon: 'dino-icon-search',
      }
    },
    extensions: [Dino.Focusable]
  }, {
    label: 'Поле с кнопкой (редактор)',
    width: 160,
    content: {
      dtype: 'text-editor',
      style: {'padding': '1px'},
      dataId: 'text2',
      components: {
        button: {
          dtype: 'action-icon',
          role: 'actor',
          cls: 'led-icon-calendar_1 dino-clickable'
        }
      }
    },
    overrides: {
      stopEdit: Dino.noop
    }
  }, {
    dtype: 'select-field',
    label: 'Поле со списком (форма)',
    cls: 'dino-form-field',
    dataId: 'continent',
    components: {
      button: {
        icon: 'ui-icon ui-icon-triangle-1-s',
        role: 'actor'
      },
      dropdown: {
        data: listData,
        content: {
          defaultItem: {
            cls: 'tb3-dropdown-item',
            icon: 'led-icon-world'
          }
        }
      }
    },
    extensions: [Dino.Focusable]
  }, {
    label: 'Поле со списком  (редактор)',
    width: 160,    
    dataId: 'continent2',
    content: {
      dtype: 'dropdown-editor',
      components: {
        button: {
          cls: 'ui-icon ui-icon-triangle-1-s'
        },
        dropdown: {
          data: hashData,
          content: {
            defaultItem: {
              icon: 'led-icon-world'
            }
          }
        }
      }
    },
    overrides: {
      stopEdit: Dino.noop
    }    
  }, {
    label: 'Счетчик (форма)',
    dtype: 'combo-field',
    cls: 'dino-form-field',
    dataId: 'number',
    components: {
      input: {
        updateOnValueChange: true
      },
      buttons: {
        dtype: 'box',
        role: 'actor',
        defaultItem: {
          style: {'display': 'block'},
          cls: 'dino-border-none',
          height: 11,
          width: 20,
          onAction: function() {
            if(this.tag == 'up')
              this.data.set(this.data.get()+1);
            else if(this.tag == 'down')
              this.data.set(this.data.get()-1);
          }          
        },
        items: [{
          dtype: 'button',
          cls: 'dino-icon-up dino-corner-right-top',
          tag: 'up'
        }, {
          dtype: 'button',
          cls: 'dino-icon-down dino-corner-right-bottom',
          tag: 'down'
        }]        
      }
    },
    extensions: [Dino.Focusable]
  }, {
    label: 'Счетчик (редактор)',
    width: 100,
    content: {
      dtype: 'spinner-editor',
      dataId: 'number2',
      style: {'padding': '1px'}
    },
    overrides: { stopEdit: Dino.noop }    
  }
  ]
});      


