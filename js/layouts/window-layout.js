

Dino.declare('Dino.layouts.WindowLayout', 'Dino.layouts.PlainLayout', {
	
	defaultOptions: {
		name: 'window',
		delay: 300,
		initialWidth: 200,
		initialHeight: 200,
		updateMode: 'manual'
	},
	
	
	attach: function() {
		Dino.layouts.WindowLayout.superclass.attach.apply(this, arguments);
		
		var el = $('<div class="dino-overlay"/><div class="dino-window" autoheight="true"><div class="dino-window-content"/></div>');
		
		this.container.el.append(el);
		
		this.window_el = $('.dino-window', el);
		this.overlay_el = $('.dino-overlay', el);
		this.el = $('.dino-window-content', el);
	},
	
	detach: function() {
		Dino.layouts.WindowLayout.superclass.detach.apply(this, arguments);
		this.container.el.detach();
	},
	
//	insert: function(item, i) {
//		
//	},
//	
//	remove: function(item) {
//	},
//
//	clear: function() {
//		this.el.detach();
//	},
	
	
	show: function() {
		this.el.css({'visibility': 'hidden'});
		this.container.el.show();
		this.window.width(o.initialWidth);
		this.window.height(o.initialHeight);
	},
	
	hide: function() {
		this.container.el.hide();		
	},
	
	update: function() {
		
		var box = this.el;
		var wnd = this.window_el;
		
		box.css({'visibility': 'hidden'});
		
//		this.container.el.show();
		
				
		var w = box.outerWidth();
		var h = box.outerHeight();
		
		
		var o = this.options;
		
		wnd.width(o.initialWidth);
		wnd.height(o.initialHeight);
		
		wnd.css('margin-left', -o.initialWidth/2);
		wnd.css('margin-top', -o.initialHeight/2);

		
		wnd.animate({width: w, height: h, 'margin-left': -w/2, 'margin-top': -h/2}, o.delay, function(){
			box.css({'visibility': ''});
		});
		
		
		box.focus();
		
	}
		
	
}, 'window-layout');