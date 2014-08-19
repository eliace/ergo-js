


Ergo.defineMixin('Ergo.mixins.Effects', function(o) {
	
	this.show = function() {
		
		var effect = false;
		
		if( !this.children.is_empty() ) {

			var o = this.options.effects;
			
			if(o.initial) {
				o = Ergo.override({}, o, o.initial);
				delete this.options.effects.initial;
			}
			
			var el = this._wrapper || this.el;
			
			// FIXME экспериментальный код
			if( !el.is(':visible'))
				effect = el[o.show](o.delay);
		}

		return $.when( effect );
	};
	
	
	this.hide = function() {
		
		var effect = false;
		
		if( !this.children.is_empty() ) {

			var o = this.options.effects;
	
			if(o.initial) {
				o = Ergo.override({}, o, o.initial);
				delete this.options.effects.initial;
			}
			
			var el = this._wrapper || this.el;
		
			if( el.is(':visible'))
				effect = el[o.hide](o.delay);
		}

		return $.when( effect );
	};
	
	
	o.effects = Ergo.smart_override({
		show: 'show',
		hide: 'hide',
		delay: 0
	}, o.effects);
	
	
	
}, 'mixins:effects');
