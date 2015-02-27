
//= require <widgets/natives/box>



Ergo.declare('Ergo.widgets.StyledButton', 'Ergo.widgets.Box', {
	
	defaults: {
		cls: 'e-styled-button',
		layout: {
			html: '<div class="e-styled-button-gradient"><div class="e-styled-button-dash"></div></div>',
			htmlSelector: '.e-styled-button-dash'
		}
		// content: {
			// cls: 'e-styled-button-gradient',
			// content: {
				// cls: 'e-styled-button-dash'
			// }
		// },
		// set: {
			// 'text': function(s) { this.content.content.opt('text', s); }
		// }
	}
	
}, 'styled-button');
