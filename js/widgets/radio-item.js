


Ergo.declare('Ergo.widgets.RadioItem', 'Ergo.widgets.Box', {
	
	defaults: {
		cls: 'e-radio-item',
		layout: 'hbox',
		components: {
			radio: {
				etype: 'radio-box'
			},
			content: {
				autoBind: false
			}
		},
		set: {
			'text': function(v) {
				this.content.opt('text', v);
			}
		}
	}
	
}, 'radio-item');
