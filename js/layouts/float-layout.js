

Dino.declare('Dino.layouts.FloatLayout', 'Dino.layouts.PlainLayout', {
	
	defaultOptions: {
		name: 'float',
		clearfix: true
	},
	
	attach: function(c) {
		Dino.layouts.FloatLayout.superclass.attach.call(this, c);
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