

Ergo.declare('Ergo.layouts2.FormLayout', 'Ergo.layouts.PlainLayout', {
	
	wrap: function(item) {
		var wrapper = $('<div class="e-form-wrapper"><div class="e-form-label"><label>'+item.options.label+'</label></div><div class="e-form-holder"/></div>');
		$('.e-form-holder', wrapper).append(item.el);
		
		wrapper.on('click', function(){
			if(item.setFocus) item.setFocus();
			wrapper.addClass('focus');
		})
		
		return wrapper;
	}
	
}, 'form2-layout');
