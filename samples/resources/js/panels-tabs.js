
$.dino({
  dtype: 'tab-panel',
  renderTo: '.preview',
  defaults: {
    page: {height: 100}
  },
  pagesCls: 'dino-border-all dino-border-no-top',
  pages: [{
    tab: {icon: 'led-icon-vcard', text: 'Tab1'}
  }, {
    tab: {icon: 'led-icon-calendar_1', text: 'Tab2'}
  }, {
    tab: {icon: 'led-icon-book', text: 'Tab3'}
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
    tab: {icon: 'led-icon-vcard', text: 'Tab1'}
  }, {
    tab: {icon: 'led-icon-calendar_1', text: 'Tab2'}
  }, {
    tab: {icon: 'led-icon-book', text: 'Tab3'}
  }]
});

    
