

Ergo.alias('includes:caret', {

	defaults:{
		components: {
			caret: {
				etype: 'icon',
        as: '+caret',
				weight: 10
			},
			content: {
				etype: '.'
			}
		}
	}


	// overrides: {
	// 	set caret(v) {
	// 		this.$caret.opt('text', v);
	// 	}
	// }

});




Ergo.alias('includes:caret:at-right', {

	defaults:{
		cls: 'has-icon at-right',
		components: {
			caret: {
				etype: 'icon',
				weight: 10,
				as: '+right +caret'
			},
			content: {
				etype: '.'
			}
		}
	}


	// overrides: {
	// 	set_icon: function(v) {
	// 		this.$icon.opt('text', v);
	// 	}
	// }

});
