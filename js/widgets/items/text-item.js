
//= require <mixins/iconable>


Ergo.declare('Ergo.widgets.TextItem', 'Ergo.widgets.Box', {
	
	defaults: {
		cls: 'e-text-item',
		mixins: ['iconable'],
		layout: 'hbox',
		components: {
			content: {
				etype: 'text',
				state: 'hidden',
				binding: false
//				autoBind: false
			}
		},
//		onClick: function(){
//			this.events.fire('action');
//		},
		text: '',
		set: {
			'text': function(v) {
				this.content.opt('text', v || '@text');
				this.content.states.toggle('hidden', (!v && v !== ''));
			}
		},
		get: {
			'text': function() {
				return this.content.opt('text');
			}
		},
		binding: function(v) {
			this.opt('text', v);
		}
	}
		
}, 'text-item');