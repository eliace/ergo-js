
$.dino({
  dtype: 'box',
	renderTo: '.preview',
  layout: 'column-layout',
  height: 200,
  items: [{
    cls: 'dino-border-all',
    style: {'padding': 10},
    content: {
      dtype: 'box',
      innerText: 'Widget 1',
			height: 'auto',
//      height: '100%',
      style: {'border': '1px solid #ccc'}
    }
  }, {
    cls: 'dino-border-all',
    content: {
			height: 'auto',
      dtype: 'box',
      innerText: 'Widget 2'
    }
  }]
});

		
