//= require <widgets/widgets>


Ergo.defineClass('Ergo.widgets.Text', 'Ergo.core.Widget', {
	
	defaults: {
		html: '<span/>'
	}
	
}, 'widget:text');



Ergo.defineClass('Ergo.widgets.TextNode', 'Ergo.core.Widget', {
	
	defaults: {
	},
	
	setText: function(v) {
		this.el[0].textContent = v;
	}
	
}, 'widget:textnode');
