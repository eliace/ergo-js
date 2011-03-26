


Dino.declare('Dino.remote.Object', 'Dino.events.Observer', {
	
	initialize: function(fields, collection) {
		Dino.remote.Object.superclass.initialize.apply(this, arguments);
		
		this.fields = fields;
		this.collection = collection;
	},
	
	save: function(val, callback) {
		var path = (this.collection) ? '' : this.collection.path();
		
		var fields = {};
		Dino.each(function(key){ fields[key] = val[key]; });

		if(val.id) {
			// если ID определен, то этот объект требуется обновить
			return $.post(path + '/' + val.id, {_serialized: $.toJSON(fields)}, callback, 'json');
		}
		else {
			//TODO здесь должно быть создание нового объекта
			return $.post(path + '/' + val.id, {_method: 'put', _serialized: $.toJSON(fields)}, callback, 'json');
		}
	}
	
	
});
