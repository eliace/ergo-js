
//= require <core/widget>


/**
 * Текст
 *
 * Обертка для тега <span/>
 * 
 * @class
 * @name Ergo.widgets.Text
 * @extends Ergo.core.Widget
 */
Ergo.declare('Ergo.widgets.Text', 'Ergo.core.Widget', /** @lends Ergo.widgets.Text.prototype */{
	
	defaults: {
		html: '<span/>',
		set: {
			'text': function(v) {
				(v) ? this.el.text(v) : this.el.html('&nbsp;');
			}
		},
		binding: function(v) {
			this.opt('text', v);
		}
	}
	
	// $opt: function(o) {
		// this.$super(o);
// //		Ergo.widgets.Text.superclass.$opt.apply(this, arguments);
// 		
		// if('text' in o) {
			// (o.text) ? this.el.text(o.text) : this.el.html('&nbsp;');
		// }
	// },
	
	// $dataChanged: function() {
		// this.$super();
// //		Ergo.widgets.Text.superclass.$dataChanged.apply(this, arguments);
// 
		// if(this.options.binding)
			// this.opt('text', this.getValue());
// 			
// //		this.el.text( this.getValue() );
	// }
	
	// getText: function() {
		// return this.el.text();
	// }
		
}, 'text');
