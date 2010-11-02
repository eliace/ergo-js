





Dino.declare('Dino.data.DataSource', Dino.events.Observer, {
	
	classOptions: {
		useDirty: false
	},
	
	
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
		this.options = Dino.utils.overrideOpts({}, this.classOptions, options);
		this.items = {};
		this.is_dirty = false;
		this.stop_dirty = false;
	},
	
	
	destroy: function() {
		this.each_item(function(item){ item.destroy(); });
		this.events.unreg_all();
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
			for(var j in this.items){
				this.items[j].destroy();
			}
			// теперь список элементов пуст
			this.items = {};
			
			
			var oldValue = ('id' in this) ? this.source.val()[this.id] : this.source;
			
			('id' in this) ? this.source.val()[this.id] = newValue : this.source = newValue;
			
//			if(this.source instanceof Dino.data.DataSource){
//				('id' in this) ? this.source.set(this.id, newValue) : this.source.set(newValue);
//			}
//			else {
//				('id' in this) ? this.source[this.id] = newValue : this.source = newValue;
//			}
			this.events.fire('onValueChanged', {'oldValue': oldValue, 'newValue': newValue});
			
			if(this.source instanceof Dino.data.DataSource)
				this.source.events.fire('onItemChanged', {item: this});
			
			// помечаем источник данных как "грязный"
			if(this.options.useDirty) this.dirty();
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
//			this.events.fire('onValueChanged');
		}
		
	},
	
	
	// обходим все значения
	each: function(callback) {
		Dino.each(this.val(), callback);
	},
	
	each_item: function(callback) {
		Dino.each(this.items, callback);
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
		return Dino.isArray(this.val()[i]) ? new Dino.data.ArrayDataSource(this, i, this.options) : new Dino.data.ObjectDataSource(this, i, this.options);
	},
	
	dirty: function(flag) {
		
		flag = (arguments.length == 0) ? true : flag;
		
		var event = new Dino.events.CancelEvent();
		
		if(flag) {
			if(this.is_dirty) return;
						
			this.events.fire('onDirty', event);			
			if(event.isCanceled) return;
			
			this.is_dirty = true;
			
			if(this.stop_dirty) return; //FIXME использовать флаг не совсем корректно, поскольку он не может быть опцией
			
			if(this.source instanceof Dino.data.DataSource) this.source.dirty(true);
		}
		else {
			if(!this.is_dirty) return;

			this.events.fire('onClean', event);
			if(event.isCanceled) return;
			
			this.is_dirty = false;

			if(this.stop_dirty) return;
			
			for(var i in this.items) this.items[i].dirty(false);
		}
		
	},
	
	clean_all: function() {
		this.is_dirty = false;
		for(var i in this.items) this.items[i].clean_all();		
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
		
		// помечаем источник данных как "грязный"
//		this.dirty();		
	},
	
	add: function(value) {
		var a = this.val();
		a.push(value);
		
		var i = a.length-1;
		var item = this.item(i);
		
		this.events.fire('onItemAdded', {'index': i, 'item': item});
		
		// помечаем новый источник данных как "грязный" ?
//		this.dirty();
		
		return item;
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
		
		// помечаем источник данных как "грязный"
//		this.dirty();
	}
	
	
});















Dino.declare('Dino.data.AjaxDataSource', 'Dino.data.DataSource', {
/*	
	defaultOptions: {
		url: '',
		params: {}
	},
*/
/*	
	ajax_create: function(){
	},
	
	ajax_read: function() {
	},
	
	ajax_update: function(){
	},
	
	ajax_delete: function(){
	},
*/
	
	
	load: function(i, url, params) {

		var v = this.val();
	
		var self = this;
		
		url = Dino.isFunction(url) ? url.call(this, i, v) : url;
		params = Dino.isFunction(params) ? params.call(this, i, v) : params || {};
		
		$.getJSON(url, params, function(data){
			self.set(i, data);
			self.events.fire('onItemLoad');
		});
	
	},
	
	
	create_item: function(i) {
		return new Dino.data.AjaxDataSource(this, i);
//		// для массивов используем ArrayDataSource, а для всего остального ObjectDataSource
//		return Dino.isArray(this.val()[i]) ? new Dino.data.ArrayDataSource(this, i) : new Dino.data.ObjectDataSource(this, i);
	}
	
	
/*		
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
*/	
	
	
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

