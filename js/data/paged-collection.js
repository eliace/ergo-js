


Ergo.declare('Ergo.data.PagedCollection', 'Ergo.data.Collection', {
	
	defaults: {
		pageSize: 30,
		totalCount: 0,
		index: 0
	},
	
	
	
	set index(v) {
		this.options.query.from = (v-1)*this.options.pageSize;
		this.options.query.to = v*this.options.pageSize;
	},
	
	
	get count() {
		return Math.ceil(this.options.totalCount / this.options.pageSize);
	},
	
	
	_parse: function(v) {
		this.options.totalCount = v.total;
		this.options.from = v.from;
		this.options.to = v.to;
		
		return v.data;
	}
	
	
	
/*	
	fetch: function() {

		this.events.fire('fetch');
		
		var o = this.options;
		
		if(o.provider) {
			var self = this;
			return o.provider.get(this, Ergo.deep_override({}, this.options.query, {from: o.from,	to: o.to}))
				.then(function(response) {
				
				o.from = response.from;
				o.to = response.to;
				o.totalCount = response.total;
				
				self.set(response.data); 
				self._fetched = true;
				
				self.events.fire('fetched');
			});
		}
		else {
			this._fetched = true;			
			this.events.fire('fetched');
		}
		
	}
*/	
	
	
});
