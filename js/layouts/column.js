
Ergo.declare('Ergo.layouts.Column', 'Ergo.core.Layout', {
	
	defaults: {
		name: 'column'
	},
	
	wrap: function(item) {
		return (item.options.divider) ? item.el : $('<div/>').append(item.el);
	}
	
}, 'layouts:column');
