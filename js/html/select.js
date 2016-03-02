



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
Ergo.defineClass('Ergo.html.Select', {

	extends: 'Ergo.core.Widget',

	defaults: {
		tag: 'select',
		defaultItem: {
			etype: 'html:option',
			binding: 'text'
		}
	},

	props: {
		set: {
			name: function(v) {
				this.el.attr('name', v);
			},

			readonly: function(v) {
				this.el.attr('readonly', v);
			},

			multiple: function(v) {
				this.el.attr('multiple', v);
			},

			disabled: function(v) {
				(v) ? this.dom.el.setAttribute('disabled', '') : this.dom.el.removeAttribute('disabled');
			}
		}
	}



}, 'html:select');
