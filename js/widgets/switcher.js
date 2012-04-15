
//= require <widgets/natives/box>

Ergo.declare('Ergo.widgets.Switcher', 'Ergo.widgets.Box', {
	
	defaults: {
		cls: 'e-choice',
		components: {
			left: {
				etype: 'label',
				binding: false
			},
			content: {
				content: {
					text: '|||'
				}
			},
			right: {
				etype: 'label',
				binding: false
			}
		},
		onClick: function() {
			this.setValue(!this.getValue());
//			this.opt('value', !this.opt('value'));
//			this.states.toggle('checked');
		},
		
		binding: function(v) {
			this.states.toggle('checked', v);
		},
		
		set: {
			'left': function(v) { this.left.opt('text', v); },
			'right': function(v) { this.right.opt('text', v); }
		}
	}
	
}, 'switcher');
