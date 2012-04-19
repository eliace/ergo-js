


Ergo.declare('Ergo.widgets.LabeledBox', 'Ergo.widgets.Box', {
	
	defaults: {
		layout: 'hbox',
		components: {
			before: {
				weight: -1000,
				etype: 'label',
				state: 'hidden'
			},
			after: {
				weight: 1000,
				etype: 'label',
				state: 'hidden'
			}
		},
		
		set: {
			'label': function(v) {
				var o = this.options;
				this.before.opt('text', o.label);
				this.before.states.toggle('hidden', !o.label);				
			},
			'xlabel': function(v) {
				var o = this.options;
				this.after.opt('text', o.xlabel);
				this.after.states.toggle('hidden', !o.xlabel);				
			}
		}
		
	}
	
	
	
	
}, 'labeled-box');
