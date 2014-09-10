

Ergo.defineMixin('Ergo.widgets.Popup', function(o){
	
	
	
	this.open = function(position) {
		
		
		if(Ergo.context._popup) {
			Ergo.context._popup.close();
		}
		
		
		
		var self = this;
		
		if(arguments.length == 2) {
			position = {offset: [arguments[0], arguments[1]]};
		}
		
		var p = Ergo.smart_override({}, this.options.popup, position);
		
		// позиционируем виджет
		
		// получаем целевой элемент, относительно которого отображаем элемент
		var to_el = null;
		
		// определяем элемент, к которому будет привязан popup		
		if(p.to) 
			to_el = $(p.to);
		else if(this.parent) 
			to_el = this.parent.el;
		
		
		
		// определяем координаты относительно точки "at"
		var x = p.offset[0];
		var y = p.offset[1];
		
		
		// определяем смещение из привязки к элементу "to"
		
		if(to_el) {
			
			var at = p.at.split(' ');
		
			if(at[0] == 'right') x += to_el.outerWidth(false);
			else if(at[0] == 'center') x += to_el.outerWidth(false)/2;
	
			if(at[1] == 'bottom') y += to_el.outerHeight(false);
			else if(at[1] == 'center') y += to_el.outerHeight(false)/2;
			
			if(p.adjust)
//				this.el.width(to_el.outerWidth(false));
				this.el.css('min-width', to_el.outerWidth(false));
			
		}	


		// определяем смещение из привязки точки popup
			
		var my = p.my.split(' ');

		if(my[0] == 'right') x -= this.el.outerWidth(false);
		else if(my[0] == 'center') x -= this.el.outerWidth(false)/2;

		if(my[1] == 'bottom') y -= this.el.outerHeight(false);
		else if(my[1] == 'center') y -= this.el.outerHeight(false)/2;


		// if(to_el) {
			// // смещение целевого элемента
			// var offset = to_el.offset();
// 		
			// x += offset.left;
			// y += offset.top;
		// }
		
		
		
		if(p.behaviour == 'contextmenu') {
			
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
				x -= dw;//pop_w;
			}
			
		}
		
		
		
		
		// настраиваем размер виджета
		
		
		// определяем параметры закрытия
		
		$('html').one('click', function(e) {
			self.close();
		});
		
		
		
		this.el.css({'left': x, 'top': y});
		
		Ergo.context._popup = this;
		
		return this.show().then(function(){
			self.events.fire('opened');
		});
	};
	
	
	this.close = function() {
		var self = this;
		
		if(Ergo.context._popup == this) {
			delete Ergo.context._popup;
			return this.hide().then(function(){
				self.events.fire('closed');
			});			
		}
		
	};
	
	
	
	
	Ergo.smart_override(o, {
		events: {
			'jquery:mouseleave': function(e, w){ 
				if(w.options.closeOn == 'mouseleave') w.close(); 
			}
		},
		autoHeight: 'ignore' // игнорировать высоту контекстного меню при автоматическом расчете высоты
	});
	
	
	o.popup = Ergo.smart_override({
		to: null, 
		at: 'left top', 
		my: 'left top', 
		offset: [0, 0]
	}, o.popup);
	
	
}, 'mixins:popup');
