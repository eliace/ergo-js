

Ergo.declare('Ergo.layouts.Form', 'Ergo.core.Layout', {
	
	defaults: {
		name: 'form'
	},
	
	wrap: function(item) {
		
//		var wrapper = $('<div class="e-field"><label clas="e-field-label">'+item.options.label+'</label><div class="e-field-content"><div class="e-element-wrapper"/></div></div>');
//		$('.e-element-wrapper', wrapper).append(item.el);
		var wrapper = $('<div><label class="e-form-label">'+item.options.label+'</label><div class="e-form-item"></div></div>');
		wrapper.children().eq(1).append(item.el);
//		$('.e-field-content', wrapper).append(item.el);
		
		return wrapper;
	}
	
	
}, 'form-layout');
