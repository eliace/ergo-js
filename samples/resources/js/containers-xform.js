    

var xformData = {
  text: 11,
  text1: '',
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
  dtype: 'list',
  renderTo: '.preview',
  layout: 'simple-form',
  data: xformData,
  id: 'xform',
  items: [{
    label: 'Текстовое поле (форма)',
    content: {
      dataId: 'text1',
      dtype: 'text-field',
      cls: 'dino-form-field',
      placeholder: 'Введите число...',
      validate: Dino.validators.floatNumber
    }
  },{
    label: 'Поле с кнопкой (форма)',
    content: {
      dataId: 'text',
      dtype: 'text-field',
      cls: 'dino-form-field',
      width: 200,
      components: {
        button: {
          dtype: 'icon-button',
          role: 'actor',
          icon: 'dino-icon-search',
					tabIndex: -1
        }
      }
    }
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
          cls: 'silk-icon-date dino-clickable'
        }
      }
    },
    extensions: [{stopEdit: Dino.noop}]    
  }, {
    label: 'Поле со списком (форма)',
    content: {
      dtype: 'dropdown-field',
      cls: 'dino-form-field',
      dataId: 'continent',
      dataModel: {
//				type: 'keyvalue',
        data: listData
			},
      components: {
//        button: {
//          icon: 'dino-icon-spinner-down',
//        },
        dropdown: {
          content: {
            defaultItem: {
              cls: 'tb3-dropdown-item',
              icon: 'silk-icon-world'
            }
          }
        }
      }
    }
  }, {
    label: 'Поле со списком  (редактор)',
    width: 160,    
    dataId: 'continent2',
    content: {
      dtype: 'dropdown-editor',
      dataModel: {
				type: 'keyvalue',
				data: hashData
			},
      components: {
        button: {
          cls: 'ui-icon ui-icon-triangle-1-s'
        },
        dropdown: {
          content: {
            defaultItem: {
              icon: 'silk-icon-world'
            }
          }
        }
      }
    },
    extensions: [{stopEdit: Dino.noop}]    
  }, {
    label: 'Счетчик (форма)',
    content: {
      dtype: 'spinner-field',
      cls: 'dino-form-field',
      dataId: 'number',
//      components: {
//        input: {
//          updateOnValueChange: true
//        },
//        buttons: {
//          dtype: 'box',
//          role: 'actor',
//          defaultItem: {
//            style: {'display': 'block'},
//            cls: 'dino-border-none',
//            height: 10,
//            width: 20,
//            onAction: function() {
//              if(this.tag == 'up')
//                this.data.set(this.data.get()+1);
//              else if(this.tag == 'down')
//                this.data.set(this.data.get()-1);
//            }          
//          },
//          items: [{
//            dtype: 'button',
//            cls: 'dino-icon-spinner-up dino-corner-right-top',
//            tag: 'up'
//          }, {
//            dtype: 'button',
//            cls: 'dino-icon-spinner-down dino-corner-right-bottom',
//            tag: 'down'
//          }]        
//        }
//      },
//      extensions: [Dino.Focusable]      
    }
  }, {
    label: 'Счетчик (редактор)',
    width: 100,
    content: {
      dtype: 'spinner-editor',
      dataId: 'number2',
      style: {'padding': '1px'}
    },
    extensions: [{ stopEdit: Dino.noop }]    
  }
  ]
});      


