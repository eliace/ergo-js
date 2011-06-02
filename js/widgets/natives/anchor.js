
//= require <core/widget>

/**
 * @class
 * @name Dino.widgets.form.Anchor
 * @extends Dino.core.Widget
 */
Dino.declare('Dino.widgets.Anchor', 'Dino.core.Widget', /** @lends Dino.widgets.form.Anchor.prototype */{
	
	$html: function() { return '<a href="#" click="return false" />'; },
	
	$init: function(o) {
		Dino.widgets.Anchor.superclass.$init.call(this, o);
		
		var self = this;
		
		this.el.click(function(e){
			self.events.fire('onAction', {}, e);
		});		
	},
	
	$opt: function(o) {
		Dino.widgets.Anchor.superclass.$opt.call(this, o);
		
		if('text' in o)
			this.el.text(o.text);
		if('href' in o)
			this.el.attr('href', o.href);
	},
	
	$dataChanged: function() {
		Dino.widgets.Anchor.superclass.$dataChanged.apply(this, arguments);
		this.el.attr('href',this.getValue());
//		this.el.text(this.getValue());
	}	
	
}, 'anchor');
