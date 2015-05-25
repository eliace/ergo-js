
//------------------------------------------------------
//
// Расширения базовых классов
//
//------------------------------------------------------


String.prototype.capitalize = function() {
//	var s = '';
//	for(i = 1; i < this.length; i++) s += this[i];
	return this.charAt(0).toUpperCase() + this.substr(1);
};

// String.prototype.trim = function(){
// 	return this.replace(/^\s+|\s+$/g, '');
// };

/**
 * Добавление карринга к классу Function
 */
Function.prototype.curry = function(arg) {
	var F = this;
	var pre_args = arguments;
	return function(){
		var args = [];
		for(var i = 0; i < pre_args.length; i++) args.push(pre_args[i]);
		for(var i = 0; i < arguments.length; i++) args.push(arguments[i]);
//			args.unshift(arg);
		return F.apply(this, args);
	};
};

Function.prototype.rcurry = function(arg) {
	var F = this;
	var post_args = arguments;
//		for(var i = 0; i < arguments.length; i++) post_args.push(arguments[i]);
	return function(){
		var args = [];
		for(var i = 0; i < arguments.length; i++) args.push(arguments[i]);
		for(var i = 0; i < post_args.length; i++) args.push(post_args[i]);
//			args.push(arg);
		return F.apply(this, args);
	};
};



/**
 * Удаление элементов массива
 */
Array.prototype.remove = function(criteria) {
	
	if( !$.isFunction(criteria) ) {
		criteria = function(item) { return item === criteria; };
	}

	var indices = [];

	for(var i = 0; i < this.length; i++) {
		if( criteria.call(this, this[i], i) ) indices.push(i);
	}

	var arr = this;

	var removed = [];

	indices.reverse().forEach( function(i) { 
		removed.push(arr[i]); 
		arr.splice(i, 1); 
	} );

	return removed;
};
	


Array.prototype.uniq = function() {
	var result = [];
	for(var i = 0; i < this.length; i++) {
		if(result.indexOf(this[i]) == -1) result.push(this[i]);
	}
	return result;
};