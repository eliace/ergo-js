
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
		var d = this;
		d.events.fire('fetch:before');
		return d.entry('children').fetch( {id: d._oid()} ).then(function(){ d._fetched = true; d.events.fire('fetch:after'); });
	},
	
	
	purge: function() {
		this.entry('children').purge();
		this._fetched = false;
	},
	
		
	get_branch: function() {
		return this.get('children');
	}
	
	
}, 'data:node');

