
//= require <widgets/inputs/spinner-input>


Ergo.declare('Ergo.widgets.SpinnerEditor', 'Ergo.widgets.SpinnerInput', {
	
	defaults: {
		
		cls: 'editor',
		
		stopOnFocusOut: true,
		
		content: {
			events: {
				'blur': function(e, w) {
					w.events.bubble('focusOut');
				}
				// 'change': function(e, w) {
					// w.events.bubble('action');
				// }								
			}
		},
		
		onFocusOut: function() {
			if(this.parent && this.options.stopOnFocusOut) this.parent.stopEdit();					
		}
		
		// onAction: function() {
			// if(this.parent) this.parent.stopEdit();			
		// }
		
	}
	
	
	
}, 'spinner-editor');
