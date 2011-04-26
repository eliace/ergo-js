
var dlg = $.dino({
  dtype: 'dialog',
  renderTo: '.preview',
  title: 'Диалог',
  width: '90%',  
  content: {
    dtype: 'box',
//    height: 'auto',
    cls: 'dino-text-content dino-border-all',
    innerText: Samples.loremipsum
  },
  buttons: ['ok'],
  headerButtons: ['minimize', 'maximize', 'close'],
  onHeaderButton: function(e) {
    if(e.button == 'close') this.close();
  }
});  

$.dino({
  dtype: 'text-button',
  renderTo: '.preview',
  text: 'Открыть диалог',
  onAction: function() {
    dlg.open();
  }
});
    
    
  
  
