    
var _growl = $.ergo({
  etype: 'growl-box',
  renderTo: 'body',
  hideOnTimeout: true
//  defaultItem: {
//    cls: 'e-dropdown-shadow'    
//  }
});



$.ergo({
  etype: 'box',
  renderTo: '.preview',
  defaultItem: {
    etype: 'text-button',
    onAction: function() {
      if(this.tag == 'message') {
        _growl.items.add({
          message: Samples.loremipsum,
          icon: 'e-icon-growlbox-info',
          state: 'info'
        });
      }
      else if(this.tag == 'warning') {
        _growl.items.add({
          message: Samples.loremipsum,
          icon: 'e-icon-growlbox-warning',
          state: 'warning'
        });
      }
      else if(this.tag == 'success') {
        _growl.items.add({
          message: Samples.loremipsum,
          icon: 'e-icon-growlbox-success',
          state: 'success'
        });
      }
      else if(this.tag == 'error') {
        _growl.items.add({
          message: Samples.loremipsum,
          icon: 'e-icon-growlbox-critical',
          state: 'critical'
        });
      }
      else if(this.tag == 'prompt') {
        _growl.items.add({
          message: 'Нажмите "Да" для подтверждения и "Нет" для отмены.',
          icon: 'e-icon-growlbox-info',
          state: 'info',
          buttons: ['yes', 'no'],
          buttonSet: {
            'yes': {text: 'Да', tag: 'yes'},
            'no': {text: 'Нет', tag: 'no'},
          },
          hideOnTimeout: false,
          hideOnClick: false
        });
      }
      else if(this.tag == 'html') {
        _growl.items.add({
          htmlMessage: '<div style="font-size: 2em; color: red">Hello!</div>',
          icon: 'e-icon-growlbox-info',
          state: 'info'
        });
      }
    }
  },
  items: [{
    text: 'Сообщение',
    tag: 'message'
  }, {
    text: 'Выполнение',
    tag: 'success'
  }, {
    text: 'Предупреждение',
    tag: 'warning'
  }, {
    text: 'Ошибка',
    tag: 'error'
  }, {
    text: 'Подтверждение',
    tag: 'prompt'
  }, {
    text: 'HTML',
    tag: 'html'
  }]
});


    
