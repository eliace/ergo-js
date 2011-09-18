
$.ergo({
  etype: 'tab-panel',
  renderTo: '.preview',
  panelModel: {
    page: {height: 100}
  },
  pagesCls: 'ergo-border-all ergo-border-no-top',
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
          // cls: 'ergo-tabs-item ergo-border-all ergo-bg-3',
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
  pagesCls: 'ergo-border-all ergo-border-no-bottom',
  pages: [{
    tab: {icon: 'silk-icon-vcard', text: 'Tab1'}
  }, {
    tab: {icon: 'silk-icon-date', text: 'Tab2'}
  }, {
    tab: {icon: 'silk-icon-plugin', text: 'Tab3'}
  }]
});

    
