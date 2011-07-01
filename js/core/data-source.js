



Dino.declare('Dino.core.DataSourceX', 'Dino.core.Object', {
	
	defaults: {
		extensions: [Dino.Observable],
		lazy: true
	},
	
	
	initialize: function(src, id, o) {

		this.source = src;
				
		if(arguments.length == 2) {
			if(Dino.isPlainObject(id)) o = id;
			else this.id = id;
		}
		else if(arguments.length == 3) {
			this.id = id;
		}
		
		Dino.core.DataSourceX.superclass.initialize.call(this, o || {});
		
		var self = this;
		var o = this.options;
		var val = this._val();
		
		this.entries = Dino.isArray(val) ? new Dino.core.Array() : new Dino.core.Collection();
		
		if(!o.lazy) {
			Dino.each(val, function(v, i){	self.ensure(i); });
		}
		
	},
	
	
	factory: function(i) {
		return new Dino.core.DataSourceX(this, i);		
	},
	
	
	
	
	entry: function(i) {
		
		var e = this;
		
		// если ключ - строка, то он может быть составным 
		if(Dino.isString(i)) {
			var a = i.split('.');
			var i = a.pop();
			// двигаемся внутрь объекта по элементам ключа
			for(var j = 0; j < a.length; j++) e = e.entry(a[j]);
		}
				
		return e.ensure(i);
	},
	
	
	ensure: function(i) {
		// если ключ существует, то возвращаем соответствующий элемент, иначе - создаем новый
		if(!this.entries.has_key(i)) {
			this.entries.set(i, this.factory(i));
		}
		
		return this.entries.get(i);
	},
	
	
	
	_val: function() {
//		if('_cached' in this) return this._cached;
		var v = undefined;
		if(this.source instanceof Dino.core.DataSourceX){
			v = ('id' in this) ? this.source._val()[this.id]: this.source._val();
		}
		else{
			v = ('id' in this) ? this.source[this.id] : this.source;
		}
//		this._cached = v;
		return v;
	},
	
	
	// получаем значение
	get: function(i) {
		if(arguments.length == 0)
			return this._val();
		else{
			return this.entry(i)._val();			
		}
	},
	
	
	
	// устанавливаем значение
	set: function(i, newValue) {
		if(arguments.length == 1) {
			newValue = i;
			// опустошаем список элементов
			this.entries.apply_all('destroy');
			
			var oldValue = this._val();
			
			if (this.source instanceof Dino.core.DataSourceX) {
				('id' in this) ? this.source._val()[this.id] = newValue : this.source.set(newValue);
	  	}
			else {
				('id' in this) ? this.source[this.id] = newValue : this.source = newValue;
			}

			this.events.fire('onValueChanged', {'oldValue': oldValue, 'newValue': newValue});
			
			if(this.source instanceof Dino.core.DataSourceX)
				this.source.events.fire('onEntryChanged', {entry: this});
			
			this._changed = true;
		}
		else {
			this.entry(i).set(newValue);
		}
		
	},
	
	
	
	iterate: function(callback) {
		
		var self = this;
		var values = this._val();		
		var keys = [];
		for(var i in values) keys.push(i);
		
		//TODO здесь могут применяться модификаторы списка ключей (сортировка, фильтрация)
		
		for(var i in keys)
			callback.call(this, this.entry(i), values[i]);
	},
	
	
	walk: function(callback) {
		//TODO
	},
	
	
	changed: function() {
		if(this._changed) return true;
		var found = this.entries.find(function(e){ return e.changed(); });
		return found != null;
	},

	clean: function() {
		this._changed = false;
		this.entries.apply_all('clean');
	}
	
	
	
	
	
	
});
