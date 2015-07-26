

Ergo.alias('includes:item-click-selection', {

	defaults: {
		defaultItem: {
			events: {
				'jquery:click': function() {
					this.events.rise('itemSelect');
				}
			}
		},
		events: {
			'itemSelect': function(e) {
				this.opt('index', e.target.opt('name'));
//				e.stop();
			}
		}
	},


	overrides: {

		set index(v) {
			this.selection.set(v);
		}

	}

});