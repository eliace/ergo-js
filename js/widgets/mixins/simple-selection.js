

Ergo.alias('includes:item-click-selection', {

	defaults: {
		defaultItem: {
			events: {
				'jquery:click': function() {
					this.rise('itemSelect');
				}
			}
		},
		events: {
			'itemSelect': function(e) {
				this.opt('index', e.target.opt('name'));
//				e.stop();
			}
		},

		set: {
			index: function(v) {
				this.selection.set(v);
			}
		}

	}

});
