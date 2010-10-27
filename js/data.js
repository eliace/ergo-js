





Dino.declare('Dino.data.DataSource', Dino.events.Observer, {
	
	initialize: function(src, id, options) {
		Dino.data.DataSource.superclass.initialize.apply(this, arguments);

		this.source = src;
		
		if(arguments.length == 2){
			this.source = src;
			if(Dino.isPlainObject(id)) options = id;
			else this.id = id;
		}
		else if(arguments.length == 3) {
			this.id = id;
		}
		
/*		
		if(arguments.length < 2){
			this.source = src;
		}
		else {
			this.source = src;
			this.id = id;
		}
*/		
		this.options = Dino.utils.overrideOpts({}, this.defaultOptions, options);
		this.items = {};
	},
	
	val: function() {
		if(this.source instanceof Dino.data.DataSource){
			return ('id' in this) ? this.source.val()[this.id]: this.source.val();//get(this.id) : this.source.get();
		}
		else{
			return ('id' in this) ? this.source[this.id] : this.source;
		}
	},
	
	// получаем значение
	get: function(i) {
		if(arguments.length == 0)
			return this.val();
		else{
			return this.item(i).val();
			
/*			
			var v = this.val();
			if( _dino.isString(i) ){
				var a = i.split('.');
				for(var j = 0; j < a.length; j++){
					if(v === null || v === undefined) return null;
					v = v[ a[j] ];
					
				}
				return v;
			}
			return v[i];
*/			
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
			
			
			('id' in this) ? this.source.val()[this.id] = newValue : this.source = newValue;
			
//			if(this.source instanceof Dino.data.DataSource){
//				('id' in this) ? this.source.set(this.id, newValue) : this.source.set(newValue);
//			}
//			else {
//				('id' in this) ? this.source[this.id] = newValue : this.source = newValue;
//			}
		}
		else {
			this.item(i).set(newValue);
/*			
			// получаем объект с данными (PlainObject или Array)
			var v = this.get();
			// если ключ - строка, то он может быть составным 
			if( _dino.isString(i) ){
				var a = i.split('.');
				var i = a.pop();
				// двигаемся внутрь объекта по элементам ключа
				for(var j = 0; j < a.length; j++) v = v[ a[j] ];
			}
			v[i] = newValue;
*/			
		}
		
		this.events.fire('onValueChanged');
	},
	
	
	// обходим все значения
	each: function(callback) {
		Dino.each(this.val(), callback);
	},
	
	item: function(i) {
		
		var data_item = this;
		
		// если ключ - строка, то он может быть составным 
		if(Dino.isString(i)) {
			var a = i.split('.');
			var i = a.pop();
			// двигаемся внутрь объекта по элементам ключа
			for(var j = 0; j < a.length; j++) data_item = data_item.item(a[j]);
		}
		
		return data_item.ensure_item(i);
//		//TODO элементы тоже можно получать по составному индексу
//		if(!(i in this.items)) {
//			var item = Dino.isArray(this.get(i)) ? new Dino.data.ArrayDataSource(this, i) : new Dino.data.ObjectDataSource(this, i);
//			this.items[i] = item;
//		}
//		return this.items[i];
	},
	
	
	ensure_item: function(i) {
		// если элемент данных отсутствует, то вызываем метод создания элемента
		if(!(i in this.items))
			this.items[i] = this.create_item(i);
		return this.items[i];		
	},
	
	create_item: function(i) {
		// для массивов используем ArrayDataSource, а для всего остального ObjectDataSource
		return Dino.isArray(this.val()[i]) ? new Dino.data.ArrayDataSource(this, i) : new Dino.data.ObjectDataSource(this, i);
	}
	
	
//	asArray: function() {
//		return new Dino.data.ArrayDataSource(this);
//	},
//	
//	asObject: function() {
//		return new Dino.data.ObjectDataSource(this);
//	}
	
/*	
	eachItem: function(callback){
		Dino.each(this.items, callback);
	}
*/	
	
});





/*
Dino.declare('Dino.data.TreeView', 'Dino.events.Observer', {
	
	initialize: function(src) {
		Dino.data.TreeView.superclass.initialize.apply(this, arguments);
		this.source = src;
	}
	
	
});
*/


