
//= require <widgets/natives/box>



Ergo.declare('Ergo.widgets.StyledButton', 'Ergo.widgets.Box', {
	
	defaults: {
		cls: 'e-styled-button',
		content: {
			cls: 'e-styled-button-gradient',
			content: {
				cls: 'e-styled-button-dash'
			}
		},
		set: {
			'text': function(s) { this.content.content.opt('text', s); }
		}
	}
	
}, 'styled-button');
