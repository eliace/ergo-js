


Ergo.declare('Ergo.widgets.RadioItem', 'Ergo.widgets.Box', {
	
	defaults: {
		cls: 'e-radio-item',
		layout: 'hbox',
		components: {
			left: {
				etype: 'radio-box'
			},
			content: {
				autoBind: false
			}
			// right: {
				// etype: 'radio-box'
			// }
		},
		set: {
			'text': function(v) {
				this.content.opt('text', v);
			}
		}
	}
	
}, 'radio-item');
