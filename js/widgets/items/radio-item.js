
//= require <mixins/labelable>
//= require <widgets/radio-box>

Ergo.declare('Ergo.widgets.RadioItem', 'Ergo.widgets.Box', {
	
	defaults: {
		cls: 'e-radio-item',
		layout: 'hbox',
		mixins: ['labelable'],
		components: {
			content: {
				etype: 'radio-box'
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
