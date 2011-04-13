

Dino.utils = (function(){
	var U = {};
	
	U.create_widget_filter = function(i) {
		
		var f = null;
		
		if( Dino.isNumber(i) ) f = Dino.filters.by_index.curry(i);//return this.widgets[i]; // упрощаем
		else if( Dino.isString(i) ) f = Dino.filters.by_props.curry({'tag': i});
		else if( Dino.isFunction(i) && ('superclass' in i) ) f = Dino.filters.by_class.curry(i);
		else if( Dino.isFunction(i) ) f = i;
		else if( Dino.isPlainObject(i) ) f = Dino.filters.by_props.curry(i);
		
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


/*
Dino.formats = (function(){
	
	var F = {};
	
//	F.string_format = function(template) {
//		var regexp = /(%s)/g;
//		return;
//	}
	
	return F;
})();
*/





/**
 * 
 * @class
 * @extends Dino.BaseObject
 * @param {Dino.Widget} owner
 */
Dino.WidgetCollectionManager = Dino.declare('Dino.WidgetCollectionManager', 'Dino.BaseObject', /** @lends Dino.WidgetCollectionManager.prototype */{
	
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
			item.$bind(this.owner.data, 2);
		
		return item;
	},
	
	get: function(i) {
		return Dino.find(this.widgets, Dino.utils.create_widget_filter(i));	
	},

	get_all: function(i) {		
		return Dino.find_all(this.widgets, Dino.utils.create_widget_filter(i));	
	},
	
	remove: function(item) {
		var i = Dino.index_of(this.widgets, item);
		
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
	
	if((i in shared_opts)){//Dino.in_array(ignore, i)){
		o[i] = p;
	}
	else if(i[i.length-1] == '!') {
		j = i.substr(0, i.length-1);
		if(j in o) i = j;
		o[i] = p;
	}
	else if(i[i.length-1] == '+') {
		i = i.substr(0, i.length-1);
		
		if( !Dino.isArray(o[i]) ) o[i] = [o[i]];
		p = o[i].concat(p);
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
			//TODO этот участок кода нужно исправить
			
			// если элемент в перегружаемом параметре существует, то он может быть обработан специфически
			if(i in o){
				// классы сливаются в одну строку, разделенную пробелом
				if(i == 'cls') p = o[i] + ' ' + p;
				if( /^on\S/.test(i) ) {
					if( !Dino.isArray(o[i]) ) o[i] = [o[i]];
					p = o[i].concat(p);
				}
				if(i == 'state') {
					p = o[i] + ' ' + p;
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










