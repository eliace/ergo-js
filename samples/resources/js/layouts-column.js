
$.ergo({
  etype: 'list',
  renderTo: '.preview',
  layout: 'column',
  height: 200,
  items: [{
    cls: 'dino-border-all',
    style: {'padding': 10},
    content: {
      etype: 'box',
      innerText: 'Widget 1',
      height: 'auto',
//      height: '100%',
      style: {'border': '1px solid #ccc'}
    }
  }, {
    cls: 'dino-border-all',
    content: {
      height: 'auto',
      etype: 'box',
      innerText: 'Widget 2'
    }
  }]
});

    
