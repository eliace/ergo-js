//= require <widgets/field>
//= require <widgets/button-item>


Ergo.declare('Ergo.widgets.TextButtonField', 'Ergo.widgets.Field', {
	
	defaults: {
		
		content: {
			
			defaultItem: {
				etype: 'button-item',
				cls: 'e-input-button'				
			}
			
		},
		
		fieldContent: {
			cls: 'e-input-with-button-holder',
			components: {
				input: {
					etype: 'text-input',
					events: {
						'focus': function(e, w) {
							w.parent(Ergo.widgets.Field).setFocus();
						},
						'blur': function(e, w) {
							w.parent(Ergo.widgets.Field).clearFocus();
						}
					}
				}				
			}			
		},
		
		buttons: [{
			text: 'Нажми меня'
		}],
		
		
		set: {
			'placeholder': function(v) { this.content.content.input.el.attr('placeholder', v); }
		}
	},
	
	
	$init: function(o) {
		
		if(o.multiline) o.fieldContent.components.input.etype = 'text-area';
		
		o.components.content.items = o.buttons;
		
		this.$super(o);		
	}
	
	
}, 'text-button-field');
