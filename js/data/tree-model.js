
//= require <data/ajax-collection>
//= require <data/ajax-model>


Ergo.declare('Ergo.data.tree.NodeList', 'Ergo.data.Collection', {

	defaults: {
	},
	
	model: 'Ergo.data.tree.Node'
	
});


Ergo.declare('Ergo.data.tree.Node', 'Ergo.data.Object', {
	
	defaults: {
	},
	
	fields: {
		'children': 'Ergo.data.tree.NodeList'
	},
	
		
	getLeaf: function() {
		return !this.get('children');
	}
	
	
});
