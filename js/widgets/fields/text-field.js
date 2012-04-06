
//= require <widgets/field>


Ergo.declare('Ergo.widgets.TextField', 'Ergo.widgets.Box', {
	
	defaults: {
		
		cls: 'e-text-field',
		
		content: {			
			components: {
				input: {
					etype: 'text-input',
					events: {
						'focus': function(e, w) {
	//						w.getParent(Ergo.widgets.Field).setFocus();
						},
						'blur': function(e, w) {
	//						w.getParent(Ergo.widgets.Field).clearFocus();
						}
					}
				}
			}
		},
		
		defaultItem: {
			etype: 'button-item',
			cls: 'e-input-button',
			text: false
		},
		
		buttons: []
		
		
		
	},
	
	
	$init: function(o) {
		
		if(o.multiline) o.content.components.input.etype = 'text-area';
		
		o.items = o.buttons;
		
		this.$super(o);		
	}
	
	
	
	
}, 'text-field');



/*
Ergo.declare('Ergo.widgets.TextField', 'Ergo.widgets.Field', {
	
	defaults: {
		fieldContent: {
			cls: 'e-element-wrapper',
			components: {
				input: {
					etype: 'text-input',
					events: {
						'focus': function(e, w) {
							w.getParent(Ergo.widgets.Field).setFocus();
						},
						'blur': function(e, w) {
							w.getParent(Ergo.widgets.Field).clearFocus();
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
	
	
}, 'text-field');
*/

