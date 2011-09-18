    
$.ergo({
  etype: 'form',
  renderTo: '.preview',
  layout: 'form',
//  layout: {
//    etype: 'form',
//    labelWidth: 200
//  },
  items: [{
    label: 'Строка',
     id: 'field1',
    etype: 'input'
  }, {
    label: 'Пароль',
     id: 'field7',
    etype: 'password'
  }, {
    label: 'Текст',
    id: 'field2',
    etype: 'textarea'
  }, {
    label: 'Файл',
    id: 'field3',
    etype: 'file'
  }, {
    label: 'Список',
    id: 'field4',
    etype: 'select',
    options: [
      [1, 'зима'],
      [2, 'весна'],
      [3, 'лето'],
      [4, 'осень'],
    ]
  }, {
    label: 'Чекбокс',
    id: 'field5',
    etype: 'checkbox'
  }, {
    label: 'Радио',
    id: 'field6',
    etype: 'radio'
  }]
});


    
