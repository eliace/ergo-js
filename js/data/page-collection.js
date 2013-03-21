


Ergo.declare('Ergo.data.PageCollection', 'Ergo.data.Collection', {
	
	defaults: {
		pageSize: 1,
		totalCount: 1
	},
	
	

	
	getPageCount: function() {
		return Math.ceil(this.options.totalCount / this.options.pageSize);
	},
	
	
	
	fetch: function() {
		
		var o = this.options;
		
		if(o.provider) {
			var self = this;
			return o.provider.get.apply(o.provider, [{
				from: o.from, 
				to: o.to
			}]).then(function(response) {
				
				o.from = response.from;
				o.to = response.to;
				o.totalCount = response.total;
				 
				self.set(response.data); 
				self._fetched = true;
				
				self.events.fire('fetch');
			});
		}
		else {
			this._fetched = true;			
			this.events.fire('fetch');
		}
		
	}
	
	
	
});
