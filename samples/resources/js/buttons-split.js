

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
  etype: 'list',
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
      etype: 'list',
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
        cls: 'dino-split',
        style: {'margin-left': '3px'},
        width: 2,
        height: 16
      }, {
        etype: 'icon',
        cls: 'dino-icon-spinner-down'        
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
                  binding: function(val) { console.log(val); this.opt('cls', 'silk-icon-chart-'+val);}
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
    xicon: 'dino-icon-spinner-down',
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
  }]            
});
