
//= require <mixins/iconable>


Ergo.declare('Ergo.widgets.TextItem', 'Ergo.widgets.Box', {
	
	defaults: {
		cls: 'e-text-item',
		mixins: ['iconable'],
		layout: 'hbox',
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