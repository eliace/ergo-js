
//= require <core/widget>


/**
 * @class
 * @name Dino.widgets.form.Label
 * @extends Dino.core.Widget
 */
Dino.declare('Dino.widgets.Label', 'Dino.core.Widget', /** @lends Dino.widgets.form.Label.prototype */{

	$html: function() { return '<label></label>'; },
	
	$opt: function(o) {
		Dino.widgets.Label.superclass.$opt.call(this, o);
		
		if('text' in o)
			this.el.text(o.text);
		if('forName' in o)
			this.el.attr('for', o.forName);
	},
	
	$dataChanged: function() {
		this.el.text(this.getValue());		
	}
	
}, 'label');
