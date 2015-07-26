


Ergo.defineClass('Ergo.widgets.Chips', 'Ergo.widgets.Box', {

	defaults: {
		cls: 'chips',
		components: {
			image: {
				etype: 'image',
				cls: 'circular small before',
				weight: -10
			},
			content: {
				etype: 'text',
				components: {
					content: {
						etype: '.'
					},
					description: {
						etype: 'text',
						cls: 'description'
					}
				}
			}
		}
	},


	set img(v) {
		this.$image.opt('src', v);
	},

	set description(v) {
		this.$content.$description.opt('text', v);
	}


}, 'widgets:chips');
