

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



$.dino({
  dtype: 'list',
  renderTo: '.preview',
  cls: 'button-container',
  items: [/*{
    dtype: 'split-button',
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
    dtype: 'button',
    style: {'padding-right': 2},
    content: {
      dtype: 'list',
      layout: 'float',
      items: [{
        dtype: 'icon',
        cls: 'silk-icon-user'
      }, {
        dtype: 'box',
        innerText: 'Press me',
        style: {'margin': '0 3px'}
      }, {
        dtype: 'box',
        cls: 'dino-split',
        style: {'margin-left': '3px'},
        width: 2,
        height: 16
      }, {
        dtype: 'icon',
        cls: 'dino-icon-spinner-down'        
      }]
    }
  }, {
    dtype: 'text-button',
    xicon: 'ui-icon ui-icon-triangle-1-s',
    icon: 'silk-icon-chart-line',
  }, {
    dtype: 'dropdown-button',
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
