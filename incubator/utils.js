

var DummyTreeData = {
	
	'0': [{
		"id": 1,
		"title": "C:",
		"type": "folder",
		"children": true
	}, {
		"id": 2,
		"title": "F:",
		"type": "folder",
		"children": true
	}, {
		"id": 3,
		"title": "G:",
		"type": "folder",
		"children": true
	}],
	
	'1': [],
	
	'2': [{
		"id": 21,
		"title": "Фильмы",
		"type": "folder",
		"children": true
	}],
	
	'3': [],
	
	'21': [{
		"id": "211",
		"title": "Теория большого взрыва",
		"type": "folder",
		"children": true  
	}, {
		"id": "212",
		"title": "Тачки 2.avi",
		"type": "clip"
	}, {
		"id": "213",
		"title": "Приключения Тинтина.avi",
		"type": "clip"
	}],
	
	'211': [{
		"id": "2111",
		"title": "s02e01.avi",
		"type": "clip"
	}, {
		"id": "2112",
		"title": "s02e02.avi",
		"type": "clip"
	}, {
		"id": "2113",
		"title": "s02e03.avi",
		"type": "clip"
	}]
	
	
}





var DummyTreeProvider = {
	
	last_id: 1,
	
	get: function(path) {
		return $.when( Ergo.deep_copy(DummyTreeData[path]) );
	},
	
	put: function(obj, parent_id) {
		var id = this.last_id++;
		
		if(!DummyTreeData[parent_id])
			DummyTreeData[parent_id] = [];
		
		obj.id = 'uid-'+id;
		
		DummyTreeData[parent_id].push(obj);
		
		console.log({'PUT': obj});
		
		return $.when( Ergo.deep_copy(obj) );
	},
	
	del: function(id) {
		
		console.log(id);
		
		Ergo.each(DummyTreeData, function(arr) {
			new Ergo.core.Array(arr).remove_if(function(item){
				return item.id == id;
			});
		});
		
		return $.when(true);
	}
	
	
};









var DummyGridProvider = Ergo.core.Object.extend({
	
	load: function() {
		
		var deferred = $.Deferred();
		
		$.ajax('samples/ajax/randomdata.csv', {
			dataType: 'text',
			context: this
		})
		.success(function(text){
			this._data = this.parse(text);
			this._loaded = true;
			deferred.resolve( this._data );
		});
		
		return deferred;
	},
	
	parse: function(csv) {
		
		var list = csv.split('\n');
		
		
		this.options.totalCount = list.length;
		
		// Эмулируем загрузку набора данных
		var data = [];
		
		var to = Math.min(list.length, this.options.to);
		
		for(var i = 0; i < 30; i++) {
			
			var a = list[i].split('|');			
			
			data.push({
				id: a[0],
				name: a[1],
				email: a[2],
				date: a[3]
			});
		}
		
		return data;
	},
	
	
	data: function() {
		return Ergo.deep_copy(this._data);
	},
	
	
	get: function() {
		var self = this;
		var deferred = $.Deferred();
		if(this._loaded)
			deferred.resolve(this._data());
		else
			this.load().then(function() { deferred.resolve(self.data()); });
		return deferred;
	}
	
	
	
});





