

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
Ergo.defineClass('Ergo.html.Form', {

	extends: 'Ergo.core.Widget',

	defaults: {
//		html: '<form method="POST"/>'
		tag: 'form',
		method: 'POST'
	},


	props: {
		set: {
			action: function(v) {
				this.vdom.el.setAttribute('action', v);
			},

			method: function(v) {
				this.vdom.el.setAttribute('method', v);
			}
		}
	}


}, 'html:form');
