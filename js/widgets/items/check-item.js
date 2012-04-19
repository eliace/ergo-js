
//= require <widgets/labeled-box>


Ergo.declare('Ergo.widgets.CheckItem', 'Ergo.widgets.LabeledBox', {
	
	defaults: {
		cls: 'e-check-item',
//		layout: 'hbox',
		components: {
			content: {
				etype: 'check-box'
			}
		},
		set: {
			'text': function(v) {
				this.opt('xlabel', v);
			}
		}
	}
	
}, 'check-item');
