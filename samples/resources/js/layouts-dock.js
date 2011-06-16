
$.dino({
  dtype: 'list',
  renderTo: '.preview',
  layout: {
    dtype: 'dock-layout',
    updateMode: 'auto'
  },
  style: {'position': 'absolute'},
  items: [{
    dock: 'left',
    cls: 'dino-icon silk-icon-emoticon-smile'
  }, {
    cls: 'text-item',
    innerText: 'Hello'
  }, {
    dock: 'right-bottom',
    cls: 'dino-icon silk-icon-emoticon-unhappy'
  }]
});

    
