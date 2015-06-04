
Ergo.declare('Ergo.layouts.Columns', 'Ergo.core.Layout', {
	
	defaults: {
		name: 'columns'
	},
	
	wrap: function(item) {
		return (item.options.divider) ? item.el : $('<div/>').append(item.el);
	}
	
}, 'layouts:columns');