/*
Dino.declare('Dino.data.FlattenArrayView', 'Dino.data.DataSource', {
	
//	initialize: function(src, flattenProp) {
//		Dino.data.FlattenArrayView.superclass.initialize.apply(this, arguments);
//		this.source = src;
//		this.flattenProp = flattenProp;
//				
//	},
	
	walk_depth: function(callback, accum, obj) {
		if(arguments.length == 1){
			accum = {n: 0};
			obj = this.source;
		}
		
		callback.call(this, obj, accum.n);
		
		if( obj.get(this.id) !== undefined ){
			var children = obj.item(this.id);
			var arr = children.val();
			for(var i = 0; i < arr.length; i++){
				++accum.n;
				this.walk_depth(callback, accum, children.item(i));
			}
		}
	},

	find_depth: function(callback, accum, obj) {
		
		if(arguments.length == 1){
			accum = {n: 0};
			obj = this.source;
		}
		
		// если callback возвращает TRUE, то заканчиваем обход
		if( callback.call(this, obj, accum.n) ) return obj;
		
		if( obj.get(this.id) !== undefined ){
			var children = obj.item(this.id);
			var arr = children.val();
			for(var i = 0; i < arr.length; i++){
				++accum.n;
				var result = this.find_depth(callback, accum, children.item(i));
				if(result) return result;
			}
		}
	},
	
	item: function(i) {
		return this.find_depth(function(item, n){
			return (n == i);
		});
	},
	
	get: function(i) {
		if(arguments.length == 0){
			return this.source.get();
		}
		else {
			var item = this.item(i);
			return (item) ? item.get() : undefined;
		}
	},
	
	set: function(i, newVal) {
		if(arguments.length == 1)
			this.source.set(newVal);
		else {
			var item = this.item(i);
			if(item) this.item(i).set(newVal);
		}
	},
	
	each: function(callback) {
		var self = this;
		this.walk_depth(function(item, i) {
			callback.call(self, item.val(), i);
		});
	}
	
});
*/





Dino.declare('Dino.data.ArrayDataSource', 'Dino.data.DataSource', {
	
	del: function(i) {
	
		if(arguments.length == 0) {
			
			if(this.source) this.source.del(this.id);
			
			return;
		}
	
	
		// удаляем элемент, если он есть
		if(i in this.items){
			this.items[i].destroy();
			delete this.items[i];
		}
		
		var a = this.val();
		// оповещаем элементы о смене индекса и меняем ключ в кэше элементов
		for(var j = i+1; j < a.length; j++){
//			if(j in this.items){
				//this.items[j]
			this.events.fire('onIndexChanged', {'oldIndex': j, 'newIndex': (j-1)});
			if(j in this.items){
				this.items[j].id = j-1;
				this.items[j-1] = this.items[j];
				delete this.items[j];
			}
			
//			}
		}
		
		// удаляем элемент массива
		a.splice(i, 1);
		
		this.events.fire('onItemDeleted', {'index': i});
	},
	
	add: function(value) {
		var a = this.val();
		a.push(value);
		this.events.fire('onItemAdded', {'index': a.length-1});
	},
	
	size: function() {
		return this.val().length;
	}
	
});



Dino.declare('Dino.data.ObjectDataSource', 'Dino.data.DataSource', {
	
	
	del: function(i){
	
		if(arguments.length == 0) {
			
			if(this.source) this.source.del(this.id);
			
			return;
		}
	
	
		// удаляем элемент из кэша, если он есть
		if(i in this.items){
			this.items[i].destroy();
			delete this.items[i];
		}
		
		var obj = this.val();
		delete obj[i];
		
		this.events.fire('onItemDeleted', {'index': i});		
	}
	
	
});















Dino.declare('Dino.data.AjaxDataSource', 'Dino.data.DataSource', {
	
	defaultOptions: {
		url: '',
		params: {}
	},
	
		
	create_item: function(i) {
	
		//TODO интересно, что массивы почти всегда (за исключением страничного отображения) загружаются полностью, поэтому 
	
		// получаем непосредственное значение
		var v = this.val();
		if(Dino.isArray(v)) {
			// массив загружается полностью, так что все элементы уже загружены
		}
		else {
			// а вот свойство объекта может быть не загружено, поэтому проверяем его
			if(!(i in v)) {
				var self = this;
				var o = this.options;
				var url = Dino.isFunction(o.url) ? o.url.call(this, i, v) : o.url;
				var params = Dino.isFunction(o.params) ? o.params.call(this, i, v) : o.params;
				
				$.getJSON(url, params, function(data){
					self.set(i, data);
					self.events.fire('onItemLoad');
				});
				
				v[i] = {} //<-- добавляем заглушку
			}
		}
		
		var ds = new Dino.data.AjaxDataSource(this, i, this.options);
		
		return ds;
//			return Dino.isArray(this.val()[i]) ? new Dino.data.ArrayDataSource(this, i) : new Dino.data.ObjectDataSource(this, i);
		
		
		
	}
	
	
	
});






/*
Dino.declare('Dino.data.AjaxDataSource', 'Dino.data.DataSource', {
	load: function(url, params) {
		var self = this;
		
		$.getJSON(url, params || {}, function(data){
			self.set(data);
			self.events.fire('onLoad');
		});
	}
});
*/

