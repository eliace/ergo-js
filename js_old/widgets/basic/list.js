//= require <widgets/widgets>


Ergo.defineClass('Ergo.widgets.List', 'Ergo.core.Widget', {
	
	defaults: {
		html: '<ul/>',
		defaultItem: {
			etype: 'html:li'
		}
	}
	
}, 'widget:list');



Ergo.defineClass('Ergo.widgets.OrderedList', 'Ergo.core.Widget', {
	
	defaults: {
		html: '<ol/>',
		defaultItem: {
			etype: 'html:li'
		}
	}
	
}, 'widget:ordered-list');
