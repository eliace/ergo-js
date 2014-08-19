
//= require <widgets/natives/button>
//= require <widgets/natives/box>


Ergo.declare('Ergo.widgets.ButtonItem', 'Ergo.widgets.Button', {
	
	defaults: {
		cls: 'e-button-item',
//		html: '<button/>',
		mixins: ['iconable'],
		layout: 'hbox',
		components: {
			content: {
				etype: 'text',
				state: 'hidden',
				autoBind: false
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