


Dino.declare('Dino.widgets.TextField', 'Dino.widgets.ComboField', {
	
	defaultCls: 'dino-text-field',
	
	defaultOptions: {
		events: {
			'click': function(e) {
				e.stopPropagation();
			}
		},
		components: {
			input: {
        updateOnValueChange: true,
				events: {
					'focus': function(e, w) {
						w.parent.setFocus();
					}
				}
			}			
		},
		extensions: [Dino.Focusable],
		onFocus: function() {
//			if(this.options.changeOn)
		},
		onBlur: function() {
			if(this.options.changeOnBlur)
				this.setValue( this.input.el.val() );
		},
		changeOnBlur: true
	}	
	
}, 'text-field');
