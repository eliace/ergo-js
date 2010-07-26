




Dino.declare('Dino.widgets.FormItem', 'Dino.containers.Box', {
	
	
	_init: function(o) {
		Dino.widgets.FormItem.superclass._init.apply(this, arguments);		

		this.label = Dino.widget({
			dtype: 'label',
			text: o.label
		});
		this.addItem(this.label, 0);	
	
	}
	
}, 'form-item')









Dino.declare('Dino.containers.Form', Dino.Container, {

	defaultOptions: {
		layout: 'form-layout'
	},
	
	
	_html: function() { return '<form></form>'; },
	
	
	ajaxSubmit: function(callback) {
		
		var url = this.el.attr('action');
		var data = this.el.serialize();
		
		$.post(url, data, callback);
	}
	
}, 'form');


