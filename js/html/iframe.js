




Ergo.defineClass('Ergo.html.Iframe', 'Ergo.core.Widget', {
	
	defaults: {
		html: '<iframe/>'
	},
	
	set_src: function(v) {
		this.el.attr('src', v);
	}
	
}, 'html:iframe');
