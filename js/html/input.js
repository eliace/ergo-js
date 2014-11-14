

/**
 * Виджет для <input>
 * 
 * etype: html:input
 *  
 * опции:
 * 	- type
 * 	- placeholder
 * 	- disabled
 * 	- name
 * 	- readonly
 * 
 * @class
 * @name Ergo.html.Input
 * @extends Ergo.core.Widget
 */
Ergo.defineClass('Ergo.html.Input', 'Ergo.core.Widget', {
	
	defaults: {
		html: '<input/>',
		binding: function(v) {
			this.el.val(v);
		}
	},
	
	set_type: function(v) {
		this.el.attr('type', v);
	},
	
	set_placeholder: function(v) {
		this.el.attr('placeholder', v);
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
	
	
	get_value: function() {
		return this.el.val();
	},
	
	set_value: function(v) {
		this.el.val(v);
	}
	
	
	
}, 'html:input');
