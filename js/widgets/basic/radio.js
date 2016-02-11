

Ergo.defineClass('Ergo.widgets.Radio', {

	extends: 'Ergo.widgets.Box',

	defaults: {
		cls: 'radio',
		// components: {
		// 	content: {
		// 	}
		// },
		events: {
			// действие пользователя
			'jquery:click': function() {
				this.rise('change', {value: !this.opt('value')});
			},
			'change': function(e) {
				this.prop('value', e.value);
			}
		},
		binding: function(v) {
			console.log('radio invalidate', v);
			this.toggle('checked', !(!v));
		}
	}


}, 'widgets:radio');
