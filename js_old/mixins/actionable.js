

Ergo.declare_mixin('Ergo.mixins.Actionable', function(o){

	
	this.setActionOn = function(actionEvent) {
		
		var self = this;
		
		if(actionEvent == 'click')
			this.el.click(function(e) { if(!self.states.is('disabled')) self.events.fire('click', {button: e.button}, e); });
		
		
		this.events.reg(actionEvent, function(e){
			this.events.bubble('action');
		});
		
	};


}, 'actionable');