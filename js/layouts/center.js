

Ergo.declare('Ergo.layouts.Center', 'Ergo.core.Layout', {
	
	defaults: {
		name: 'center'
	},
	
	
	update: function() {
		this._super();
		
		// var box_w = this._widget.parent.el.width();
		// var box_h = this._widget.parent.el.width();

		var w = this._widget.el.width();
		var h = this._widget.el.height();
		
		this._widget.el.css({
			'margin-left': -w/2,
			'margin-top': -h/2
		});
		
	}
	
	
}, 'layouts:center');
