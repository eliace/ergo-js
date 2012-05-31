
//= require <core/widget>

/**
 * Изображение
 * 
 * Обертка для тега <img/>
 * 
 * @class
 * @name Ergo.widgets.Image
 * @extends Ergo.core.Widget
 */
Ergo.widgets.Image = Ergo.declare('Ergo.widgets.Image', 'Ergo.core.Widget', /** @lends Ergo.widgets.Image.prototype */{
	
	defaults: {
		html: '<img/>',
		set: {
			'src': function(v) {
				this.el.attr('src', v);
			}
		}
		// binding: function(v) {
			// this.el.attr( 'src', this.options.src || v );
		// }
	},
	
	
//	$html: function() { return '<img/>';},
	
	$opt: function(o) {
		this.$super(o);
//		Ergo.widgets.Image.superclass.$opt.call(this, o);
		
//		if('src' in o) this.el.attr('src', o.src);
	}
	
	// $dataChanged: function() {
		// this.el.attr( 'src', this.getValue() );
	// }
	
	
}, 'image');

