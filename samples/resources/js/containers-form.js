    
$.ergo({
  etype: 'form',
  renderTo: '.preview',
  layout: 'form',
//  layout: {
//    etype: 'form',
//    labelWidth: 200
//  },
  items: [{
    label: 'Текстовое поле',
     id: 'field1',
    etype: 'input'
  }, {
    label: 'Текст',
    id: 'field2',
    etype: 'textarea'
  }, {
    label: 'Файл',
    id: 'field3',
    etype: 'file'
  }, {
    label: 'Выбор варианта',
    id: 'field4',
    etype: 'select',
    options: [
      [1, 'зима'],
      [2, 'весна'],
      [3, 'лето'],
      [4, 'осень'],
    ]
  }]
});


    
