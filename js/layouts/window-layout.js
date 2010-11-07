


Dino.declare('Dino.layouts.WindowLayout', 'Dino.Layout', {
	
	
	attach: function() {
		Dino.layouts.DialogLayout.superclass.attach.apply(this, arguments);
		
		this.overlayEl = $('<div class="dialog-overlay"></div>');
		this.windowEl = $('<div class="dialog-window"></div>');
		
		this.container.el.append(this.overlayEl);
		this.container.el.append(this.windowEl);
	},
	
	insert: function(item, key) {
		this.windowEl.append(item.el);
		this.items.push(item);
	},
	
	remove: function(item) {
		item.el.detach();
		Dino.remove_from_array(this.items, item);
	},
	
	clear: function() {
		Dino.each(this.items, function(item){ item.el.detach(); });
	}
	
	
	
	
}, 'window-layout');
