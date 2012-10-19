
//= require <core/object>


Ergo.globals.topZ = 1;


Ergo.declare_mixin('Ergo.mixins.Window', function(o) {
	
	
	var self = this;
	
	this.window = {
		
		open: function() {
	
			var wnd = self.el;
			var overlay = self.overlay_el;
	
			var z = Ergo.globals.topZ++;
			overlay.css({'z-index': z*1000, 'display': 'none'});
			wnd.css({'z-index': z*1000+1, 'display': 'none'});
		
			$('body').append(overlay);
			$('body').append(wnd);
	//		this.window_el.append(this.el);
			
			
			var wnd_eff = o.effects || {show: 'show', hide: 'hide', delay: 0};
			var overlay_eff = wnd_eff.overlay || {show: 'show', hide: 'hide', delay: 0};
			
			
	//		this.reset();
			overlay[overlay_eff.show](overlay_eff.delay);
//			wnd.show();
			this.update();//function(){});
			
			return $.when( wnd[wnd_eff.show](wnd_eff.delay) ).done(function(){
				self.events.fire('open');
				self.$layoutChanged();
			});
			
			
		},
		
		close: function() {

			var wnd = self.el;
			var overlay = self.overlay_el;
	
			var wnd_eff = o.effects || {show: 'show', hide: 'hide', delay: 0};
			var overlay_eff = wnd_eff.overlay || {show: 'show', hide: 'hide', delay: 0};	
	
			Ergo.globals.topZ--;
			
			$.when( overlay[overlay_eff.hide](overlay_eff.delay) ).done(function(){
				overlay.detach();				
			});
			$.when( wnd[wnd_eff.hide](wnd_eff.delay) ).done(function(){
				if(self.options.destroyOnClose)	self.destroy();				
			});
			
			
			
	//		this.el.detach();
	
//			this.events.fire('onClose');
			self.events.fire('close');
		},
		
		
		update: function(callback) {
			
			var wnd = self.el;
			
//			var css_w = wnd.css('width');
//			var css_h = wnd.css('height');
			
			var w = wnd.width();
			var h = wnd.height();
			
/*			
			var max_w = self.options.maxWidth || w;
			var max_h = self.options.maxHeight || h;
			
			// если указана высота в %, ее еще надо рассчитать
			if ($.isString(max_w) && max_w[max_w.length - 1] == '%') {
				max_w = wnd.parent().width() * parseFloat(max_w.substr(0, max_w.length - 1)) / 100;
			}
				
			if ($.isString(max_h) && max_h[max_h.length - 1] == '%') {
				max_h = wnd.parent().height() * parseFloat(max_h.substr(0, max_h.length - 1)) / 100;
			}
			
			
			if(w > max_w) w = max_w;//wnd.width(max_w);
			if(h > max_h) h = max_h;//wnd.height(max_h);
			
			wnd.width(w);
			wnd.height(h);
*/
			
			var ow = wnd.outerWidth(false);
			var oh = wnd.outerHeight(false);
			
			
			wnd.css({
				'margin-left': -ow/2,
				'margin-top': -oh/2
			});





/*			
			var wnd_eff = o.effects || {show: 'show', hide: 'hide', delay: 0};
			
			$.when( wnd[wnd_eff.show](wnd_eff.delay) ).done(function(){
			});

			if(callback) callback.call(self);
*/
			
//			self.events.fire('open');
			
			
			
/*			
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
				if(callback) callback.call(self);
				// обновляем компоновку окна
				self.$layoutChanged();
			});

*/
			
		},
		
		
/*		
		resizeContent: function(width, height) {
			
			var wnd = self.el;
			var content = self.content.el;
			
			// сохраняем теущие размеры окна
			var w = wnd.width();
			var h = wnd.height();
			
			// с помощью css сбрасываем размеры, чтобы окно изменило размер по содержимому
			wnd.css({'width': 'auto', 'height': 'auto'});
			
			
			var w2 = content.css('width');
			var h2 = content.css('height');
			
			content.css({'width': width, 'height': height});
			
//			var w2 = width;
//			var h2 = height;
			
			var ow = wnd.outerWidth();
			var oh = wnd.outerHeight();


			content.css({'width': w2, 'height': h2});

			// восстанавливаем метрики окна
			wnd.width(w);
			wnd.height(h);
			
			
						
//			ow += w2 - w;
//			oh += h2 - h;
			
			return $.when( content.animate({'width': w2, 'margin-left': -ow/2, 'height': h2, 'margin-top': -oh/2}, 300) );
		},
*/		
		
		
		resizeContent: function(width, height) {

			var wnd = self.el;
			
//			self.content.el.css('display', '');

			var dw = wnd.width() - self.content.el.width();
			var dh = wnd.height() - self.content.el.height();

//			self.content.el.css('display', 'none');
			
			return (arguments.length == 0) ? this.resize() : this.resize(width+dw, height+dh);
		},
		
		
		
		resize: function(width, height) {
			
			var wnd = self.el;
			
			// сохраняем теущие размеры окна
			var w = wnd.width();
			var h = wnd.height();

			var w2 = width;
			var h2 = height;
			
			if(arguments.length == 0) {
				wnd.css({'width': self.options.maxWidth || '', 'height': self.options.maxHeight || ''});

				w2 = wnd.width();
				h2 = wnd.height();				
			}
			
			// с помощью css сбрасываем размеры, чтобы окно изменило размер по содержимому
//			wnd.css({'width': self.options.maxWidth || 'auto', 'height': self.options.maxHeight || 'auto'});
			
			// восстанавливаем метрики окна
			wnd.width(w);
			wnd.height(h);
			
			var ow = wnd.outerWidth(false);
			var oh = wnd.outerHeight(false);
			
			
			
			ow += w2 - w;
			oh += h2 - h;
			
			return $.when( wnd.animate({'width': w2, 'margin-left': -ow/2, 'height': h2, 'margin-top': -oh/2}, 300, function(){
				// делаем окно видимым
	//			box.css({'visibility': '', 'display': 'block'});
				// вызываем функцию-сигнал о том, что окно отображено
//				if(callback) callback.call(self);
				// обновляем компоновку окна
//				self.$layoutChanged();
//				self.events.fire('resize');
			}) );
			
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
