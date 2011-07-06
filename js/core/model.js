
//= require "data-source"




Dino.declare('Dino.data.Model', 'Dino.core.DataSource', {
	
	defaults: {
		oidKey: 'id'
	},
	
	fields: {
	},
	
	oid: function() {
		return this._val()[this.options.oidKey];
	},
	
	
	set: function(v) {
		
		if(this.validate) {
			if( !this.validate.call(this, v) ) throw new Error('Invalid value: ['+v+']');
		}
		
		Dino.data.Model.superclass.set.apply(this, arguments);
	},
	
	get: function() {
		var v = Dino.data.Model.superclass.get.apply(this, arguments);

		return (this.format) ? this.format.call(this, v) : v;
	},
	
	factory: function(i) {
		var model = this.fields[i] || Dino.core.DataSource;
		return new model(this, i);
	}
	
});




Dino.declare('Dino.data.Collection', 'Dino.core.DataSource', {
	
	defaults: {
		itemModel: null
	},
	
	
	getByOID: function(oid) {
		var a = this._val();
		for(var i in a)
			if(a[i].id == oid) return a[i];
		return null;
	},
	
	
	factory: function(i) {
		var model = (this.options.itemModel) ? this.options.itemModel : Dino.core.DataSource;
		return new model(this, i); 
	}

	
	
});
