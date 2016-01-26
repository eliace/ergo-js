

Ergo.defineClass('Ergo.widgets.Radio', 'Ergo.widgets.Box', {

	defaults: {
		cls: 'radio',
		// components: {
		// 	content: {
		// 	}
		// },
		events: {
			// действие пользователя
			'jquery:click': function() {
				this.events.rise('change', {value: !this.opt('value')});
			},
			'change': function(e) {
				this.opt('value', e.value);
			}
		},
		binding: function(v) {
			console.log('radio invalidate', v);
			this.states.toggle('checked', !(!v));
		}
	}


}, 'widgets:radio');
