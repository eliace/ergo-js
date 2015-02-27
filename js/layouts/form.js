

Ergo.declare('Ergo.layouts.Form', 'Ergo.core.Layout', {
	
	defaults: {
		name: 'form'
	},
	
	wrap: function(item) {
		var w = $('<div/>');
		if(item.label)
			w.append(item.label.el);
		w.append(item.el);
		return w;
	}
	
	
}, 'layouts:form');
