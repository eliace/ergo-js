
//= require <widgets/iconed-item>


Ergo.declare('Ergo.widgets.TextItem', 'Ergo.widgets.IconedItem', {
	
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
				return this.content.opt('text');
			}
		}
	}
		
}, 'text-item');