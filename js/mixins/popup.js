
//= require <core/object>


Ergo.declare_mixin('Ergo.mixins.Popup', function(o) {
	
	this.open = function(position) {
		
		var self = this;
		
		
		var z = ++Ergo.globals.topZ;
		
//		if(arguments.length == 0) return;
		
		if(arguments.length == 2) {
			position = {offset: [arguments[0], arguments[1]]}
		}
		
//		var c = this.container;
		
		// определяем параметры позиционирования
		var p = Ergo.smart_override({}, this.options.position, position);
		
		// определяем координаты относительно точки "at"
		var x = p.offset[0];
		var y = p.offset[1];

		// получаем целевой элемент, относительно которого отображаем элемент
		var to_el = null;
		
		// определяем элемент, к которому удет привязан popup
		
		if(p.to) 
			to_el = $(p.to);
		else if(this.parent) 
			to_el = this.parent.el;

		
		// определяем смещение из привязки к элементу "to"
		
		if(to_el) {
			
			var at = p.at.split(' ');
		
			if(at[0] == 'right') x += to_el.outerWidth(false);
			else if(at[0] == 'center') x += to_el.outerWidth(false)/2;
	
			if(at[1] == 'bottom') y += to_el.outerHeight(false);
			else if(at[1] == 'center') y += to_el.outerHeight(false)/2;
			
			if(this.options.adjustWidth)
				this.el.width(to_el.outerWidth(false));
			
		}	
			
		
		// определяем смещение из привязки точки popup
			
		var my = p.my.split(' ');

		if(my[0] == 'right') x -= this.el.outerWidth(false);
		else if(my[0] == 'center') x -= this.el.outerWidth(false)/2;

		if(my[1] == 'bottom') y -= this.el.outerHeight(false);
		else if(my[1] == 'center') y -= this.el.outerHeight(false)/2;
		
		
		
		if(p.global) {
			
			if(to_el) {
				// смещение целевого элемента
				var offset = to_el.offset();
			
				x += offset.left;
				y += offset.top;
			}
			
			this.el.css('position', 'absolute');
			
			$('body').append(this.el);
		}
		
		
		
		// var view_w = this.el.parent().outerWidth();
		// var view_h = this.el.parent().outerHeight();
// 		
		// var dw = view_w - (dd.el.outerWidth() + x);
		// var dh = view_h - (dd.el.outerHeight() + y);
// 		
		// if(dw < 0)	x -= this.el.outerWidth();
		// if(dh < 0)	y -= this.el.outerWidth();
		
		
		
		// позиционирование popup-элемента
		
		
		
		
		
		if(p.boundary == 'push') {
			
			var max_w = $(document).scrollLeft() + $(window).width();
			var max_h = $(document).scrollTop() + $(window).height();
			var pop_h = this.el.outerHeight(true);
			var pop_w = this.el.outerWidth(true);
			
			var dh = (y + pop_h) - max_h;
			if(dh > 0) {
				y -= dh;
			}

			var dw = (x + pop_w) - max_w;
			if(dw > 0) {
				x -= dw;
			}
			
		}
		else if(p.boundary == 'squeeze') {
			
			this.el.height('auto');
			
			var max_w = $(document).scrollLeft() + $(window).width();
			var max_h = $(document).scrollTop() + $(window).height();
			var pop_h = this.el.outerHeight(true);
			var pop_w = this.el.outerWidth(true);
			
			var dh = (y + pop_h) - max_h;
			if(dh > 0) {
				this.el.height(pop_h - dh);
				this.el.css({'overflow-y': 'auto'});
			}
			
		}
		else if(p.boundary == 'context') {
			
			var max_w = $(document).scrollLeft() + $(window).width();
			var max_h = $(document).scrollTop() + $(window).height();
			var pop_h = this.el.outerHeight(true);
			var pop_w = this.el.outerWidth(true);
			
			var dh = (y + pop_h) - max_h;
			if(dh > 0) {
				y -= pop_h;
			}

			var dw = (x + pop_w) - max_w;
			if(dw > 0) {
				x -= pop_w;
			}
			
		}
		


		this.el.css({'left': x, 'top': y});
		
		
		this.el.css('z-index', 100000 + z*1000+1);
/*		
		// Усечение размера выпадающего элемента
		
		this.el.height('auto');
		
		var max_h = $(document).scrollTop() + $(window).height();
		var pop_h = this.el.height();
		var dh = (y + pop_h) - max_h;
		
		if(dh > 0) {
			this.el.height(pop_h - dh);
			this.el.css({'overflow-y': 'auto'});
		}
		
*/		

		
		
		this.isShown = true;

		if (!this.options.hideOn || this.options.hideOn == 'outerClick') {
			// добавляем прозрачную панель в документ
			this.glass_pane.css('z-index', 100000 + z*1000);
			
			$('body').append(this.glass_pane);
		}
		else if(this.options.hideOn == 'windowClick') {
			
			$(window)
				.one('click', function(e){ self.close(); })
				.one('contextmenu', function(e){ self.close(); });
			
		}
		
		
		return this.show().then(function(){
			self.events.fire('opened');
		});

	};
	
	
	this.close = function() {
		
		if(this.isShown)
			Ergo.globals.topZ--;
		
		this.isShown = false;
		
		
		this.glass_pane.detach();		
		
		return this.hide();
	};
	
	
	
	
	
	var self = this;


	this.glass_pane = Ergo.glass_pane()
		.on('click', function(e){
			self.close();
			e.stopPropagation();
		});
	
	
	
	Ergo.smart_override(o, {
		events: {
			'mouseleave': function(e, w){ 
				if(w.options.hideOn == 'hoverOut') w.close(); 
			}
			// 'click': function(e){ 
				 // e.stopPropagation();
				 // e.preventDefault();
			// }
		},
		autoHeight: 'ignore' // игнорировать высоту контекстного меню при автоматическом расчете высоты
	})
	
	o.position = Ergo.smart_override({
		to: null, 
		at: 'left top', 
		my: 'left top', 
		offset: [0, 0],
		global: false,
		boundary: 'squeeze'
	}, o.position);
	
	
}, 'popup');
