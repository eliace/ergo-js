


Dino.declare('Dino.core.Collection', 'Dino.core.Object', {
	
	initialize: function(src, options) {
		this.src = src || {};
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
	},
	
	remove: function(item) {
		this.remove_at(this.index_of(item));
	},

	remove_at: function(i) {
		delete this.src[i];
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
		Dino.index_of(item);
	}
	
});



Dino.declare('Dino.core.ArrayCollection', 'Dino.core.Collection', {
	
	initialize: function(src, options) {
		this.src = src || [];
	},	
	
	add: function(item, i) {
		if(arguments.length == 1)
			this.src.push(item);
		else
			this.src.splice(i, 0, item);
	},
	
	remove_at: function(i) {
		this.src.splice(i, 1);		
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







