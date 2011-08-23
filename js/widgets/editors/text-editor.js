//= require <widgets/field>
//= require <widgets/dropdown-box>
//= require <widgets/images/all>

Ergo.declare('Ergo.widgets.TextEditor', 'Ergo.widgets.Field', {
	
	defaults: {
		autoFit: true,
		cls: 'dino-text-editor',
		events: {
			'click': function(e) {
				e.stopPropagation();
			}
		},
		components: {
			input: {
				autoFit: true,
				width: undefined //FIXME костыль пока нормально не заработает PlainLayout
			}			
		},
//		extensions: [Ergo.Focusable],
		onBlur: function() {
			this.parent.cancelEdit();
		},
//		states: {
//			'focus': function(f) {
//				if(f) {
//					
//				}
//				else {
//					this.parent.stopEdit();
//				}
//			}
//		},
		onKeyDown: function(e) {
			if(e.keyCode == 13) {
				this.parent.stopEdit('enterKey');
			}
			else if(e.keyCode == 27) {
				this.parent.cancelEdit('escKey');
			}
		},
    updateOnValueChange: true,
		changeOnEnter: true
	}	
	
}, 'text-editor');
