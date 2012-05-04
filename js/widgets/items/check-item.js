
//= require <widgets/check-box>
//= require <mixins/labelable>


Ergo.declare('Ergo.widgets.CheckItem', 'Ergo.widgets.Box', {
	
	defaults: {
		cls: 'e-check-item',
		layout: 'hbox',
		mixins: ['labelable'],
		components: {
			content: {
				etype: 'check-box'
			}
		},
		set: {
			'text': function(v) {
				this.opt('xlabel', v);
			}
		},
		onClick: function() {
			this.opt('value', !this.opt('value'));
		},
		binding: function(v) {
			this.content.states.toggle('checked', v);
		},
		value: false
	}
	
}, 'check-item');
