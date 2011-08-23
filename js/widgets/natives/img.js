
//= require <core/widget>

/**
 * Изображение.
 * 
 * @class
 * @extends Ergo.core.Widget
 */
Ergo.widgets.Image = Ergo.declare('Ergo.widgets.Image', Ergo.core.Widget, /** @lends Ergo.widgets.Image.prototype */{
	
	$html: function() { return '<img/>';},
	
	$opt: function(o) {
		Ergo.widgets.Image.superclass.$opt.call(this, o);
		
		if('src' in o) this.el.attr('src', o.src);
	},
	
	$dataChanged: function() {
		this.el.attr( 'src', this.getValue() );
	}
	
	
}, 'image');

