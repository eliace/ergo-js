
//= require "html"


Ergo.defineClass('Ergo.html.Textarea', 'Ergo.core.Widget', {
	
	defaults: {
		html: '<textarea/>'
	},
	
	setRows: function(v) {
		this.el.attr('rows', v);
	},
	
}, 'html:textarea');
