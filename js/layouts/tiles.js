

Ergo.declare('Ergo.layouts.Tiles', 'Ergo.core.Layout', {
	
	defaults: {
		name: 'tiles'
	},


	attach: function(w) {
		Ergo.layouts.Tiles.superclass.attach.call(this, w);

		var sizes = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight'];

		var tiles = this.options.size;

		this.el.addClass( tiles > sizes.length ? 'tiles-'+tiles : sizes[tiles-1] );		
	},


	// set tiles(v) {
	// },

	wrap: function(item) {
		var el = $('<div/>').append(item.el);
//		el.css({'width': '25%'});
		return el;
	}

	
}, 'layouts:tiles');
