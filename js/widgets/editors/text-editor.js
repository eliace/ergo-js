//= require <widgets/field>
//= require <widgets/dropdown-box>
//= require <widgets/images/all>

Dino.declare('Dino.widgets.TextEditor', 'Dino.widgets.Field', {
	
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
//		extensions: [Dino.Focusable],
		onBlur: function() {
			this.parent.stopEdit();
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
		},
    updateOnValueChange: true,
		changeOnEnter: true
	}	
	
}, 'text-editor');
