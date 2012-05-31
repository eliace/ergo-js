
//= require <widgets/input-box>


Ergo.declare('Ergo.widgets.SpinnerInput', 'Ergo.widgets.InputBox', {
	
	defaults: {
		
		cls: 'e-spinner-input',
		
		buttons: [{
			etype: 'box',
			cls: 'e-group-vert',
			autoBind: false,
			defaultItem: {
				etype: 'button-item',
				onClick: function() {
					this.events.bubble('action');
				}
			},
			items: [{icon: 'spinner-arrow-up', tag: 'up'}, {icon: 'spinner-arrow-down', tag: 'down'}]
		}],
		
		onAction: function(e) {
			var v = this.opt('value');
			if(e.target.tag == 'up') v++
			else if(e.target.tag == 'down') v--;
			this.opt('value', v);
		}		
	}
	
	
}, 'spinner-input');
