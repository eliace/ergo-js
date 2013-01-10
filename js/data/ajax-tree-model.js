
//= require "tree-model"


Ergo.defineClass('Ergo.data.tree.AjaxNodeList', 'Ergo.data.tree.NodeList', {
	
	defaults: {
		ajax: {
			dataType: 'json'
		}
	},
	
	model: 'Ergo.data.tree.AjaxNode',
	
	
  // initialize: function(o) {
		// this.$super([], o);
// 
    // this._fetched = false;
  // },
	
	
	fetch: function(id) {
		
//		if(!id) id = 0;

		var url = this.opt('url');
		
		var query = Ergo.override({}, this.options.query);
		if(id) Ergo.override(query, {id: id})
		
		var o = Ergo.override({
			type: 'GET',
			data: query
		}, this.options.ajax);
		
		var self = this;
		
		var e = new Ergo.events.Event({ajaxUrl: url, ajaxOptions: o});
		this.events.fire('beforeFetch', e);
//		if(id != null) url += '/' + id;
		
		return $.ajax(e.ajaxUrl, e.ajaxOptions)
			.success(function(data){
				self._fetched = true;
				self.set(data);
			});
				
	},
	
	
	getUrl: function() {
		var url = this.options.url;
		if(!url && this.source instanceof Ergo.core.Object)
			url = this.source.opt('url');
		return url;
	}
	
	
});





Ergo.defineClass('Ergo.data.tree.AjaxNode', 'Ergo.data.tree.Node', {
	
	fields: {
		'children': 'Ergo.data.tree.AjaxNodeList'
	},
	
	
	fetch: function() {
		
		return this.entry('children').fetch( this.get('id') );
		
	},
	
	
	getUrl: function() {
		var url = this.options.url;
		if(!url && this.source instanceof Ergo.core.Object)
			url = this.source.opt('url');
		return url;
	}
	
});
