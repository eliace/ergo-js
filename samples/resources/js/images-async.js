
$.dino({
  dtype: 'box',
  renderTo: '.preview',
  items: [{
    // обычная загрузка
    dtype: 'image',
    imageUrl: 'img/Triceratops_128x128.png',
    width: 60,   
    height: 100   
  }, {
    // поздняя загрузка
    dtype: 'async-image',
    imageUrl: 'img/Triceratops_128x128.png',
    width: 60,
    height: 100   
  }]
});
    
