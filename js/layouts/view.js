
Ergo.declare('Ergo.layouts.View', 'Ergo.core.Layout', {
	
	defaults: {
		name: 'view'
	},
	
	wrap: function(item) {
		var wrapper = $('<p><label>'+item.options.label+'</label><span/></p>');
		$('span', wrapper).append(item.el);
		return wrapper;
	}
	
	
}, 'view-layout');
