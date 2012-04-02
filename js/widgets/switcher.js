
//= require <widgets/natives/box>

Ergo.declare('Ergo.widgets.Switcher', 'Ergo.widgets.Box', {
	
	defaults: {
		cls: 'e-choice',
		components: {
			left: {
				etype: 'label'
			},
			content: {
				content: {
					text: '|||'
				}
			},
			right: {
				etype: 'label'
			}
		},
		onClick: function() {
			this.states.toggle('checked');
		},
		
		set: {
			'left': function(v) { this.left.opt('text', v); },
			'right': function(v) { this.right.opt('text', v); }
		}
	}
	
}, 'switcher');
