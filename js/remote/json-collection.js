
//= require "json-object"


Ergo.declare('Ergo.remote.JsonCollection', 'Ergo.core.Object', {
	
	initialize: function(name, source, o) {
		Ergo.remote.JsonCollection.superclass.initialize.apply(this, arguments);
		this.events = new Ergo.events.Dispatcher(this);
		this.name = name;
		this.source = source;
	},
	
	path: function() {
		return (this.source ? this.source.path() + '/' : '') + this.name;
	},
	
	object: function(attrs) {
		return new Ergo.remote.JsonObject(this, attrs);
	},

	invoke: function(method, args, callback) {
		$.post(this.path() + '?method='+method, args, callback, 'json');		
	},

	load: function(query, params) {
		var args = [].concat(arguments).slice(2);
		var target = new Ergo.DeferredResult(args);
		$.getJSON(this.path(), Ergo.merge({'query': query}, params), function(json){target.ready(json);})
		return target;
	},
	
	load_all: function() {
		var target = new Ergo.DeferredResult(arguments);		
		$.getJSON(this.path(), {'query': 'all'}, function(json){ target.ready(json); });
		return target;
	}
	
});
