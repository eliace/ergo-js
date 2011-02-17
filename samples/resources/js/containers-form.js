		
$.dino({
  dtype: 'form',
	renderTo: '.preview',
	layout: 'form-layout',
//	layout: {
//		dtype: 'form-layout',
//		labelWidth: 200
//	},
  items: [{
    label: 'Текстовое поле',
   	id: 'field1',
    dtype: 'textfield'
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
    options: {
      '1': 'зима', 
      '2': 'весна', 
      '3': 'лето', 
      '4': 'осень' 
    }
  }]
});


		
