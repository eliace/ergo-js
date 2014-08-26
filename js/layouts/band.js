
Ergo.declare('Ergo.layouts.Band', 'Ergo.core.Layout', {
	
	defaults: {
		name: 'band'
	},
	
	wrap: function(item) {
		var w = $('<div/>');
		if(item.label)
			w.append(item.label.el);
		w.append(item.el);
		return w;
	}
	
	
}, 'layouts:band');
