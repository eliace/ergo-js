
//= require <widgets/items/button-item>

Ergo.declare('Ergo.widgets.TextBox', 'Ergo.widgets.Box', {
	
	defaults: {
		
		cls: 'e-text-box',
		
		layout: {
			wrapper: function(item) {
				if(item._key == 'content') {
					var wrapper = $('<div class="text-wrapper"/>');
					wrapper.append(item.el);
					return wrapper;
				}
				return item.el;
			}
		},
		
		components: {
			content: {
				weight: 10,
				etype: 'text'
			}
		},
		
		binding: function(v) {
			this.opt('text', v);
		},
		
		set: {
			'text': function(v) { 
				this.content.opt('text', v); 
			}
		},
		get: {
			'text': function() { return this.content.opt('text'); }
		},
		
		defaultItem: {
			etype: 'button-item',
			cls: 'e-input-button'
		},
		
		buttons: []
		
		
	},
	
	
	$pre_construct: function(o) {
		
		o.items = o.buttons;
		
		this.$super(o);		
	}
	
	
	
	
}, 'text-box');
