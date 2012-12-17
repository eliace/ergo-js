
//= require <widgets/input-box>


Ergo.declare('Ergo.widgets.InputEditor', 'Ergo.widgets.InputBox', {
	
	defaults: {
		
		cls: 'editor',
		
		stopOnFocusOut: true,
		
		content: {
			events: {
				'blur': function(e, w) {
					w.events.bubble('focusOut');
				},
				'change': function(e, w) {
					w.events.bubble('action');
				}								
			}
		},
		
		onFocusOut: function() {
			if(this.parent && this.options.stopOnFocusOut) this.parent.stopEdit();					
		},
		
		onAction: function() {
			if(this.parent) this.parent.stopEdit();			
		}
		
	}
	
	
	
}, 'input-editor');
