

Ergo.alias('includes:icon', {

	defaults:{ 
		components: {
			icon: {
				etype: 'icon',
				weight: -10
			},
			content: {
				etype: '.'
			}
		}
	},


	overrides: {
		set_icon: function(v) {
			this.icon.opt('text', v);
		}
	}

});




Ergo.alias('includes:xicon', {

	defaults:{ 
		components: {
			xicon: {
				etype: 'icon',
				weight: 10
			},
			content: {
				etype: '.'
			}
		}
	},


	overrides: {
		set_xicon: function(v) {
			this.xicon.opt('text', v);
		}
	}

});


