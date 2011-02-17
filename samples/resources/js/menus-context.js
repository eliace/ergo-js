
$.dino({
  dtype: 'box',
	renderTo: '.preview',
  cls: 'contextmenu-page',
  items: [{
    innerText: 'Кликни правой кнопкой мыши в любом месте панели',
    cls: 'preview-text dino-border-all',
		height: 'auto',
    contextMenu: {
      dtype: 'context-menu',
      cls: 'dino-widget-shadow',
//    hideOn: 'outerClick',
      onAction: function(e) {
        growl.info('Выбран элемент меню: ' + e.target.getText());
      },
      items: [
        {text: 'Item 1'},
        {text: 'Item 2'},
        {text: 'Item 3'},			
      ]
    }
  }]
});
		
