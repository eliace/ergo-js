    

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



  
$.ergo({
  etype: 'box',
  renderTo: '.preview',
  layout: 'simple-form',
  data: xformData,
  id: 'xform',
  items: [{
    label: 'Текстовое поле (форма)',
    content: {
      dataId: 'text1',
      etype: 'text-field',
      cls: 'e-form-field',
      placeholder: 'Введите число...',
      validate: Ergo.validators.floatNumber
    }
  },{
    label: 'Поле с кнопкой (форма)',
    content: {
      dataId: 'text',
      etype: 'text-field',
      cls: 'e-form-field',
      width: 200,
      components: {
        button: {
          etype: 'icon-button',
          role: 'actor',
          icon: 'e-icon-search',
          tabIndex: -1
        }
      }
    }
  }, {
    label: 'Поле с кнопкой (редактор)',
    width: 160,
    content: {
      etype: 'text-editor',
      style: {'padding': '1px'},
      dataId: 'text2',
      components: {
        button: {
          etype: 'action-icon',
          role: 'actor',
          cls: 'silk-icon-date e-clickable'
        }
      }
    },
    extensions: [{stopEdit: Ergo.noop, cancelEdit: Ergo.noop}]    
  }, {
    label: 'Поле со списком (форма)',
    content: {
      etype: 'dropdown-field',
      cls: 'e-form-field',
      dataId: 'continent',
      dataModel: {
//        type: 'keyvalue',
        data: listData
      },
      components: {
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
      etype: 'dropdown-editor',
      dataModel: {
        type: 'keyvalue',
        data: hashData
      },
      components: {
        button: {
          cls: 'e-icon-spinner-down'//'ui-icon ui-icon-triangle-1-s'
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
    extensions: [{stopEdit: Ergo.noop, cancelEdit: Ergo.noop}]    
  }, {
    label: 'Счетчик (форма)',
    content: {
      etype: 'spinner-field',
      cls: 'e-form-field',
      dataId: 'number',
    }
  }, {
    label: 'Счетчик (редактор)',
    width: 100,
    content: {
      etype: 'spinner-editor',
      dataId: 'number2',
      style: {'padding': '1px'}
    },
    extensions: [{ stopEdit: Ergo.noop, cancelEdit: Ergo.noop }]    
  }
  ]
});      


