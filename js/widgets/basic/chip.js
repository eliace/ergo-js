

Ergo.defineClass('Ergo.widgets.Chip', {

	extends: 'Ergo.widgets.Box',

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
//						etype: '.'
					},
					description: {
						etype: 'text',
						as: 'description'
					}
				}
			}
		}
	},


	props: {
		'img': {
			set: function(v) {
				this.$image.prop('src', v);
			}
		},
		'description': {
			set: function(v) {
				this.$content.$description.prop('text', v);
			}
		}
	}


}, 'widgets:chip');
