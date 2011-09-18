

var menuData = [{
  name: 'Europe',
  children: [{
    name: 'Germany'
  }, {
    name: 'France',
    children: [{
      name: 'Paris'
    }]
  }, {
    name: 'Russia'
  }, {
    name: 'Great Britain'
  }]
}, {
  name: 'Asia',
  children: [{
    name: 'China'
  }, {
    name: 'Korea'
  }, {
    name: 'Japan'
  }, {
    name: 'India'
  }]
}, {
  name: 'Africa'
}]


var graphData = [{
  name: 'Bar',
  icon: 'bar'
}, {
  name: 'Curve',
  icon: 'curve'
}, {
  name: 'Line',
  icon: 'line'
}, {
  name: 'Pie',
  icon: 'pie'
}]




$.ergo({
  etype: 'box',
  renderTo: '.preview',
  cls: 'button-container',
  items: [/*{
    etype: 'split-button',
    components: {
      actionButton: {
        innerText: 'Africa',
        width: 80
      },
      listButton: {
        width: 24
      }
    },
    onAction: function(e) {
      growl.info('Clicked ' + this.selectedItem.tag);
    },
    list: [{
      text: 'Африка',
      tag: 'africa'
    }, {
      text: 'Азия',
      tag: 'asia'
    }, {
      text: 'Европа',
      tag: 'europe'
    }, {
      text: 'Америка',
      tag: 'america'
    }]
    
  }, {
    etype: 'button',
    style: {'padding-right': 2},
    content: {
      etype: 'box',
      layout: 'float',
      items: [{
        etype: 'icon',
        cls: 'silk-icon-user'
      }, {
        etype: 'box',
        innerText: 'Press me',
        style: {'margin': '0 3px'}
      }, {
        etype: 'box',
        cls: 'ergo-split',
        style: {'margin-left': '3px'},
        width: 2,
        height: 16
      }, {
        etype: 'icon',
        cls: 'ergo-icon-spinner-down'        
      }]
    }
  }, */{
    etype: 'dropdown-button',
    xicon: 'ui-icon ui-icon-triangle-1-s',
    binding: function(obj) {
      this.opt('icon', 'silk-icon-chart-'+obj.icon);
//      this.opt('text', obj.name);
    },
    updateOnValueChange: true,
//    icon: 'silk-icon-chart-line',
    data: graphData[1],
    components: {
      dropdown: {
        data: graphData,
        menuModel: {
          item: {
            content: {
              etype: 'text-item',
              icon: true,
              components: {
                content: {
                  dataId: 'name'
                },
                icon: {
                  dataId: 'icon',
                  binding: function(val) { this.opt('cls', 'silk-icon-chart-'+val);}
                }            
              }            
            }            
          }
        }
      }
    },
    onSelect: function(e) {
      this.data.set(e.target.data.get())
    }
  }, {
    etype: 'dropdown-button',
//    text: 'Location',
    xicon: 'ergo-icon-spinner-down',
    binding: function(obj) {
      this.opt('text', obj.name);
    },
    content: {
      width: 60
    },
    data: {name: 'Location'},
    updateOnValueChange: true,
    components: {
      dropdown: {
        data: menuData,
        menuModel: {
          item: {
            content: {
              dataId: 'name'
            }            
          }
        }
      }
    },
    onSelect: function(e) {
      this.data.set(e.target.data.get());
//      growl.info('Selected item: '+e.target.content.getValue());
    }    
  }, {
  	extensions: ['selectable'],
  	defaultItem: {
  		etype: 'icon-button',
  		cls: 'ergo-bg-3',
  		onClick: function() {
  			this.parent.selection.set(this);
  		}
  	},
  	components: {
  		left: {
  			cls: 'left-checkbox', //ergo-corner-left ergo-no-border-right',
  			icon: 'silk-icon-male'
  		},
  		splitter: {
  			cls: 'ergo-border-no-left ergo-border-right',
  			style: {'padding-left': 0, 'padding-right': 0},
  			width: 1
  		},
  		right: {
  			cls: 'right-checkbox', //ergo-corner-right',
  			icon: 'silk-icon-female'
  		}
  	},
  	onCreated: function() {
  		this.selection.set(this.left);
  	}
  }, {
  	extensions: ['selectable'],
  	defaultItem: {
  		etype: 'button',
  		cls: 'ergo-bg-3 ergo-border-all',
  		onClick: function() {
  			this.parent.selection.set(this);
  		},
  		style: {
  			'color': '#fff',
  			'font-weight': 'bold',
  			'text-shadow': '1px 1px 1px #888'
  		}
  	},
  	components: {
  		left: {
  			cls: 'left-checkbox',
  			text: 'ON'
//  			icon: 'silk-icon-male'
  		},
  		splitter: {
  			cls: 'ergo-border-no-left ergo-border-right',
  			style: {'padding-left': 0, 'padding-right': 0},
  			width: 1,
  			innerHtml: '&nbsp;'
  		},
  		right: {
  			cls: 'right-checkbox off', //ergo-corner-right',
  			text: 'OFF'

//  			icon: 'silk-icon-female'
  		}
  	},
  	onCreated: function() {
  		this.selection.set(this.left);
  	}
  }]            
});
