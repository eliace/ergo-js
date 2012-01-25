

Ergo.declare('Ergo.widgets.TextField2', 'Ergo.widgets.Box', {
	
	defaults: {
		cls: 'e-input-holder',
		extensions: ['focusable'],
		components: {
			input: {
				etype: 'text-input'
				// events: {
					// 'focus': function(e, w) {
// //						this.parent.setFocus();
					// },
					// 'blur': function(e, w) {
// //						this.parent.clearFocus();
					// }
				// }
			}
		},
		set: {
			'placeholder': function(v) { this.input.el.attr('placeholder', v); }
		}
	}
	
	
}, 'text-field-2');
