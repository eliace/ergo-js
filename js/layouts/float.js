
//= require "plain"


/**
 * @class
 * @extends Ergo.core.Layouts.PlainLayout
 */
Ergo.core.Layouts.FloatLayout = Ergo.declare('Ergo.core.Layouts.FloatLayout', 'Ergo.core.Layouts.PlainLayout', /** @lends Ergo.core.Layouts.FloatLayout.prototype */{
	
	defaults: {
		name: 'float',
		clearfix: true
	},
	
	attach: function(c) {
		Ergo.core.Layouts.FloatLayout.superclass.attach.call(this, c);
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