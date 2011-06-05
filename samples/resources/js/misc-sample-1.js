

var requestObj = {
  fio: '',
  phone: '',
  mail: '',
  org: '',
  applied: false
} 


$.dino({
  renderTo: '.preview',
  dtype: 'panel',
  title: 'Заявка',
  cls: 'dino-border-all',
  width: 210,
  data: requestObj,
  content: {
		dtype: 'list',
    style: {'padding': '3px', 'font-size': '0.7em'},
    layout: 'simple-form',
    defaultItem: {
      width: 190,
      changeOnBlur: true,
      
      /* нижеследующие параметры реализуют механизм отображения текста-подсказки */
      
      rawValueOnFocus: true,                                          // при фокусе должно отображаться значение без форматирования
      format: function(val) {                                        //
        this.states.toggle('empty', (val == ''));                    // включаем состояние empty, если поле пустое
        return (val == '') ? this.options.defaultText : val;        // возвращаем defaultText, если поле пустое
      },
      states: {                                                      //
        'raw-value': function(on) {                                 // состояние raw-value устанавливается при фокусе и rawValueOnFocus = true
          if(on) this.states.clear('empty');                        // сбрасываем состояние empty 
        }                                                            //
      }
      
    },
    items: [{
      dtype: 'text-input',
      dataId: 'fio',
      defaultText: 'ФИО'
    }, {
      dtype: 'text-input',
      dataId: 'phone',
      defaultText: 'Контактный телефон'
    }, {
      dtype: 'text-input',
      dataId: 'mail',
      defaultText: 'E-mail'
    }, {
      dtype: 'text-input',
      dataId: 'org',
      defaultText: 'Наименование организации'
    }, {
      id: 'foo',
      dtype: 'checkbox',
      dataId: 'applied',
      format: null,                    // сбрасываем форматирование
      width: null,                     // сбрасываем значение ширины
      labelPosition: 'after',
      label: 'Я СОГЛАСЕН на обработку моих персональных данных, указанных мною в данной анкете (включая мою контактную информацию)'
    }]
  },
  components: {
    footer: {
      dtype: 'control-box',
      cls: 'center',
      items: [{
        dtype: 'text-button',
        dataId: 'applied',
        disabled: true,
        updateOnValueChange: true,                      // если изменится свойство applied, то обновляем данные виджета
        icon: 'silk-icon-page-white-go',
        text: 'Отправить заявку',
        onAction: function() {
          growl.info(Dino.pretty_print(this.data.source.get()));
        },
        binding: function(val) {                      
          this.opt('disabled', !val);                  // в зависимости от значения applied включаем или выключаем кнопку
          return false;                                // дочерние виджеты обновлять не нужно
        }
      }]
    }
  }
});


