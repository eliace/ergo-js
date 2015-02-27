


Ergo.declare_mixin('Ergo.mixins.Effects', function(o) {
	
	this.show = function() {
		if(this.children.is_empty()) return $.Deferred().resolve();
		
		var effects = this.options.effects;
//		var deferred = $.Deferred();
		
		if(effects.initial) {
			effects = Ergo.override({}, effects, effects.initial);
			delete this.options.effects.initial;
		}
		
//		this.el[effects.show](effects.delay, function(){ deferred.resolve(); });
//		return deferred;
		var el = this._wrapper || this.el;
		
		// FIXME экспериментальный код
		if(el.is(':visible')) el.hide();

		return $.when( el[effects.show](effects.delay) );
	};
	
	
	this.hide = function() {
		if(this.children.is_empty()) return $.Deferred().resolve();

		var effects = this.options.effects;

//		var deferred = $.Deferred();

		if(effects.initial) {
			effects = Ergo.override({}, effects, effects.initial);
			delete this.options.effects.initial;
		}
		
		// this.el[effects.hide](effects.delay, function(){ deferred.resolve(); });
		// return deferred;		

		var el = this._wrapper || this.el;

		return $.when( el[effects.hide](effects.delay) );
	};
	
	
	o.effects = Ergo.smart_override({
		show: 'show',
		hide: 'hide',
		delay: 0
	}, o.effects);
		
}, 'effects');
