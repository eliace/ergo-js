
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
	
	
	set: function(i, v) {
		
		var fields = this.fields;
		if(i in fields) {
			if(fields[i].validate) {
				if( !fields[i].validate.call(this, v) ) return false;
			}
		}
		
		Dino.data.Model.superclass.set.apply(this, arguments);
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
