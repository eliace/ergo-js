
$.ergo({
  etype: 'tab-panel',
  renderTo: '.preview',
  panelModel: {
    page: {height: 100}
  },
  pagesCls: 'e-border-all e-border-no-top',
  pages: [{
    tab: {icon: 'silk-icon-vcard', text: 'Tab1'}
  }, {
    tab: {icon: 'silk-icon-date', text: 'Tab2'}
  }, {
    tab: {icon: 'silk-icon-plugin', text: 'Tab3'}
  }, {
    tab: {
      etype: 'box',
      layout: 'hbox',
      components: {
        check: {
          etype: 'checkbox',
          style: {'margin': '0 3px 0'}
        },
        text: {
          etype: 'text',
          text: 'Who am i?'
        }
      }
    }
  }],
  
  // components: {
    // tabs: {
      // layout: 'group',
//       
      // components: {
        // addTab: {
          // etype: 'box',
          // html: '<li/>',
          // cls: 'e-tabs-item e-border-all e-bg-3',
          // style: {'padding-left': 7, 'padding-right': 7},
          // content: {
            // etype: 'action-icon',
            // cls: 'plus-icon',
            // style: {'vertical-align': 'middle', 'display': 'inline-block'}
          // },
          // layoutGroup: 'after'
        // }
      // }
//       
    // }
  // }
  
  
});

    
$.ergo({
  etype: 'tab-panel',
  renderTo: '.preview',
  tabPosition: 'bottom',
  panelModel: {
    page: {height: 100}
  },
  pagesCls: 'e-border-all e-border-no-bottom',
  pages: [{
    tab: {icon: 'silk-icon-vcard', text: 'Tab1'}
  }, {
    tab: {icon: 'silk-icon-date', text: 'Tab2'}
  }, {
    tab: {icon: 'silk-icon-plugin', text: 'Tab3'}
  }]
});

    
