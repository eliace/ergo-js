
//= require <widgets/field>


Ergo.declare('Ergo.widgets.TextField', 'Ergo.widgets.Box', {
	
	defaults: {
		
		cls: 'e-text-field',
		
		layout: {
			wrap: function(item) {
				if(item._key == 'input') {
					var wrapper = $('<div/>');
					wrapper.append(item.el);
					return wrapper;
				}
				return item.el;
			}
		},
		
//		content: {			
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
//			}
		},
		
		binding: function(v) {
			this.opt('text', v);
		},
		
		set: {
			'text': function(v) { this.input.opt('text', v); },
			'placeholder': function(v) { this.input.el.attr('placeholder', v); }
		},
		get: {
			'text': function() { return this.input.get('text'); }
		},
		
		defaultItem: {
			etype: 'button-item',
			cls: 'e-input-button'
//			text: false
		},
		
		buttons: []
		
		
		
	},
	
	
	$init: function(o) {
		
		if(o.multiline) o.components.input.etype = 'text-area';
		
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

