


Ergo.defineClass('Ergo.widgets.Link', 'Ergo.core.Widget', {
	
	defaults: {
		html: '<a href="#"/>',
		binding: 'text'
	},
	
	set_href: function(v) {
		this.el.attr('href', v);
	}
	
}, 'widgets:link');
