
//= require "plain"


/**
 * @class
 * @extends Dino.core.Layouts.PlainLayout
 */
Dino.core.Layouts.FloatLayout = Dino.declare('Dino.core.Layouts.FloatLayout', 'Dino.core.Layouts.PlainLayout', /** @lends Dino.core.Layouts.FloatLayout.prototype */{
	
	defaults: {
		name: 'float',
		clearfix: true
	},
	
	attach: function(c) {
		Dino.core.Layouts.FloatLayout.superclass.attach.call(this, c);
		// добавляем элемент-clearfix
		if(this.options.clearfix) {
			this.clearfix_el = $('<div class="clearfix"></div>');
			this.container.el.append(this.clearfix_el);
		}
	},
	
	insert: function(item) {
		(this.options.clearfix) ? this.clearfix_el.before(item.el) : this.container.el.append(item.el);
		item.el.addClass('float-item');
	},
	
	clear: function() {
		this.container.el.children().not('.clearfix').remove();
	}
	
	
	
}, 'float-layout');