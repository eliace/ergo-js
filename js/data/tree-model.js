
//= require <data/collection>
//= require <data/object>


Ergo.defineClass('Ergo.data.tree.NodeList', 'Ergo.data.Collection', {

	defaults: {
	},
	
	model: 'data:node',
	
	purge: function() {
		this.set([]);
		this._fetched = false;
	}
	
}, 'data:node-list');


Ergo.defineClass('Ergo.data.tree.Node', 'Ergo.data.Object', {
	
	defaults: {
	},
	
	fields: {
		'children': 'data:node-list'
	},
	
	
	fetch: function() {
		var self = this;
		return this.entry('children').fetch( this.oid() ).then(function(){ self._fetched = true; });
	},
	
	
	purge: function() {
		this.entry('children').purge();
		this._fetched = false;
	},
	
		
	getLeaf: function() {
		return !this.get('children');
	}
	
	
}, 'data:node');

