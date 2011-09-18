

var requestObj = {
  fio: '',
  phone: '',
  mail: '',
  org: '',
  applied: false
} 


$.ergo({
  renderTo: '.preview',
  etype: 'panel',
  title: 'Заявка',
  cls: 'ergo-border-all',
  width: 210,
  data: requestObj,
  content: {
    etype: 'box',
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
      etype: 'text-input',
      dataId: 'fio',
      defaultText: 'ФИО'
    }, {
      etype: 'text-input',
      dataId: 'phone',
      defaultText: 'Контактный телефон'
    }, {
      etype: 'text-input',
      dataId: 'mail',
      defaultText: 'E-mail'
    }, {
      etype: 'text-input',
      dataId: 'org',
      defaultText: 'Наименование организации'
    }, {
      id: 'foo',
      etype: 'checkbox',
      dataId: 'applied',
      format: null,                    // сбрасываем форматирование
      width: null,                     // сбрасываем значение ширины
      labelPosition: 'after',
      label: 'Я СОГЛАСЕН на обработку моих персональных данных, указанных мною в данной анкете (включая мою контактную информацию)'
    }]
  },
  components: {
    footer: {
      etype: 'control-list',
      cls: 'center',
      items: [{
        etype: 'text-button',
        dataId: 'applied',
        disabled: true,
        updateOnValueChange: true,                      // если изменится свойство applied, то обновляем данные виджета
        icon: 'silk-icon-page-white-go',
        text: 'Отправить заявку',
        onAction: function() {
          growl.info(Ergo.pretty_print(this.data.source.get()));
        },
        binding: function(val) {                      
          this.opt('disabled', !val);                  // в зависимости от значения applied включаем или выключаем кнопку
          return false;                                // дочерние виджеты обновлять не нужно
        }
      }]
    }
  }
});


