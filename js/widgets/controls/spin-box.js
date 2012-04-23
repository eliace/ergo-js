
//= require "input-box"
//= require "button-box"


Ergo.declare('Ergo.widgets.SpinBox', 'Ergo.widgets.InputBox', {
	
	defaults: {
		
		buttons: [{
			etype: 'box',
			cls: 'e-group-vert',
			autoBind: false,
			defaultItem: {
				etype: 'button-box',
				onClick: function() {
					this.events.bubble('action');
				}
			},
			items: [{icon: 'spinner-arrow-up', tag: 'up'}, {icon: 'spinner-arrow-down', tag: 'down'}]
		}],
		
		onAction: function(e) {
			var v = this.getValue();
			if(e.target.tag == 'up') v++
			else if(e.target.tag == 'down') v--;
			this.setValue(v);
		}		
	}
	
	
}, 'spin-box');
