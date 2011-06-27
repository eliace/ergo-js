
//= require <core/widget>


Dino.declare('Dino.widgets.Text', 'Dino.core.Widget', {
	
	defaults: {
		html: '<span/>'
	},
	
	$opt: function(o) {
		Dino.widgets.Text.superclass.$opt.apply(this, arguments);
		
		if('text' in o) {
			(o.text) ? this.el.text(o.text) : this.el.html('&nbsp;');
		}
	},
	
	$dataChanged: function() {
		Dino.widgets.Text.superclass.$dataChanged.apply(this, arguments);
		
		this.el.text( this.getValue() );
	},
	
	getText: function() {
		return this.el.text();
	}
		
}, 'text');
