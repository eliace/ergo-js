
//= require <widgets/widgets>


Ergo.defineClass('Ergo.widgets.Link', 'Ergo.core.Widget', {
	
	defaults: {
		html: '<a href="#"/>',
	},
	
	setHref: function(v) {
		this.el.attr('href', v);
	}
	
}, 'widget:link');
