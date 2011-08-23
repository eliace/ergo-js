
//= require "../core/events"
//= require "deferred-result"



Ergo.declare('Ergo.remote.JsonObject', 'Ergo.core.Object', {
	
	initialize: function(collection, attrs) {
		Ergo.remote.JsonObject.superclass.initialize.apply(this, arguments);
		this.events = new Ergo.events.Dispatcher(this);
		this.attributes = attrs;
		this.source = collection;
	},
	
	save: function(val, callback) {
		return ('id' in val) ? this.update(val, callback) : this.create(val, callback);
	},
	
	create: function(val) {
		var fields = {};
		
		if(this.attributes)
			Ergo.each(this.attributes, function(name){ fields[name] = val[name]; });
		else
			fields = val;

		var target = new Ergo.DeferredResult();
		$.post(this.path(), {_method: 'put', _serialized: $.toJSON(fields)}, function(json){target.ready(json);}, 'json');		
		return target;
	},

	update: function(val) {
		var fields = {};
		
		if(this.attributes) 
			Ergo.each(this.attributes, function(name){ fields[name] = val[name]; });
		else
			fields = val;

		var target = new Ergo.DeferredResult();
		$.post(this.path() + '/' + val.id, {_serialized: $.toJSON(fields)}, function(json){target.ready(json);}, 'json');
		return target;
	},
	
	remove: function(arg, callback) {
		var id = $.isPlainObject(arg) ? id = arg.id : arg;
		var target = new Ergo.DeferredResult();
		$.post(this.path() + '/' + id, {_method: 'delete'}, function(json){target.ready(json);}, 'json');
		return target;
	},
	
	path: function() {
		return (this.source) ? this.source.path() : '';
	},
	
	method: function(method, callback) {
		$.post(this.path() + '?method='+method, callback, 'json');		
	},
	
	load: function(id, params) {
		var args = [].concat(arguments).slice(2);
		var target = new Ergo.DeferredResult(args);
		$.getJSON(this.path()+'/'+id, function(json){target.ready(json);})
		return target;		
	}
	
});
