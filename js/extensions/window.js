
//= require <core/object>


Ergo.globals.topZ = 1;


Ergo.extension('Ergo.extensions.Window', function(o) {
	
	
	var self = this;
	
	this.window = {
		
		open: function() {
	
			var wnd = self.el;
			var overlay = self.overlay_el;
	
			var z = Ergo.globals.topZ++;
			overlay.css('z-index', z*1000);
			wnd.css('z-index', z*1000+1);
		
			$('body').append(overlay);
			$('body').append(wnd);
	//		this.window_el.append(this.el);
			
	//		this.reset();
			wnd.show();
			this.update();
						
		},
		
		close: function() {

			var wnd = self.el;
			var overlay = self.overlay_el;
	
			Ergo.globals.topZ--;
			
			overlay.detach();
			wnd.hide();
	//		this.el.detach();
	
//			this.events.fire('onClose');
		},
		
		
		update: function(callback) {
			
			var wnd = self.el;
			
			var css_w = wnd.css('width');
			var css_h = wnd.css('height');
			
			var w = wnd.width();
			var h = wnd.height();
			
			var ow = wnd.outerWidth(true);
			var oh = wnd.outerHeight(true);
			
			wnd.hide();
			
			var w0 = self.options.initialWidth;
			var h0 = self.options.initialHeight;
			
			wnd.css({
				width: w0, 
				height: h0,
				'margin-left': -w0/2,
				'margin-top': -h0/2
			});
			
			wnd.show();
			
			wnd.animate({'width': w, 'margin-left': -ow/2, 'height': h, 'margin-top': -oh/2}, 300, function(){
				// делаем окно видимым
	//			box.css({'visibility': '', 'display': 'block'});
				// вызываем функцию-сигнал о том, что окно отображено
	//			if(callback) callback.call(self);
				// обновляем компоновку окна
				self.$layoutChanged();
			});
			
		}
		
		
				
	}
	
	
/*	
	this.reset = function() {

		var w0 = this.options.initialWidth;
		var h0 = this.options.initialHeight;
		
		this.window_el.css({
			width: w0, 
			height: h0,
			'margin-left': -w0/2,
			'margin-top': -h0/2
		});
	};
*/	
	
/*	
	this.open = function() {

		var z = Ergo.globals.topZ++;
		this.overlay_el.css('z-index', z*1000);
		this.el.css('z-index', z*1000+1);
	
		$('body').append(this.overlay_el);
		$('body').append(this.el);
//		this.window_el.append(this.el);
		
//		this.reset();
		this.el.show();
		this.update();
		
		this.events.fire('onOpen');
	};
	
	
	this.close = function() {

		Ergo.globals.topZ--;
		
		this.overlay_el.detach();
		this.el.hide();
//		this.el.detach();

		this.events.fire('onClose');
	};
*/	

/*
	this.update = function() {
		
		var wnd = this.el;
		
		var css_w = wnd.css('width');
		var css_h = wnd.css('height');
		
		var w = wnd.width();
		var h = wnd.height();
		
		var ow = wnd.outerWidth(true);
		var oh = wnd.outerHeight(true);
		
		wnd.hide();
		
		var w0 = this.options.initialWidth;
		var h0 = this.options.initialHeight;
		
		wnd.css({
			width: w0, 
			height: h0,
			'margin-left': -w0/2,
			'margin-top': -h0/2
		});
		
		wnd.show();
		
		var self = this;
		
		wnd.animate({'width': w, 'margin-left': -ow/2, 'height': h, 'margin-top': -oh/2}, 300, function(){
			// делаем окно видимым
//			box.css({'visibility': '', 'display': 'block'});
			// вызываем функцию-сигнал о том, что окно отображено
//			if(callback) callback.call(self);
			// обновляем компоновку окна
			self.$layoutChanged();
		});
		
	}
*/


/*	
	this.update = function(callback) {
		
		var box = this.el;
		var wnd = this.window_el;
						
		var w0 = wnd.width();
		var h0 = wnd.height();
		box.css({'visibility': 'hidden'});

		var w = this.options.width || '';
		var h = this.options.height || '';		


		// если указана высота в %, ее еще надо рассчитать
		if ($.isString(w) && w[w.length - 1] == '%') {
			w = this.window_el.parent().width() * parseFloat(w.substr(0, w.length - 1)) / 100;
			wnd.css('width', w);
		}
			
		if ($.isString(h) && h[h.length - 1] == '%') {
			h = this.window_el.parent().height() * parseFloat(h.substr(0, h.length - 1)) / 100;
			wnd.css('height', w);
		}
		
		wnd.css({width: w, height: h});

		w = wnd.outerWidth(true)
		// w = w || box.outerWidth(true);
		// h = h || box.outerHeight(true);
		
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
		
//		console.log(Ergo.format("%s, %s", w0, h0));
		
		var self = this;
		
		wnd.animate({'width': w, 'margin-left': -w/2, 'height': h, 'margin-top': -h/2}, o.delay, function(){
			// делаем окно видимым
			box.css({'visibility': '', 'display': 'block'});
			// вызываем функцию-сигнал о том, что окно отображено
			if(callback) callback.call(self);
			// обновляем компоновку окна
			self.$layoutChanged();
		});
		
		
		box.focus();

	};
*/	
	
	
//	this.window_el = $('<div class="e-window"/>');
	this.overlay_el = $('<div class="e-overlay" autoheight="ignore"/>');
	this.overlay_el.click(function(e){
		
		if(self.options.closeOnOuterClick) self.window.close();
		 
		e.preventDefault(); 
		return false; 
	});
	
	Ergo.smart_override(o, {
		cls: 'e-window',
		initialWidth: 200,
		initialHeight: 200
	});
	
	
	
}, 'window');
