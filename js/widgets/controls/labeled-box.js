
//= require <widgets/icon>
//= require <layouts/hbox>

Ergo.declare('Ergo.widgets.LabeledBox', 'Ergo.widgets.Box', {
	
	defaults: {
		layout: 'hbox',
		components: {
			before: {
				weight: -1000,
				etype: 'label',
				state: 'hidden',
				binding: false
			},
			after: {
				weight: 1000,
				etype: 'label',
				state: 'hidden',
				binding: false
			}
		},
		
		set: {
			'label': function(v) {
//				var o = this.options;
				this.before.opt('text', v);
				this.before.states.toggle('hidden', !v);				
			},
			'xlabel': function(v) {
//				var o = this.options;
				this.after.opt('text', v);
				this.after.states.toggle('hidden', !v);				
			}
		}
		
	}
	
	
	
	
}, 'labeled-box');
