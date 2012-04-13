
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
			this.states.toggle('checked');
		},
		
		set: {
			'text': function(v) {
				this.left.opt('text', v[0]);				
				this.right.opt('text', v[1]);				
			}
//			'left': function(v) { this.left.opt('text', v); },
//			'right': function(v) { this.right.opt('text', v); }
		}
	}
	
}, 'switcher');
