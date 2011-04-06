    
var _growl = $.dino({
  dtype: 'growl',
  renderTo: 'body',
  hideOnTimeout: true,
  defaultItem: {
    cls: 'dino-dropdown-shadow'    
  }
});



$.dino({
  dtype: 'box',
  renderTo: '.preview',
  defaultItem: {
    dtype: 'text-button',
    onAction: function() {
      if(this.tag == 'message') {
        _growl.addItem({
          message: Samples.loremipsum,
          icon: 'dino-icon-growlbox-info',
          state: 'info'
        });
      }
      else if(this.tag == 'warning') {
        _growl.addItem({
          message: Samples.loremipsum,
          icon: 'dino-icon-growlbox-warning',
          state: 'warning'
        });
      }
      else if(this.tag == 'error') {
        _growl.addItem({
          message: Samples.loremipsum,
          icon: 'dino-icon-growlbox-critical',
          state: 'critical'
        });
      }
      else if(this.tag == 'prompt') {
        _growl.addItem({
          message: 'Нажмите "Да" для подтверждения и "Нет" для отмены.',
          icon: 'dino-icon-growlbox-info',
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
        _growl.addItem({
          htmlMessage: '<div style="font-size: 2em">Hello!</div>',
          icon: 'dino-icon-growlbox-info',
          state: 'info'
        });
      }
    }
  },
  items: [{
    text: 'Сообщение',
    tag: 'message'
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


    
