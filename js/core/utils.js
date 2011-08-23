
//= require "core"


Ergo.utils = (function(){
	var U = {};
	
	U.widget_filter = function(i) {
		
		var f = null;
		
		if( $.isNumber(i) ) f = Ergo.filters.by_index.curry(i);//return this.widgets[i]; // упрощаем
		else if( $.isString(i) ) f = Ergo.filters.by_props.curry({'tag': i});
		else if( $.isFunction(i) && ('superclass' in i) ) f = Ergo.filters.by_class.curry(i);
		else if( $.isFunction(i) ) f = i;
		else if( $.isPlainObject(i) ) f = Ergo.filters.by_props.curry(i);
		
		return f;
	}
	
	
	
	
	
	return U;
})();







/*
Ergo.bindings = (function(){
	
	var B = {};
	
	//Ergo.bindings.opt('state').opt('opacity');
	
	
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
*/

/*
Ergo.formats = (function(){
	
	var F = {};
	
//	F.string_format = function(template) {
//		var regexp = /(%s)/g;
//		return;
//	}
	
	return F;
})();
*/





Ergo.overrideProp = function(o, srcObj, i) {

	var p = srcObj[i];

	if(i == 'data') i = 'data@'; 										//<-- поле data не перегружается
	if(i == 'items') i = 'items@'; 										//<-- поле items не перегружается
	if(i == 'extensions') i = 'extensions+'; 				//<-- поле extensions сливается

//	var shared_opts = {'data': null};

	
//	if((i in shared_opts)){//Ergo.in_array(ignore, i)){
//		o[i] = p;
//	}

	var last_literal = i[i.length-1];

	if(last_literal == '@') {
		var j = i.substr(0, i.length-1);
		o[j] = p;
	}
	else if(last_literal == '!') {
		var j = i.substr(0, i.length-1);
		if(j in o) i = j;
		o[i] = p;
	}
	else if(last_literal == '+') {
		i = i.substr(0, i.length-1);
		
		if(!(i in o)) o[i] = [];
		if( !$.isArray(o[i]) ) o[i] = [o[i]];
		p = o[i].concat(p);
		o[i] = p;
	}
	else{
		//TODO здесь создается полная копия (deep copy) объекта-контейнера
		if( $.isPlainObject(p) ){
			if(!(i in o) || !$.isPlainObject(o[i])) o[i] = {};
			Ergo.smart_override(o[i], p);
		}
		else if( $.isArray(p) ){
			if(!(i in o) || !$.isArray(o[i])) o[i] = [];
			Ergo.smart_override(o[i], p);
		}
		else {
			//TODO этот участок кода нужно исправить
			
			// если элемент в перегружаемом параметре существует, то он может быть обработан специфически
			if(i in o){
				// классы сливаются в одну строку, разделенную пробелом
				if(i == 'cls') p = o[i] + ' ' + p;
				if( /^on\S/.test(i) ) {
					if( !$.isArray(o[i]) ) o[i] = [o[i]];
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


Ergo.smart_override = function(o) {

	// обходим все аргументы, начиная со второго
	for(var j = 1; j < arguments.length; j++){
		
		var srcObj = arguments[j];
		
//		if( $.isArray(srcObj) ){
//			for(var i = 0; i < srcObj.length; i++)
//				Ergo.utils.overrideProp(o, srcObj, i);
//		}
//		else {			
			for(var i in srcObj)
				Ergo.overrideProp(o, srcObj, i);
//		}		
	}
	
	return o;
}



Ergo.deep_override = function(o) {
	
	for(var j = 1; j < arguments.length; j++){
	
		var srcObj = arguments[j];
		
		Ergo.each(srcObj, function(p, i){
			if( $.isPlainObject(p) ){
				if(!(i in o) || !$.isPlainObject(o[i])) o[i] = {};
				Ergo.deep_override(o[i], p);
			}
			else if( $.isArray(p) ){
				if(!(i in o) || !$.isArray(o[i])) o[i] = [];
				Ergo.deep_override(o[i], p);
			}
			else {
				o[i] = p;
			}
		});
	
	}
	
	return o;
}










