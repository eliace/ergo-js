
//= require <core/widget>


/**
 * @class
 * @name Ergo.widgets.form.Label
 * @extends Ergo.core.Widget
 */
Ergo.declare('Ergo.widgets.Label', 'Ergo.core.Widget', /** @lends Ergo.widgets.form.Label.prototype */{

	$html: function() { return '<label></label>'; },
	
	$opt: function(o) {
		this.$super(o);
//		Ergo.widgets.Label.superclass.$opt.call(this, o);
		
		if('text' in o)
			this.el.text(o.text);
		if('forName' in o)
			this.el.attr('for', o.forName);
	},
	
	$dataChanged: function() {
		this.el.text(this.getValue());		
	}
	
}, 'label');
