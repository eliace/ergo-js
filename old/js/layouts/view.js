
Ergo.declare('Ergo.layouts.View', 'Ergo.core.Layout', {
	
	defaults: {
		name: 'view'
	},
	
	wrap: function(item) {
		// var wrapper = $('<p><label>'+item.options.label+'</label><span/></p>');
		// $('span', wrapper).append(item.el);
		var wrapper = $('<p><label>'+item.opt('label')+'</label></p>');
		wrapper.append(item.el);
		item.el.addClass('view-item');

		item._wrap_el = wrapper;
		item.setLabel = function(v) { $('label', this._wrap_el).text(v); };
		
		return wrapper;
	}
	
	
}, 'layouts:view');
