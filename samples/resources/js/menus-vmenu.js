
$.dino({
  dtype: 'box',
  renderTo: '.preview',
  id: 'vmenu',
  defaultItem: {
    dtype: 'text-menu-item',
    cls: 'main-menu-item',
    submenuWidth: 140,
    onAction: function(e) {
      this.hideSubmenu();
      growl.info( e.target.getText() );
    },
    defaultSubItem: {
      showLeftPanel: true
    }
  },
  items: [{
    text: 'Menu 1',
    submenu: [{
      text: 'Submenu 1',
    }, {
      text: 'Submenu 2',
    }, {
      text: 'Submenu 3',
      submenuWidth: 230,
      submenu: [{
        text: 'Submenu 4',
        submenuWidth: 130,
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
    
