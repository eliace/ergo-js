

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
		}
	},


	overrides: {
		set image(v) {
			this.$image.opt('src', v);
		}
	}

});
