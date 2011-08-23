

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
    
  },*/ {
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
  }, {
    etype: 'text-button',
    xicon: 'ui-icon ui-icon-triangle-1-s',
    icon: 'silk-icon-chart-line',
  }, {
    etype: 'dropdown-button',
    text: 'Location',
    xicon: 'dino-icon-spinner-down',
    components: {
      dropdown: {
        data: menuData,
      }
    },
    onSelect: function(e) {
      growl.info('Selected item: '+e.target.content.getValue());
    }
    
    
  }]            
});
