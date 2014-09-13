

Ergo.defineMixin('Ergo.mixins.Window', function(o) {
	
	
	this.open = function() {
		
		// получаем новый индекс z-слоя
		var z = Ergo.context._z || 0;
		z++;
		
		// устанавливаем z-index
		this.el.css({'z-index': z*1000});
		
		$('body').append(this.el);
		
		this.el.show();
		
	};
	
	
	this.close = function() {
		
	};
	
	
	this.resize = function(w, h) {
		
	};
	
/*	
	o.components = Ergo.smart_override({
		overlay: {
			etype: 'html:div',
			cls: 'overlay',
			autoHeight: 'ignore',
			events: {
				'jquery:click': function(e, w) {
					
					if(this.parent.options.closeOn == 'outerClick')
						this.parent.close();
					
					// блокируем всплывание событий
					e.preventDefault();
					return false;
				}
			}
		}
	}, o.components);
*/	
	
//	o
	
	
	o.appearance = Ergo.smart_override({
		
	}, o.appearance);
	
	
	
}, 'mixins:window');
