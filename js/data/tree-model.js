
//= require collection
//= require object


Ergo.defineClass('Ergo.data.NodeList', 'Ergo.data.Collection', {

	defaults: {
	},
	
	model: 'data:node',
	
	purge: function() {
		this.set([]);
		this._fetched = false;
	}
	
}, 'data:node-list');


Ergo.defineClass('Ergo.data.Node', 'Ergo.data.Object', {
	
	defaults: {
	},
	
	fields: {
		'children': 'data:node-list'
	},
	
	
	fetch: function() {
		var self = this;
		return this.entry('children').fetch( {id: this.oid()} ).then(function(){ self._fetched = true; });
	},
	
	
	purge: function() {
		this.entry('children').purge();
		this._fetched = false;
	},
	
		
	get_branch: function() {
		return this.get('children');
	}
	
	
}, 'data:node');

