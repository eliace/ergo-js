

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
//		html: '<form method="POST"/>'
		tag: 'form'
	},

	set action(v) {
		this.vdom.el.setAttribute('action', v);
	},

	set method(v) {
		this.vdom.el.setAttribute('method', v);
	}

}, 'html:form');
