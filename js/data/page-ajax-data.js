


Ergo.declare('Ergo.data.PageAjaxCollection', 'Ergo.data.AjaxCollection', {
	
	defaults: {
		pageSize: 1,
		totalCount: 1
	},
	
	
	setFrom: function(v) {
		this.options.query.from = this.options.from = v;
	},
	
	setTo: function(v) {
		this.options.query.to = this.options.to = v;
	},
	
	getPageCount: function() {
		return Math.ceil(this.options.totalCount / this.options.pageSize);
	}
	
	
});
