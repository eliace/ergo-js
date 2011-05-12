
//= require "box"


/*
Dino.declare('Dino.widgets.FormItem', 'Dino.containers.Box', {
	
	
	$init: function(o) {
		Dino.widgets.FormItem.superclass.$init.apply(this, arguments);		

		this.label = Dino.widget({
			dtype: 'label',
			text: o.label
		});
		this.addItem(this.label, 0);	
	
	}
	
}, 'form-item')
*/








Dino.declare('Dino.containers.Form', 'Dino.containers.Box', {

	defaultOptions: {
//		layout: 'form-layout'
	},
	
	
	$html: function() { return '<form method="post"></form>'; },
	
	$opt: function(o) {
		Dino.containers.Form.superclass.$opt.apply(this, arguments);
		
		if('action' in o) this.el.attr('action', o.action);
	},
	
	
	ajaxSubmit: function(callback) {
		
		var url = this.el.attr('action');
		var data = this.el.serialize();
		
		$.post(url, data, callback);
	}
	
}, 'form');


