
var dlg = $.ergo({
  etype: 'message-box',
  renderTo: '.preview',
  title: 'Сообщение',
  destroyOnClose: false,
  components: {
    buttons: {
      state: 'center'
    }
  }
});  

$.ergo({
  etype: 'box',
  renderTo: '.preview',
  cls: 'e-controls',
  defaultItem:{
    etype: 'text-button'
  },
  items: [{
    text: 'Сообщение',
    onAction: function() {
      dlg.opt({
        message: Samples.loremipsum,
        buttons: ['ok'],
        icon: 'info'         
      });  
      dlg.open();
    }    
  }, {
    text: 'Ошибка',
    onAction: function() {  
      dlg.opt({
        message: Samples.loremipsum,
        buttons: ['ok'],
        icon: 'critical'         
      });  
      dlg.open(); 
    }    
  }, {
    text: 'Предупреждение',
    onAction: function() {  
      dlg.opt({
        message: Samples.loremipsum,
        buttons: ['ok'],
        icon: 'warning'         
      });  
      dlg.open(); 
    }    
  }, {
    text: 'Выбор',
    onAction: function() {  
      dlg.opt({
        icon: 'info',
        buttons: ['yes', 'no'],
        message: 'Для подтверждения нажмите "Да", для отказа нажмите "Нет"' 
      });
      dlg.open(); 
    }    
  }]
});

    
