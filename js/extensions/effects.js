


Dino.Effects = function(o) {
	
	this.show = function() {
		if(this.children.size() == 0) return;

		var effects = this.options.effects;
		var deferred = $.Deferred();
		
		this.el[effects.show](effects.delay, function(){ deferred.resolve(); });
		return deferred;
	};
	
	
	this.hide = function() {
		if(this.children.size() == 0) return;

		var effects = this.options.effects;
		var deferred = $.Deferred();
		
		this.el[effects.hide](effects.delay, function(){ deferred.resolve(); });
		return deferred;		
	};
	
	
	o.effects = Dino.smart_override({
		show: 'show',
		hide: 'hide',
		delay: 0
	}, o.effects);
	
	
};
