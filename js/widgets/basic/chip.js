

Ergo.defineClass('Ergo.widgets.Chip', 'Ergo.widgets.Box', {

	defaults: {
		cls: 'chip',
		components: {
			image: {
				etype: 'image',
				as: 'circular small before',
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
						as: 'description'
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


}, 'widgets:chip');
