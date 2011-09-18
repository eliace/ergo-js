
$.ergo({
  etype: 'box',
  renderTo: '.preview',
  layout: {
    etype: 'dock-layout',
    updateMode: 'auto'
  },
  style: {'position': 'absolute'},
  items: [{
    dock: 'left',
    cls: 'ergo-icon silk-icon-emoticon-smile'
  }, {
    cls: 'text-item',
    innerText: 'Hello'
  }, {
    dock: 'right-bottom',
    cls: 'ergo-icon silk-icon-emoticon-unhappy'
  }]
});

    
