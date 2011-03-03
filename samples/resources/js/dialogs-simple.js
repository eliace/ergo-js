
var dlg = $.dino({
  dtype: 'dialog',
  renderTo: '.preview',
  title: 'Диалог',
  content: {
    dtype: 'box',
		cls: 'dino-text-content dino-border-all',
    width: 400,
    innerText: Samples.loremipsum
  },
  buttons: ['ok']
  
});  

$.dino({
  dtype: 'text-button',
  renderTo: '.preview',
  text: 'Открыть диалог',
  onAction: function() {
    dlg.open();
  }
});
    
    
  
  
