
//= require collection
//= require object


Ergo.defineClass('Ergo.data.NodeList', {

	extends: 'Ergo.data.Collection',

	defaults: {
	},

	model: 'data:node',

	purge: function() {
		this.set([]);
		this._fetched = false;
	}

}, 'data:node-list');




Ergo.defineClass('Ergo.data.Node', {

	extends: 'Ergo.data.Object',

	defaults: {
	},

	fields: {
		'children': 'data:node-list'
	},


	fetch: function() {
		var d = this;
		d.events.fire('fetch');
		return d.entry('children').fetch( {id: d.oid} ).then(function(){ d._fetched = true; d.events.fire('fetched'); });
	},


	purge: function() {
		this.entry('children').purge();
		this._fetched = false;
	},


	get branch() {
		return this.get('children');
	}


}, 'data:node');
