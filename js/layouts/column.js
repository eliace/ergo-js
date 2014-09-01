
Ergo.declare('Ergo.layouts.Column', 'Ergo.core.Layout', {
	
	defaults: {
		name: 'column'
	},
	
	wrap: function(item) {
		return $('<div/>').append(item.el);
	}
	
}, 'layouts:column');
