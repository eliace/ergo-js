
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
//	for(var i = 0; i < arguments.length; i++) pre_args.push(arguments[i]);
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



Function.prototype.debounce = function(wait, immediate) {
	var func = this;
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};
