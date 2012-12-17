
//= require <data/ajax-collection>
//= require <data/ajax-model>


Ergo.declare('Ergo.data.TreeNodeList', 'Ergo.data.AjaxCollection', {

	defaults: {
	},
	
	model: 'Ergo.data.TreeNode',
	
	path: function() {
		return (this.source instanceof Ergo.core.DataSource) ? this.source.path() : this.options.path;
	}
	
	
});


Ergo.declare('Ergo.data.TreeNode', 'Ergo.data.AjaxModel', {
	
	defaults: {
	},
	
	fields: {
		'children': 'Ergo.data.TreeNodeList'
	},
	
	
	fetch: function(id) {
		
		var self = this;
		
		return $.getJSON(this.path()+'/'+id)
			.always(function(){
				self._fetched = true;
			}).success(function(json){
				self.set('children', json);
			});
	},
	
	path: function() {
		return (this.source instanceof Ergo.core.DataSource) ? this.source.path() : this.options.path;
	},
	
	getLeaf: function() {
		return !this.get('children');
	}
	
	
});

