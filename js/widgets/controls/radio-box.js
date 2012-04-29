
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
		// onClick: function() {
			// this.opt('value', !this.opt('value'));
		// },
		// binding: function(v) {
			// this.content.states.toggle('checked', v);
		// },		
		set: {
			'text': function(v) {
				this.opt('xlabel', v);
			}
		}
	}
	
}, 'radio-box');
