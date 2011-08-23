
//= require "events"



Ergo.declare('Ergo.core.DataSource', 'Ergo.core.Object', {
	
	defaults: {
		extensions: [Ergo.Observable],
		lazy: true
	},
	
	
	initialize: function(src, id, o) {

		this.source = src;
				
		if(arguments.length == 2) {
			if($.isPlainObject(id)) o = id;
			else this.id = id;
		}
		else if(arguments.length == 3) {
			this.id = id;
		}
		
		Ergo.core.DataSource.superclass.initialize.call(this, o || {});
		
		var self = this;
		var o = this.options;
		var val = this._val();
		
		this.entries = $.isArray(val) ? new Ergo.core.Array() : new Ergo.core.Collection();
		
		if(!o.lazy) {
			Ergo.each(val, function(v, i){	self.ensure_entry(i); });
		}
		
	},
	
	
	entry: function(i) {
		
		var e = this;
		
		// если ключ - строка, то он может быть составным 
		if($.isString(i)) {
			var a = i.split('.');
			var i = a.pop();
			// двигаемся внутрь объекта по элементам ключа
			for(var j = 0; j < a.length; j++) e = e.entry(a[j]);
		}
				
		return e.ensure_entry(i);
	},
	
	
	create_entry: function(i) {
		return new Ergo.core.DataSource(this, i);		
	},
	
	
	ensure_entry: function(i) {
		// если ключ существует, то возвращаем соответствующий элемент, иначе - создаем новый
		if(!this.entries.has_key(i)) {
			this.entries.set(i, this.create_entry(i));
		}
		
		return this.entries.get(i);
	},
	
	
	
	_val: function() {
//		if('_cached' in this) return this._cached;
		var v = undefined;
		if(this.source instanceof Ergo.core.DataSource){
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
		if(i === undefined)
			return this._val();
		else{
			return this.entry(i)._val();			
		}
	},
	
	
	get_copy: function(i) {
		return Ergo.deep_copy(this.get(i));
	},
	
	// устанавливаем значение
	set: function(i, newValue) {
		if(arguments.length == 1) {
			newValue = i;
			// опустошаем список элементов
			this.entries.apply_all('destroy');
			
			var oldValue = this._val();
			
			if (this.source instanceof Ergo.core.DataSource) {
				('id' in this) ? this.source._val()[this.id] = newValue : this.source.set(newValue);
	  	}
			else {
				('id' in this) ? this.source[this.id] = newValue : this.source = newValue;
			}

			this.events.fire('onValueChanged', {'oldValue': oldValue, 'newValue': newValue});
			
			if(this.source instanceof Ergo.core.DataSource)
				this.source.events.fire('onEntryChanged', {entry: this});
			
			this._changed = true;
		}
		else {
			return this.entry(i).set(newValue);
		}
		
	},
	
	
	add: function(value, index) {
		
		var values = this._val();		
		
		var isLast = false;
			
		if($.isArray(values)) {
			
			if(index == null){
				values.push(value);
				index = values.length-1;
				isLast = true;
			}
			else {

				// меняем индексы элементов данных
				for(var i = values.length-1; i >= index; i--){
					var e = this.entries.get(i);
					// this.events.fire('onIndexChanged', {'oldIndex': j, 'newIndex': (j-1)});
					e.id = i+1;
					this.entries.set(i+1, e);
				}
				
				// добавляем новый элемент массива
				values.splice(index, 0, value);

				this.entries.set(index, this.create_entry(index));
				
			}
			
		}
		else {
			values[index] = value;
		}



		var e = this.entry(index);

		this.events.fire('onEntryAdded', {'index': index, 'entry': e, 'isLast': isLast});
		
		return e;
	},
	
	
	
	del: function(i) {
		
		if(i === undefined) {
			if(this.source instanceof Ergo.core.DataSource)
				this.source.del(this.id);
			else
				throw new Error('Cannot delete root data source');
		}
		else {
			var value = this._val();

			var deleted_entry = this.entries.remove_at(i);
			var deleted_value = value[i];
			
			if($.isArray(value)) {
				value.splice(i, 1);
				for(var j = i; j < value.length; j++)
					this.entry(j).id = j;
			}
			else {
				delete value[i];
			}
			
			this.events.fire('onEntryDeleted', {'entry': deleted_entry, 'value': deleted_value});
		}
				
	},
	
		
	iterate: function(callback) {
		
		var self = this;
		var values = this._val();		
		
		var keys = [];
		if($.isArray(values)) {
			for(var i = 0; i < values.length; i++) keys.push(i);
		}
		else {
			for(var i in values) keys.push(i);			
		}
		
		//TODO здесь могут применяться модификаторы списка ключей (сортировка, фильтрация)
		if(this.options.filter){
			keys = this.options.filter.call(this, values, keys);
		}
		
		for(var i in keys){
			var k = keys[i];
			callback.call(this, this.entry(k), k, values[k]);			
		}
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






