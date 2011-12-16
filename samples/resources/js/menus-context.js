
$.ergo({
  etype: 'box',
  renderTo: '.preview',
  cls: 'contextmenu-page',
  items: [{
    innerText: 'Кликни правой кнопкой мыши в любом месте панели',
    cls: 'preview-text ergo-border-all',
    autoHeight: true,
    extensions: ['contextmenu'],
    contextMenu: {
      etype: 'context-menu',
//      cls: 'ergo-dropdown-shadow',
//    hideOn: 'outerClick',
      onSelect: function(e) {
        growl.info('Выбран элемент меню: ' + e.target.content.opt('text'));
      },
      items: [
        {text: 'Item 1'},
        {text: 'Item 2'},
        {text: 'Item 3'},      
      ]        
    }
  }]
});
    
