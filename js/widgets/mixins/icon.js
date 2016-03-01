

Ergo.alias('includes:icon', {

	defaults: {
		components: {
			icon: {
				etype: 'icon',
				weight: -10
			},
			content: {
				etype: '.'
			}
		},

		set: {
			icon: function(v) {
				this.$icon.prop('text', v);
			}
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
		},
		set: {
			xicon: function(v) {
				this.$xicon.prop('text', v);
			}
		}
	}

});



Ergo.alias('includes:icon:before', {

	defaults:{
		components: {
			icon: {
				etype: 'icon',
				weight: -10,
				as: 'before'
			},
			content: {
				etype: '.',
//				binding: false
			}
		},
		set: {
			icon: function(v) {
				this.$icon.prop('text', v);
			}
		}
	}

});





Ergo.alias('includes:icon:after', {

	defaults:{
		components: {
			icon: {
				etype: 'icon',
				weight: 10,
				as: 'after'
			},
			content: {
				etype: '.',
				binding: false
			}
		},
		set: {
			icon: function(v) {
				this.$icon.prop('text', v);
			}
		}
	}

});




Ergo.alias('includes:xicon:after', {

	defaults:{
		components: {
			xicon: {
				etype: 'icon',
				weight: 10,
				as: 'after'
			},
			content: {
				etype: '.',
				binding: false
			}
		},
		set: {
			xicon: function(v) {
				this.$xicon.prop('text', v);
			}
		}
	}

});






Ergo.alias('includes:icon:at-left', {

	defaults:{
		as: 'has-icon at-left',
		components: {
			icon: {
				etype: 'icon',
				weight: 10,
				as: 'left'
			},
			content: {
				etype: '.'
			}
		},
		set: {
			icon: function(v) {
				this.$icon.prop('text', v);
			}
		}
	}

});




Ergo.alias('includes:icon:at-right', {

	defaults:{
		as: 'has-icon at-right',
		components: {
			icon: {
				etype: 'icon',
				weight: 10,
				as: 'right'
			},
			content: {
				etype: '.'
			}
		},
		set: {
			icon: function(v) {
				this.$icon.prop('text', v);
			}
		}
	}

});



Ergo.alias('includes:xicon:at-right', {

	defaults:{
		as: 'has-icon at-right',
		components: {
			xicon: {
				etype: 'icon',
				weight: 10,
				as: 'right'
			},
			content: {
				etype: '.'
			}
		},
		set: {
			xicon: function(v) {
				this.$xicon.prop('text', v);
			}
		}
	}
	
});
