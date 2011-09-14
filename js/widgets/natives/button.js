
//= require <core/widget>


Ergo.widgets.Button = Ergo.declare('Ergo.widgets.Button', 'Ergo.core.Widget', /** @lends Ergo.widgets.Button.prototype */{
	
	$html: function() { return '<button type="button"/>'; },
	
	
	$events: function(self) {
		this.$super(self);
//		Ergo.widgets.Button.superclass.$events.apply(this, arguments);

//		var self = this;
		
		this.el.click(function(e){
			if(!self.states.is('disabled')) self.events.fire('onAction', {}, e);
		});		
		
	},
		
	
	$opt: function(o) {
		this.$super(o);
//		Ergo.widgets.Button.superclass.$opt.apply(this, arguments);

		if('buttonType' in o)
			this.el.attr('type', o.buttonType);
		if('tabIndex' in o) 
			this.el.attr('tabindex', o.tabIndex);
		if('disabled' in o){
			(o.disabled) ? this.el.attr('disabled', 'disabled') : this.el.removeAttr('disabled');
		}
	}

}, 'button');
