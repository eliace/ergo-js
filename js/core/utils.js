

Dino.utils = (function(){
	var U = {};
	
	U.create_widget_filter = function(i) {
		
		var f = null;
		
		if( _dino.isNumber(i) ) f = _dino.filters.by_index.curry(i);//return this.widgets[i]; // упрощаем
		else if( _dino.isString(i) ) f = _dino.filters.by_props.curry({'tag': i});
		else if( _dino.isFunction(i) && ('superclass' in i) ) f = _dino.filters.by_class.curry(i);
		else if( _dino.isFunction(i) ) f = i;
		else if( _dino.isPlainObject(i) ) f = _dino.filters.by_props.curry(i);
		
		return f;
	}
	
	
	
	
	
	return U;
})();




Dino.filters = (function(){
	
	var F = {};
	
	// "пустой" фильтр
	F.nop = function(){ return false };
	// по индексу
	F.by_index = function(index, child, i){ return index == i; };
	// по совпадению набора свойств
	F.by_props = function(props, child){
		for(var i in props)
			if(child[i] != props[i]) return false;
		return true; 
	};
	F.by_class = function(clazz, child){
		return (child instanceof clazz);
	}
		
	return F;
})();



Dino.bindings = (function(){
	
	var B = {};
	
	//Dino.bindings.opt('state').opt('opacity');
	
	
	B.opt = function(i, k) {
		return B.opt_chain(undefined, i, k);
	};
	
	B.opt_chain = function(chain, i, k) {
		var F = function(o){
			if(chain) chain(o);
			o[i] = this.data.get(k);
		};
		
		F.opt = B.opt_chain.curry(F);
		
		return F;
	};
	
	B.optState = function(val) { return {'state': val}; };
	
	return B;
})();



Dino.formats = (function(){
	
	var F = {};
	
//	F.string_format = function(template) {
//		var regexp = /(%s)/g;
//		return;
//	}
	
	return F;
})();







Dino.declare('Dino.utils.WidgetCollectionManager', 'Dino.BaseObject', {
	
	initialize: function(owner) {
		this.widgets = [];
		this.owner = owner;
	},
	
	
	
	add: function(item, i) {
		// добавляем дочерний виджет
		if(arguments.length == 2)
			this.widgets.splice(i, 0, item);
		else
			this.widgets.push(item);
			
		item.parent = this.owner;	
		
		// выполняем автобиндинг
		if(this.owner.data && !item.data)
			item.setData(this.owner.data, 2);
		
		return item;
	},
	
	get: function(i) {
		return Dino.find(this.widgets, Dino.utils.create_widget_filter(i));	
	},

	get_all: function(i) {		
		return Dino.find_all(this.widgets, Dino.utils.create_widget_filter(i));	
	},
	
	remove: function(item) {
		var i = Dino.indexOf(this.widgets, item);
		
		// если такого элемента среди дочерних нет, то возвращаем false
		if(i == -1) return false;
		
		delete this.widgets[i].parent;
		this.widgets.splice(i, 1);
		
		return true;
	},
	
	removeAll: function() {
		this.widgets = [];
	},
	
	each: function(callback) {
		for(var i = 0; i < this.widgets.length; i++){
			var result = callback.call(this.owner, this.widgets[i], i);
			if(result) return result;
		}
	},
	
	size: function() {
		return this.widgets.length;
	},
	
	empty: function(){
		return this.widgets.length == 0;
	}
	
	
	
});





Dino.utils.overrideProp = function(o, srcObj, i) {

	var shared_opts = {'data': null};

	var p = srcObj[i];
	
	if(i in shared_opts){//Dino.in_array(ignore, i)){
		o[i] = p;
	}
	else{
		//TODO здесь создается полная копия (deep copy) объекта-контейнера
		if( Dino.isPlainObject(p) ){
			if(!(i in o) || !Dino.isPlainObject(o[i])) o[i] = {};
			Dino.utils.overrideOpts(o[i], p);
		}
		else if( Dino.isArray(p) ){
			if(!(i in o) || !Dino.isArray(o[i])) o[i] = [];
			Dino.utils.overrideOpts(o[i], p);
		}
		else {
			// если элемент в перегружаемом параметре существует, то он может быть обработан специфически
			if(i in o){
				// классы сливаются в одну строку, разделенную пробелом
				if(i == 'cls') p = o[i] + ' ' + p;
				if( /^on\S/.test(i) ) {
					if( !Dino.isArray(o[i]) ) o[i] = [o[i]];
					o[i].push(p);
				}
			}
			o[i] = p;
		}
	}
	
}


Dino.utils.overrideOpts = function(o) {

	// обходим все аргументы, начиная со второго
	for(var j = 1; j < arguments.length; j++){
		var srcObj = arguments[j];
		
		if( Dino.isArray(srcObj) ){
			for(var i = 0; i < srcObj.length; i++)
				Dino.utils.overrideProp(o, srcObj, i);
		}
		else {
			
//			if('dtype' in srcObj && 'dtype' in o) {
//				
//			}			
			
			for(var i in srcObj)
				Dino.utils.overrideProp(o, srcObj, i);
		}		
	}
	
	return o;
}



Dino.utils.deep_override = function(o) {
	
	for(var j = 1; j < arguments.length; j++){
	
		var srcObj = arguments[j];
		
		Dino.each(srcObj, function(p, i){
			if( Dino.isPlainObject(p) ){
				if(!(i in o) || !Dino.isPlainObject(o[i])) o[i] = {};
				Dino.utils.deep_override(o[i], p);
			}
			else if( Dino.isArray(p) ){
				if(!(i in o) || !Dino.isArray(o[i])) o[i] = [];
				Dino.utils.deep_override(o[i], p);
			}
			else {
				o[i] = p;
			}
		});
	
	}
	
	return o;
}





