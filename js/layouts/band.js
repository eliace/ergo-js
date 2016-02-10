
Ergo.defineClass('Ergo.layouts.Band', {

	extends: 'Ergo.core.Layout',

	defaults: {
		name: 'band'
	},

	wrap: function(item) {
		var w = $('<div/>');
		if(item.$label)
			w.append(item.$label.el);
		w.append(item.el);
		return w[0];
	}


}, 'layouts:band');
