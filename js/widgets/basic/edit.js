


Ergo.defineClass('Ergo.widgets.Edit', {

	extends: 'Ergo.core.Widget',

	defaults: {
		tag: 'div',//'<div contenteditable="true"/>',
		binding: 'prop:text'
	},


	_construct: function(o) {
		Ergo.widgets.Edit.superclass._construct.call(this, o);

		this.vdom.el.setAttribute('contenteditable', true);
	}

}, 'widgets:edit');
