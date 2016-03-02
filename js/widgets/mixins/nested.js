


Ergo.alias('includes:nested', {

	defaults: {
		defaultItem: {
			etype: 'nested-item'
		},

		set: {
			label: function(v) {
				this.$label.opt('text', v);
			}
		},
		get: {
			label: function() {
				return this.$label.opt('text');
			}
		}

	}

});
