


Ergo.alias('includes:nested', {

	defaults: {
		defaultItem: {
			etype: 'nested-item'
		}
	},

	overrides: {
		set_label: function(v) {
			this.label.opt('text', v);
		},
		
		get_label: function() {
			this.label.opt('text');
		}
	}


});