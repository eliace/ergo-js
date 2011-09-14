
//= require <core/widget>


Ergo.declare('Ergo.widgets.Text', 'Ergo.core.Widget', {
	
	defaults: {
		html: '<span/>',
		set: {
			'text': function(v) {
				(v) ? this.el.text(v) : this.el.html('&nbsp;');
			}
		}
	},
	
	// $opt: function(o) {
		// this.$super(o);
// //		Ergo.widgets.Text.superclass.$opt.apply(this, arguments);
// 		
		// if('text' in o) {
			// (o.text) ? this.el.text(o.text) : this.el.html('&nbsp;');
		// }
	// },
	
	$dataChanged: function() {
		this.$super();
//		Ergo.widgets.Text.superclass.$dataChanged.apply(this, arguments);
		
		this.el.text( this.getValue() );
	},
	
	getText: function() {
		return this.el.text();
	}
		
}, 'text');
