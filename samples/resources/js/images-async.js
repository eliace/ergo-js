
$.ergo({
  etype: 'box',
  renderTo: '.preview',
  items: [{
    // обычная загрузка
    etype: 'image',
    src: 'img/Triceratops_128x128.png',
    width: 60,   
    height: 100   
  }, {
    // поздняя загрузка
    etype: 'async-image',
    src: 'img/Triceratops_128x128.png',
    width: 60,
    height: 100   
  }]
});
    
