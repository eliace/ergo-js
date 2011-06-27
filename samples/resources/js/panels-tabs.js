
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
  }, {
		tab: {
			dtype: 'box',
			layout: 'hbox',
			components: {
				check: {
					dtype: 'checkbox',
					style: {'margin': '0 3px 0'}
				},
				text: {
					dtype: 'text',
					text: 'Who am i?'
				}
			}
		}
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

    
