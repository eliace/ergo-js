
/*
Ergo.defineClass('Ergo.widgets.Text', 'Ergo.core.Widget', {
	
	defaults: {
		html: '<span/>',
		binding: 'text'
	}
	
}, 'widget:text');
*/


/**
 * Текстовое содержимое
 * 
 * :text
 *  
 * Опции:
 * 	`text`
 * 
 * @class
 * @name Ergo.widgets.Text
 * @extends Ergo.core.Widget
 */
Ergo.defineClass('Ergo.widgets.Text', 'Ergo.core.Widget', {
	
	defaults: {
		binding: 'text'
	},
	
	set_text: function(v) {
		this.el[0].textContent = (v == null ? '': v);
	}
	
}, 'widgets:text');
