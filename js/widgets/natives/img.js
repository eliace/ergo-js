
//= require <core/widget>

/**
 * Изображение.
 * 
 * @class
 * @extends Dino.core.Widget
 */
Dino.widgets.Image = Dino.declare('Dino.widgets.Image', Dino.core.Widget, /** @lends Dino.widgets.Image.prototype */{
	
	$html: function() { return '<img/>';},
	
	$opt: function(o) {
		Dino.widgets.Image.superclass.$opt.call(this, o);
		
		if('src' in o) this.el.attr('src', o.src);
	},
	
	$dataChanged: function() {
		this.el.attr( 'src', this.getValue() );
	}
	
	
}, 'image');

