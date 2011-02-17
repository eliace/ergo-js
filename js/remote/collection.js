

Dino.declare('Dino.remote.Collection', 'Dino.events.Observer', {
	
	initialize: function(name, source, o) {
		Dino.remote.Collection.superclass.initialize.apply(this, arguments);
		this.name = name;
		this.source = source;
		this.backend = o.backend;
	},
	
	/**
	 * Добавление объекта в коллекцию
	 * 
	 * @param {Object} val
	 * @param {Object} callback
	 */
	add: function(val, callback) {
		var self = this;
		val['_method'] = 'put';
		$.post(this.path(), val, function(data){
			if(self.backend) self.backend.add(data);
			if(callback) callback.call(this, data);
		}, 'json');
	},
	
	/**
	 * Удаление объекта из коллекции
	 * 
	 * @param {Object} id
	 * @param {Object} callback
	 */
	remove: function(id, callback) {
		var self = this;
		$.post(this.path() + '/'+id, {'_method': 'delete'}, function(data){
			if(self.backend) 
				self.backend.find(function(item){ return item.get('id') == id; }).del();
			if(callback) callback.call(this, data);
		}, 'json');		
	},
	
	
	/**
	 * Обновление объекта
	 * 
	 * @param {Object} id
	 * @param {Object} val
	 * @param {Object} callback
	 */
	update: function(id, val, callback) {
		var self = this;
		$.post(this.path() + '/'+id, val, function(data){
			//TODO
			if(callback) callback.call(this, data);
		}, 'json');		
	},
	
	/**
	 * Загрузка объекта
	 * 
	 * @param {Object} id
	 * @param {Object} callback
	 */
	load: function(id, callback) {
		var self = this;
		$.getJSON(this.path()+'/'+id, {}, function(data){
			if(callback) callback.call(this, data);
		});
	},
	
	/**
	 * Загрузка всех объектов
	 * 
	 * @param {Object} callback
	 */
	load_all: function(callback) {
		var self = this;
		$.getJSON(this.path()+'/all', {}, function(data){
			if(self.backend) self.backend.set(data);
			if(callback) callback.call(this, data);
		});		
	},
	
	
	/**
	 * Загрузка подмножества объектов
	 * 
	 * @param {Object} fromIndex
	 * @param {Object} toIndex
	 * @param {Object} orderField
	 * @param {Object} callback
	 */
	load_range: function(fromIndex, toIndex, orderField, callback) {
		$.getJSON(this.path()+'/range', {from: fromIndex, to: toIndex, order: orderField}, function(data){
			//TODO
			if(callback) callback.call(this, data.data, data.from, data.to, data.count);
		});				
	},
	
	path: function() {
		return (this.source ? this.source.path() + '/' : '') + this.name;
	}
	
});
