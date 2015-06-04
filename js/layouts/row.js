
Ergo.declare('Ergo.layouts.Row', 'Ergo.core.Layout', {
	
	defaults: {
		name: 'rows'
	},

	wrap: function(item) {
		return (item.options.divider) ? item.el : $('<div/>').append(item.el);
	}	
	
}, 'layouts:rows');
