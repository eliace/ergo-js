








Ergo.declare('Ergo.widgets.Form', 'Ergo.widgets.Box', {

	defaults: {
		html: '<form method="post"></form>'
//		layout: 'form-layout'
	},
	
	
//	$html: function() { return '<form method="post"></form>'; },
	
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


