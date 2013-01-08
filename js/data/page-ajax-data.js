


Ergo.declare('Ergo.data.PageAjaxData', 'Ergo.data.AjaxCollection', {
	
	defaults: {
		pageSize: 1,
		totalCount: 1
	},
	
	
	getFrom: function() {
		return this.options.query.from;
	},
	
	setFrom: function(v) {
		this.options.query.from = this.options.from = v;
	},


	getTo: function() {
		return this.options.query.to;
	},
	
	setTo: function(v) {
		this.options.query.to = this.options.to = v;
	},
	
	getPageCount: function() {
		return Math.ceil(this.options.totalCount / this.options.pageSize);
	}
	
	
});
