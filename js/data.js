



/*
Dino.declare('Dino.data.ArraySource', Dino.events.EventDispatcher, {
	
	initialize: function(arr) {
		this.data = arr;
		this.items = [];
	},
	
	
	get: function(i) {
		return this.data[i];
	},
	
	set: function(i, newVal) {
		var oldVal = this.data[i];
		this.data[i] = newVal;
		
		this.fireEvent('onItemChanged', {id: i, oldValue: oldVal, newValue: newVal});
		
		return oldVal;
	},

	add: function(value) {
		this.data.push(value);
		this.fireEvent('onItemAdded', {id: this.data.length-1, newValue: value});
	},
	
	val: function(newVal) {
		if(arguments.length == 0){
			return this.data;
		}
		else{
			this.data = newVal;
			this.fireEvent('onChanged', {});
		}
	}
	
	
	
});
*/



Dino.declare('Dino.data.DataSource', Dino.events.Observer, {
	
	initialize: function(src, id) {
		Dino.data.DataSource.superclass.initialize.apply(this, arguments);
		
		if(arguments.length < 2){
			this.source = {'_id': src};
			this.id = '_id';
		}
		else {
			this.source = src;
			this.id = id;
		}
		this.items = {};
	},
	
	_val: function() {
		return (this.source instanceof Dino.data.DataSource) ? this.source.get(this.id) : this.source[this.id];
	},
	
	// получаем значение
	get: function(i) {
		if(arguments.length == 0)
			return this._val();
		else{
			var v = this._val();
			if( _dino.isString(i) ){
				var a = i.split('.');
				for(var j = 0; j < a.length; j++) v = v[ a[j] ];
				return v;
			}
			return v[i];
		}
	},
	
	// устанавливаем значение
	set: function(i, newValue) {
		if(arguments.length == 1) {
			newValue = i;
			// удаляем все элементы
			for(var j in this.items)
				this.items[j].destroy();
			// теперь список элементов пуст
			this.items = {};
			
			(this.source instanceof Dino.data.DataSource) ? this.source.set(this.id, newValue) : this.source[this.id] = newValue;
		}
		else {
			var v = (this.source instanceof Dino.data.DataSource) ? this.source._val()[this.id] : this.source[this.id];
			if( _dino.isString(i) ){
				var a = i.split('.');
				var i = a.pop();
				for(var j = 0; j < a.length; j++) v = v[ a[j] ];
			}
			v[i] = newValue;
		}
		
		this.fireEvent('onValueChanged', new Dino.events.Event());
	},
	
	// обходим все значения
	each: function(callback) {
		Dino.each(this._val(), callback);
	},
	
	_item: function(i) {
		if(!(i in this.items)) {
			var item = new Dino.data.DataSource(this, i);
			this.items[i] = item;
		}
		return this.items[i];
	}
	
/*	
	eachItem: function(callback){
		Dino.each(this.items, callback);
	}
*/	
	
});





Dino.declare('Dino.data.AjaxDataSource', 'Dino.data.DataSource', {
/*	
	initialize: function() {
		Dino.data.AjaxDataSource.superclass.initialize.call(self, {});
	},
*/	
	load: function(url, params) {
		var self = this;
		
		$.getJSON(url, params || {}, function(data){
			self.set(data);
			self.fireEvent('onLoad', new Dino.events.Event());
		});
	}
});


