//= require <widgets/widgets>


Ergo.defineClass('Ergo.widgets.List', 'Ergo.core.Widget', {
	
	defaults: {
		html: '<ul/>',
		dynamic: true,
		defaultItem: {
			etype: 'html:li',
			binding: 'text'
		}
	}
	
}, 'widgets:list');



Ergo.defineClass('Ergo.widgets.OrderedList', 'Ergo.widgets.List', {
	
	defaults: {
		html: '<ol/>'
	}
	
}, 'widgets:o-list');
