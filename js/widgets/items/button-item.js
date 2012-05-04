
//= require <widgets/iconed-item>


Ergo.declare('Ergo.widgets.ButtonItem', 'Ergo.widgets.IconedItem', {
	
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
		
}, 'button-item');