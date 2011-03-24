    

var xformData = {
  text: 11,
  text2: '16.12.2010',
	number: 4
};


var listData = [{
  name: 'Africa'
}, {
  name: 'Eurasia'
}, {
  name: 'America'
}, {
  name: 'Australia'
}, {
  name: 'Antarctica'
}];



  
$.dino({
  dtype: 'box',
  renderTo: '.preview',
  layout: 'simple-form-layout',
//  layout: {
//    dtype: 'form-layout',
//    labelWidth: 200
//  },
  data: xformData,
  defaultItem: {
//    style: {'padding': '5px 0'}
  },
  items: [{
    label: 'Поле с кнопкой:',
    dataId: 'text',
    components: {
      input: {
        dtype: 'textfield',
        cls: 'tb-text dino-border-all dino-corner-left dino-border-no-right'
      },
      button: {
        dtype: 'text-button',        
        cls: 'tb-button dino-border-all dino-corner-right dino-bg-highlight',
        binding: false,
        icon: 'led-icon-find',
        text: false,
//        width: 24,
      }
    }
  }, {
    label: 'Поле с кнопкой 2:',
    dtype: 'combofield',
		cls: 'dino-border-all',
    dataId: 'text2',
    components: {
      button: {
        dtype: 'icon',
        cls: 'led-icon-calendar_1 dino-clickable'
      }
    }
  }, {
    dtype: 'box',
    label: 'Поле со списком',
    style: {'position': 'relative'},
    data: listData,
    components: {
      input: {
        dtype: 'textfield',
        cls: 'tb-text dino-border-all dino-corner-left dino-border-no-right',
				readOnly: true,
        binding: false
      },
      button: {
        dtype: 'text-button',
        cls: 'tb3-button dino-border-all dino-corner-right dino-clickable dino-bg-highlight',
        binding: false,
        text: false,
        icon: 'ui-icon ui-icon-triangle-1-s',
        onAction: function() {
          
          var dd = this.parent.dropdown;
          
          dd.el.width(this.parent.input.el.width());
          dd.show(0, this.parent.el.height());
          
        }
      },
      dropdown: {
        dtype: 'dropdown-box',
        cls: 'dino-border-all tb3-dropdown',
        dynamic: true,
        defaultItem: {
          dtype: 'text-item',
          style: {'display': 'block'},
          cls: 'list-item',
          dataId: 'name',
          icon: 'led-icon-world',
          state: 'clickable',
          onClick: function() {
            this.parent.hide();
            this.parent.parent.input.el.val(this.data.val());
          }
        }
      }
    }
  }, {
		label: 'Счетчик',
		dtype: 'combofield',
		cls: 'dino-border-all dino-corner-all',
		style: {'padding': 0},
		components: {
			buttons: {
				dtype: 'box',
				cls: 'dino-border-left dino-bg-highlight dino-corner-right',
				defaultItem: {
					style: {'display': 'block'},
					cls: 'dino-border-none',
					height: 10,
					width: 20
				},
				items: [{
					dtype: 'button',
					cls: 'dino-icon-up dino-corner-right-top'
				}, {
					dtype: 'button',
					cls: 'dino-icon-down dino-corner-right-bottom'
				}]				
			}
		}
	}, {
		label: 'Счетчик 2',
		dtype: 'combofield',
		dataId: 'number',
		cls: 'dino-border-all',
		components: {
			input: {
				updateOnValueChange: true
			},
			buttons: {
				dtype: 'box',
				cls: 'dino-bg-highlight',
				defaultItem: {
					style: {'display': 'block'},
					cls: 'dino-border-all dino-clickable',
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
					dtype: 'button',
					cls: 'dino-icon-up',
					tag: 'up'
				}, {
					dtype: 'button',
					cls: 'dino-icon-down',
					tag: 'down'
				}]				
			}
		}
	}
  ]
});      


