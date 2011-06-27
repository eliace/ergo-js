
$.dino({
  dtype: 'list',
  renderTo: '.preview',
  items: [{
    // обычная загрузка
    dtype: 'image',
    src: 'img/Triceratops_128x128.png',
    width: 60,   
    height: 100   
  }, {
    // поздняя загрузка
    dtype: 'async-image',
    src: 'img/Triceratops_128x128.png',
    width: 60,
    height: 100   
  }]
});
    
