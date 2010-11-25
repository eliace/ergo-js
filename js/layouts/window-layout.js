

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
		
		var o = this.options;
		
		this.window_el = $('<div class="dino-window" autoheight="true"><div class="dino-window-content"></div></div>');
		this.overlay_el = $('<div class="dino-overlay"></div>');
		this.el = $('.dino-window-content', this.window_el);
						
		this.container.el.append(this.overlay_el).append(this.window_el);
		
	},
	
	detach: function() {
		Dino.layouts.WindowLayout.superclass.detach.apply(this, arguments);
		this.container.el.empty();
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
	
	
//	show: function() {
//		this.el.css({'visibility': 'hidden'});
//		this.container.el.show();
//	},
//	
//	hide: function() {
//		this.container.el.hide();		
//	},
	
	reset: function() {

		var w0 = this.options.initialWidth;
		var h0 = this.options.initialHeight;
		
		this.window_el.css({
			width: w0, 
			height: h0,
			'margin-left': -w0/2,
			'margin-top': -h0/2
		});
	},
	
	update: function(callback) {
		
		var box = this.el;
		var wnd = this.window_el;
		
		box.css({'visibility': 'hidden'});
//		wnd.css({'visibility': 'hidden'});
		
		var w0 = wnd.width();
		var h0 = wnd.height();
		wnd.css({width: '', height: ''});
		
//		this.container.el.show();
		
				
		var w = box.outerWidth(true);
		var h = box.outerHeight(true);
		
		box.css('display', 'none');
		
		var o = this.options;
		
//		wnd.width(w0);
//		wnd.height(h0);

		wnd.css('width', w0);
		wnd.css('height', h0);
		wnd.css('margin-left', -w0/2);
		wnd.css('margin-top', -h0/2);
//		wnd.width(w0);
//		wnd.height(h0);

//		wnd.css({'visibility': 'visible'});
		
//		console.log(Dino.format("%s, %s", w0, h0));
		
		var self = this;
		
		wnd.animate({'width': w, 'margin-left': -w/2, 'height': h, 'margin-top': -h/2}, o.delay, function(){
			// делаем окно видимым
			box.css({'visibility': '', 'display': 'block'});
			// вызываем функцию-сигнал о том, что окно отображено
			if(callback) callback.call(self);
			// обновляем компоновку окна
			self.container._layoutChanged();
		});
		
		
		box.focus();
		
	}
		
	
}, 'window-layout');