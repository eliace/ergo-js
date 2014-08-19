
//= require "html"



Ergo.defineClass('Ergo.html.Select', 'Ergo.core.Widget', {
	
	defaults: {
		html: '<select/>',
		defaultItem: {
			etype: 'html:option'
		}
	},
	
	setDisabled: function(v) {
		this.el.attr('disabled', '');
	},
	
	setName: function(v) {
		this.el.attr('name', v);
	},
	
	setReadOnly: function(v) {
		this.el.attr('readonly', v);
	},
	
	setMultiple: function(v) { 
		this.el.attr('multiple', v); 
	}
	
	
}, 'html:select');
