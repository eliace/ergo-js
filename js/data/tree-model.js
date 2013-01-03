
//= require <data/ajax-collection>
//= require <data/ajax-model>


Ergo.declare('Ergo.data.tree.NodeList', 'Ergo.data.Collection', {

	defaults: {
	},
	
	model: 'Ergo.data.tree.Node'
	
	// path: function() {
		// return (this.source instanceof Ergo.core.DataSource) ? this.source.path() : this.options.path;
	// }
	
	
});


Ergo.declare('Ergo.data.tree.Node', 'Ergo.data.Object', {
	
	defaults: {
	},
	
	fields: {
		'children': 'Ergo.data.tree.NodeList'
	},
	
	
	// fetch: function(id) {
// 		
		// var self = this;
// 		
		// return $.getJSON(this.path()+'/'+id)
			// .always(function(){
				// self._fetched = true;
			// }).success(function(json){
				// self.set('children', json);
			// });
	// },
	
	// path: function() {
		// return (this.source instanceof Ergo.core.DataSource) ? this.source.path() : this.options.path;
	// },
	
	getLeaf: function() {
		return !this.get('children');
	}
	
	
});

