
/*
Ergo.defineClass('Ergo.widgets.Text', 'Ergo.core.Widget', {
	
	defaults: {
		html: '<span/>',
		binding: 'text'
	}
	
}, 'widget:text');
*/


Ergo.defineClass('Ergo.widgets.Text', 'Ergo.core.Widget', {
	
	defaults: {
		binding: 'text'
	},
	
	set_text: function(v) {
		this.el[0].textContent = v;
	}
	
}, 'widgets:text');
