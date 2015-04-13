

/**
 * Виджет для <form>
 * 
 * etype: html:form
 *  
 * опции:
 * 	- action
 *	- method
 * 
 * @class
 * @name Ergo.html.Form
 * @extends Ergo.core.Widget
 */
Ergo.defineClass('Ergo.html.Form', 'Ergo.core.Widget', {
	
	defaults: {
		html: '<form method="POST"/>'
	},
	
	set_action: function(v) {
		this.el.attr('action', v);
	},

	set_method: function(v) {
		this.el.attr('method', v);
	}
	
}, 'html:form');
