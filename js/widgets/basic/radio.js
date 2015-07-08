

Ergo.defineClass('Ergo.widgets.Radio', 'Ergo.widgets.Box', {
	
	defaults: {
		cls: 'radio',
		// components: {
		// 	content: {
		// 	}
		// },
		events: {
			'change': function(e) {
				this.opt('value', e.value);
			},
			// действие пользователя
			'jquery:click': function() {
				this.events.rise('change', {value: !this.opt('value')});
			}
		},
		binding: function(v) {
			this.states.toggle('checked', !(!v));
		}		
	}
	
	
}, 'widgets:radio');
