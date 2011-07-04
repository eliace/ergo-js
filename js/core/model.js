
//= require "data-source"



Dino.declare('Dino.data.Collection', 'Dino.core.DataSource', {
	
	
	
	getByOID: function(oid) {
		var a = this._val();
		for(var i in a)
			if(a[i].id == oid) return a[i];
		return null;
	}

	
	
});
