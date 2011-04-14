
$.dino({
  dtype: 'tab-panel',
  renderTo: '.preview',
  defaults: {
    page: {height: 100}
  },
  pagesCls: 'dino-border-all dino-border-no-top',
  pages: [{
    tab: {icon: 'silk-icon-vcard', text: 'Tab1'}
  }, {
    tab: {icon: 'silk-icon-date', text: 'Tab2'}
  }, {
    tab: {icon: 'silk-icon-plugin', text: 'Tab3'}
  }]
});

    
$.dino({
  dtype: 'tab-panel',
  renderTo: '.preview',
	tabPosition: 'bottom',
  defaults: {
    page: {height: 100}
  },
  pagesCls: 'dino-border-all dino-border-no-bottom',
  pages: [{
    tab: {icon: 'silk-icon-vcard', text: 'Tab1'}
  }, {
    tab: {icon: 'silk-icon-date', text: 'Tab2'}
  }, {
    tab: {icon: 'silk-icon-plugin', text: 'Tab3'}
  }]
});

    
