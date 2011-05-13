
//= require "events"


Dino.declare('Dino.core.Collection', 'Dino.core.Object', {
	
	initialize: function(src, options) {
		this.src = src || {};
		Dino.Observable.call(this);
	},
	
	set: function(item, i) {
		this.src[i] = item;
	},
	
	unset: function(i) {
		delete this.src[i];
	},
	
	get: function(i) {
		return this.src[i];
	},
	
	add: function(item, i) {
		this.src[i] = item;
		this.events.fire('item:add', {'item': item});
	},
	
	remove: function(item) {
		this.remove_at(this.index_of(item));
	},

	remove_at: function(i) {
		var item = this.src[i];
		delete this.src[i];
		this.events.fire('item:remove', {'item': item});
	},
	
	remove_if: function(criteria) {
		var keys = Dino.filter_keys(this.src, criteria);
		keys.sort().reverse();
		for(var i = 0; i < keys.length; i++) this.remove_at(keys[i]);
	},
	
	clear: function() {
		this.src = {};
	},
	
	each: function(callback, delegate) {
		Dino.each(this.src, callback, delegate);
	},
	
//	ensure: function(i) {
//		
//	},
	
	find: function(criteria) {
		return Dino.find(this.src, criteria);
	},
	
	find_all: function(criteria) {
		return Dino.filter(this.src, callback);
	},
	
	filter: function(callback) {
		return Dino.filter(this.src, callback);
	},

	map: function(callback) {
		return Dino.map(this.src, callback);		
	},
	
	include: function(item) {
		return Dino.include(this.src, callback);
	},
	
	length: function() {
		var n = 0;
		for(var i in this.src) n++;
		return n;
	},
	
	is_empty: function() {
		return this.length() == 0;
	},
	
	index_of: function(item) {
		return Dino.index_of(this.src, item);
	}
	
});



Dino.declare('Dino.core.Array', 'Dino.core.Collection', {
	
	initialize: function(src, options) {
		this.src = src || [];
		Dino.Observable.call(this);
//		this.events = new Dino.events.Dispatcher();
	},	
	
	add: function(item, i) {
		if(arguments.length == 1)
			this.src.push(item);
		else
			this.src.splice(i, 0, item);
		this.events.fire('item:add', {'item': item});
	},
	
	remove_at: function(i) {
		var item = this.src[i]
		this.src.splice(i, 1);		
		this.events.fire('item:remove', {'item': item});
	},
	
	length: function() {
		return this.src.length;
	},
	
	clear: function() {
		this.src = [];
	},
	
	first: function() {
		return this.src[0];
	},
	
	last: function() {
		return this.src[this.length-1];
	}
	
	
});







