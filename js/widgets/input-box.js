
//= require <widgets/items/button-item>

Ergo.declare('Ergo.widgets.InputBox', 'Ergo.widgets.Box', {
	
	defaults: {
		
		cls: 'e-input-box',
		
		layout: {
			wrapper: function(item) {
				if(item._key == 'content') {
					var wrapper = $('<div class="input-wrapper"/>');
					wrapper.append(item.el);
					return wrapper;
				}
				return item.el;
			}
		},
		
//		content: {			
		components: {
			content: {
				weight: 10,
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
			'text': function(v) { this.content.opt('text', v); },
			'placeholder': function(v) { this.content.el.attr('placeholder', v); }
		},
		get: {
			'text': function() { return this.content.opt('text'); }
		},
		
		defaultItem: {
			etype: 'button-item',
			cls: 'e-input-button'
//			text: false
		},
		
		buttons: []
		
		
		
	},
	
	
	$pre_construct: function(o) {
		
		if(o.multiline) o.components.content.etype = 'text-area';
		
		o.items = o.buttons;
		
		this.$super(o);		
	}
	
	
	
	
}, 'input-box');
