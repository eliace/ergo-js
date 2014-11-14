



/**
 * Виджет для <select>
 * 
 * etype: html:select
 *  
 * опции:
 * 	- disabled
 * 	- name
 * 	- readonly
 * 	- multiple
 * 
 * @class
 * @name Ergo.html.Select
 * @extends Ergo.core.Widget
 */
Ergo.defineClass('Ergo.html.Select', 'Ergo.core.Widget', {
	
	defaults: {
		html: '<select/>',
		defaultItem: {
			etype: 'html:option'
		}
	},
	
	set_disabled: function(v) {
		this.el.attr('disabled', '');
	},
	
	set_name: function(v) {
		this.el.attr('name', v);
	},
	
	set_readonly: function(v) {
		this.el.attr('readonly', v);
	},
	
	set_multiple: function(v) { 
		this.el.attr('multiple', v); 
	}
	
	
}, 'html:select');
