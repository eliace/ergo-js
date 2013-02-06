
//= require <data/ajax-collection>
//= require <data/ajax-model>


Ergo.declare('Ergo.data.tree.NodeList', 'Ergo.data.Collection', {

	defaults: {
	},
	
	model: 'Ergo.data.tree.Node',
	
	purge: function() {
		this.set([]);
		this._fetched = false;
	}
	
});


Ergo.declare('Ergo.data.tree.Node', 'Ergo.data.Object', {
	
	defaults: {
	},
	
	fields: {
		'children': 'Ergo.data.tree.NodeList'
	},
	
	
	fetch: function() {
		var self = this;
		return this.entry('children').fetch( this.oid() ).then(function(){ self._fetched = true });
	},
	
	
	purge: function() {
		this.entry('children').purge();
		this._fetched = false;
	},
	
		
	getLeaf: function() {
		return !this.get('children');
	}
	
	
});

