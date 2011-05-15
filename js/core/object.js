
//= require "utils"

Dino.core = {};

Dino.core.Object = function() {
	this.initialize.apply(this, arguments);
};

Dino.core.Object.extend = function(o) {
	return Dino.extend(this, o);
};


Dino.override(Dino.core.Object.prototype, {
	
	defaults: {
	},
	
	initialize: function(opts) {
		
		var o = {};
		
		if(!this.constructor.NO_REBUILD_SKELETON) {
			var prevDefaults = null;
			Dino.hierarchy(this.constructor, function(clazz){
				if(clazz.defaults == prevDefaults) return;
				if('defaults' in clazz) Dino.smart_override(o, clazz.defaults);
				prevDefaults = clazz.defaults; 
			});
			this.constructor.NO_REBUILD_SKELETON = true;
			this.constructor.prototype.defaults = Dino.deep_copy(o);			
		}
		else {
			o = Dino.deep_copy(this.defaults);
		}
		
		this.options = Dino.smart_override(o, opts);
		
		
		if('extensions' in o) {
			for(i in o.extensions) {
				var ext = o.extensions[i];
				if(Dino.isFunction(ext)) ext.call(this, o);
				else if(Dino.isPlainObject(ext)) Dino.deep_override(this, ext);
			}
		}		
		
	}
	
	
});


