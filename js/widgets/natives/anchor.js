
//= require <core/widget>

/**
 * @class
 * @name Ergo.widgets.form.Anchor
 * @extends Ergo.core.Widget
 */
Ergo.declare('Ergo.widgets.Anchor', 'Ergo.core.Widget', /** @lends Ergo.widgets.form.Anchor.prototype */{
	
	$html: function() { return '<a href="#" click="return false" />'; },
	
	$construct: function(o) {
		this.$super(o);
//		Ergo.widgets.Anchor.superclass.$construct.call(this, o);
		
		var self = this;
		
		this.el.click(function(e){
			self.events.fire('onAction', {}, e);
		});		
	},
	
	$opt: function(o) {
		this.$super(o);
//		Ergo.widgets.Anchor.superclass.$opt.call(this, o);
		
		if('text' in o)
			this.el.text(o.text);
		if('href' in o)
			this.el.attr('href', o.href);
	},
	
	$dataChanged: function() {
		this.$super();
//		Ergo.widgets.Anchor.superclass.$dataChanged.apply(this, arguments);
		this.el.attr('href',this.getValue());
//		this.el.text(this.getValue());
	}	
	
}, 'anchor');
