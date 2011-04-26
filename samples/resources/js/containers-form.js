    
$.dino({
  dtype: 'form',
  renderTo: '.preview',
  layout: 'form',
//  layout: {
//    dtype: 'form',
//    labelWidth: 200
//  },
  items: [{
    label: 'Текстовое поле',
     id: 'field1',
    dtype: 'input'
  }, {
    label: 'Текст',
    id: 'field2',
    dtype: 'textarea'
  }, {
    label: 'Файл',
    id: 'field3',
    dtype: 'file'
  }, {
    label: 'Выбор варианта',
    id: 'field4',
    dtype: 'select',
    options: [
      [1, 'зима'],
      [2, 'весна'],
      [3, 'лето'],
      [4, 'осень'],
    ]
  }]
});


    
