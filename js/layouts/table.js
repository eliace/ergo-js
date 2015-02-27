//= require <core/layout>

Ergo.declare('Ergo.layouts.Table', 'Ergo.core.Layout', {
	
	defaults: {
		columns: []
	},
	
	
	// construct: function(o) {
		// this._super(o);
// 		
	// },
	
	
	update: function() {
		this._super();
		
		$('tr.group > td', this.el).attr('colspan', this.options.columns.length);
		
	}
	
	
}, 'layouts:table');
