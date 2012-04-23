
//= require "labeled-box"
//= require <widgets/check-item>"


Ergo.declare('Ergo.widgets.CheckBox', 'Ergo.widgets.LabeledBox', {
	
	defaults: {
		cls: 'e-check-item',
//		layout: 'hbox',
		components: {
			content: {
				etype: 'check-item'
			}
		},
		set: {
			'text': function(v) {
				this.opt('xlabel', v);
			}
		}
	}
	
}, 'check-box');
