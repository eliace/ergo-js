
//= require <widgets/labeled-box>

Ergo.declare('Ergo.widgets.RadioItem', 'Ergo.widgets.LabeledBox', {
	
	defaults: {
		cls: 'e-radio-item',
//		layout: 'hbox',
		components: {
			content: {
				etype: 'radio-box'
			}
		},
		set: {
			'text': function(v) {
				this.opt('xlabel', v);
			}
		}
	}
	
}, 'radio-item');
