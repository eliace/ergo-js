
Ergo.DEBUG = true;

$.ergo({
  etype: 'box',
  renderTo: '.preview',
  id: 'vmenu',
  defaultItem: {
    etype: 'menu-item',
    cls: 'main-menu-item',
    menuModel: {
      item: {
        onAction: function() {
          growl.info( this.content.getText() );
        }
      }
    }
  },
//  defaultItem: {
//    etype: 'text-menu-item',
//    cls: 'main-menu-item',
//    onAction: function(e) {
//      this.hideSubmenu();
//      growl.info( e.target.getText() );
//    }
//  },
  items: [{
    text: 'Menu 1',
    submenu: [{
      text: 'Submenu 1',
    }, {
      text: 'Submenu 2',
    }, {
      text: 'Submenu 3',
      submenu: [{
        text: 'Submenu 4',
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
    
