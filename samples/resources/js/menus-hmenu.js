
$.ergo({
  etype: 'box',
  renderTo: '.preview',
  id: 'hmenu',
  layout: 'float',
  defaultItem: {
    etype: 'text-menu-item',
//    baseCls: 'drop-menu-item',
    cls: 'main-menu-item',
    components: {
      content: {
        xicon: false
//        cls: 'menu-item-text',
//        rightCls: 'ui-icon menu-item-icon'
      },
      submenu: {
        cls: 'dino-border-all',
        anchor: 'bottom',
        width: 110
      }
    }
//    defaultSubItem: menuModel
  },
  items: [{
    text: 'Menu 1',
    submenu: [{
      text: 'Submenu 1',
    }, {
      text: 'Submenu 2',
    }, {
      text: 'Submenu 3',
      submenuWidth: 210,
      submenu: [{
        text: 'Submenu 4',
        submenuWidth: 110,
        submenu: [{
          text: 'Submenu 6',
        }]
      }, {
        text: 'Submenu 5 + Submenu 5'          
      }]
    }]
  }, {
    text: 'Menu 2',    
  }, {
    text: 'Menu 3',    
  }]
});  
    
