
//= require "html"



Ergo.defineClass('Ergo.html.Iframe', 'Ergo.core.Widget', {
	
	defaults: {
		html: '<iframe/>'
	},
	
	setSrc: function(v) {
		this.el.attr('src', v);
	}
	
}, 'html:iframe');
