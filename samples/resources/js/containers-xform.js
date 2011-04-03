    

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
    dtype: 'combofield',
    cls: 'dino-form-field',
    components: {
      button: {
        dtype: 'icon-button',
				role: 'actor',
        icon: 'dino-icon-search',
      }
    }
  }, {
    label: 'Поле с кнопкой (редактор)',
    dtype: 'combofield',
    cls: 'dino-border-all',
    style: {'padding': '1px'},
    dataId: 'text2',
    components: {
      button: {
        dtype: 'action-icon',
				role: 'actor',
        cls: 'dino-icon-search dino-clickable'
      }
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
      }
    },
    dropdown: {
      data: hashData,
      cls: 'tb3-dropdown',
      defaultItem: {
        cls: 'list-item',
        icon: 'led-icon-world'
      }
    }		
  }, {
    dtype: 'select-field',
    label: 'Поле со списком  (редактор)',
    cls: 'dino-border-all',
    dataId: 'continent2',
    components: {
      button: {
        dtype: 'action-icon',
        cls: 'ui-icon ui-icon-triangle-1-s dino-clickable',
				role: 'actor'
      }
    },
		dropdown: {
      data: listData,
      cls: 'tb3-dropdown',
      defaultItem: {
        cls: 'list-item',
        icon: 'led-icon-world'
      }				
		}
  }, {
    label: 'Счетчик (форма)',
    dtype: 'combofield',
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
    }
  }, {
    label: 'Счетчик (редактор)',
    dtype: 'combofield',
    dataId: 'number2',
    cls: 'dino-border-all',
    style: {'padding': '1px'},
    components: {
      input: {
        updateOnValueChange: true
      },
      buttons: {
        dtype: 'box',
				role: 'actor',
        defaultItem: {
          cls: 'dino-clickable',
          dtype: 'action-icon',
          style: {'display': 'block', 'border': 'none', 'padding': 0},
          height: 8,
          width: 16,
          onAction: function() {
            if(this.tag == 'up')
              this.data.set(this.data.get()+1);
            else if(this.tag == 'down')
              this.data.set(this.data.get()-1);
          }
        },
        items: [{
          cls: 'dino-icon-up',
          tag: 'up'
        }, {
          cls: 'dino-icon-down',
          tag: 'down'
        }]        
      }
    }
  }
  ]
});      


