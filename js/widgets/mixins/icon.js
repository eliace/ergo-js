

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



Ergo.alias('includes:icon:before', {

	defaults:{
		components: {
			icon: {
				etype: 'icon',
				weight: -10,
				cls: 'before'
			},
			content: {
				etype: '.',
				binding: false
			}
		}
	},


	overrides: {
		set_icon: function(v) {
			this.$icon.opt('text', v);
		}
	}

});





Ergo.alias('includes:icon:after', {

	defaults:{
		components: {
			icon: {
				etype: 'icon',
				weight: 10,
				cls: 'after'
			},
			content: {
				etype: '.',
				binding: false
			}
		}
	},


	overrides: {
		set_icon: function(v) {
			this.$icon.opt('text', v);
		}
	}

});




Ergo.alias('includes:xicon:after', {

	defaults:{
		components: {
			xicon: {
				etype: 'icon',
				weight: 10,
				cls: 'after'
			},
			content: {
				etype: '.',
				binding: false
			}
		}
	},


	overrides: {
		set_xicon: function(v) {
			this.$xicon.opt('text', v);
		}
	}

});






Ergo.alias('includes:icon:at-left', {

	defaults:{
		cls: 'has-icon at-left',
		components: {
			icon: {
				etype: 'icon',
				weight: 10,
				cls: 'left'
			},
			content: {
				etype: '.'
			}
		}
	},


	overrides: {
		set_icon: function(v) {
			this.$icon.opt('text', v);
		}
	}

});




Ergo.alias('includes:icon:at-right', {

	defaults:{
		cls: 'has-icon at-right',
		components: {
			icon: {
				etype: 'icon',
				weight: 10,
				cls: 'right'
			},
			content: {
				etype: '.'
			}
		}
	},


	overrides: {
		set_icon: function(v) {
			this.$icon.opt('text', v);
		}
	}

});



Ergo.alias('includes:xicon:at-right', {

	defaults:{
		cls: 'has-icon at-right',
		components: {
			xicon: {
				etype: 'icon',
				weight: 10,
				cls: 'right'
			},
			content: {
				etype: '.'
			}
		}
	},


	overrides: {
		set_xicon: function(v) {
			this.$xicon.opt('text', v);
		}
	}

});
