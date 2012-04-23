
//= require "labeled-box"

Ergo.declare('Ergo.widgets.SwitchBox', 'Ergo.widgets.LabeledBox', {
	
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
			this.states.toggle('checked');
		},
		
		set: {
			'text': function(v) {
				this.opt('label', v[0]);
				this.opt('xlabel', v[1]);
			}
		}
	}
	
}, 'switch-box');
