

Ergo.declare('Ergo.layouts.Form', 'Ergo.core.Layout', {
	
	
	wrap: function(item) {
		
//		var wrapper = $('<div class="e-field"><label clas="e-field-label">'+item.options.label+'</label><div class="e-field-content"><div class="e-element-wrapper"/></div></div>');
//		$('.e-element-wrapper', wrapper).append(item.el);
		var wrapper = $('<div class="e-field"><label class="e-field-label">'+item.options.label+'</label><div class="e-field-content"></div></div>');
		$('.e-field-content', wrapper).append(item.el);
		
		return wrapper;
	}
	
	
}, 'form-layout');
