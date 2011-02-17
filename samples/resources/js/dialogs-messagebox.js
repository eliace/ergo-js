
var dlg = $.dino({
  dtype: 'message-box',
  renderTo: '.preview',
  title: 'Сообщение',
  components: {
    buttons: {
      state: 'right'
    }
  }
});  

$.dino({
  dtype: 'box',
  renderTo: '.preview',
  cls: 'dino-controls',
  defaultItem:{
    dtype: 'text-button'
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

    
