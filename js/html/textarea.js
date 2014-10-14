



Ergo.defineClass('Ergo.html.Textarea', 'Ergo.core.Widget', {
	
	defaults: {
		html: '<textarea/>'
	},
	
	set_rows: function(v) {
		this.el.attr('rows', v);
	},
	
}, 'html:textarea');
