

Ergo.alias('includes:+image', {

	defaults:{
		components: {
			image: {
				etype: 'html:img',
				cls: 'image',
				weight: -10
			},
			content: {
				etype: '.'
			}
		},

		set: {
			image: function(v) {
				this.$image.opt('src', v);
			}
		}

	}

});
