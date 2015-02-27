

/**
 * Отображает виджет как модальное окно
 * 
 * Добавляются методы `open()`, `close()`, `resize()` и компонент `overlay`
 *  
 */
Ergo.defineMixin('Ergo.mixins.Modal', function(o) {
	
	
	this.open = function() {
		
		
		if(arguments.length == 2) {
			// x, y
			var x = arguments[0];
			var y = arguments[1];
			
			this.el.css({'top': y, 'left': x});
		}
		
		// получаем новый индекс z-слоя
		var z = Ergo.context._z || 0;
		z++;
		
		// устанавливаем z-index
		this.overlay.el.css({'z-index': z*1000});
		this.el.css({'z-index': z*1000+1});
		
		$('body').append(this.overlay.el);
		
		this.overlay.el.append(this.el);
		
		this._rendered = true;
		this.overlay._rendered = true;
//		this.overlay.items.add(this);
//		$('body').append(this.el);
		
		this.render();
		
		this.overlay.show();

		this.el.show();
		
		// здесь, в зависимости от методики позиционирования, расчитываются параметры
		
		// center
		var w = this.el.width();
		var h = this.el.height();
		
		h = Math.min(h, $(window).height());
		
		var x = w/2;
		var y = h/2;




		
		this.el.css({'margin-left': -x, 'margin-top': -y});
		
		this.el.hide();
		
//		this.events.fire('open');
		
		var result = this.show().then(function(){
			this.events.fire('opened');
			this._layoutChanged();
		}.bind(this));
		
		this.events.fire('open');
		
		return result;
	};
	
	
	this.close = function() {
		
		Ergo.context._z--;
		
		
//		this.overlay.el.detach();
		this.overlay.hide().then(function(){
			this.overlay.el.detach();
		}.bind(this));
		
		return this.hide().then(function(){
			this.events.fire('closed');
			this.el.detach();
		}.bind(this));
	};
	
	
	this.resize = function(w, h, comp) {
		
		var el = (comp) ? this.component(comp).el : this.el;
		
		var w0 = this.el.width();
		var h0 = this.el.height();
		
		el.css({'width': w, 'height': h});
		
		var w1 = this.el.width();
		var h1 = this.el.height();
		
		el.css({'width': w0, 'height': h0});
		
		el.animate({
			width: w,
			height: h,
			// 'margin-left': -w/2,
			// 'margin-top': -h/2
		});
		
		return $.when(this.el.animate({
			'margin-left': -w1/2,
			'margin-top': -h1/2
		}));
		
	};
	




	o.components = Ergo.smart_override({
		overlay: {
			etype: 'html:div',
			cls: 'overlay',
			autoHeight: 'ignore',
//			render: 'body',
			events: {
				'jquery:click': function(e) {
					
					if(this.parent.options.closeOn == 'outerClick')
						this.parent.close();
					
					// блокируем всплывание событий
					e.preventDefault();
					return false;
				}
			}
		}
	}, o.components);
	
	
	
	o.appearance = Ergo.smart_override({
		
	}, o.appearance);
	
	
	
}, 'mixins:modal');
