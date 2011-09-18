
$.ergo({
  etype: 'box',
  renderTo: '.preview',
  layout: 'column',
  height: 200,
  items: [{
    cls: 'ergo-border-all',
    style: {'padding': 10},
    content: {
      etype: 'box',
      innerText: 'Widget 1',
      height: 'auto',
//      height: '100%',
      style: {'border': '1px solid #ccc'}
    }
  }, {
    cls: 'ergo-border-all',
    content: {
      height: 'auto',
      etype: 'box',
      innerText: 'Widget 2'
    }
  }]
});

    
