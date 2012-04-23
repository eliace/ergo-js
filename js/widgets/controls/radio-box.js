
//= require "labeled-box"
//= require <widgets/radio-item>

Ergo.declare('Ergo.widgets.RadioBox', 'Ergo.widgets.LabeledBox', {
	
	defaults: {
		cls: 'e-radio-item',
//		layout: 'hbox',
		components: {
			content: {
				etype: 'radio-item'
			}
		},
		set: {
			'text': function(v) {
				this.opt('xlabel', v);
			}
		}
	}
	
}, 'radio-box');
