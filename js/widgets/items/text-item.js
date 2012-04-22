
//= require <widgets/iconed-box>


Ergo.declare('Ergo.widgets.TextItem', 'Ergo.widgets.IconedBox', {
	
	defaults: {
		cls: 'e-text-item',
		components: {
			content: {
				etype: 'text',
				state: 'hidden'
			}
		},
		onClick: function(){
			this.events.fire('onAction');
		},
		text: '',
		set: {
			'text': function(v) {
				this.content.opt('text', v);
				this.content.states.toggle('hidden', (!v && v !== ''));
			}
		},
		get: {
			'text': function() {
				this.content.opt('text');
			}
		}
	}
		
}, 'text-item');