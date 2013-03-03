
//= require <widgets/input-box>


Ergo.declare('Ergo.widgets.SpinnerInput', 'Ergo.widgets.InputBox', {
	
	defaults: {
		
		cls: 'e-spinner-input',
		
		buttons: [{
			etype: 'box',
			cls: 'e-group-vert',
			autoBind: false,
			defaultItem: {
				etype: 'icon-button',
				onClick: function() {
					this.events.bubble('spin');
				}
				// components: {
					// icon: {
						// etype: 'pic-icon'
					// }
				// }
			},
			items: [{icon: 'icon-caret-up', tag: 'up'}, {icon: 'icon-caret-down', tag: 'down'}]
		}],
		
		onSpin: function(e) {
			var v = this.opt('value');
			if(e.target.tag == 'up') v++
			else if(e.target.tag == 'down') v--;
			this.opt('value', v);
		}		
	}
	
	
}, 'spinner-input');
