    

var xformData = {
  text: 11,
  text2: '16.12.2010',
	number: 4,
	number2: 2,
	continent: '',
	continent2: ''
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
  data: xformData,
  defaultItem: {
  },
  items: [{
    label: 'Поле с кнопкой (форма)',
    dataId: 'text',
		dtype: 'combofield',
		cls: 'dino-border-all dino-corner-all',
		components: {
			button: {
				dtype: 'icon-button',
				cls: 'dino-bg-highlight dino-corner-right',
				icon: 'dino-icon-search',
				style: {'border': 'none', 'border-left': '1px solid #aaa'}
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
        cls: 'dino-icon-search dino-clickable'
      }
    }
  }, {
    dtype: 'select-box',
    label: 'Поле со списком (форма)',
		cls: 'dino-border-all dino-corner-all',
		style: {'position': 'relative'},
		dataId: 'continent',
		components: {
			button: {
        cls: 'dino-bg-highlight dino-border-left dino-corner-right',
				icon: 'ui-icon ui-icon-triangle-1-s',
				style: {'border': 'none', 'border-left': '1px solid #aaa'}
			},
		},
		dropdownModel: {
			data: listData,
			cls: 'tb3-dropdown',
			style: {'display': 'none'},
			defaultItem: {
				dataId: 'name',
        cls: 'list-item',
        icon: 'led-icon-world'
			}
		}
  }, {
    dtype: 'select-box',
    label: 'Поле со списком  (редактор)',
		cls: 'dino-border-all',
		style: {'position': 'relative'},
		dataId: 'continent2',
		components: {
			button: {
        dtype: 'action-icon',
				cls: 'ui-icon ui-icon-triangle-1-s dino-clickable',
				style: {'border': 'none', 'padding': 0}
			},
		},
		dropdownModel: {
			data: listData,
			cls: 'tb3-dropdown',
			style: {'display': 'none'},
			defaultItem: {
				dataId: 'name',
        cls: 'list-item',
        icon: 'led-icon-world'
			}
		}
  }, {
		label: 'Счетчик (форма)',
		dtype: 'combofield',
		cls: 'dino-border-all dino-corner-all',
		dataId: 'number',
		components: {
			input: {
				updateOnValueChange: true
			},
			buttons: {
				dtype: 'box',
				cls: 'dino-border-left dino-bg-highlight dino-corner-right',
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


