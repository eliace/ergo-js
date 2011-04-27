


Dino.declare('Dino.remote.JsonCollection', 'Dino.core.Object', {
	
	initialize: function(name, source, o) {
		Dino.remote.Collection.superclass.initialize.apply(this, arguments);
		this.events = new Dino.events.Dispatcher(this);
		this.name = name;
		this.source = source;
	},
	
	path: function() {
		return (this.source ? this.source.path() + '/' : '') + this.name;
	},
	
	object: function(attrs) {
		return new Dino.remote.Object(this, attrs);
	},

	method: function(method, callback) {
		$.post(this.path() + '?method='+method, callback, 'json');		
	},

	load: function(query, params) {
		var args = [].concat(arguments).slice(2);
		var target = new Dino.deferred(args);
		$.getJSON(this.path(), Dino.merge({'query': query}, params), function(json){target.ready(json);})
		return target;
	},
	
	load_all: function() {
		var target = new Dino.deferred(arguments);		
		$.getJSON(this.path(), {'query': 'all'}, function(json){ target.ready(json); });
		return target;
	}
	
});
