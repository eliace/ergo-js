
//= require <widgets/input-box>


Ergo.declare('Ergo.widgets.InputEditor', 'Ergo.widgets.InputBox', {
	
	defaults: {
		
		cls: 'editor',
		
		stopOnFocusOut: true,
		stopOnChange: true,
		
		content: {
			events: {
				'blur': function(e, w) {
					w.events.bubble('focusOut');
				}
				// 'change': function(e, w) {
					// w.events.bubble('change');
				// }								
			}
		},
		
		onFocusOut: function() {
			if(this.parent && this.options.stopOnFocusOut && this.parent.stopEdit) this.parent.stopEdit();					
		},
		
		onChange: function() {
			if(this.parent && this.options.stopOnChange && this.parent.stopEdit) this.parent.stopEdit();			
		}
		
	}
	
	
	
}, 'input-editor');
