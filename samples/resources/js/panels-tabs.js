
$.dino({
  dtype: 'tab-panel',
  renderTo: '.preview',
  panelModel: {
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
	}],
	
	components: {
		tabs: {
			layout: 'group',
			
			components: {
				addTab: {
					dtype: 'box',
					html: '<li/>',
					cls: 'dino-tabs-item dino-border-all dino-bg-3',
					style: {'padding-left': 7, 'padding-right': 7},
					content: {
						dtype: 'action-icon',
						cls: 'plus-icon',
						style: {'vertical-align': 'middle', 'display': 'inline-block'}
					},
					layoutGroup: 'after'
				}
			}
			
		}
	}
	
	
});

    
$.dino({
  dtype: 'tab-panel',
  renderTo: '.preview',
  tabPosition: 'bottom',
  panelModel: {
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

    
