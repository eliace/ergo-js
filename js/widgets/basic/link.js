
//= require <widgets/widgets>


Ergo.defineClass('Ergo.widgets.Link', 'Ergo.core.Widget', {
	
	defaults: {
		html: '<a href="#"/>',
		binding: 'text'
	},
	
	setHref: function(v) {
		this.el.attr('href', v);
	}
	
}, 'widgets:link');
