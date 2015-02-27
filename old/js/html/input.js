
//= require "html"


Ergo.defineClass('Ergo.html.Input', 'Ergo.core.Widget', {
	
	defaults: {
		html: '<input/>',
		binding: function(v) {
			this.el.val(v);
		}
	},
	
	setType: function(v) {
		this.el.attr('type', v);
	},
	
	setPlaceholder: function(v) {
		this.el.attr('placeholder', v);
	},
	
	setDisabled: function(v) {
		this.el.attr('disabled', '');
	},
	
	setName: function(v) {
		this.el.attr('name', v);
	},
	
	setReadOnly: function(v) {
		this.el.attr('readonly', v);
	}
	
	
	
}, 'html:input');
