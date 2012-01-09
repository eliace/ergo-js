
var dlg = $.ergo({
  etype: 'dialog',
  renderTo: '.preview',
  content: {
    etype: 'box',
    cls: 'e-text-content e-border-all',
    layout: 'stack',
    items: [{
      width: 400,
      innerText: 'Нажмите кнопку "Далее"'
    }, {
      width: 400,
      innerText: Samples.loremipsum
    }]
  },
  buttonSet: {
    'next': {text: 'Далее >>', tag: 'next'},
    'prev': {text: '<< Назад', tag: 'prev'},
  },
  onClose: function(e) {
    if(this.dialogButton == 'next'){
      dlg.opt({
        title: 'Шаг 2',
        buttons: ['prev', 'ok', 'cancel']
      });
      dlg.content.layout.activate(1);
      dlg.layout.update();
      e.cancel();
    }
    else if(this.dialogButton == 'prev') {
      dlg.opt({
        title: 'Шаг 1',
        buttons: ['next', 'cancel']
      });
      dlg.content.layout.activate(0);
      dlg.layout.update();
      e.cancel();      
    }
  }
  
});  

$.ergo({
  etype: 'text-button',
  renderTo: '.preview',
  text: 'Открыть диалог',
  onAction: function() {
    dlg.opt({
      title: 'Шаг 1',
      buttons: ['next', 'cancel']
    });
    dlg.content.layout.activate(0);
    dlg.open();
  }
});
    
    
