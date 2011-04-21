
Dino.topZ = 1;


/**
 * @class
 * @extends Dino.layouts.PlainLayout
 */
Dino.layouts.WindowLayout = Dino.declare('Dino.layouts.WindowLayout', 'Dino.layouts.PlainLayout', /** @lends Dino.layouts.WindowLayout.prototype */{
	
	defaultOptions: {
		name: 'window',
		delay: 300,
		initialWidth: 200,
		initialHeight: 200,
		updateMode: 'manual',
		html: '<div class="dino-window-content"/>'
	},
	
	
	attach: function() {
		Dino.layouts.WindowLayout.superclass.attach.apply(this, arguments);
		
		var o = this.options;
		
		this.overlay_el = $('<div class="dino-overlay" autoheight="ignore"></div>');
						
		this.overlay_el.mousedown(function(e){ e.preventDefault(); return false; });
		
	},
	
	detach: function() {
		Dino.layouts.WindowLayout.superclass.detach.apply(this, arguments);
		this.container.el.empty();
	},
	
	
	reset: function() {

		var w0 = this.options.initialWidth;
		var h0 = this.options.initialHeight;
		
		this.container.el.css({
			width: w0, 
			height: h0,
			'margin-left': -w0/2,
			'margin-top': -h0/2
		});
	},
	
	
	open: function() {

		var z = Dino.topZ++;
		this.overlay_el.css('z-index', z*1000);
		this.container.el.css('z-index', z*1000+1);
	
		$('body').append(this.overlay_el);
		
		this.reset();
		this.container.el.show();
		
	},
	
	
	close: function() {

		Dino.topZ--;
		
		this.overlay_el.detach();
		this.container.el.hide();
	},
	
	
	update: function(callback) {
		
		var box = this.el;
		var wnd = this.container.el;
						
		var w0 = wnd.width();
		var h0 = wnd.height();
		wnd.css({width: '', height: ''});

		box.css({'visibility': 'hidden'});

//		this.container.el.show();

		var w = this.container.options.width;
		var h = this.container.options.height;

		// если указана высота в %, ее еще надо рассчитать
		if (Dino.isString(w) && w[w.length - 1] == '%') {
			w = this.container.el.parent().width() * parseFloat(w.substr(0, w.length - 1)) / 100;
			wnd.css('width', w);
		}
			
		if (Dino.isString(h) && h[h.length - 1] == '%') {
			h = this.container.el.parent().height() * parseFloat(h.substr(0, h.length - 1)) / 100;
			wnd.css('height', w);
		}
		

		w = w || box.outerWidth(true);
		h = h || box.outerHeight(true);
		
//		var w = this.container.options.width || box.outerWidth(true);
//		var h = this.container.options.height || box.outerHeight(true);
		
		
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
			self.container.$layoutChanged();
		});
		
		
		box.focus();
		
	}
		
	
}, 'window-layout');








/*
Dino.layouts.WindowLayout = Dino.declare('Dino.layouts.WindowLayout', 'Dino.layouts.PlainLayout', {
	
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

//		this.overlay_el.click(function(e){ e.stopPropagation(); });
		this.overlay_el.mousedown(function(e){ e.preventDefault(); return false; });
		
	},
	
	detach: function() {
		Dino.layouts.WindowLayout.superclass.detach.apply(this, arguments);
		this.container.el.empty();
	},
	
	
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
			self.container.$layoutChanged();
		});
		
		
		box.focus();
		
	}
		
	
}, 'window-layout');
*/

