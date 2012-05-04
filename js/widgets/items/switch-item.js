
//= require <widgets/labeled-item>

Ergo.declare('Ergo.widgets.SwitchItem', 'Ergo.widgets.LabeledItem', {
	
	defaults: {
		cls: 'e-choice',
		components: {
			content: {
				content: {
					text: '|||'
				}
			}
		},
		onClick: function() {
			this.opt('value', !this.opt('value'));
		},
		binding: function(v) {
			this.states.toggle('checked', v);			
		},
		set: {
			'text': function(v) {
				this.opt('label', v[0]);
				this.opt('xlabel', v[1]);
			}
		}
	}
	
}, 'switch-item');
