
//= require "list"


/*
Ergo.declare('Ergo.widgets.FormItem', 'Ergo.containers.List', {
	
	
	$init: function(o) {
		Ergo.widgets.FormItem.superclass.$init.apply(this, arguments);		

		this.label = Ergo.widget({
			etype: 'label',
			text: o.label
		});
		this.addItem(this.label, 0);	
	
	}
	
}, 'form-item')
*/








Ergo.declare('Ergo.containers.Form', 'Ergo.containers.List', {

	defaults: {
//		layout: 'form-layout'
	},
	
	
	$html: function() { return '<form method="post"></form>'; },
	
	$opt: function(o) {
		this.$super(o);
//		Ergo.containers.Form.superclass.$opt.apply(this, arguments);
		
		if('action' in o) this.el.attr('action', o.action);
		if('enctype' in o) this.el.attr('enctype', o.enctype);
		if('target' in o) this.el.attr('target', o.target);
	},
	
	
	ajaxSubmit: function(callback) {
		
		var url = this.el.attr('action');
		var data = this.el.serialize();
		
		$.post(url, data, callback);
	}
	
}, 'form');


