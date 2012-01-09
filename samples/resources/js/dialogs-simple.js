
var dlg = $.ergo({
  etype: 'dialog',
  renderTo: '.preview',
  title: 'Диалог',
  width: '50%',  
  content: {
    etype: 'box',
//    height: 'auto',
    cls: 'e-text-content e-border-all',
    innerText: Samples.loremipsum
  },
  buttons: ['ok'],
  headerButtons: ['minimize', 'maximize', 'close'],
  onHeaderButton: function(e) {
    if(e.button == 'close') this.close();
  }
});  

$.ergo({
  etype: 'text-button',
  renderTo: '.preview',
  text: 'Открыть диалог',
  onAction: function() {
    dlg.open();
  }
});
    
    
  
  
