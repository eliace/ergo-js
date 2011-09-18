
$.ergo({
  etype: 'box',
  renderTo: '.preview',
  layout: 'float',
  defaultItem: {
    etype: 'action-icon',
    cls: 'icon48',
    onAction: function() {
      growl.info('Icon clicked');
    }
  },
  items: [{
    cls: 'icon-01'
  }, {
    cls: 'icon-02'
  }, {
    cls: 'icon-03'
  }]
  
});
        
