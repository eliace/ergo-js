

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





Ergo.declare('Ergo.incubator.tree.FileNodeList', 'Ergo.data.tree.AjaxNodeList', {
	
		model: Ergo.data.tree.AjaxNode.extend({
			fields: {
				'children': 'Ergo.incubator.tree.FileNodeList'
			}
		}),
	
		fetch: function(id) {
			
			if(!id) id = 0;
			
			var self = this;
			
			return $.getJSON(this.opt('url') + '/' + id)
				.success(function(json){
					self._fetched = true;
					self.set(json);
				});
		}
	
});
