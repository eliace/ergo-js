


/**
 * Виджет для <textarea>
 * 
 * etype: html:Textarea
 *  
 * опции:
 * 	- rows
 * 
 * @class
 * @name Ergo.html.Textarea
 * @extends Ergo.core.Widget
 */
Ergo.defineClass('Ergo.html.Textarea', 'Ergo.core.Widget', {
	
	defaults: {
		html: '<textarea/>'
	},
	
	set_rows: function(v) {
		this.el.attr('rows', v);
	},
	
}, 'html:textarea');
