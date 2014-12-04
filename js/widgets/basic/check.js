


Ergo.defineClass('Ergo.wigets.Check', 'Ergo.widgets.Box', {
	
	defaults: {
		cls: 'check',
		components: {
			content: {
				etype: 'icon',
				cls: 'fa'
			}
		},
		states: {
			'checked': function(on) {
				this.content.states.toggle('fa-check', on);
			}
		},
		events: {
			'change': function(e) {
				this.opt('value', e.value);			
			},
			// действие пользователя
			'jquery:click': function() {
				this.events.fire('change', {value: !this.opt('value')});
			}
		},
		binding: function(v) {
			this.states.toggle('checked', !(!v));
		}
	}
	
}, 'widgets:check');
