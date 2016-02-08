


Ergo.defineClass('Ergo.widgets.Check', 'Ergo.widgets.Box', {

	defaults: {
		cls: 'check',
		components: {
			content: {
				etype: 'icon',
				as: 'fa'
			}
		},
		states: {
			'checked': function(on) {
				this.$content.toggle('fa-check', on);
				this.unset('indeterminate');
			},
			'indeterminate': function(on) {
				this.$content.toggle('fa-square', on);
			}
		},
		events: {
			// 'change': function(e) {
			// 	this.opt('value', e.value);
			// },
			// действие пользователя
			'jquery:click': function(e) {
//				if(e.button == 0)
				this.opt('value', !this.opt('value'));
				this.emit('change', {value: this.opt('value')});
			}
		},
		binding: function(v) {
			this.toggle('checked', !(!v));
		}
	}

}, 'widgets:check');
