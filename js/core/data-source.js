
//= require "events"


/**
 * Источник данных
 * 
 * @class
 * @name Ergo.core.DataSource
 * @extends Ergo.core.Object
 * 
 */
Ergo.declare('Ergo.core.DataSource', 'Ergo.core.Object', /** @lends Ergo.core.DataSource.prototype */{
	
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
		
		this.$super(o || {});
//		Ergo.core.DataSource.superclass.initialize.call(this, o || {});
		
		var self = this;
		var o = this.options;
		var val = this.get();
		
		this.entries = $.isArray(val) ? new Ergo.core.Array() : new Ergo.core.Collection();
		
		if(!o.lazy) {
			Ergo.each(val, function(v, i){	self.entry(i); });
		}
		
	},
	
	
	destroy: function() {
		
		// очищаем регистрацию обработчиков событий
		this.events.unreg_all();
		// удаляем все дочерние элементы
		this.entries.apply_all('destroy');
		
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
				
		// если ключ существует, то возвращаем соответствующий элемент, иначе - создаем новый
		if(!e.entries.has_key(i)) {
			e.entries.set(i, e.factory(i));
		}
		
		return e.entries.get(i);
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
	 * Получение значения источника данных
	 * 
	 * Если метод вызывается без аргументов, то он ведет себя как геттер.
	 * Если определен аргумент, то метод является сеттером.
	 * 
	 * @param {Any} [v] значение
	 * @private
	 */
	_val: function(v) {
//		if('_cached' in this) return this._cached;
//		var v = undefined;

		if(arguments.length == 0) {
			v = (this.source instanceof Ergo.core.DataSource) ? this.source._val() : this.source;
			if('id' in this) v = v[this.id];
		} 
		else {
			if (this.source instanceof Ergo.core.DataSource) {
				('id' in this) ? this.source._val()[this.id] = v : this.source._val(v);
	  	}
			else {
				('id' in this) ? this.source[this.id] = v : this.source = v;
			}			
		}
//		this._cached = v;
		return v;
	},
	
	
	/**
	 * Получение значения элемента по ключу
	 *
	 * Если ключ не указан или не определен, то берется значение самого источника данных
	 * 
	 * @param {Any} [i] ключ
	 */
	get: function(i) {
		if(i === undefined){
			// var v = (this.source instanceof Ergo.core.DataSource) ? this.source.get() : this.source;
			// if('id' in this) v = v[this.id];
			// return v;
			return this._val();
		}
		else {
			return this.entry(i).get();			
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
	 * Изменение существующего элемента
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
			
			var oldValue = this.get();
						
			this._val(newValue);
			
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
	 * Добавление нового элемента
	 * 
	 * 
	 * @param {Any} value значение нового атрибута
	 * @param {String|Number} [index] индекс или ключ, куда должен быть добавлен атрибут 
	 * 
	 */
	add: function(value, index) {
		
		var values = this.get();		
		
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
//			throw new Error('Method "add" does not support object src');
			values[index] = value;
		}



		var e = this.entry(index);

		this.events.fire('entry:added', {'index': index, 'entry': e});//, 'isLast': isLast});
		
		return e;
	},
	
	
	/**
	 * Удаление элемента.
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
				throw new Error('Unable to delete root data src');
		}
		else {
			var value = this.get();

			var deleted_entry = this.entry(i);
//			var deleted_entry = this.entries.remove_at(i);
			var deleted_value = value[i];
			
			if($.isArray(value)) {
				value.splice(i, 1);
				for(var j = i; j < value.length; j++)
					this.entries.get(j).id = j;
			}
			else {
				delete value[i];
			}
			
			this.entries.remove_at(i);
			
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
		var values = this.get();
//		var keys = this.keys(this.options.filter);
		
		var criteria = this.options.filter;
		Ergo.each(values, function(v, i){
			if(!criteria || criteria.call(self, v, i)) {
				callback.call(self, self.entry(i), i, v);				
			}
		});
		
		// var keys = [];
		// if($.isArray(values)) {
			// for(var i = 0; i < values.length; i++) keys.push(i);
		// }
		// else {
			// for(var i in values) keys.push(i);			
		// }
		
		//TODO здесь могут применяться модификаторы списка ключей (сортировка, фильтрация)
		// if(this.options.filter){
			// keys = this.options.filter.call(this, values, keys);
		// }
		
		// for(var i = 0; i < keys.length; i++){
			// var k = keys[i];
			// callback.call(this, this.entry(k), k, values[k]);			
		// }
	},
	
/*	
	keys: function(criteria) {
		var keys = [];
		var values = this.get();
		
		Ergo.each(function(v, i){
			if(criteria || criteria.call(this, v, i)) keys.push(i);
		});
		
		return keys;
				
		// if($.isArray(values)) {
			// for(var i = 0; i < values.length; i++) keys.push(i);
		// }
		// else {
			// for(var i in values) keys.push(i);			
		// }
		// return keys
	},
*/	
	
	
	
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




/**
 * @namespace Пространство для классов, наследуемых от Ergo.core.DataSource
 */
Ergo.data = {};




