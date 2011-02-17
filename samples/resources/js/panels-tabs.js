
$.dino({
	dtype: 'tab-panel',
	renderTo: '.preview',
	defaults: {
		page: {height: 300},
		tab: {content: {showLeftIcon: true}}
	},
	pages: [{
		tab: {leftIconCls: 'led-icon-vcard', text: 'Tab1'}
	}, {
		tab: {leftIconCls: 'led-icon-calendar_1', text: 'Tab2'}
	}, {
		tab: {leftIconCls: 'led-icon-book', text: 'Tab3'}
	}]
});

		
		
