

Dino.declare('Dino.layouts.BarLayout', 'Dino.layouts.PlainLayout', {
	
	defaultOptions: {
		name: 'bar',
		clearfix: true
	},
	
	attach: function(c) {
		Dino.layouts.BarLayout.superclass.attach.call(this, c);
		// добавляем элемент-clearfix
		if(this.options.clearfix) {
			this.clearfix_el = $('<div class="clearfix"></div>');
			this.container.el.append(this.clearfix_el);
		}
	},
	
	insert: function(item) {
		(this.options.clearfix) ? this.clearfix_el.before(item.el) : this.container.el.append(item.el);
		item.el.addClass('bar-item');
	}
	
	
	
}, 'bar-layout');