
//= require "iconed-box"


Ergo.declare('Ergo.widgets.TextBox', 'Ergo.widgets.IconedBox', {
	
	defaults: {
		cls: 'e-text-item',
		components: {
			content: {
				etype: 'text',
				state: 'hidden'
			}
		},
//		onClick: function(){
//			this.events.fire('action');
//		},
		text: '',
		set: {
			'text': function(v) {
				this.content.opt('text', v || 'no-text');
				this.content.states.toggle('hidden', (!v && v !== ''));
			}
		},
		get: {
			'text': function() {
				this.content.opt('text');
			}
		}
	}
		
}, 'text-box');