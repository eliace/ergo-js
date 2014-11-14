

Ergo.defineClass('Ergo.widgets.SimpleAlert', 'Ergo.widgets.Box', {

	defaults: {
		cls: 'alert simple',
		components: {
			title: {
				etype: 'html:strong'
			},
			content: {
				etype: 'text'
			}
		}
	},

	set_title: function(v) {
		this.title.opt('text', v);
	}

}, 'widgets:simple-alert');