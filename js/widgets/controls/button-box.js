
//= require "iconed-box"


Ergo.declare('Ergo.widgets.ButtonBox', 'Ergo.widgets.IconedBox', {
	
	defaults: {
		cls: 'e-button-item',
		html: '<button/>',
		components: {
			content: {
				etype: 'text',
				state: 'hidden'
			}
		},
//		onClick: function(){
//			this.events.fire('action');
//		},
		text: false,
		set: {
			'text': function(v) {
				this.content.opt('text', v || 'no-text');
				this.content.states.toggle('hidden', (!v && v !== ''));
			}
		},
		get: {
			'text': function() {
				return this.content.opt('text');
			}
		}
	}
		
}, 'button-box');