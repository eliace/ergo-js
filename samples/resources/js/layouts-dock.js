
$.dino({
  dtype: 'box',
	renderTo: '.preview',
  layout: {
    dtype: 'dock-layout',
    updateMode: 'auto'
  },
  style: {'position': 'absolute'},
  items: [{
    dock: 'left',
    cls: 'dino-icon led-icon-smile'
  }, {
    cls: 'text-item',
    innerText: 'Hello'
  }, {
    dock: 'right-bottom',
    cls: 'dino-icon led-icon-unhappy'
  }]
});

		
