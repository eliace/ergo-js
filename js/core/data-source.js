
//= require "events"


/**
 * Источник данных
 * 
 * @class
 * @extends Ergo.core.Object
 * 
 */
Ergo.core.DataSource = Ergo.declare('Ergo.core.DataSource', 'Ergo.core.Object', /** @lends Ergo.core.DataSource.prototype */{
	
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
		var val = this.val();
		
		this.entries = $.isArray(val) ? new Ergo.core.Array() : new Ergo.core.Collection();
		
		if(!o.lazy) {
			Ergo.each(val, function(v, i){	self.ensure(i); });
		}
		
	},
	
	
	/**
	 * Получение вложенного элемента данных по ключу
	 * 
	 * @param {String|Any} i ключ
	 * @return {Ergo.core.DataSource} элемент данных
	 */
	entry: function(i) {
		
		var e = this;
		
		// если ключ - строка, то он может быть составным 
		if($.isString(i)) {
			var a = i.split('.');
			var i = a.pop();
			// двигаемся внутрь объекта по элементам ключа
			for(var j = 0; j < a.length; j++) e = e.entry(a[j]);
		}
				
		return e.ensure(i);
	},
	
	
	/**
	 * Фабрика вложенных элементов
	 * 
	 * По умолчанию используется класс Ergo.core.DataSource
	 * 
	 * @param {Any} i ключ
	 * 
	 */
	factory: function(i) {
		return new Ergo.core.DataSource(this, i);		
	},
	
	/**
	 * Получение вложенного элемента данных по ключу. Причем, если элемента данных не существует, то он будет создан
	 * 
	 * @param {Any} i ключ
	 */
	ensure: function(i) {
		// если ключ существует, то возвращаем соответствующий элемент, иначе - создаем новый
		if(!this.entries.has_key(i)) {
			this.entries.set(i, this.factory(i));
		}
		
		return this.entries.get(i);
	},
	
	
	/**
	 * Получение значения источника данных
	 * 
	 * Если метод вызывается без аргументов, то он ведет себя как геттер.
	 * Если определен аргумент, то метод является сеттером.
	 * 
	 * @param {Any} [v] значение
	 */
	val: function(v) {
//		if('_cached' in this) return this._cached;
//		var v = undefined;

		if(arguments.length == 0) {
			if(this.source instanceof Ergo.core.DataSource){
				v = ('id' in this) ? this.source.val()[this.id]: this.source.val();
			}
			else{
				v = ('id' in this) ? this.source[this.id] : this.source;
			}			
		} 
		else {
			if (this.source instanceof Ergo.core.DataSource) {
				('id' in this) ? this.source.val()[this.id] = v : this.source.val(v);
	  	}
			else {
				('id' in this) ? this.source[this.id] = v : this.source = v;
			}			
		}
//		this._cached = v;
		return v;
	},
	
	
	/**
	 * Получение значения атрибута/элемента по ключу
	 *
	 * Если ключ не указан или не определен, то берется значение самого источника данных
	 * 
	 * @param {Any} [i] ключ
	 */
	get: function(i) {
		if(i === undefined)
			return this.val();
		else{
			return this.entry(i).val();			
		}
	},
	
	/**
	 * Полная копия значения
	 * 
	 * @param {Any} i ключ
	 */
	copy: function(i) {
		return Ergo.deep_copy(this.get(i));
	},
	
	
	
	/**
	 * Установка значения атрибута/элемента по ключу
	 * 
	 * Если аргумент один, то изменяется значение самого источника данных
	 * 
	 * @param {Any} [i] ключ
	 * @param {Any} val новое значение
	 * 
	 */
	set: function(i, newValue) {
		if(arguments.length == 1) {
			newValue = i;
			// опустошаем список элементов
			this.entries.apply_all('destroy');
			
			var oldValue = this.val();
			
			// if (this.source instanceof Ergo.core.DataSource) {
				// ('id' in this) ? this.source.val()[this.id] = newValue : this.source.set(newValue);
	  	// }
			// else {
				// ('id' in this) ? this.source[this.id] = newValue : this.source = newValue;
			// }
			
			this.val(newValue);

			this.events.fire('value:changed', {'oldValue': oldValue, 'newValue': newValue});
			
			if(this.source instanceof Ergo.core.DataSource)
				this.source.events.fire('entry:changed', {entry: this});
			
			this._changed = true;
		}
		else {
			return this.entry(i).set(newValue);
		}
		
	},
	
	
	
	/**
	 * Добавление нового атрибута/элемента
	 * 
	 * 
	 * @param {Any} value значение нового атрибута
	 * @param {String|Number} [index] индекс или ключ, куда должен быть добавлен атрибут 
	 * 
	 */
	add: function(value, index) {
		
		var values = this.val();		
		
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

				this.entries.set(index, this.factory(index));
				
			}
			
		}
		else {
			values[index] = value;
		}



		var e = this.entry(index);

		this.events.fire('entry:added', {'index': index, 'entry': e, 'isLast': isLast});
		
		return e;
	},
	
	
	/**
	 * Удаление атрибута/элемента из источника данных.
	 * 
	 * Если метод вызывается без аргументов, то удаляется сам источник данных из родительского
	 * 
	 * @param {String|Number} i ключ
	 * 
	 */
	del: function(i) {
		
		if(i === undefined) {
			if(this.source instanceof Ergo.core.DataSource)
				this.source.del(this.id);
			else
				throw new Error('Unable to delete root data source');
		}
		else {
			var value = this.val();

			var deleted_entry = this.entry(i);
//			var deleted_entry = this.entries.remove_at(i);
			var deleted_value = value[i];
			
			this.entries.remove_at(i);
			
			if($.isArray(value)) {
				value.splice(i, 1);
				for(var j = i; j < value.length; j++)
					this.entries.get(j).id = j;
			}
			else {
				delete value[i];
			}
			
			// элемента могло и не быть в кэше и, если это так, то событие не генерируется
			if(deleted_entry)
				this.events.fire('entry:deleted', {'entry': deleted_entry, 'value': deleted_value});
		}
				
	},
	
	
	/**
	 * Последовательный обход всех вложенных элементов с поддержкой фильтрации
	 * 
	 * @param {Function} callback 
	 * 
	 */
	iterate: function(callback) {
		
		var self = this;
		var values = this.val();
		var keys = this.keys();
		
		// var keys = [];
		// if($.isArray(values)) {
			// for(var i = 0; i < values.length; i++) keys.push(i);
		// }
		// else {
			// for(var i in values) keys.push(i);			
		// }
		
		//TODO здесь могут применяться модификаторы списка ключей (сортировка, фильтрация)
		if(this.options.filter){
			keys = this.options.filter.call(this, values, keys);
		}
		
		for(var i = 0; i < keys.length; i++){
			var k = keys[i];
			callback.call(this, this.entry(k), k, values[k]);			
		}
	},
	
	
	keys: function() {
		var keys = [];
		var values = this.val();		
		if($.isArray(values)) {
			for(var i = 0; i < values.length; i++) keys.push(i);
		}
		else {
			for(var i in values) keys.push(i);			
		}
		return keys
	},
	
	
	
	
	walk: function(callback) {
		//TODO
	},
	
	/**
	 * Проверка, изменялся ли источник данных или хотя бы один из его атрибутов/элементов
	 */
	changed: function() {
		if(this._changed) return true;
		var found = this.entries.find(function(e){ return e.changed(); });
		return found != null;
	},

	/*
	 * Удаление состояния о том, что источник данных или его атрибуты изменялись
	 */
	clean: function() {
		this._changed = false;
		this.entries.apply_all('clean');
	}
	
	
	
});








