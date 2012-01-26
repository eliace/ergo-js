

Ergo.declare('Ergo.widgets.TextField2', 'Ergo.widgets.Field2', {
	
	defaults: {
		fieldContent: {
			cls: 'e-input-holder',
			components: {
				input: {
					etype: 'text-input',
					events: {
						'focus': function(e, w) {
							w.getParent(Ergo.widgets.TextField2).setFocus();
						},
						'blur': function(e, w) {
							w.getParent(Ergo.widgets.TextField2).clearFocus();
						}
					}
				}
				
			}
		},
		set: {
			'placeholder': function(v) { this.content.content.input.el.attr('placeholder', v); }
		}
	},
	
	
	$init: function(o) {
		
		if(o.multiline) o.fieldContent.components.input.etype = 'text-area';
		
		this.$super(o);		
	}
	
	
}, 'text-field-2');
