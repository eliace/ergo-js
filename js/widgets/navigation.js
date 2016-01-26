

Ergo.defineClass('Ergo.widgets.Navigation', 'Ergo.widgets.Box', {

	defaults: {
		cls: 'navigation',
		tag: 'nav',
		components: {
			header: {
				layout: 'float',
				cls: 'header',
				components: {
					title: {
						etype: 'link',
						cls: 'title'
					}
				}
			},
			content: {
				layout: 'float',
				cls: 'content'
			}
		}

	},


	set title(v) {
		this.$header.$title.opt('text', v);
	}


}, 'widgets:navigation');
