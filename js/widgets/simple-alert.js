

Ergo.defineClass('Ergo.widgets.SimpleAlert', 'Ergo.widgets.Box', {

	defaults: {
		as: 'alert simple',
		components: {
			title: {
				etype: 'html:strong'
			},
			content: {
				etype: '.'
			}
		}
	},

	set title(v) {
		this.$title.opt('text', v);
	}

}, 'widgets:simple-alert');
