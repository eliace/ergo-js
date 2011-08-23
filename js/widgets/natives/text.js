
//= require <core/widget>


Ergo.declare('Ergo.widgets.Text', 'Ergo.core.Widget', {
	
	defaults: {
		html: '<span/>'
	},
	
	$opt: function(o) {
		Ergo.widgets.Text.superclass.$opt.apply(this, arguments);
		
		if('text' in o) {
			(o.text) ? this.el.text(o.text) : this.el.html('&nbsp;');
		}
	},
	
	$dataChanged: function() {
		Ergo.widgets.Text.superclass.$dataChanged.apply(this, arguments);
		
		this.el.text( this.getValue() );
	},
	
	getText: function() {
		return this.el.text();
	}
		
}, 'text');
