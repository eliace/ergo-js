
Ergo.defineClass('Ergo.layouts.Row', {

	extends: 'Ergo.core.Layout',

	defaults: {
		name: 'rows'
	},

	wrap: function(item) {
		return ((item.options.divider) ? item.el : $('<div/>').append(item.el))[0];
	}

}, 'layouts:rows');
