

Ergo.alias('includes:popup', {

	defaults: {
		cls: 'popup',
		popup: {
			to: null, 
			at: 'left top', 
			my: 'left top', 
			offset: [0, 0],
			closeOn: 'outerClick',
			exclusive: true,
			boundary: 'auto'			
		},
		states: {
			'dropup-auto:auto': 'dropup-auto',
			'dropdown-auto:auto': 'dropdown-auto',
			'no-auto:auto': ''
		},
		events: {
			'jquery:mouseleave': function(e){ 
				if(this.options.popup.closeOn == 'mouseleave') this.close(); 
			}
		},
		autoHeight: 'ignore' // игнорировать высоту контекстного меню при автоматическом расчете высоты
	},



	overrides: {

		open: function(position) {
			
			var popups = Ergo.context._popups;
			
			// в эксклюзивном режиме закрываем другие всплывающие виджеты
			if(!popups.is_empty() && this.options.popup.exclusive) {
				popups.apply_all('close');
				popups.remove_all();
			}
			
			
			
			var self = this;

			var x = 0;
			var y = 0;
			
			if(arguments.length == 2) {
				x = arguments[0];
				y = arguments[1];
				position = {};//offset: [arguments[0], arguments[1]]};
			}
			
			var p = Ergo.smart_override({}, this.options.popup, position);
			
			// позиционируем виджет

			// определяем координаты относительно точки "at"
			x += p.offset[0];
			y += p.offset[1];
			
			
			// получаем целевой элемент, относительно которого отображаем элемент
			var to_el = null;
			
			// определяем элемент, к которому будет привязан popup		
			if(p.to) {
				to_el = $(p.to);			
			} 
			else if(this.parent) { 
				to_el = this.parent.el;
			}
			
			
			
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
				
			// var my = p.my.split(' ');

			// if(my[0] == 'right') x -= this.el.outerWidth(false);
			// else if(my[0] == 'center') x -= this.el.outerWidth(false)/2;

			// if(my[1] == 'bottom') y -= this.el.outerHeight(false);
			// else if(my[1] == 'center') y -= this.el.outerHeight(false)/2;


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
				
				this.el.css({'left': x, 'top': y});
			}
			else if(p.behaviour == 'global') {
				
				var offset = to_el.offset();
				x += offset.left;
				y += offset.top;
				
			}
			
			


			if(p.behaviour != 'none') {
				
//				this.el.css({'left': x, 'top': y});
							
			}
			
			
			
			if(p.boundary == 'auto' && to_el) {
				// изменяем положение виджета в зависимости от расстояния до границы
				var offset = to_el.offset();
				var max_x = $(window).width(); 
				var max_y = $(window).height();
				var scroll_top = 0;
				
				this.el.parents().each(function(i, elem) {
					scroll_top += $(elem).scrollTop();
				});
				
				if(offset.left + this.el.width() > max_x)
					this.states.set('pull-left-auto');
				else
					this.states.unset('pull-left-auto');
				
				if(offset.top + to_el.height() + this.el.outerHeight(true) - scroll_top > max_y)
					this.states.set('dropup-auto');
				else if(this.states.is('dropup') && (offset.top - this.el.outerHeight(true) - scroll_top < 0))
					this.states.set('dropdown-auto');
				else
					this.states.set('no-auto');
				
				 
			}
			
			
			
			// настраиваем размер виджета
			
			
			// определяем параметры закрытия
			
			$('html').one('click', function(e) {
				if(this.options.popup.closeOn == 'outerClick') this.close();
			}.bind(this));
			
			
			
			
			// добавляем текущий объект в список всплывших окон
			popups.add(this);
			
			
			return this.show().then(function(){
				self.events.fire('opened');
			});
		},
		
		
		close: function() {
			var self = this;
			var popups = Ergo.context._popups;
			
			var k = popups.key_of(this);
			if( k > -1 ) {//Ergo.context._popup == this) {
				
				if(this != popups.last()) popups.get(k+1).close();  //TODO возможно, будет лучше, если закрытия будут связаны в цепочку
				
				Ergo.context._popups.remove(this);
				
				return this.hide().then(function(){
					self.events.fire('closed');
				});			
			}
			
		}


	},



	_construct: function() {

		if(!Ergo.context._popups)
			Ergo.context._popups = new Ergo.core.Array();

	}



});