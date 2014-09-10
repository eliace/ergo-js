

Ergo.defineClass('Ergo.widgets.Field', 'Ergo.core.Widget', {
	
	defaults: {
		html: '<input type="text"/>',
		baseCls: 'field',
		binding: function(v) {
			this.el.val(v);
		}
	}
	
}, 'widgets:field');
