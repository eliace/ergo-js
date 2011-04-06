
$.dino({
  dtype: 'box',
  renderTo: '.preview',
  layout: 'float-layout',
  defaultItem: {
    dtype: 'action-icon',
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
        
