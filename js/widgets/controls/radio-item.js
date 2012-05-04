
//= require "labeled-item"
//= require <widgets/radio-box>

Ergo.declare('Ergo.widgets.RadioItem', 'Ergo.widgets.LabeledItem', {
	
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
	
}, 'radio-item');
