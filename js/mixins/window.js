
/*
Ergo.defineMixin('Ergo.mixins.Window', function(o) {
	
	
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
		this.el.css({'z-index': z*1000});
		
		$('body').append(this.el); // FIXME заменить на render
		
		this.el.show();
		
	};
	
	
	this.close = function() {
		
		// уменьшаем индекс слоя
		Ergo.context._z--;
		
		this.el.hide();

		this.el.detach(); // FIXME заменить на unrender
		
		if(this.options._destroyOnClose)	this._destroy();
		
	};
	
	
	this.resize = function(w, h) {
		
	};
	
	
	
	this.move = function(x, y) {
		
		this.el.offset({
			left: x,
			top: y
		});

		// this.el.css({
		// 	left: x,
		// 	top: y
		// });
		
	};
	
	
	
//	o
	
	
	o.appearance = Ergo.smart_override({
		
	}, o.appearance);
	
	
	
}, 'mixins:window');

*/


Ergo.alias('includes:window', {

	overrides: {

		open: function() {
			
			
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
			this.el.css({'z-index': z*1000});
			
			$('body').append(this.el); // FIXME заменить на render
			
			this.el.show();
			
		},
		
		
		close: function() {
			
			// уменьшаем индекс слоя
			Ergo.context._z--;
			
			this.el.hide();

			this.el.detach(); // FIXME заменить на unrender
			
			if(this.options._destroyOnClose)	this._destroy();
			
		},
		
		
		resize: function(w, h) {
			
		},
		
		
		
		move: function(x, y) {
			
			this.el.offset({
				left: x,
				top: y
			});

			// this.el.css({
			// 	left: x,
			// 	top: y
			// });
			
		}

	}


});